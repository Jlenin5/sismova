import { useForm, Controller, useFormContext } from 'react-hook-form'
import ProductsTab from './ProductsTab'

const ControllerProduct = () => {

  const methods = useFormContext()
  const { control, watch, setValue } = methods
  const product_quotations = watch('product_quotations');
  
  const updateProductName = (productId, newName) => {
    const updatedProducts = product_quotations.map(product => {
      if (product.id === productId) {
        return { ...product, ...newName };
      }
      return product;
    });
    setValue('product_quotations', updatedProducts);
  }

  return (
    <Controller
      name="product_quotations"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ProductsTab
          onChange={onChange}
          allProducts={product_quotations}
          selectedProducts={value}
          updateProduct={updateProductName}
        />
      )}
    />
  )
}

export default ControllerProduct