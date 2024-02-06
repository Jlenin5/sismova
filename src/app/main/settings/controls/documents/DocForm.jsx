import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import DocumentTypeInterface from 'src/app/interfaces/DocumentTypeInterface'
import { deleteDocument, getMaxId, postDocument, putDocument } from '../store/documentSlice'
import { useDispatch } from 'react-redux'

const DocForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(DocumentTypeInterface)
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
    if(!form.doctAbbreviation) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postDocument({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putDocument(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(DocumentTypeInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteDocument(id))
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
      setForm(DocumentTypeInterface)
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
          margin="dense"
          id="name"
          label="Nombre del documento"
          type="text"
          fullWidth
          variant="standard"
          name='doctName'
          value={form.doctName}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Abreviación"
          type="text"
          fullWidth
          variant="standard"
          name='doctAbbreviation'
          value={form.doctAbbreviation}
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

export default DocForm