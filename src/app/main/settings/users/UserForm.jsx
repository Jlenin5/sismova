import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

const initialForm = {
  cateId: null,
  cateName: '',
  cateState: true
}

const UserForm = ({maxId,onClose, open,createData,updateData,dataToEdit,setDataToEdit,deleteData}) => {

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
    if(!form.cateName) {
      alert("Datos incompletos")
      return
    }
    if(form.cateId===null) {
      createData({
        ...form,
        cateId: maxId+1
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
    if(id===form.cateId) {
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
          label="Nombre de la categoría"
          type="text"
          fullWidth
          variant="standard"
          name='cateName'
          value={form.cateName}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox" 
            name='cateState'
            value={form.cateState}
            checked={form.cateState}
            onChange={handleChange}
          />
          <span className="slider"></span>
        </label>
      </DialogContent>
      <DialogActions>
        {form.cateId!==null ? <Button onClick={() => handleClose(dataToEdit.cateId)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserForm