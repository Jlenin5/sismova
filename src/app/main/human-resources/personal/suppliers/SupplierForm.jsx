import { useTranslation } from 'react-i18next'
import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import SupplierInterface from 'src/app/interfaces/SupplierInterface'
import { useDispatch } from 'react-redux'
import { deleteSupplier, getMaxId, postSupplier, putSupplier } from '../store/supplierSlice'
import { getDocuments } from 'src/app/main/settings/controls/store/documentSlice'

function SupplierForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(SupplierInterface)
  const [maxId, setMaxId] = useState(null)
  const { t } = useTranslation()
  
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
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
      dispatch(postSupplier({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putSupplier(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(SupplierInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteSupplier(id))
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  useEffect(() => {
    dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(SupplierInterface)
    }
  }, [dispatch, dataToEdit])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-category'
    >
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12'>
        <FormControl fullWidth>
          <InputLabel id="document_type">{t('document')}</InputLabel>
          <Select
            labelId="document_type"
            id="demo-simple-select"
            label={t('document')}
            value={form.document_type}
            name="document_type"
            onChange={handleChange}
          >
            <MenuItem value={1}>{t('dni')}</MenuItem>
            <MenuItem value={2}>{t('ruc')}</MenuItem>
            <MenuItem value={3}>{t('ce')}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          id="document_number"
          label={t('n_document')}
          type="text"
          variant="outlined"
          name='document_number'
          value={form.document_number}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('names')}
          type="text"
          variant="outlined"
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          id="email"
          label={t('e_mail')}
          type="text"
          variant="outlined"
          name='email'
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          id="address"
          label={t('address')}
          type="text"
          variant="outlined"
          name='address'
          value={form.address}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label={t('cell_phone')}
          type="text"
          variant="outlined"
          name='phone'
          value={form.phone}
          onChange={handleChange}
        />
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
            <MenuItem value={1}>{t('active')}</MenuItem>
            <MenuItem value={0}>{t('inactive')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SupplierForm