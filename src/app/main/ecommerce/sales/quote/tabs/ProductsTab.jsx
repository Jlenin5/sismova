import { useTranslation } from 'react-i18next'
import './detailQuote.scss'
import _ from '@lodash'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { Controller, useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from 'src/app/main/ecommerce/inventory/store/productsSlice'
import { getTaxes } from 'src/app/main/ecommerce/finances/store/taxSlice'
import ProductTabHead from './ProductTabHead'
import ModalSelect from './ModalSelect'
import ProductInterface from 'src/app/interfaces/ProductInterface'

const ProductsTab = ({ onChange, selectedProducts, allProducts, updateProduct }) => {
  const dispatch = useDispatch()
  const [dProduct, setDProduct] = useState([])
  const [open, setOpen] = useState(false)
  const [listProd, setListProd] = useState([])
  const [listQuoteDetails, setListQuoteDetails] = useState([])
  const [listModalProd, setListModalProd] = useState(ProductInterface)
  const [quantities, setQuantities] = useState({})
  const { t } = useTranslation()

  const handleClickOpen = (value) => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleModalClose = (updatedForm, selectedProduct) => {
    // Busca el producto en la lista y actualiza sus datos
    const updatedListProd = listProd.map((prod) => {
      if (prod.id === selectedProduct.id) {
        return { ...prod, ...updatedForm };
      }
      return prod;
    })

    setListProd(updatedListProd);
    // updateProduct(selectedProduct.id, updatedForm)
    handleClose()
  }

  useEffect(() => {
    dispatch(getProducts()).then((r) => setDProduct(r.payload))
    setListProd(allProducts)
    setListQuoteDetails(allProducts)
  }, [allProducts, dispatch])

  const handleProductChange = (_, selectedValue) => {
    if (selectedValue) {
      const findProduct = dProduct.find((r) => r.id === selectedValue.id)
      const updatedProduct = { ...findProduct, prodName: selectedValue.prodName }
      // setListProd((prevList) => [...prevList, updatedProduct])
      let quoteDetailInterface = {
        id: updatedProduct.id,
        qtdProdName: updatedProduct.prodName,
        qtdProdPrice: updatedProduct.prodSalePrice,
        qtdQuantity: 1,
        qtdSubtotal: updatedProduct.prodSalePrice,
        qtdTotal: 0
      }
      setListQuoteDetails((prevList) => [...prevList, quoteDetailInterface])
      onChange([...selectedProducts, quoteDetailInterface])
    }
  }

  // const updatePrice = (id, action) => {
  //   const findProduct = dProduct.find((r) => r.id === id)
  //   const currentQuantity = quantities[id] || 1

  //   let newCount = currentQuantity

  //   if (action === 'add') {
  //     newCount = currentQuantity + 1
  //   } else if (action === 'subtract') {
  //     newCount = currentQuantity - 1 >= 0 ? currentQuantity - 1 : 0
  //   }

  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [id]: newCount,
  //   }))

  //   if (newCount >= 0) {
  //     const newPrice = findProduct.prodSalePrice * newCount
  //     const updatedListProd = listProd.map((prod) => {
  //       if (prod.id === id) {
  //         return { ...prod, updatedPrice: newPrice, quantity: newCount }
  //       }
  //       return prod
  //     })

  //     setListProd(updatedListProd)
  //   }
  // }

  const getTotalPrice = () => {
    const totalPrice = listProd.reduce((total, product) => {
      let startPrice = parseFloat(Number(product.prodSalePrice).toFixed(2))
      return total + (product.updatedPrice || startPrice)
    }, 0)
    return totalPrice.toFixed(2)
  }

  const getTax = () => {
    // return getTotalPrice() * 0.18
  }

  // console.log(listQuoteDetails)

  return (
    <div className="flex flex-wrap -mx-4 w-full">
      <div className="w-2/3 px-16">
        <Autocomplete
          id="tags-outlined"
          options={dProduct
            .filter((o) => !listProd.some((p) => p.id === o.id))
            .map((o) => ({
              id: o.id, prodName: o.prodName, prodSalePrice: o.prodSalePrice
            }))}
          getOptionLabel={(o) => o.prodName}
          onChange={handleProductChange}
          renderInput={(params) => 
            <TextField
              {...params}
              label={t('search_product')}
            />
          }
        />
        <FuseScrollbars className="grow overflow-x-auto">
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <ProductTabHead
              // ids={selected}
              // order={order}
              // onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              // rowCount={data.length}
              // onMenuItemClick={handleDeselect}
            />
            <TableBody>
              {
                listQuoteDetails.map((data) => {
                  // console.log(data.qtdProdName)
                  return (
                    <TableRow
                      key={data.id}
                      className="h-72 cursor-pointer"
                      hover
                      role="checkbox"
                      onClick={() => handleClickOpen( setListModalProd(data) )}
                    >
                      <TableCell className="w-52 px-4 md:px-0" component="th" scope="row">
                        {data.qtdProdName}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. {data.updatedPrice || data.qtdProdPrice}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {/* {data.prodStock} */}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {data.qtdQuantity}
                        {/* <div className="grid grid-cols-3 w-full box-item-product">
                          <button
                            onClick={() => updatePrice(data.id, 'subtract')}
                            className="max-w-1/3 btn-left"
                          >
                            <FuseSvgIcon className="text-16" size={22} color="action">material-outline:remove</FuseSvgIcon>
                          </button>
                          <input
                            className='w-1/3 m-auto'
                            value={quantities[data.id] || 1}
                            onChange={(e) => updatePrice(data.id, 'change', parseInt(e.target.value, 10))}
                            placeholder='1'
                          />
                          <button
                            onClick={() => updatePrice(data.id, 'add')}
                            className="max-w-1/3 btn-right"
                          >
                            <FuseSvgIcon className="text-16" size={22} color="action">material-outline:add</FuseSvgIcon>
                          </button>
                        </div> */}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. 0.00
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        18%
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. {data.qtdSubtotal}
                      </TableCell>
                      <TableCell className="w-60" component="th" scope="row">
                        <IconButton aria-label="delete" size="large">
                          <DeleteIcon fontSize="inherit" className="text-red-500" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                }
                )
              }
            </TableBody>
          </Table>
        </FuseScrollbars>
        <ModalSelect
          open={open}
          onClose={(updatedProduct, selectedProduct) => {
            handleModalClose(updatedProduct, selectedProduct);
            handleClose();
          }}
          listProd={listModalProd}
        />
      </div>
      <div className="w-1/3 px-16">
        <div className="w-full grid grid-cols-2">
          <div className="w-2/3">
            <h2>Prec. Total Prod.</h2>
            <h2>{t('tax')}</h2>
            <h2>{t('sub_total')}</h2>
            <h2>{t('net_total')}</h2>
            <h2>{t('final_value')}</h2>
          </div>
          <div className="w-1/3">
            {/* <h2>S/.{getTotalPrice()}</h2>
            <h2>S/.{getTax()}</h2>
            <h2>S/.{getTotalPrice()}</h2>
            <h2>S/.{getTotalPrice()}</h2>
            <h2>S/.{getTotalPrice()}</h2> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsTab