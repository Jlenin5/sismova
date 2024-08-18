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
import QuoteTableHead from './QuoteTableHead'

function QuoteTable(props) {

  const { t } = useTranslation()
  const [selected, setSelected] = useState([])
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })

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

  function handleClick(item) {
    props.navigate(`/e-commerce/sales/quote/${item}`);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day}-${month}-${year}`
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
          <QuoteTableHead
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
                    case 'quotes': {
                      return o.quotes[0]
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
                    onClick={() => handleClick( n.id )}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                      >
                    </TableCell>
 
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                      {n.code}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.currency?.symbol + ' - ' + n.currency?.code}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.customer?.document_number}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.customer?.first_name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.user?.employee?.first_name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                      {formatDate(n.created_at)}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                      {n.approved === 1 ? t('yes') : t('no')}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 flex justify-center items-center h-72" component="th" scope="row" align="center">
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
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
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

export default withRouter(QuoteTable)