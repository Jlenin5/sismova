import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import BrandsInterface from 'src/app/interfaces/BrandsInterface'
import { useDispatch } from 'react-redux'
import { deleteBrand, postBrand, putBrand } from '../store/brandsSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

function BrandForm(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(BrandsInterface)
  const { t } = useTranslation()
  
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
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
    form.id ? dispatch(putBrand(form)) : dispatch(postBrand(form))
    props.onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(BrandsInterface)
  }

  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteBrand(id))
      handleReset()
      props.onClose()
    }
    handleReset()
    props.onClose()
  }

  useEffect(() => {
    props.dataToEdit ? setForm(props.dataToEdit) : setForm(BrandsInterface)
  }, [dispatch, props.dataToEdit])

  return (
    <Dialog open={props.open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{!form.id ? t('register_brand') : t('update_brand')}</div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32' dividers>
        <TextField
          autoFocus
          required
          id="name"
          label={t('name')}
          type="text"
          fullWidth
          variant="outlined"
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="status">{t('status')}</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            label={t('status')}
            value={form.status}
            name="status"
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('inactive')}</MenuItem>
            <MenuItem value={1}>{t('active')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="mb-20 mr-20">
        {form.id ? <Button variant="contained" color="error" onClick={() => handleClose(props.dataToEdit.id)}>{t('delete')}</Button> : <></>}
        <Button variant="contained" color="success" onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BrandForm