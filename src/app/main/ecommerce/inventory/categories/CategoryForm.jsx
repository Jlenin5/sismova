import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  
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
    if(!form.name) {
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
      <DialogTitle>{t('form')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={t('category_name')}
          type="text"
          fullWidth
          variant="standard"
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        {t('state')}:
        <label className="switch">
          <input
            type="checkbox" 
            name='status'
            value={form.status}
            checked={form.status}
            onChange={handleChange}
          />
          <span className="slider"></span>
        </label>
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>{t('delete')}</Button> : <Button onClick={()=>handleClose(0)}>{t('cancel')}</Button>}
        <Button onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryForm