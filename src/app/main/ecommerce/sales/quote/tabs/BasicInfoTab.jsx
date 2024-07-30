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
import { getCompanies } from 'src/app/main/settings/leadership/store/companiesSlice'
import { getBranchoffices } from 'src/app/main/settings/leadership/store/branchofficeSlice'
import { getSeries } from 'src/app/main/settings/controls/store/serieSlice'
import { getMaxId } from '../../store/quoteSlice'

const BasicInfoTab = () => {
  const dispatch = useDispatch()
  const [maxId, setMaxId] = useState(null)
  const user = useSelector(selectUser)
  const [dClient, setDClient] = useState([])
  const [dCurrency, setDCurrency] = useState([])
  const [dCompany, setDCompany] = useState([])
  const [dBO, setDBO] = useState([])
  const [dSerie, setDSerie] = useState([])
  const methods = useFormContext()
  const { control, formState, watch, setValue } = methods
  const { errors } = formState
  const qtNumber = watch('qtNumber')
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getCustomers()).then((r) => setDClient(r.payload))
    dispatch(getCurrencies()).then(r => setDCurrency(r.payload))
    dispatch(getCompanies()).then(r => setDCompany(r.payload))
    dispatch(getBranchoffices()).then(r => setDBO(r.payload))
    dispatch(getSeries()).then(r => setDSerie(r.payload))
    dispatch(getMaxId()).then(r => setMaxId(r.payload.ultimo_id))
  }, [dispatch])

  useEffect(() => {
    if (maxId !== null) {
      var addQtNumber = 0
      if (qtNumber === '00000') {
        addQtNumber = (Number(maxId) + 1).toString().padStart(5, '0')
      } else {
        addQtNumber = qtNumber
      }
      setValue('qtNumber', addQtNumber)
    }  
  }, [qtNumber, maxId, setValue])

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
            value={qtNumber}
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
        name="BranchOffice"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={dBO}
            getOptionLabel={(option) => option.boName}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("BranchOffice", data?.id || null)
              return data
            }}
            value={dBO.find((option) => option.id === value) || null}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label={t('branch_office')}
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
        name="Client"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={dClient}
            getOptionLabel={(option) => option.cliFirstName}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("Client", data?.id || null)
              return data
            }}
            value={dClient.find((option) => option.id === value) || null}
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
        name="qtStartDate"
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
        name="qtEndDate"
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