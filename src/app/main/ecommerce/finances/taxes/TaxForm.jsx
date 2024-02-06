import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import TaxInterface from 'src/app/interfaces/TaxInterface'
import { useDispatch } from 'react-redux'
import { getMaxId, postTax, putTax } from '../store/taxSlice'

function TaxForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(TaxInterface)
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
    if(!form.taxName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postTax({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putTax(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(TaxInterface)
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
      setForm(TaxInterface)
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
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          name='taxName'
          value={form.taxName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Abreviación"
          type="text"
          fullWidth
          variant="standard"
          name='taxAbbreviation'
          value={form.taxAbbreviation}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Valor"
          type="text"
          fullWidth
          variant="standard"
          name='taxValue'
          value={form.taxValue}
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

export default TaxForm