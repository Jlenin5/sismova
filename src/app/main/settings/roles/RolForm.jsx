import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

const initialForm = {
  rolId: null,
  rolName: ''
}

const RolForm = ({maxId,onClose, open,createData,updateData,dataToEdit,setDataToEdit,deleteData}) => {

  const [form, setForm] = useState(initialForm)
  
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
    if(!form.rolName) {
      alert("Datos incompletos")
      return
    }
    if(form.rolId===null) {
      createData({
        ...form,
        rolId: maxId+1
      })
    } else {
      updateData(form)
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(initialForm)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.rolId) {
      deleteData(id)
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  useEffect(() => {
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit])

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
          label="Nombre del rol"
          type="text"
          fullWidth
          variant="standard"
          name='rolName'
          value={form.rolName}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        {form.rolId!==null ? <Button onClick={() => handleClose(dataToEdit.rolId)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RolForm