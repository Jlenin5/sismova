import { useForm, Controller, useFormContext } from 'react-hook-form'
import ProductsTab from './ProductsTab'

const ControllerProduct = () => {

  const methods = useFormContext()
  const { control, formState, watch, setValue } = methods
  const quote_details = watch('quote_details');
  
  const updateProductName = (productId, newName) => {
    const updatedProducts = quote_details.map(product => {
      if (product.id === productId) {
        return { ...product, ...newName };
      }
      return product;
    });
    setValue('quote_details', updatedProducts);
  }

  // console.log(quote_details)

  return (
    <Controller
      name="quote_details"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ProductsTab
          onChange={onChange}
          allProducts={quote_details}
          selectedProducts={value}
          updateProductName={updateProductName}
        />
      )}
    />
  )
}

export default ControllerProduct