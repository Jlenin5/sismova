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
import { getCoins } from '../../../finances/store/coinSlice'
import { getCompany } from 'src/app/main/settings/leadership/store/CompanySlice'
import { getSeries } from 'src/app/main/settings/controls/store/serieSlice'
import { getMaxId } from '../../store/purchaseorderSlice'
import { getWarehouses } from 'src/app/main/settings/leadership/store/warehouseSlice'

const BasicInfoTab = () => {
  const dispatch = useDispatch()
  const [maxId, setMaxId] = useState(null)
  const user = useSelector(selectUser)
  const [dSupplier, setDSupplier] = useState([])
  const [dCurrency, setDCurrency] = useState([])
  const [dCompany, setDCompany] = useState([])
  const [dWarehouse, setWarehouse] = useState([])
  const [dSerie, setDSerie] = useState([])
  const methods = useFormContext()
  const { control, formState, watch, setValue } = methods
  const { errors } = formState
  const puorNumber = watch('puorNumber')
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getSuppliers()).then((r) => setDSupplier(r.payload))
    dispatch(getCoins()).then(r => setDCurrency(r.payload))
    dispatch(getCompany()).then(r => setDCompany(r.payload))
    dispatch(getWarehouses()).then(r => setWarehouse(r.payload))
    dispatch(getSeries()).then(r => setDSerie(r.payload))
    dispatch(getMaxId()).then(r => setMaxId(r.payload.ultimo_id))
  }, [dispatch])

  useEffect(() => {
    if (maxId !== null) {
      var addPuorNumber = 0
      if (puorNumber === '00000') {
        addPuorNumber = (Number(maxId) + 1).toString().padStart(5, '0')
      } else {
        addPuorNumber = puorNumber
      }
      setValue('puorNumber', addPuorNumber)
    }  
  }, [puorNumber, maxId, setValue])

  var companyName = ''
  if(dCompany.length > 0) {
    companyName = dCompany[0].comName
  }

  var serieName = ''
  if(dSerie.length > 0) {
    const findSerie = dSerie.find(r => r.id === 2)
    serieName = findSerie.snSerie
  }

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
            value={serieName}
          />
        )}
      />

      <Controller
        name="puorNumber"
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
            id="puorNumber"
            variant="outlined"
            value={puorNumber}
          />
        )}
      />

      <Controller
        multiple
        name="Currency"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mx-4" fullWidth>
            <InputLabel id="prodWebHome">{t('currency')}</InputLabel>
            <Select
              {...field}
              labelId="prodWebHome"
              id="demo-simple-select"
              label={t('currency')}
            >
              {
                dCurrency.map(r => (
                  <MenuItem value={r.id} key={r.id}>{r.curName}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
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
            disabled
            required
            id="company"
            variant="outlined"
            value={companyName}
          />
        )}
      />

      <Controller
        name="Warehouse"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={dWarehouse}
            getOptionLabel={(option) => option.whName}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("Warehouse", data?.id || null)
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
        name="User"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.name}
            disabled
            required
            helperText={errors?.name?.message}
            label={t('assigned_user')}
            id="employee"
            variant="outlined"
            value={user.employees.empFirstName}
          />
        )}
      />

      <Controller
        name="Supplier"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={dSupplier}
            getOptionLabel={(option) => option.suppCompanyName}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("Supplier", data?.id || null)
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
        name="puorStartDate"
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
        name="puorEndDate"
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