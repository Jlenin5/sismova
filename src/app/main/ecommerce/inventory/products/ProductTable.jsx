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
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import ProductTableHead from './ProductTableHead'
import { getProducts, selectProduct, selectProductSearchText } from '../store/productsSlice'

const ProductTable = (props) => {
  const dispatch = useDispatch()
  const products = useSelector(selectProduct)
  const searchText = useSelector(selectProductSearchText)
  const { t } = useTranslation()

  const [isDelayOver, setIsDelayOver] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState([])
  const [data, setData] = useState(products)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })

  useEffect(() => {
    setTimeout(() => {
      setIsDelayOver(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (isDelayOver) {
      dispatch(getProducts()).then(() => setLoading(false))
    }
  }, [isDelayOver, dispatch])

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

  function handleClick(item) {
    props.navigate(`/ecommerce/inventory/product/${item}`)
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

  const findWordInText = (texto, palabra) => {
    const minText = texto.toLowerCase()
    const minWord = palabra.toLowerCase()
    if (minText.includes(minWord)) {
      const wordPosition = minText.indexOf(minWord)
      if (wordPosition !== -1) {
        return minText.substring(wordPosition)
      } else {
        return minText
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
          {t('there_is_no_data')}
        </Typography>
      </motion.div>
    )
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductTableHead
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
                    case 'products': {
                      return o.products[0]
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
                const isSelected = selected.indexOf(n.id) !== -1
                const findImage = (findImage) => {
                  const url = `https://sismova.tech/backsis/public/images/products/${findImage}`
                  const palabraBuscada = "blob"
                  return findWordInText(url, palabraBuscada)
                }
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
                      { n.product_images.length > 0 && n.featuredImageId ? (
                        <img
                          className="w-full block rounded h-52"
                          src={findImage(_.find(n.product_images, { featured: n.featuredImageId }).primPath)}
                          alt={n.prodName}
                        />
                      ) : (
                        <img
                          className="w-full block rounded"
                          src="assets/images/apps/ecommerce/product-image-placeholder.png"
                          alt={n.prodName}
                        />
                      )}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.serial_number.snSerie}-{n.prodNumber}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.prodName}
                    </TableCell>

                    <TableCell className="p-4 md:p-8" component="th" scope="row">
                      {n.unit.prunUnit}
                    </TableCell>

                    <TableCell className="p-4 md:p-8" component="th" scope="row" align="right">
                      <span>S/.</span>
                      {n.prodPurchasePrice}
                    </TableCell>

                    <TableCell className="p-4 md:p-8" component="th" scope="row" align="right">
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
      <TablePagination
        className="shrink-0 border-t-1"
        labelRowsPerPage={t('rows_per_page')}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
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

export default withRouter(ProductTable)