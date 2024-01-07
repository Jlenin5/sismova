import _ from '@lodash'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import FuseLoading from '@fuse/core/FuseLoading'
import Typography from '@mui/material/Typography'
import withRouter from '@fuse/core/withRouter'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import BranchOfficeTableHead from './BranchOfficeTableHead'
import { useDispatch, useSelector } from 'react-redux'
import { getDatas, delDataMulti, selectBranchOffice, selectBranchOfficeSearchText } from '../store/branchofficeSlice'
import BranchOfficeForm from './BranchOfficeForm'
// import { getHRs } from '../../apps/hhrr/hrsSlice'
// import { getRoles } from '../store/rolesSlice'

const BranchOfficeTable = ({data, setData, maxId, setPage, page, dataToEdit, setDataToEdit, createData, updateData, deleteData}) => {
  const dispatch = useDispatch()
  // const users = useSelector(selectBranchOffice)
  // const searchText = useSelector(selectBranchOfficeSearchText)

  // const [dHr, setDHr] = useState([])
  // const [dRol, setDRol] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })

  // console.log(data)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  
  useEffect(() => {
    dispatch(getDatas())
    .then((response) => {
      setData(response.payload)
      setLoading(false)
    })
    // dispatch(getHRs()).then((response) => setDHr(response.payload))
    // dispatch(getRoles()).then((response) => setDRol(response.payload))
    .catch((error) => {
      console.error('Error al obtener usuarios', error)
      setLoading(false)
    })
  }, [dispatch])

  // useEffect(() => {
  //   if (searchText.length !== 0) {
  //     setData(
  //       _.filter(users, (item) => {
  //         const hrId = item.HrId ? item.HrId.toString() : '';
  //         return hrId.toLowerCase().includes(searchText.toLowerCase());
  //       })
  //     )
  //     setPage(0)
  //   } else {
  //     setData(users)
  //   }
  // }, [users, searchText])

  const deleteMultiple = (dataMulti) => {
    delDataMulti(dataMulti)
    const newData = data.filter((el) => !dataMulti.includes(el.boId))
    setData(newData)
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
      setSelected(data.map((n) => n.boId))
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
    setPage(value)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value)
  }
  

  const encontrarPalabraEnTexto = (texto, palabra) => {
    const textoMin = texto.toLowerCase()
    const palabraMin = palabra.toLowerCase()
    if (textoMin.includes(palabraMin)) {
      const posicionPalabra = textoMin.indexOf(palabraMin)
      if (posicionPalabra !== -1) {
        return textoMin.substring(posicionPalabra)
      } else {
        return textoMin
      }
    } else {
      return texto
    }
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
          No hay sucursales
        </Typography>
      </motion.div>
    )
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <BranchOfficeTableHead
            boIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
            deleteMultiple={deleteMultiple}
          />
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'users': {
                      return o.users[0]
                    }
                    default: {
                      return o[order.id]
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.boId) !== -1
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.boId}
                    selected={isSelected}
                    onClick={() => handleClickOpen( setDataToEdit(n) )}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.boId)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.boName}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.boPhone}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.boEmail}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.District}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.User}
                    </TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <BranchOfficeForm
        open={open}
        maxId={maxId}
        onClose={handleClose}
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
      />
      <TablePagination
        className="shrink-0 border-t-1"
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        component="div"
        count={data.length}
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

export default withRouter(BranchOfficeTable)