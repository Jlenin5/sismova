import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import WarehouseInterface from 'src/app/interfaces/WarehouseInterface'
import { useDispatch } from 'react-redux'
import { deleteWarehouse, postWarehouse, putWarehouse } from '../store/warehouseSlice'
import { getEmployees } from 'src/app/main/human-resources/personal/store/employeesSlice'
import { getCompanies } from '../store/companiesSlice'
import axios from 'axios'
import { API_URL } from 'src/app/services/url'
import { getBranchoffices } from '../store/branchofficeSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

function WarehouseForm(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(WarehouseInterface)
  const [employee, setEmployee] = useState([])
  const [companies, setCompanies] = useState([])
  const [branchOffices, setBranchOffices] = useState([])
  const [dep, setDep] = useState([])
  const [prov, setProv] = useState([])
  const [dist, setDist] = useState([])
  const { t } = useTranslation()

  const getDepartments = async () => {
    const response = await axios.get(API_URL + 'departments')
    setDep(response.data)
  }

  const getProvinces = async (department) => {
    if(department) {
      const response = await axios.get(API_URL + 'provinces/' + department)
      setProv(response.data)
    }
  }

  const getDistricts = async (province) => {
    if(province) {
      const response = await axios.get(API_URL + 'districts/' + province)
      setDist(response.data)
    }
  }
  
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({
      ...form,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!form.name) {
      alert("Datos incompletos")
      return
    }
    form.id ? dispatch(putWarehouse(form)) : dispatch(postWarehouse(form))
    props.onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(WarehouseInterface)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteWarehouse(id))
      handleReset()
      props.onClose()
    }
    handleReset()
    props.onClose()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCompanies()).then(r => setCompanies(r.payload.data))
        await dispatch(getBranchoffices()).then(r => setBranchOffices(r.payload.data))
        await dispatch(getEmployees()).then(response => setEmployee(response.payload.data))
      } catch (error) {
        console.error('Error al obtener el maxId', error)
      }
    }
    if (open) {
      fetchData()
    }
    getDepartments()
    if(props.dataToEdit) {
      getProvinces(props.dataToEdit.department_id)
      getDistricts(props.dataToEdit.province_id)
      setForm(props.dataToEdit)
    } else {
      setForm(WarehouseInterface)
    }
  }, [dispatch, props.dataToEdit, open])

  return (
    <Dialog open={props.open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{!form.id ? t('register_warehouse') : t('update_warehouse')}</div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32' dividers>
        <TextField
          autoFocus
          id="name"
          label={t('name')}
          fullWidth
          variant="outlined"
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label={t('cell_phone')}
          fullWidth
          variant="outlined"
          name='phone'
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          id="mail"
          label={t('e_mail')}
          fullWidth
          variant="outlined"
          name='email'
          value={form.email}
          onChange={handleChange}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-department"
          options={companies}
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => {
            setForm({ ...form, company_id: data ? data.id : 0 })
            return data
          }}
          name="company_id"
          value={companies.find((option) => option.id === form.company_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_company')} />
          )}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-department"
          options={branchOffices}
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => {
            setForm({ ...form, branch_office_id: data ? data.id : 0 })
            getProvinces(data?.id)
            return data
          }}
          name="branch_office_id"
          value={branchOffices.find((option) => option.id === form.branch_office_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_branch_office')} />
          )}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-department"
          options={dep}
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => {
            setForm({ ...form, department_id: data ? data.id : 0 })
            getProvinces(data?.id)
            return data
          }}
          name="department_id"
          value={dep.find((option) => option.id === form.department_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_department')} />
          )}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-province"
          options={prov}
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => {
            setForm({ ...form, province_id: data ? data.id : 0 })
            getDistricts(data?.id)
            return data
          }}
          name="province_id"
          value={prov.find((option) => option.id === form.province_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_province')} />
          )}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-district"
          options={dist}
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => {
            setForm({ ...form, district_id: data ? data.id : 0 })
            return data
          }}
          name="district_id"
          value={dist.find((option) => option.id === form.district_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_district')} />
          )}
        />
        <TextField
          id="address"
          label={t('address')}
          fullWidth
          variant="outlined"
          name='address'
          value={form.address}
          onChange={handleChange}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-employee"
          options={employee}
          getOptionLabel={(option) => option.first_name}
          onChange={(_, data) => {
            setForm({ ...form, employee_id: data ? data.id : 0 })
            return data
          }}
          name="employee_id"
          value={employee.find((option) => option.id === form.employee_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('responsible')} />
          )}
        />
        <FormControl fullWidth>
          <InputLabel id="status">{t('status')}</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            label={t('status')}
            value={form.status}
            name="status"
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('inactive')}</MenuItem>
            <MenuItem value={1}>{t('active')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="mb-20 mr-20">
        {form.id ? <Button variant="contained" color="error" onClick={() => handleClose(props.dataToEdit.id)}>{t('delete')}</Button> : <></>}
        <Button variant="contained" color="success" onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WarehouseForm