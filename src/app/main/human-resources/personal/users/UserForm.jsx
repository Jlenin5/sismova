import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import UserInterface from 'src/app/interfaces/UserInterface'
import { useDispatch } from 'react-redux'
import { getMaxId, postUser, putUser } from '../store/userSlice'

function UserForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(UserInterface)
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
    if(!form.Employee) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postUser({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putUser(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(UserInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      deleteData(id)
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
      setForm(UserInterface)
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
          label="Persona"
          type="text"
          fullWidth
          variant="standard"
          name='Employee'
          value={form.Employee}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Imágen"
          type="text"
          fullWidth
          variant="standard"
          name='Avatar'
          value={form.Avatar}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Área de trabajo"
          type="text"
          fullWidth
          variant="standard"
          name='WorkArea'
          value={form.WorkArea}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Posición laboral"
          type="text"
          fullWidth
          variant="standard"
          name='JobPosition'
          value={form.JobPosition}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre de usuario"
          type="text"
          fullWidth
          variant="standard"
          name='userDisplayName'
          value={form.userDisplayName}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Rol"
          type="text"
          fullWidth
          variant="standard"
          name='Rol'
          value={form.Rol}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Contraseña"
          type="text"
          fullWidth
          variant="standard"
          name='userPassword'
          value={form.userPassword}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserForm