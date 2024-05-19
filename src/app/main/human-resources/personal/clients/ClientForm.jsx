import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import ClientInterface from 'src/app/interfaces/ClientInterface'
import { useDispatch } from 'react-redux'
import { deleteClient, getMaxId, postClient, putClient } from '../store/clientSlice'

function ClientForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(ClientInterface)
  const [maxId, setMaxId] = useState(null)
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
    if(!form.name) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postClient({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putClient(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(ClientInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteClient(id))
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
      setForm(ClientInterface)
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
          label="Nombres"
          type="text"
          variant="outlined"
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="document_type">Estado</InputLabel>
          <Select
            labelId="document_type"
            id="demo-simple-select"
            label="Estado"
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
          id="name"
          label="N° de documento"
          type="text"
          variant="outlined"
          name='document_number'
          value={form.document_number}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="Correo electrónico"
          type="text"
          variant="outlined"
          name='email'
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="N° de celular"
          type="text"
          variant="outlined"
          name='phone'
          value={form.phone}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="gender">Sexo</InputLabel>
          <Select
            labelId="gender"
            id="demo-simple-select"
            label="Sexo"
            value={form.gender}
            name="gender"
            onChange={handleChange}
          >
            <MenuItem value={0}>Hombre</MenuItem>
            <MenuItem value={1}>Mujer</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status">Estado</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            label="Estado"
            value={form.status}
            name="status"
            onChange={handleChange}
          >
            <MenuItem value={0}>Inactivo</MenuItem>
            <MenuItem value={1}>Activo</MenuItem>
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

export default ClientForm