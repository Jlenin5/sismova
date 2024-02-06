import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import PermissionInterface from 'src/app/interfaces/PermissionInterface'
import { useDispatch } from 'react-redux'
import { deletePermission, getMaxId, postPermission, putPermission } from '../store/permissionSlice'

const RolForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(PermissionInterface)
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
    if(!form.Rol) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postPermission({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putPermission(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(PermissionInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deletePermission(id))
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
      setForm(PermissionInterface)
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
          label="Rol"
          type="text"
          fullWidth
          variant="standard"
          name='Rol'
          value={form.Rol}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Nombre del menú"
          type="text"
          fullWidth
          variant="standard"
          name='NamesMenu'
          value={form.NamesMenu}
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

export default RolForm