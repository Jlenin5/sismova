import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import BranchOfficeInterface from 'src/app/interfaces/BranchOfficeInterface'
import { useDispatch } from 'react-redux'
import { deleteBranchoffice, getMaxId, postBranchoffice, putBranchoffice } from '../store/branchofficeSlice'

const BranchOfficeForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(BranchOfficeInterface)
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
    dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(BranchOfficeInterface)
    }
  }, [dispatch, dataToEdit])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-bogory'
    >
      <DialogTitle>Formulario</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre de la sucursal"
          type="text"
          fullWidth
          variant="standard"
          name='boName'
          value={form.boName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Celular"
          type="text"
          fullWidth
          variant="standard"
          name='boPhone'
          value={form.boPhone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Correo electrónico"
          type="text"
          fullWidth
          variant="standard"
          name='boEmail'
          value={form.boEmail}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Distrito"
          type="text"
          fullWidth
          variant="standard"
          name='District'
          value={form.District}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Dirección"
          type="text"
          fullWidth
          variant="standard"
          name='boAddress'
          value={form.boAddress}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Encargado"
          type="text"
          fullWidth
          variant="standard"
          name='User'
          value={form.User}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox" 
            name='boState'
            value={form.boState}
            checked={form.boState}
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

export default BranchOfficeForm