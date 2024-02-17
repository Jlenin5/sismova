import './detailQuote.scss'
import _ from '@lodash'
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

const ProductsTab = (props) => {
  const dispatch = useDispatch()
  const [dProduct, setDProduct] = useState([])
  const [listProd, setListProd] = useState([])
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    dispatch(getProducts()).then((r) => setDProduct(r.payload))
  }, [dispatch])

  const handleProductChange = (_, selectedValue) => {
    if (selectedValue) {
      const findProduct = dProduct.find((r) => r.id === selectedValue.id)
      setListProd((prevList) => [...prevList, findProduct])
    }
  }

  const updatePrice = (id, action) => {
    const findProduct = dProduct.find((r) => r.id === id)
    const currentQuantity = quantities[id] || 1

    let newCount = currentQuantity

    if (action === 'add') {
      newCount = currentQuantity + 1
    } else if (action === 'subtract') {
      newCount = currentQuantity - 1 >= 0 ? currentQuantity - 1 : 0
    }

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newCount,
    }))

    if (newCount >= 0) {
      const newPrice = findProduct.prodSalePrice * newCount
      const updatedListProd = listProd.map((prod) => {
        if (prod.id === id) {
          return { ...prod, updatedPrice: newPrice, quantity: newCount }
        }
        return prod
      })

      setListProd(updatedListProd)
    }
  }

  const getTotalPrice = () => {
    const totalPrice = listProd.reduce((total, product) => {
      let startPrice = parseFloat(Number(product.prodSalePrice).toFixed(2))
      return total + (product.updatedPrice || startPrice)
    }, 0)
    return totalPrice.toFixed(2)
  }

  return (
    <div className="flex flex-wrap -mx-4 w-full">
      <div className="w-2/3 px-16">
        <Autocomplete
          id="tags-outlined"
          options={dProduct
            .filter((option) => !listProd.some((p) => p.id === option.id))
            .map((option) => ({ id: option.id, prodName: option.prodName }))}
          getOptionLabel={(option) => option.prodName}
          onChange={handleProductChange}
          renderInput={(params) => 
            <TextField
              {...params}
              label="Buscar producto"
            />
          }
        />
        <div className="w-full">
          {
            listProd.map((data) => 
              <div key={data.id} className="mt-16 w-full rounded h-60 flex gap-10">
                <div className="w-60 px-4 md:px-0">
                  { data.product_images.length > 0 && data.featuredImageId ? (
                    <img
                      className="w-full block rounded h-60"
                      src={`https://sismova.tech/backsis/public/images/products/${_.find(data.product_images, { featured: data.featuredImageId }).primPath}`}
                      alt={data.prodName}
                    />
                  ) : (
                    <img
                      className="w-full block rounded"
                      src="assets/images/apps/ecommerce/product-image-placeholder.png"
                      alt={data.prodName}
                    />
                  )}
                </div>
                <h3 className="w-4/6">{data.prodName}</h3>
                <div className="w-1/6 m-auto">
                  <div className="grid grid-cols-3 w-full box-item-product">
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
                  </div>
                </div>
                <div className="w-1/6 m-auto">
                  S/. {data.updatedPrice || data.prodSalePrice}
                </div>
                <div className="w-60"> 
                  <IconButton aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" className="text-red-500" />
                  </IconButton>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="w-1/3 px-16">
        <div className="w-full grid grid-cols-2">
          <div className="w-2/3">
            <h2>Total productos</h2>
            <h2>Impuesto</h2>
            <h2>Subtotal</h2>
            <h2>Total Neto</h2>
            <h2>Valor Final</h2>
          </div>
          <div className="w-1/3">
            <b>S/.{getTotalPrice()}</b>
            <b>S/.{getTotalPrice()}</b>
            <b>S/.{getTotalPrice()}</b>
            <b>S/.{getTotalPrice()}</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsTab