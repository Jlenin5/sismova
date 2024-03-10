import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function PricingTab(props) {
  const methods = useFormContext();
  const { control } = methods;  

  return (
    <div>
      <Controller
        name="prodPurchasePrice"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio de compra"
            id="priceTaxExcl"
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
            type="text"
            onKeyPress={props.singleNumber}
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      <Controller
        name="prodSalePrice"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio de venta"
            id="priceTaxExcl"
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
            type="text"
            onKeyPress={props.singleNumber}
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      {/* <Controller
        name="priceTaxExcl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio sin impuestos"
            id="priceTaxExcl"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      <Controller
        name="priceTaxIncl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio Impuestos Incluidos"
            id="priceTaxIncl"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="taxRate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Tasa de impuesto"
            id="taxRate"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="comparedPrice"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio comparado"
            id="comparedPrice"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            fullWidth
            helperText="Agregue un precio de comparación para mostrarlo junto al precio real"
          />
        )}
      /> */}
    </div>
  );
}

export default PricingTab