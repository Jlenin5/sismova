import { useTranslation } from 'react-i18next'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import _ from '@lodash'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import withRouter from '@fuse/core/withRouter'
import FuseLoading from '@fuse/core/FuseLoading'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import PurchaseOrderTableHead from './PurchaseOrderTableHead'
import { getPurhcaseOrders, selectPurchaseOrder, selectPurchaseOrderSearchText } from '../store/purchaseordersSlice'
import { useNavigate } from 'react-router-dom'
import OptionsAction from './OptionsAction'

const PurchaseOrderTable = ({
    data, setData, loading, setLoading, page, setPage, rowsPerPage, setRowsPerPage
  }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const purchaseOrders = useSelector(selectPurchaseOrder)
  const searchText = useSelector(selectPurchaseOrderSearchText)
  const [anchorEl, setAnchorEl] = useState(null)
  const openOption = Boolean(anchorEl)
  const [idE, setIdE] = useState(null)
  const { t } = useTranslation()

  // const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState([])
  // const [data, setData] = useState(purchaseOrders)
  const [lengthPage, setLengthPage] = useState(data.length)
  // const [page, setPage] = useState(0)
  // const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPurhcaseOrders({ page: page + 1, rowsPerPage, searchText:'' })).then((response) => {
        setData(response.payload.data)
        setLengthPage(response.payload.totalRows)
        setLoading(false)
      })
    })
  }, [dispatch, page, rowsPerPage, setLoading, setData])

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

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
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
    setLoading(true)

    dispatch(getPurhcaseOrders({ page: value + 1, rowsPerPage, searchText:'' })).then((response) => {
      setPage(value)
      setData(response.payload.data)
      setLengthPage(response.payload.totalRows)
      setLoading(false)
    })
  }

  function handleChangeRowsPerPage(event) {
    setLoading(true)
    setPage(0)
    dispatch(getPurhcaseOrders({ page, rowsPerPage:event.target.value, searchText:'' })).then((response) => {
      setRowsPerPage(event.target.value)
      setData(response.payload.data)
      setLengthPage(response.payload.totalRows)
      setLoading(false)
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
          <PurchaseOrderTableHead
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
                      case 'currency': {
                        return o.currency.id
                      }
                      case 'company': {
                        return o.company.id
                      }
                      case 'branch_office': {
                        return o.branch_office.id
                      }
                      case 'warehouse': {
                        return o.warehouse.id
                      }
                      case 'supplier': {
                        return o.supplier.id
                      }
                      case 'user': {
                        return o.user.id
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
                    onClick={() => setIdE(n.id) }
                  >
                    <TableCell className="w-40 md:w-64 text-right">
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
 
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.code}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.description}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.currency?.symbol + ' - ' + n.currency?.code}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.company?.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.branch_office?.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.warehouse?.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.supplier?.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.supplier_document}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.supplier_document_date}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.paid == 1 ? 'Sí' : 'No'}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.approved == 1 ? 'Sí' : 'No'}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {/* {n.employees.first_name} */}
                    </TableCell>
                    
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                      {/* {n.puorTax === '1' ? 'No' : 'Sí'} */}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {/* {n.sub_total} */}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {/* {n.total} */}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {/* {n.date} */}
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
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <OptionsAction
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        openOption={openOption}
        // dataToEdit={data}
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

export default withRouter(PurchaseOrderTable)