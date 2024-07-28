import { useTranslation } from 'react-i18next'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import _ from '@lodash'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useState } from 'react'
import withRouter from '@fuse/core/withRouter'
import FuseLoading from '@fuse/core/FuseLoading'
import BrandTableHead from './BrandTableHead'
import BrandForm from './BrandForm'

function BrandTable(props) {

  const { t } = useTranslation()
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })
  
  const handleClickOpen = (value) => {
    setOpen(true);
  }

  const handleClose = () => {
    props.fetchData(props.page, props.rowsPerPage, '')
    setOpen(false);
  }

  function handleRequestSort(event, property) {
    const id = property
    let direction = 'desc'
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc'
    }
    setOrder({
      direction,
      id,
    })
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(props.data.map((n) => n.id))
      return
    }
    setSelected([])
  }

  function handleDeselect() {
    setSelected([])
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  function handleChangePage(event, value) {
    props.setPage(value)
  }

  function handleChangeRowsPerPage(event) {
    props.setRowsPerPage(event.target.value)
  }

  if (props.loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    )
  }

  if (props.data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          {t('there_is_no_data')}
        </Typography>
      </motion.div>
    )
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <BrandTableHead
            ids={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props.data.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
                props.data,
                [
                  (o) => {
                    switch (order.id) {
                      case 'name': {
                        return o.name[0]
                      }
                      default: {
                        return o[order.id]
                      }
                    }
                  },
                ],
                [order.direction]
              )
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1
                return ( 
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={() => handleClickOpen( props.setDataToEdit(n) )}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                        />
                    </TableCell>

                    <TableCell className='w-40'>
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.name}
                    </TableCell>
            
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.status ? (
                        <FuseSvgIcon className="text-green" size={20}>
                          heroicons-outline:check-circle
                        </FuseSvgIcon>
                      ) : (
                        <FuseSvgIcon className="text-red" size={20}>
                          heroicons-outline:minus-circle
                        </FuseSvgIcon>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </FuseScrollbars>
      <BrandForm
        open={open}
        onClose={handleClose}
        dataToEdit={props.dataToEdit}
        setDataToEdit={props.setDataToEdit}
      />
      <TablePagination
        className="shrink-0 border-t-1"
        labelRowsPerPage={t('rows_per_page')}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
        component="div"
        count={props.lengthPage}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default withRouter(BrandTable)