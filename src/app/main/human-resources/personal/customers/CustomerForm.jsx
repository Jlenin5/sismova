import { useTranslation } from 'react-i18next'
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
  const [customerTypeOption, setCustomerTypeOption] = useState(true)
  const [inputDocument, setInputDocument] = useState('')
  const [inputFirstName, setInputFirstName] = useState('')
  const [inputSecondName, setInputSecondName] = useState('')
  const [inputSurname, setInputSurname] = useState('')
  const [inputSecondSurname, setInputSecondSurname] = useState('')
  const [inputEmail, setInputEmail] = useState('')
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
    cleanInputs()
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

  const changeCustomerType = (e) => {
    const selectedValue = e.target.value
    if(selectedValue == 2) {
      setCustomerTypeOption(false)
    } else {
      setCustomerTypeOption(true)
    }
    cleanInputs()
    handleChange(e)
  }

  const cleanInputs = () => {
    setInputDocument('')
    setInputFirstName('')
    setInputSecondName('')
    setInputSurname('')
    setInputSecondSurname('')
    setInputEmail('')
  }

  useEffect(() => {
    props.dataToEdit ? setForm(props.dataToEdit) : setForm(CustomerInterface)
  }, [props.dataToEdit])

  return (
    <Dialog open={props.open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{!form.id ? t('register_customer') : t('update_customer')}</div>
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
        <FormControl fullWidth>
          <InputLabel id="document_type">{t('document_type')}</InputLabel>
          <Select
            labelId="document_type"
            id="demo-simple-select"
            name='document_type'
            label={t('document_type')}
            value={form.document_type}
            onChange={changeCustomerType}
          >
            <MenuItem value={1}>{t('dni')}</MenuItem>
            <MenuItem value={2}>{t('ruc')}</MenuItem>
            <MenuItem value={3}>{t('ce')}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          required
          id="document_number"
          label={t('n_document')}
          type="text"
          fullWidth
          variant="outlined"
          name='document_number'
          value={form.document_number ? form.document_number : inputDocument}
          onChange={(event) => {
            handleChange(event)
            setInputDocument(event.target.value)
          }}
        />
        <TextField
          required
          id="first_name"
          label={customerTypeOption ? t('first_name') : t('full_name')}
          type="text"
          fullWidth
          variant="outlined"
          name='first_name'
          value={form.first_name ? form.first_name : inputFirstName}
          onChange={(event) => {
            handleChange(event)
            setInputFirstName(event.target.value)
          }}
          disabled={form.document_number ? false : inputDocument ? false : true}
        />
        <TextField
          id="second_name"
          label={t('second_name')}
          type="text"
          fullWidth
          variant="outlined"
          name='second_name'
          value={form.second_name ? form.second_name : inputSecondName}
          onChange={(event) => {
            handleChange(event)
            setInputSecondName(event.target.value)
          }}
          disabled={form.document_number ? false : inputDocument ? false : true}
          style={{ display: customerTypeOption ? 'block' : 'none' }}
        />
        <TextField
          id="surname"
          label={t('surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='surname'
          value={form.surname ? form.surname : inputSurname}
          onChange={(event) => {
            handleChange(event)
            setInputSurname(event.target.value)
          }}
          disabled={form.document_number ? false : inputDocument ? false : true}
          style={{ display: customerTypeOption ? 'block' : 'none' }}
        />
        <TextField
          id="second_surname"
          label={t('second_surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='second_surname'
          value={form.second_surname ? form.second_surname : inputSecondSurname}
          onChange={(event) => {
            handleChange(event)
            setInputSecondSurname(event.target.value)
          }}
          disabled={form.document_number ? false : inputDocument ? false : true}
          style={{ display: customerTypeOption ? 'block' : 'none' }}
        />
        <TextField
          id="email"
          label={t('e_mail')}
          type="text"
          fullWidth
          variant="outlined"
          name='email'
          value={form.email ? form.email : inputEmail}
          onChange={(event) => {
            handleChange(event)
            setInputEmail(event.target.value)
          }}
          disabled={form.document_number ? false : inputDocument ? false : true}
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
          disabled={form.document_number ? false : inputDocument ? false : true}
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