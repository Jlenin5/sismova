import { useTranslation } from 'react-i18next'
// import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import UnitInterface from 'src/app/interfaces/UnitInterface'
import { useDispatch } from 'react-redux'
import { deleteUnit, getMaxId, postUnit, putUnit } from '../store/unitSlice'
import axios from 'axios'

const url = 'http://127.0.0.1:8000/api/'

const UnitForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(UnitInterface)
  const [maxId, setMaxId] = useState(null)
  const [dep, setDep] = useState([])
  const [prov, setProv] = useState([])
  const [dist, setDist] = useState([])
  const { t } = useTranslation()

  const getDepartments = async () => {
    const response = await axios.get(url + 'departments')
    setDep(response.data)
  }

  const getProvinces = async (department) => {
    if(department) {
      const response = await axios.get(url + 'provinces/' + department)
      setProv(response.data)
    }
  }

  const getDistricts = async (province) => {
    if(province) {
      const response = await axios.get(url + 'districts/' + province)
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
      dispatch(postUnit({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putUnit(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(UnitInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteUnit(id))
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
      setForm(UnitInterface)
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
          id="short_name"
          label={t('short_name')}
          fullWidth
          variant="outlined"
          name='short_name'
          value={form.short_name}
          onChange={handleChange}
        />
        <TextField
          id="base_unit"
          label={t('base_unit')}
          fullWidth
          variant="outlined"
          name='base_unit'
          value={form.base_unit}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="operator">{t('operator')}</InputLabel>
          <Select
            labelId="operator"
            id="demo-simple-select"
            label={t('operator')}
            value={form.operator}
            name="operator"
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('addition')}</MenuItem>
            <MenuItem value={1}>{t('subtraction')}</MenuItem>
            <MenuItem value={2}>{t('multiplication')}</MenuItem>
            <MenuItem value={3}>{t('division')}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="operator_value"
          label={t('operator_value')}
          fullWidth
          variant="outlined"
          name='operator_value'
          value={form.operator_value}
          onChange={handleChange}
        />
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

export default UnitForm