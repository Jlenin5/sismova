import { useTranslation } from 'react-i18next'
import './detailQuote.scss'
import _ from '@lodash'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from 'src/app/main/ecommerce/inventory/store/productsSlice'
import ProductTabHead from './ProductTabHead'
import ModalSelect from './ModalSelect'
import ProductInterface from 'src/app/interfaces/ProductInterface'

const ProductsTab = ({ onChange, selectedProducts, allProducts, updateProduct }) => {
  const dispatch = useDispatch()
  const [dProduct, setDProduct] = useState([])
  const [open, setOpen] = useState(false)
  const [listProd, setListProd] = useState([])
  const [changeProductByListFilter, setChangeProductByListFilter] = useState([])
  const [listModalProd, setListModalProd] = useState(ProductInterface)
  const { t } = useTranslation()

  const handleClickOpen = (value) => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleModalClose = (updatedForm, selectedProduct) => {
    const updatedListProd = listProd.map((prod) => {
      if (prod.id === selectedProduct.id) {
        return { ...prod, ...updatedForm }
      }
      return prod
    })

    setListProd(updatedListProd)
    updateProduct(selectedProduct.id, updatedForm)
    handleClose()
  }

  useEffect(() => {
    dispatch(getProducts()).then((r) => {
      setDProduct(r.payload)
      if (allProducts && r.payload.length) {
        const foundProduct = r.payload.filter(product => allProducts.some(p => p.Product === product.id))
        setChangeProductByListFilter(foundProduct || [])
      }
    })
    setListProd(allProducts)
  }, [allProducts, dispatch])

  const handleProductChange = (_, selectedValue) => {
    if (selectedValue) {
      const findProduct = dProduct.find((r) => r.id === selectedValue.id)
      const updatedProduct = { ...findProduct, selectedValue }
      setListProd((prevList) => [...prevList, updatedProduct])
      let purchaseOrderDetailInterface = {
        id: updatedProduct.id,
        Product: updatedProduct.id,
        podName: updatedProduct.prodName,
        podPrice: updatedProduct.prodSalePrice,
        podStock: updatedProduct.prodStock,
        podTax: 0.18,
        podDiscountMethod: 1,
        podDiscount: 0.00,
        podQuantity: 1,
        podTotal: updatedProduct.prodSalePrice
      }
      onChange([...selectedProducts, purchaseOrderDetailInterface])
    }
  }

  const handleDeleteItem = (productId) => {
    // Elimina el producto seleccionado por su id
    const updatedSelectedProducts = selectedProducts.filter(product => product.Product !== productId);
    onChange(updatedSelectedProducts)
  }

  const calculateSubTotal = () => {
    const subtotal = listProd.reduce((total, product) => {
      return total + parseFloat(Number(product.podTotal).toFixed(2))
    }, 0)
    return subtotal.toFixed(2)
  }

  const calculateTax = () => {
    const tax = listProd.reduce((total, product) => {
      return total + parseFloat(Number(product.podTax).toFixed(2) * product.podQuantity)
    }, 0)
    return tax.toFixed(2)
  }

  const calculateDiscount = () => {
    const discount = listProd.reduce((total, product) => {
      return total + parseFloat(Number(product.podDiscount).toFixed(2) * product.podQuantity)
    }, 0)
    return discount.toFixed(2)
  }

  const calculateTotal = () => {
    const total = (calculateSubTotal() - calculateDiscount()) + (calculateDiscount() * calculateTax())
    return total.toFixed(2)
  }

  return (
    <div className="flex flex-wrap -mx-4 w-full">
      <div className="w-2/3 px-16">
        <Autocomplete
          id="tags-outlined"
          options={dProduct
            .filter((o) => !selectedProducts.some((p) => p.Product === o.id))
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
                listProd.map((data) => {
                  let listFindProduct = []
                  if(listFindProduct) {
                    listFindProduct = changeProductByListFilter.find(r => r.id === data.Product)
                    listFindProduct = listFindProduct || []
                  }
                  return (
                    <TableRow
                      key={data.id}
                      className="h-72 cursor-pointer"
                      hover
                      role="checkbox"
                      onClick={() => handleClickOpen( setListModalProd(data) )}
                    >
                      <TableCell className="w-52 px-4 md:px-0" component="th" scope="row">
                        {data.podName ? data.podName : listFindProduct.prodName}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. {data.podPrice}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {data.podStock ? data.podStock : listFindProduct.prodStock}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {data.podQuantity}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. {(data.podDiscount * data.podQuantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {(data.podTax * data.podQuantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. {data.podTotal}
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </FuseScrollbars>
        <ModalSelect
          open={open}
          modalClose={handleModalClose}
          onClose={handleClose}
          listProdTable={listModalProd}
          listProd={changeProductByListFilter}
          onDeleteItem={handleDeleteItem}
        />
      </div>
      <div className="w-1/3 px-16">
        <div className="w-full grid grid-cols-2">
          <div className="w-2/3">
            <h2>{t('sub_total')}</h2>
            <h2>{t('tax')}</h2>
            <h2>{t('discount')}</h2>
            <h2>{t('final_value')}</h2>
          </div>
          <div className="w-1/3">
            <h2>S/.{calculateSubTotal()}</h2>
            <h2>S/.{calculateTax()}</h2>
            <h2>S/.{calculateDiscount()}</h2>
            <h2>S/.{calculateTotal()}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsTab