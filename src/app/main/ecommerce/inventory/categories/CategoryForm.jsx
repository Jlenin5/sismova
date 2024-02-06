import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import CategoryInterface from 'src/app/interfaces/CategoryInterface'
import { useDispatch } from 'react-redux'
import { deleteCategory, getMaxId, postCategory, putCategory } from '../store/categorySlice'

const CategoryForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(CategoryInterface)
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
    if(!form.cateName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postCategory({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putCategory(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(CategoryInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteCategory(id))
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
      setForm(CategoryInterface)
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
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryForm