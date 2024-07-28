import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete'
import { getMeasurementUnits } from '../../store/measurementUnitsSlice'

function InventoryTab(props) {
  const dispatch = useDispatch()
  const [measurementUnit, setMeasurementUnit] = useState([])
  const methods = useFormContext()
  const { control } = methods
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getMeasurementUnits()).then(r => setMeasurementUnit(r.payload.data))
  }, [dispatch])

  return (
    <div>
      <Controller
        name="stock_alert"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label={t('stock_alert')}
            id="stock_alert"
            variant="outlined"
            type="text"
            onKeyPress={props.singleNumber}
            fullWidth
          />
        )}
      />
      <Controller
        name="unit"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              freeSolo
              className="mt-8 mb-16"
              fullWidth
              id="tags-outlined"
              options={measurementUnit}
              getOptionLabel={(option) => option.name}
              onChange={(_, data) => {
                onChange(data)
                return data
              }}
              value={value}
              renderInput={(params) => (
                <TextField
                {...params}
                label={t('select_unit_of_measure')}
                  placeholder={t('append')}
                  />
              )}
            />
          )
        }}
      />
    </div>
  )
}

export default InventoryTab