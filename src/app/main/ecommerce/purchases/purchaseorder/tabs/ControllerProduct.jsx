import { useForm, Controller, useFormContext } from 'react-hook-form'
import ProductsTab from './ProductsTab'

const ControllerProduct = () => {

  const methods = useFormContext()
  const { control, formState, watch, setValue } = methods
  const purchase_order_details = watch('purchase_order_details');
  
  const updateProductName = (productId, newName) => {
    const updatedProducts = purchase_order_details.map(product => {
      if (product.id === productId) {
        return { ...product, ...newName };
      }
      return product;
    });
    setValue('purchase_order_details', updatedProducts);
  }

  return (
    <Controller
      name="purchase_order_details"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ProductsTab
          onChange={onChange}
          allProducts={purchase_order_details}
          selectedProducts={value}
          updateProduct={updateProductName}
        />
      )}
    />
  )
}

export default ControllerProduct