import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import CarrierInterface from 'src/app/interfaces/CarrierInterface'
import { deleteCarrier, getMaxId, postCarrier, putCarrier } from '../store/carrierSlice'
import { useDispatch } from 'react-redux'

const CoinForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(CarrierInterface)
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
    if(!form.carrName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postCarrier({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putCarrier(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(CarrierInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteCarrier(id))
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
      setForm(CarrierInterface)
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
          label="Nombre del conductos"
          type="text"
          fullWidth
          variant="standard"
          name='carrName'
          value={form.carrName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Celular"
          type="text"
          fullWidth
          variant="standard"
          name='carrPhone'
          value={form.carrPhone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Sexo"
          type="text"
          fullWidth
          variant="standard"
          name='carrGender'
          value={form.carrGender}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Licencia de conducir"
          type="text"
          fullWidth
          variant="standard"
          name='carrDLicence'
          value={form.carrDLicence}
          onChange={handleChange}
        />
        Estado:
        <label className="switch">
          <input
            type="checkbox" 
            name='carrState'
            value={form.carrState}
            checked={form.carrState}
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

export default CoinForm