import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import CompanyInterface from 'src/app/interfaces/CompanyInterface'
import { useDispatch } from 'react-redux'
import { deleteCompanies, postCompanies, putCompanies } from '../store/companiesSlice'
import { getEmployees } from 'src/app/main/human-resources/personal/store/employeesSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

const CompanyForm = (props) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(CompanyInterface)
  const [clicked, setClicked] = useState(false)
  const [employee, setEmployee] = useState([])
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
    form.id ? dispatch(putCompanies(form)) : dispatch(postCompanies(form))
    props.onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(CompanyInterface)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteCompanies(id))
      handleReset()
      props.onClose()
    }
    handleReset()
    props.onClose()
  }

  useEffect(() => {
    dispatch(getEmployees()).then(response => setEmployee(response.payload.data))
    if(props.dataToEdit) {
      setForm(props.dataToEdit)
    } else {
      setForm(CompanyInterface)
    }
  }, [dispatch, props.dataToEdit])

  return (
    <Dialog open={props.open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{!form.id ? t('register_company') : t('update_company')}</div>
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
          error={!form.name && clicked}
          required
          id="name"
          label={t('name')}
          fullWidth
          variant="outlined"
          name='name'
          value={form.name}
          onChange={handleChange}
          onClick={() => setClicked(true)}
          helperText={!form.first_name ? 'Este campo es obligatorio' : ''}
        />
        <TextField
          id="phone"
          label={t('cell_phone')}
          fullWidth
          variant="outlined"
          name='phone'
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          id="document_number"
          label={t('document_number')}
          fullWidth
          variant="outlined"
          name='document_number'
          value={form.document_number}
          onChange={handleChange}
        />
        <TextField
          id="mail"
          label={t('e_mail')}
          fullWidth
          variant="outlined"
          name='email'
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          id="address"
          label={t('address')}
          fullWidth
          variant="outlined"
          name='address'
          value={form.address}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="employee_id">{t('responsible')}</InputLabel>
          <Select
            labelId="employee_id"
            id="demo-simple-select"
            label={t('responsible')}
            value={form.employee_id}
            name="employee_id"
            onChange={handleChange}
          >
            {
              employee.map(r => <MenuItem value={r.id} key={r.id}>{r.first_name}</MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status">{t('state')}</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            label={t('state')}
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

export default CompanyForm