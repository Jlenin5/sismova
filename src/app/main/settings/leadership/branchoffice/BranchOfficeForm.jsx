import { useTranslation } from 'react-i18next'
import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import BranchOfficeInterface from 'src/app/interfaces/BranchOfficeInterface'
import { useDispatch } from 'react-redux'
import { deleteBranchoffice, getMaxId, postBranchoffice, putBranchoffice } from '../store/branchofficeSlice'
import { getUsers } from 'src/app/main/human-resources/personal/store/userSlice'
import axios from 'axios'

const url = 'https://sismova.tech/backsis/public/api/';

const BranchOfficeForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(BranchOfficeInterface)
  const [maxId, setMaxId] = useState(null)
  const [user, setUser] = useState([])
  const [dep, setDep] = useState([]);
  const [prov, setProv] = useState([]);
  const [dist, setDist] = useState([]);
  const [filteredProv, setFilteredProv] = useState([]);
  const [filteredDist, setFilteredDist] = useState([]);
  const { t } = useTranslation()

  const getDepartments = async () => {
    const response = await axios.get(url + 'dep');
    setDep(response.data);
  };

  const getProvinces = async () => {
    const response = await axios.get(url + 'prov');
    setProv(response.data);
  };

  const getDistricts = async () => {
    const response = await axios.get(url + 'dis');
    setDist(response.data);
  };

  const filterProv = (event, value) => {
    if(value !== null) {
      const filteredProvinces = value ? prov.filter((r) => r.Department === value.id) : [];
      setFilteredProv(filteredProvinces);
      setFilteredDist([]);
    } else {
      setFilteredProv([]);
      setFilteredDist([]);
    }
  }

  const filterDist = (event, value) => {
    if(value !== null) {
      const filteredDistricts = dist.filter((r) => r.Province === value.id);
      setFilteredDist(filteredDistricts);
    } else {
      setFilteredDist([]);
    }
  };
  
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
    if(!form.boName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postBranchoffice({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putBranchoffice(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(BranchOfficeInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteBranchoffice(id))
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
        await dispatch(getUsers()).then(response => setUser(response.payload))
      } catch (error) {
        console.error('Error al obtener el maxId', error);
      }
    }
    if (open) {
      fetchData();
    }
    // dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    // dispatch(getUsers()).then(response => setUser(response.payload))
    getProvinces();
    getDepartments();
    getDistricts();
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(BranchOfficeInterface)
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
          name='boName'
          value={form.boName}
          onChange={handleChange}
        />
        <TextField
          id="cell_phone"
          label={t('cell_phone')}
          fullWidth
          variant="outlined"
          name='boPhone'
          value={form.boPhone}
          onChange={handleChange}
        />
        <TextField
          id="e_mail"
          label={t('e_mail')}
          fullWidth
          variant="outlined"
          name='boEmail'
          value={form.boEmail}
          onChange={handleChange}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-department"
          options={dep}
          getOptionLabel={(option) => option.depName}
          onChange={(_, data) => {
            setForm({ ...form, Department: data ? data.id : 0 })
            filterProv(_, data)
            return data
          }}
          name="Department"
          value={dep.find((option) => option.id === form.Department) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_department')} />
          )}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-province"
          options={filteredProv}
          getOptionLabel={(option) => option.provName}
          onChange={(_, data) => {
            setForm({ ...form, Province: data ? data.id : 0 })
            filterDist(_, data)
            return data
          }}
          name="Province"
          value={prov.find((option) => option.id === form.Province) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_province')} />
          )}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-district"
          options={filteredDist}
          getOptionLabel={(option) => option.disName}
          onChange={(_, data) => {
            setForm({ ...form, District: data ? data.id : 0 })
            return data
          }}
          name="District"
          value={dist.find((option) => option.id === form.District) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('choose_district')} />
          )}
        />
        <TextField
          id="address"
          label={t('address')}
          fullWidth
          variant="outlined"
          name='boAddress'
          value={form.boAddress}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="User">{t('responsible')}</InputLabel>
          <Select
            labelId="User"
            id="demo-simple-select"
            label={t('responsible')}
            value={form.User}
            name="User"
            onChange={handleChange}
          >
            {
              user.map(r => <MenuItem value={r.id} key={r.id}>{r.employees.empFirstName}</MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="boState">{t('state')}</InputLabel>
          <Select
            labelId="boState"
            id="demo-simple-select"
            label={t('state')}
            value={form.boState}
            name="boState"
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

export default BranchOfficeForm