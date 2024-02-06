import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import MobilityInterface from 'src/app/interfaces/MobilityInterface'
import { deleteMobility, getMaxId, postMobility, putMobility } from '../store/mobilitySlice'
import { useDispatch } from 'react-redux'

const MobilityForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(MobilityInterface)
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
    if(!form.mobBrand) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postMobility({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putMobility(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(MobilityInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteMobility(id))
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
      setForm(MobilityInterface)
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
          label="Marca"
          type="text"
          fullWidth
          variant="standard"
          name='mobBrand'
          value={form.mobBrand}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Placa"
          type="text"
          fullWidth
          variant="standard"
          name='mobPlate'
          value={form.mobPlate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Color"
          type="text"
          fullWidth
          variant="standard"
          name='mobColor'
          value={form.mobColor}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox" 
            name='mobState'
            value={form.mobState}
            checked={form.mobState}
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

export default MobilityForm