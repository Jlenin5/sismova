import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import EmployeeInterface from 'src/app/interfaces/EmployeeInterface'
import { useDispatch } from 'react-redux'
import { deleteEmployee, getMaxId, postEmployee, putEmployee } from '../store/employeeSlice'

function EmployeeForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(EmployeeInterface)
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
          name='empFirstName'
          value={form.empFirstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Apellidos"
          type="text"
          fullWidth
          variant="standard"
          name='empSecondName'
          value={form.empSecondName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Tipo de documento"
          fullWidth
          variant="standard"
          name='DocumentType'
          value={form.DocumentType}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="N° de documento"
          type="text"
          fullWidth
          variant="standard"
          name='empDocument'
          value={form.empDocument}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Correo electrónico"
          type="text"
          fullWidth
          variant="standard"
          name='empEmail'
          value={form.empEmail}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="N° de celular"
          type="text"
          fullWidth
          variant="standard"
          name='empPhone'
          value={form.empPhone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Sexo"
          fullWidth
          variant="standard"
          name='empGender'
          value={form.empGender}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox"
            name='empState'
            value={form.empState}
            checked={form.empState}
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

export default EmployeeForm