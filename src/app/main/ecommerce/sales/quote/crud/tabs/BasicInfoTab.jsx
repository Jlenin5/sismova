import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Controller, useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getClients } from 'src/app/main/human-resources/personal/store/clientSlice'

const url = 'https://sismova.tech/backsis/public/api/bo'

const BasicInfoTab = () => {
  const dispatch = useDispatch()
  const [dClient, setDClient] = useState([])
  const [dBO, setDBO] = useState([])
  const methods = useFormContext()
  const { control, formState, watch } = methods
  const serial_number = watch('serial_number')
  const currencies = watch('currencies')
  const companies = watch('companies')
  const employees = watch('employees')
  const clients = watch('clients')
  const { errors } = formState
  const { t } = useTranslation()

  // const getBO = async () => {
  //   return await axios.get(url)
  // }

  useEffect(() => {
    // getBO().then(r => setDBO(r.data))
    dispatch(getClients()).then((r) => setDClient(r.payload))
  }, [dispatch])

  return (
    <div className="grid grid-flow-row-dense grid-cols-3 gap-32 -mx-4 max-w-4xl">
      <Controller
        name="SerialNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.name}
            helperText={errors?.name?.message}
            label={t('serie')}
            disabled
            required
            autoFocus
            id="serialNumber"
            variant="outlined"
            value={serial_number.snSerie}
          />
        )}
      />

      <Controller
        name="qtNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.name}
            helperText={errors?.name?.message}
            label={t('number')}
            disabled
            required
            autoFocus
            id="qtNumber"
            variant="outlined"
          />
        )}
      />

      <Controller
        name="Currency"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.name}
            helperText={errors?.name?.message}
            label={t('currency')}
            disabled
            required
            autoFocus
            id="currency"
            variant="outlined"
            value={currencies.curName}
          />
        )}
      />

      <Controller
        name="Company"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.name}
            helperText={errors?.name?.message}
            label={t('company')}
            // disabled
            required
            autoFocus
            id="company"
            variant="outlined"
            value={companies.comName}
          />
        )}
      />
      
      <Controller
        name="Employee"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label={t('assigned_user')}
            id="employee"
            variant="outlined"
            value={employees.empFirstName}
          />
        )}
      />

      <Controller
        name="clients"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="tags-outlined"
            required
            options={dClient}
            getOptionLabel={(option) => option.cliFirstName || ''}
            onChange={(_, data) => {
              onChange(data)
              return data
            }}
            value={value}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('client')}
              />
            )}
          />
        )}
      />

      <Controller
        name="qtCreatedAt"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            value={new Date(value)}
            onChange={onChange}
            slotProps={{
              textField: {
                label: t('start_date'),
                variant: 'outlined',
              },
            }}
            maxDate={new Date()}
          />
        )}
      />

      <Controller
        name="qtDeletedAt"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            value={new Date(value)}
            onChange={onChange}
            slotProps={{
              textField: {
                label: t('end_date'),
                variant: 'outlined',
              },
            }}
            minDate={new Date()}
          />
        )}
      />
    </div>
  )
}

export default BasicInfoTab