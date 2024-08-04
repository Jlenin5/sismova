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
      setDProduct(r.payload.data)
      if (allProducts && r.payload.data.length) {
        const foundProduct = r.payload.data.filter(product => allProducts.some(p => p.product_id === product.id))
        setChangeProductByListFilter(foundProduct || [])
      }
    })
    setListProd(allProducts)
  }, [allProducts, dispatch])

  const handleProductChange = (_, selectedValue) => {
    if (selectedValue) {
      const findProduct = dProduct.find((r) => r.id === selectedValue.id)
      const updatedProduct = { ...findProduct, selectedValue }
      console.log(updatedProduct)
      setListProd((prevList) => [...prevList, updatedProduct])
      let purchaseOrderDetailInterface = {
        id: updatedProduct.id,
        code: updatedProduct.code,
        product_id: updatedProduct.id,
        product_name: updatedProduct.name,
        price: updatedProduct.purchase_price,
        quantity: 1,
        tax: 18,
        total: updatedProduct.purchase_price
      }
      onChange([...selectedProducts, purchaseOrderDetailInterface])
    }
  }

  const handleDeleteItem = (productId) => {
    // Elimina el producto seleccionado por su id
    const updatedSelectedProducts = selectedProducts.filter(product => product.product_id !== productId);
    onChange(updatedSelectedProducts)
  }

  const calculateSubTotal = () => {
    const subtotal = listProd.reduce((total, product) => {
      return total + parseFloat(Number(product.total).toFixed(2))
    }, 0)
    return subtotal.toFixed(2)
  }

  const calculateTax = () => {
    const tax = listProd.reduce((total, product) => {
      return total + parseFloat(Number(product.tax).toFixed(2) * product.quantity)
    }, 0)
    return tax.toFixed(2)
  }

  const calculateDiscount = () => {
    const discount = listProd.reduce((total, product) => {
      return total + parseFloat(Number(product.discount).toFixed(2) * product.quantity)
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
            .filter((o) => !selectedProducts.some((p) => p.product_id === o.id))
            .map((o) => ({
              id: o.id, code: o.code, name: o.name, price: o.purchase_price
            }))}
          getOptionLabel={(o) => o.code + ' - ' + o.name}
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
            <ProductTabHead />
            <TableBody>
              {
                listProd.map((data) => {
                  let listFindProduct = []
                  if(listFindProduct) {
                    listFindProduct = changeProductByListFilter.find(r => r.id === data.product_id)
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
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {data.code}
                      </TableCell>
                      <TableCell className="w-52 px-4 md:px-0" component="th" scope="row">
                        {data.product_name ? data.product_name : listFindProduct.name}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. {data.price}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {data.quantity}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {(data.tax * data.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        S/. {data.total}
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