import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteJobPosition, postJobPosition, putJobPosition, getMaxId } from '../store/jpSlice'
import JPInterface from 'src/app/interfaces/JPInterface'

const JPForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(JPInterface)
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
    if(!form.jpName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postJobPosition({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putJobPosition(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(JPInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteJobPosition(id))
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
      setForm(JPInterface)
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
          label="Nombre de la posición laboral"
          type="text"
          fullWidth
          variant="standard"
          name='jpName'
          value={form.jpName}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox" 
            name='jpState'
            value={form.jpState}
            checked={form.jpState}
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

export default JPForm