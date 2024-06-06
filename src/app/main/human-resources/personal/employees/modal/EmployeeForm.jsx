import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteEmployee, getMaxId, postEmployee, putEmployee } from '../../store/employeesSlice'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EmployeeInterface from 'src/app/interfaces/EmployeeInterface'
import { getWorkAreas } from '../../../ocupations/store/waSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

const EmployeeForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  
  const dispatch = useDispatch()
  const [form, setForm] = useState(EmployeeInterface)
  const [clicked, setClicked] = useState(false)
  const [clickedDoc, setClickedDoc] = useState(false)
  // const [dataDoc,setDataDoc] = useState([])
  // const [openDialog, setOpenDialog] = useState(false)
  const [workAreas, setWorkAreas] = useState([])
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

  // const openDialogModal = () => {
  //   setOpenDialog(true);
  // }

  // const closeDialogModal = () => {
  //   setOpenDialog(false);
  // }

  // const isEmailAlreadyExists = (email) => {
  //   return data.some((item) => item.email === email)
  // }
  // const isDocumentAlreadyExists = (document) => {
  //   return data.some((item) => item.document_number === document)
  // }
  // const isPhoneAlreadyExists = (phone) => {
  //   return data.some((item) => item.phone === phone)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!form.first_name || !form.document_number || form.document_number.length<8) {
      // openDialogModal()
      return
    }
    try {
      if(form.id === null) {
        // if (isDocumentAlreadyExists(form.document_number)) {
        //   alert("El N° de documento ya existe.");
        //   return
        // } else if(isEmailAlreadyExists(form.email)) {
        //   alert("El correo ya existe.")
        //   return
        // } else if(isPhoneAlreadyExists(form.phone)) {
        //   alert("El N° de celular ya existe.");
        //   return
        // } else {
        //   if(form.email==='') {
        //     form.email = null
        //   }
        //   if(form.phone==='') {
        //     form.phone = null
        //   }
        dispatch(postEmployee({
          ...form,
          id: maxId+1
        }))
        // }
      } else {
        dispatch(putEmployee(form))
      }
      onClose()
      handleReset()
    } catch(error) {
      if (error.response && error.response.status === 409) {
        console.log('El correo electrónico ya está registrado')
      } else {
        console.error('Error desconocido:', error)
      }
    }
  }
  
  const handleReset = () => {
    setForm(EmployeeInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteEmployee(id))
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode
    const isNumber = (keyCode >= 48 && keyCode <= 57) 
    const isControlKey = [8, 9, 13, 27, 37, 39].includes(keyCode)
    if (!(isNumber || isControlKey)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    dispatch(getWorkAreas()).then(r => setWorkAreas(r.payload.data))
    dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(EmployeeInterface)
    }
  }, [dispatch, dataToEdit])

  return (
    <Dialog open={open} className="form-dialog-category">
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
          error={!form.first_name && clicked}
          required
          id="first_name"
          label={t('first_name')}
          type="text"
          fullWidth
          variant="outlined"
          name='first_name'
          value={form.first_name}
          onChange={handleChange}
          onClick={() => setClicked(true)}
          helperText={!form.first_name ? 'Este campo es obligatorio' : ''}
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
          error={!form.surname && clicked}
          required
          id="surname"
          label={t('surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='surname'
          value={form.surname || ''}
          onChange={handleChange}
          onClick={() => setClicked(true)}
          helperText={!form.surname ? 'Este campo es obligatorio' : ''}
        />
        <TextField
          error={!form.second_surname && clicked}
          required
          id="second_surname"
          label={t('second_surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='second_surname'
          value={form.second_surname || ''}
          onChange={handleChange}
          onClick={() => setClicked(true)}
          helperText={!form.second_surname ? 'Este campo es obligatorio' : ''}
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
          error={!form.document_number && clicked}
          required
          id="document_number"
          label={t('n_document')}
          type="text"
          fullWidth
          variant="outlined"
          name='document_number'
          value={form.document_number}
          onChange={handleChange}
          onClick={() => setClicked(true)}
          helperText={!form.document_number ? 'Este campo es obligatorio' : ''}
        />
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-department"
          options={workAreas}
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => {
            setForm({ ...form, work_area_id: data ? data.id : 0 })
            return data
          }}
          name="work_area_id"
          value={workAreas.find((option) => option.id === form.work_area_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('select_work_area')} />
          )}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t('sex')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t('status')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={t('status')}
            name='status'
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value={1}>{t('active')}</MenuItem>
            <MenuItem value={0}>{t('inactive')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="mb-20 mr-20">
        {form.id ? <Button variant="contained" color="error" onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <></>}
        <Button variant="contained" color="success" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
      {/* <Dialog
        open={openDialog}
        onClose={closeDialogModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Datos incompletos</DialogTitle>
        <DialogContent>
          <h3>Por favor, complete todos los campos obligatorios(*).</h3>
          <br />
          <b>La longitud del documento debe contener estos valores:</b>
          <p>DNI: 8 dígitos</p>
          <p>RUC: 11 dígitos</p>
          <p>CE: 12 Dígitos</p>
          <br />
          <h3>El número de celular debe contener 9 dígitos</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogModal} autoFocus>OK</Button>
        </DialogActions>
      </Dialog> */}
    </Dialog>
  )
}

export default EmployeeForm