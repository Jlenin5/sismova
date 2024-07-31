import { useTranslation } from 'react-i18next'
import { utcToZonedTime } from 'date-fns-tz'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getSuppliers } from 'src/app/main/human-resources/personal/store/supplierSlice'
import { getCompanies } from 'src/app/main/settings/leadership/store/companiesSlice'
import { getWarehouses } from 'src/app/main/settings/leadership/store/warehouseSlice'
import { getBranchoffices } from 'src/app/main/settings/leadership/store/branchofficeSlice'
import { getCurrencies } from '../../../finances/store/currenciesSlice'

function BasicInfoTab() {
  const dispatch = useDispatch()
  const [dSupplier, setDSupplier] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [companies, setCompanies] = useState([])
  const [inputBranchOffice, setInputBranchOffice] = useState('')
  const [branchOffices, setBranchOffices] = useState([])
  const [disableBranchOffice, setDisableBranchOffice] = useState(true)
  const [inputWarehouse, setInputWarehouse] = useState('')
  const [warehouses, setWarehouse] = useState([])
  const [disableWarehouse, setDisableWarehouse] = useState(true)
  const methods = useFormContext()
  const { control, formState } = methods
  const routeParams = useParams()
  const { id } = routeParams
  const { errors } = formState
  const { t } = useTranslation()

  const CompanySelected = (id) => {
    if(id && (typeof id) == 'number') {
      dispatch(getBranchoffices({ filters: `company_id=${id}` })).then(r => setBranchOffices(r.payload.data))
      setDisableBranchOffice(false)
    } else {
      setDisableBranchOffice(true)
      setDisableWarehouse(true)
      setInputBranchOffice('')
      setInputWarehouse('')
    }
  }
  
  const BranchOfficeSelected = async (id) => {
    if(id && (typeof id) == 'number') {
      dispatch(getWarehouses({ filters: `branch_office_id=${id}` })).then(r => setWarehouse(r.payload.data))
      setDisableWarehouse(false)
    } else {
      setDisableWarehouse(true)
      setInputWarehouse('')
    }
  }
  
  useEffect(() => {
    dispatch(getCurrencies()).then(r => setCurrencies(r.payload.data))
    dispatch(getBranchoffices()).then(r => setBranchOffices(r.payload.data))
    dispatch(getWarehouses()).then(r => setWarehouse(r.payload.data))
    dispatch(getCompanies()).then(r => setCompanies(r.payload.data))
    dispatch(getSuppliers()).then((r) => setDSupplier(r.payload.data))
  }, [dispatch])

  return (
    <div className="flex flex-wrap md:grid md:grid-flow-row-dense grid-cols-2 md:grid-cols-3 gap-32 -mx-4 max-w-4xl">

      <Controller
        name="company_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={companies}
            getOptionLabel={(option) => option.name}
            onInputChange={(event, newInputValue) => CompanySelected(newInputValue)}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("company_id", data?.id || 0)
              CompanySelected(data?.id)
              return data
            }}
            value={companies.find((option) => option.id === value) || null}
            renderInput={(params) => (
              <TextField
                required
                autoFocus
                {...params}
                label={t('select_company')}
              />
            )}
            fullWidth
          />
        )}
      />

      <Controller
        name="branch_office_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            disabled={id !== 'new' ? false : disableBranchOffice}
            id="tags-outlined"
            options={branchOffices}
            getOptionLabel={(option) => option.name}
            onInputChange={(event, newInputValue) => {
              BranchOfficeSelected(newInputValue)
              setInputBranchOffice(newInputValue)
            }}
            inputValue={id!=='new' ? (branchOffices.find((option) => option.id === value)?.name || '') : inputBranchOffice}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("branch_office_id", data?.id || null)
              BranchOfficeSelected(data.id)
              return data
            }}
            value={branchOffices.find((option) => option.id === value) || null}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label={t('select_branch_office')}
              />
            )}
            fullWidth
          />
        )}
      />

      <Controller
        name="warehouse_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            disabled={id !== 'new' ? false : disableWarehouse}
            id="tags-outlined"
            options={warehouses}
            getOptionLabel={(option) => option.name}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("warehouse_id", data?.id || null)
              return data
            }}
            onInputChange={(event, newInputValue) => setInputWarehouse(newInputValue)}
            inputValue={id!=='new' ? (warehouses.find((option) => option.id === value)?.name || '') : inputWarehouse}
            value={warehouses.find((option) => option.id === value) || null}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label={t('select_warehouse')}
              />
            )}
            fullWidth
          />
        )}
      />

      <Controller
        name="supplier_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={dSupplier}
            getOptionLabel={(option) => option.document + ' - ' + option.name}
            onChange={(_, data) => {
              onChange(data)
              methods.setValue("supplier_id", data?.id || null)
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
        name="supplier_document"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('supplier_document')}
            required
            id="supplier_document"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="supplier_document_date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            value={value ? new Date(value) : null}
            onChange={onChange}
            format="dd/MM/yyyy"
            slotProps={{
              textField: {
                label: t('supplier_document_date'),
                required: true,
                variant: 'outlined',
              },
            }}
            fullWidth
            className="w-full"
          />
        )}
      />

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
        name="exchange_rate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('exchange_rate')}
            id="exchange_rate"
            variant="outlined"
            fullWidth
          />
        )}
      />

    </div>
  )
}

export default BasicInfoTab