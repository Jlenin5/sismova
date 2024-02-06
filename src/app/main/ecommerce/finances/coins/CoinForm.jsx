import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import CurrencyInterface from 'src/app/interfaces/CurrencyInterface'
import { useDispatch } from 'react-redux'
import { deleteCoin, getMaxId, postCoin, putCoin } from '../store/coinSlice'

function CoinForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(CurrencyInterface)
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
    if(!form.curName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postCoin({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putCoin(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(CurrencyInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteCoin(id))
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
      setForm(CurrencyInterface)
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
          label="Nombre de la moneda"
          type="text"
          fullWidth
          variant="standard"
          name='curName'
          value={form.curName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Símbolo"
          type="text"
          fullWidth
          variant="standard"
          name='curSymbol'
          value={form.curSymbol}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Conversión a país"
          type="text"
          fullWidth
          variant="standard"
          name='curConvert'
          value={form.curConvert}
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

export default CoinForm