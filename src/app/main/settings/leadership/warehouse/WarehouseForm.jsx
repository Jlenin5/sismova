import { useTranslation } from 'react-i18next'
// import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import WarehouseInterface from 'src/app/interfaces/WarehouseInterface'
import { useDispatch } from 'react-redux'
import { deleteWarehouse, getMaxId, postWarehouse, putWarehouse } from '../store/warehouseSlice'
import { getEmployees } from 'src/app/main/human-resources/personal/store/employeesSlice'
import axios from 'axios'
import { API_URL } from 'src/app/services/url'
import { getBranchoffices } from '../store/branchofficeSlice'

const WarehouseForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(WarehouseInterface)
  const [maxId, setMaxId] = useState(null)
  const [employee, setEmployee] = useState([])
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
    if(form.id===null) {
      dispatch(postWarehouse({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putWarehouse(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(WarehouseInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteWarehouse(id))
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
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
    if(dataToEdit) {
      getProvinces(dataToEdit.department_id)
      getDistricts(dataToEdit.province_id)
      setForm(dataToEdit)
    } else {
      setForm(WarehouseInterface)
    }
  }, [dispatch, dataToEdit, open])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-bogory'
    >
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12'>
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
            <TextField {...params} label={t('choose_warehouse')} />
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
        <FormControl fullWidth>
          <InputLabel id="employee_id">{t('responsible')}</InputLabel>
          <Select
            labelId="employee_id"
            id="demo-simple-select"
            label={t('responsible')}
            value={form.employee_id}
            name="employee_id"
            onChange={handleChange}
          >
            {
              employee.map(r => <MenuItem value={r.id} key={r.id}>{r.first_name}</MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status">{t('state')}</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            label={t('state')}
            value={form.status}
            name="status"
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('inactive')}</MenuItem>
            <MenuItem value={1}>{t('active')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {form.id!==null ?
        <Button onClick={() => handleClose(dataToEdit.id)}>{t('delete')}</Button>
        :
        <Button onClick={()=>handleClose(0)}>{t('cancel')}</Button>}
        <Button onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WarehouseForm