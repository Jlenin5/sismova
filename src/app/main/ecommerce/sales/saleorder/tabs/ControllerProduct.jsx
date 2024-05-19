import { Controller, useFormContext } from 'react-hook-form'
import ProductsTab from './ProductsTab'

const ControllerProduct = () => {

  const methods = useFormContext()
  const { control, watch, setValue } = methods
  const sale_order_details = watch('sale_order_details')
  
  const updateProductName = (productId, newName) => {
    const updatedProducts = sale_order_details.map(product => {
      if (product.id === productId) {
        return { ...product, ...newName }
      }
      return product
    })
    setValue('sale_order_details', updatedProducts)
  }

  return (
    <Controller
      name="sale_order_details"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ProductsTab
          onChange={onChange}
          allProducts={sale_order_details}
          selectedProducts={value}
          updateProduct={updateProductName}
        />
      )}
    />
  )
}

export default ControllerProduct