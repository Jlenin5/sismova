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
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import ProductsTableHead from './ProductsTableHead'

import { getProducts, delProductMulti, selectProducts, selectProductsSearchText } from '../store/productsSlice'
import FormModal from './FormModal'
import { getCategories } from '../store/categoriesSlice'

function ProductsTable({data, setData, maxId, setPage, page, dataToEdit, setDataToEdit, createData, updateData, deleteData}) {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const searchText = useSelector(selectProductsSearchText)

  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState([])
  const [dCategory, setDCategory] = useState([])
  const [open, setOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    prodId: null,
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getProducts())
    .then((response) => {
      setData(response.payload)
      setLoading(false)
    })
    getCategories().then((response) => setDCategory(response))
    .catch((error) => {
      console.error('Error al obtener productos', error)
      setLoading(false)
    })
  }, [dispatch])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(products, (item) => item.prodName.toLowerCase().includes(searchText.toLowerCase()))
      )
      setPage(0)
    } else {
      setData(products)
    }
  }, [products, searchText])

  const deleteMultiple = (dataMulti) => {
    delProductMulti(dataMulti)
    const newData = data.filter((el) => !dataMulti.includes(el.prodId))
    setData(newData)
  }

  function handleRequestSort(event, property) {
    const prodId = property
    let direction = 'desc'

    if (order.prodId === property && order.direction === 'desc') {
      direction = 'asc'
    }
    setOrder({
      direction,
      prodId,
    })
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.prodId))
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
          No hay productos
        </Typography>
      </motion.div>
    )
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductsTableHead
            selectedProductIds={selected}
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
                  switch (order.prodId) {
                    case 'products': {
                      return o.products[0]
                    }
                    default: {
                      return o[order.prodId]
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.prodId) !== -1
                const url = `https://sismova.tech/backsis/public/images/${n.prodImage}`
                const palabraBuscada = "blob"
                const nuevo = encontrarPalabraEnTexto(url, palabraBuscada)
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.prodId}
                    selected={isSelected}
                    onClick={() => handleClickOpen( setDataToEdit(n) )}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.prodId)}
                      />
                    </TableCell>

                    <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      { n.prodImage ?
                        <img className="w-full block rounded" src={nuevo} />
                        :
                        <img className="w-full block rounded" src='https://sismova.tech/backsis/public/images/nocamera.png' />
                      }
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.prodName}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {dCategory.find((c) => c.cateId === n.CategoryId)?.cateName}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      <span>S/.</span>
                      {n.prodPurchasePrice}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.prodStock}
                      <i
                        className={clsx(
                          'inline-block w-8 h-8 rounded mx-8',
                          n.prodStock <= 5 && 'bg-red',
                          n.prodStock > 5 && n.prodStock <= 25 && 'bg-orange',
                          n.prodStock > 25 && 'bg-green'
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.prodState ? (
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
      <FormModal
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

export default withRouter(ProductsTable)