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
          label="Nombres"
          type="text"
          variant="outlined"
          name='empFirstName'
          value={form.empFirstName}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="Apellidos"
          type="text"
          variant="outlined"
          name='empSecondName'
          value={form.empSecondName}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="DocumentType">Tipo de Documento</InputLabel>
          <Select
            labelId="DocumentType"
            id="demo-simple-select"
            label="Tipo de Documento"
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
          label="N° de documento"
          type="text"
          variant="outlined"
          name='empDocument'
          value={form.empDocument}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="Correo electrónico"
          type="text"
          variant="outlined"
          name='empEmail'
          value={form.empEmail}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="N° de celular"
          type="text"
          variant="outlined"
          name='empPhone'
          value={form.empPhone}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="empGender">Sexo</InputLabel>
          <Select
            labelId="empGender"
            id="demo-simple-select"
            label="Sexo"
            value={form.empGender}
            name="empGender"
            onChange={handleChange}
          >
            <MenuItem value={0}>Hombre</MenuItem>
            <MenuItem value={1}>Mujer</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="empState">Estado</InputLabel>
          <Select
            labelId="empState"
            id="demo-simple-select"
            label="Estado"
            value={form.empState}
            name="empState"
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

export default EmployeeForm