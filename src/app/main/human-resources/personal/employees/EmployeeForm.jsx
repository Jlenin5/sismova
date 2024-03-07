import { useTranslation } from 'react-i18next'
import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import EmployeeInterface from 'src/app/interfaces/EmployeeInterface'
import { useDispatch } from 'react-redux'
import { deleteEmployee, getMaxId, postEmployee, putEmployee } from '../store/employeeSlice'
import { getDocuments } from 'src/app/main/settings/controls/store/documentSlice'

function EmployeeForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(EmployeeInterface)
  const [maxId, setMaxId] = useState(null)
  const [doc, setDoc] = useState([])
  const { t } = useTranslation()
  
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
    if(!form.empFirstName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postEmployee({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putEmployee(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(EmployeeInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteEmployee(id))
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  useEffect(() => {
    dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    dispatch(getDocuments()).then(response => setDoc(response.payload))
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(EmployeeInterface)
    }
  }, [dispatch, dataToEdit])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-category'
    >
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12'>
        <TextField
          autoFocus
          id="name"
          label={t('names')}
          type="text"
          variant="outlined"
          name='empFirstName'
          value={form.empFirstName}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('surnames')}
          type="text"
          variant="outlined"
          name='empSecondName'
          value={form.empSecondName}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="DocumentType">{t('document_type')}</InputLabel>
          <Select
            labelId="DocumentType"
            id="demo-simple-select"
            label={t('document_type')}
            value={form.DocumentType}
            name="DocumentType"
            onChange={handleChange}
          >
            {
              doc.map(r => <MenuItem value={r.id} key={r.id}>{r.doctAbbreviation}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          id="name"
          label={t('document_number')}
          type="text"
          variant="outlined"
          name='empDocument'
          value={form.empDocument}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('e_mail')}
          type="text"
          variant="outlined"
          name='empEmail'
          value={form.empEmail}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('cell_phone')}
          type="text"
          variant="outlined"
          name='empPhone'
          value={form.empPhone}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="empGender">{t('sex')}</InputLabel>
          <Select
            labelId="empGender"
            id="demo-simple-select"
            label={t('sex')}
            value={form.empGender}
            name="empGender"
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('male')}</MenuItem>
            <MenuItem value={1}>{t('female')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="empState">{t('state')}</InputLabel>
          <Select
            labelId="empState"
            id="demo-simple-select"
            label={t('state')}
            value={form.empState}
            name="empState"
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('inactive')}</MenuItem>
            <MenuItem value={1}>{t('active')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>{t('delete')}</Button> : <Button onClick={()=>handleClose(0)}>{t('cancel')}</Button>}
        <Button onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeForm