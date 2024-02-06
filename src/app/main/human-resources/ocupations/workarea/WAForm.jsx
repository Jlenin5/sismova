import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import WAInterface from 'src/app/interfaces/WAInterface'
import { deleteWorkArea, getMaxId, postWorkArea, putWorkArea } from '../store/waSlice'
import { useDispatch } from 'react-redux'

const WAForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(WAInterface)
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
    if(!form.waName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postWorkArea({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putWorkArea(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(WAInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteWorkArea(id))
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
      setForm(WAInterface)
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
          label="Nombre del área de trabajo"
          type="text"
          fullWidth
          variant="standard"
          name='waName'
          value={form.waName}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox" 
            name='waState'
            value={form.waState}
            checked={form.waState}
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

export default WAForm