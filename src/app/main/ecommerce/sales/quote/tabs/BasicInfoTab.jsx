import { useTranslation } from 'react-i18next'
import { utcToZonedTime } from 'date-fns-tz'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'app/store/userSlice'
import { useEffect, useState } from 'react'
import { getCustomers } from 'src/app/main/human-resources/personal/store/customersSlice'
import { getCurrencies } from '../../../finances/store/currenciesSlice'

const BasicInfoTab = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [clients, setClients] = useState([])
  const [currencies, setCurrencies] = useState([])
  const methods = useFormContext()
  const { control, formState, watch, setValue } = methods
  const { errors } = formState
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getCustomers()).then((r) => setClients(r.payload.data))
    dispatch(getCurrencies()).then(r => setCurrencies(r.payload.data))
  }, [dispatch])

  return (
    <div>

      <div className="grid grid-flow-row-dense grid-cols-3 gap-32 -mx-4 max-w-4xl">

        <Controller
          name="currency_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <InputLabel id="currency">{t('currency')}</InputLabel>
              <Select
                labelId="currency"
                id="demo-simple-select"
                label={t('currency')}
                onChange={(event) => {
                  onChange(event.target.value)
                  methods.setValue("currency_id", event.target.value || null)
                }}
                value={value || ''}
              >
                {currencies.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.symbol + ' - ' + item.code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="customer_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="tags-outlined"
              options={clients}
              getOptionLabel={(option) => option.first_name}
              onChange={(_, data) => {
                onChange(data)
                methods.setValue("customer_id", data?.id || null)
                return data
              }}
              value={clients.find((option) => option.id === value) || null}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label={t('client')}
                />
              )}
              fullWidth
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="status">{t('state')}</InputLabel>
              <Select
                {...field}
                labelId="status"
                id="demo-simple-select"
                label={t('state')}
              >
                <MenuItem value={1}>{t('open')}</MenuItem>
                <MenuItem value={0}>{t('refused')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />

      </div>

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label={t('description')}
            id="description"
            className="mt-24 -mx-4 max-w-4xl"
            multiline
            minRows={6}
            maxRows={7}
            variant="outlined"
            fullWidth
            onChange={(event) => {
              onChange(event.target.value)
            }}
            value={value || ''}
          />
        )}
      />

    </div>
  )
}

export default BasicInfoTab