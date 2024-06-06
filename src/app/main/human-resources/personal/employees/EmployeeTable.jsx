import { useTranslation } from 'react-i18next'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import _ from '@lodash'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import withRouter from '@fuse/core/withRouter'
import FuseLoading from '@fuse/core/FuseLoading'
import EmployeeTableHead from './EmployeeTableHead'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees, selectEmployee, selectEmployeeSearchText } from '../store/employeesSlice'
import OptionsAction from './OptionsAction'

const EmployeeTable = (props) => {
  const dispatch = useDispatch()
  const employees = useSelector(selectEmployee)
  const searchText = useSelector(selectEmployeeSearchText)
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState(null);
  const openOption = Boolean(anchorEl)
  const [idE, setIdE] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState([])
  const [data, setData] = useState(employees)
  const [lengthPage, setLengthPage] = useState(data.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  useEffect(() => {
    fetchData(page, rowsPerPage)
  }, [dispatch])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(employees, (item) => item.first_name.toLowerCase().includes(searchText.toLowerCase()))
      )
      setPage(0)
    } else {
      setData(employees)
    }
  }, [employees, searchText])

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
      setSelected(data.map((n) => n.id))
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
    fetchData(value, 10)
  }

  function handleChangeRowsPerPage(event) {
    setPage(0)
    fetchData(0, event.target.value)
  }

  const fetchData = (page, rowsPerPage) => {
    setLoading(true)
    setTimeout(() => {
      dispatch(getEmployees({ page: page + 1, rowsPerPage: rowsPerPage, searchText:'' })).then((response) => {
        setPage(page)
        setRowsPerPage(rowsPerPage)
        setData(response.payload.data)
        setLengthPage(response.payload.totalRows)
        setLoading(false)
      })
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    )
  }

  if (data.length === 0) {
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
          <EmployeeTableHead
            ids={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
                data,
                [
                  (o) => {
                    switch (order.id) {
                      case 'first_name': {
                        return o.first_name[0]
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
                    className="h-72"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={() => setIdE(n) }
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
                      {n.first_name}
                    </TableCell>
            
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.email}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.document_number}
                    </TableCell>
            
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.phone}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.gender === 0 ? t('male') : t('female')}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
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

                    <TableCell className="p-4 md:p-16" component="th" scope="row" padding="none">
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={openOption ? 'long-menu' : undefined}
                        aria-expanded={openOption ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </FuseScrollbars>
      <OptionsAction
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        openOption={openOption}
        dataToEdit={props.dataToEdit}
        setDataToEdit={props.setDataToEdit}
        idE={idE}
      />
      <TablePagination
        className="shrink-0 border-t-1"
        labelRowsPerPage={t('rows_per_page')}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
        component="div"
        count={lengthPage}
        rowsPerPage={rowsPerPage}
        page={page}
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

export default withRouter(EmployeeTable)