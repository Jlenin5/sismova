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
import { getSuppliers } from 'src/app/main/human-resources/personal/store/supplierSlice'
import { getCoins } from '../../../finances/store/currenciesSlice'
import { getCompanies } from 'src/app/main/settings/leadership/store/companiesSlice'
import { getSeries } from 'src/app/main/settings/controls/store/serieSlice'
import { getMaxId } from '../../store/saleorderSlice'
import { getWarehouses } from 'src/app/main/settings/leadership/store/warehouseSlice'
import { getEmployees } from 'src/app/main/human-resources/personal/store/employeesSlice'

const BasicInfoTab = () => {
  const dispatch = useDispatch()
  const [maxId, setMaxId] = useState(null)
  const [employees, setEmployees] = useState([])
  const [dSupplier, setDSupplier] = useState([])
  const [dWarehouse, setWarehouse] = useState([])
  const methods = useFormContext()
  const { control, formState, watch, setValue } = methods
  const { errors } = formState
  const code = watch('code')
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getEmployees()).then((r) => setEmployees(r.payload.data))
    dispatch(getSuppliers()).then((r) => setDSupplier(r.payload.data))
    dispatch(getWarehouses()).then(r => setWarehouse(r.payload.data))
    dispatch(getMaxId()).then(r => setMaxId(r.payload.ultimo_id))
  }, [dispatch])

  useEffect(() => {
    if (maxId !== null) {
      var addcode = 0
      if (code === '00000') {
        addcode = (Number(maxId) + 1).toString().padStart(5, '0')
      } else {
        addcode = code
      }
      setValue('code', addcode)
    }  
  }, [code, maxId, setValue])

  return (
    <div className="grid grid-flow-row-dense grid-cols-3 gap-32 -mx-4 max-w-4xl">
      <Controller
        name="code"
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
            id="code"
            variant="outlined"
            value={code}
          />
        )}
      />

      <Controller
        name="warehouses"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={dWarehouse}
            getOptionLabel={(option) => option.name}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("warehouses", data?.id || null)
              return data
            }}
            value={dWarehouse.find((option) => option.id === value) || null}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label={t('warehouse')}
              />
            )}
            fullWidth
          />
        )}
      />
      
      <Controller
        name="employees"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={employees}
            getOptionLabel={(option) => option.first_name}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("employees", data?.id || null)
              return data
            }}
            value={employees.find((option) => option.id === value) || null}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label={t('employees')}
              />
            )}
            fullWidth
          />
        )}
      />

      <Controller
        name="suppliers"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={dSupplier}
            getOptionLabel={(option) => option.name}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("suppliers", data?.id || null)
              return data
            }}
            value={dSupplier.find((option) => option.id === value) || null}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label={t('supplier')}
              />
            )}
            fullWidth
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            value={utcToZonedTime(new Date(value))}
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
        name="date_approved"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <DatePicker
            value={utcToZonedTime(new Date(value))}
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