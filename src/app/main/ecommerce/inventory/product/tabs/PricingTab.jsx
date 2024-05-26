import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Controller, useFormContext } from 'react-hook-form'

function PricingTab(props) {
  const methods = useFormContext()
  const { control } = methods
  const { t } = useTranslation()

  return (
    <div>
      <Controller
        name="purchase_price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label={t('purchase_price')}
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
        name="sale_price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label={t('sale_price')}
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

      <div className="flex">
        <Controller
          name="product_taxes.igv"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mb-16 mr-16" fullWidth>
              <InputLabel id="igv">{t('igv')}</InputLabel>
              <Select
                {...field}
                labelId="igv"
                id="demo-simple-select"
                label={t('igv')}
              >
                <MenuItem value={0}>{t('no')}</MenuItem>
                <MenuItem value={1}>{t('yes')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="product_taxes.igv_value"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              label={t('igv_value')}
              id="priceTaxExcl"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              type="text"
              onKeyPress={props.singleNumber}
              variant="outlined"
              autoFocus
              fullWidth
            />
          )}
        />
      </div>

      <div className="flex">
        <Controller
          name="product_taxes.isc"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mb-16 mr-16" fullWidth>
              <InputLabel id="isc">{t('isc')}</InputLabel>
              <Select
                {...field}
                labelId="isc"
                id="demo-simple-select"
                label={t('isc')}
              >
                <MenuItem value={0}>{t('no')}</MenuItem>
                <MenuItem value={1}>{t('yes')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="product_taxes.isc_value"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              label={t('isc_value')}
              id="priceTaxExcl"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              type="text"
              onKeyPress={props.singleNumber}
              variant="outlined"
              autoFocus
              fullWidth
            />
          )}
        />
      </div>

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
  )
}

export default PricingTab