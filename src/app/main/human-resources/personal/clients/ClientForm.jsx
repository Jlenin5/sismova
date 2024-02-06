import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import ClientInterface from 'src/app/interfaces/ClientInterface'
import { useDispatch } from 'react-redux'
import { deleteClient, getMaxId, postClient, putClient } from '../store/clientSlice'

function ClientForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(ClientInterface)
  const [maxId, setMaxId] = useState(null)
  
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
    if(!form.cliFirstName) {
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
      <DialogTitle>Formulario</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombres"
          type="text"
          fullWidth
          variant="standard"
          name='cliFirstName'
          value={form.cliFirstName}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Apellidos"
          type="text"
          fullWidth
          variant="standard"
          name='cliSecondName'
          value={form.cliSecondName}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tipo de documento"
          type="text"
          fullWidth
          variant="standard"
          name='DocumentType'
          value={form.DocumentType}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="N° de documento"
          type="text"
          fullWidth
          variant="standard"
          name='cliDocument'
          value={form.cliDocument}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Correo electrónico"
          type="text"
          fullWidth
          variant="standard"
          name='cliEmail'
          value={form.cliEmail}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="N° de celular"
          type="text"
          fullWidth
          variant="standard"
          name='cliPhone'
          value={form.cliPhone}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Sexo"
          type="text"
          fullWidth
          variant="standard"
          name='cliGender'
          value={form.cliGender}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox" 
            name='cliState'
            value={form.cliState}
            checked={form.cliState}
            onChange={handleChange}
          />
          <span className="slider"></span>
        </label>
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClientForm