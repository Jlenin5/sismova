import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import SupplierInterface from 'src/app/interfaces/SupplierInterface'
import { useDispatch } from 'react-redux'
import { deleteSupplier, postSupplier, putSupplier } from '../store/supplierSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

function SupplierForm(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(SupplierInterface)
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
    form.id ? dispatch(putSupplier(form)) : dispatch(postSupplier(form))
    props.onClose()
    handleReset()
  }

  const handleReset = () => {
    setForm(SupplierInterface)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteSupplier(id))
      handleReset()
      props.onClose()
    }
    handleReset()
    props.onClose()
  }

  useEffect(() => {
    if(props.dataToEdit) {
      setForm(props.dataToEdit)
    } else {
      setForm(SupplierInterface)
    }
  }, [dispatch, props.dataToEdit])

  return (
    <Dialog open={props.open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{!form.id ? t('register_supplier') : t('update_supplier')}</div>
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
          id="document"
          label={t('n_document')}
          type="text"
          variant="outlined"
          name='document'
          value={form.document}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('name')}
          type="text"
          variant="outlined"
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          id="email"
          label={t('e_mail')}
          type="text"
          variant="outlined"
          name='email'
          value={form.email || ''}
          onChange={handleChange}
        />
        <TextField
          id="address"
          label={t('address')}
          type="text"
          variant="outlined"
          name='address'
          value={form.address}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label={t('cell_phone')}
          type="text"
          variant="outlined"
          name='phone'
          value={form.phone || ''}
          onChange={handleChange}
        />
        <TextField
          id="web_site"
          label={t('web_site')}
          type="text"
          variant="outlined"
          name='web_site'
          value={form.web_site || ''}
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

export default SupplierForm