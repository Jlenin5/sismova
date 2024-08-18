import { Controller, useFormContext } from 'react-hook-form'
import ProductsTab from './ProductsTab'

const ControllerProduct = () => {

  const methods = useFormContext()
  const { control, watch, setValue } = methods
  const purchase_order_products = watch('purchase_order_products')
  console.log(purchase_order_products)
  
  const updateProductName = (productId, newName) => {
    const updatedProducts = purchase_order_products.map(product => {
      if (product.id === productId) {
        return { ...product, ...newName }
      }
      return product
    })
    setValue('purchase_order_products', updatedProducts)
  }

  return (
    <Controller
      name="purchase_order_products"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ProductsTab
          onChange={onChange}
          allProducts={purchase_order_products}
          selectedProducts={value}
          updateProduct={updateProductName}
        />
      )}
    />
  )
}

export default ControllerProduct