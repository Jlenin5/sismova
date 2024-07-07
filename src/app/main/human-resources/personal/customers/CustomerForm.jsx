import { useTranslation } from 'react-i18next'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import CustomerInterface from 'src/app/interfaces/CustomerInterface'
import { useDispatch } from 'react-redux'
import { deleteCustomer, postCustomer, putCustomer } from '../store/customersSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

function CustomerForm(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(CustomerInterface)
  const { t } = useTranslation()
  
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleDateChange = (date) => {
    setForm({
      ...form,
      birthdate: zonedTimeToUtc(date).toISOString()
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!form.first_name) {
      alert("Datos incompletos")
      return
    }
    form.id ? dispatch(putCustomer(form)) : dispatch(postCustomer(form))
    props.onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(CustomerInterface)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteCustomer(id))
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
      setForm(CustomerInterface)
    }
  }, [dispatch, props.dataToEdit])

  return (
    <Dialog open={props.open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{!form.id ? t('register_employee') : t('update_employee')}</div>
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
          id="first_name"
          label={t('first_name')}
          type="text"
          fullWidth
          variant="outlined"
          name='first_name'
          value={form.first_name}
          onChange={handleChange}
        />
        <TextField
          id="second_name"
          label={t('second_name')}
          type="text"
          fullWidth
          variant="outlined"
          name='second_name'
          value={form.second_name || ''}
          onChange={handleChange}
        />
        <TextField
          id="surname"
          label={t('surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='surname'
          value={form.surname || ''}
          onChange={handleChange}
        />
        <TextField
          id="second_surname"
          label={t('second_surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='second_surname'
          value={form.second_surname || ''}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="document_type">{t('document_type')}</InputLabel>
          <Select
            labelId="document_type"
            id="demo-simple-select"
            name='document_type'
            label={t('document_type')}
            value={form.document_type}
            onChange={handleChange}
          >
            <MenuItem value={1}>{t('dni')}</MenuItem>
            <MenuItem value={2}>{t('ruc')}</MenuItem>
            <MenuItem value={3}>{t('ce')}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="document_number"
          label={t('n_document')}
          type="text"
          fullWidth
          variant="outlined"
          name='document_number'
          value={form.document_number}
          onChange={handleChange}
        />
        <TextField
          id="email"
          label={t('e_mail')}
          type="text"
          fullWidth
          variant="outlined"
          name='email'
          value={form.email || ''}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label={t('cell_phone')}
          type="text"
          fullWidth
          variant="outlined"
          name='phone'
          value={form.phone || ''}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="gender">{t('sex')}</InputLabel>
          <Select
            labelId="gender"
            id="demo-simple-select"
            label={t('sex')}
            name='gender'
            value={form.gender}
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('male')}</MenuItem>
            <MenuItem value={1}>{t('female')}</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          name='birthdate'
          value={form.birthdate ? utcToZonedTime(new Date(form.birthdate)) : null}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              label: t('birthdate'),
              variant: 'outlined',
            },
          }}
          maxDate={new Date()}
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

export default CustomerForm