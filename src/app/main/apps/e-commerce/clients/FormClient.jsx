import './form.css'
import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select';
import { getDocumentType } from '../store/DocumentTypeSlice';

const initialForm = {
  cliId: null,
  cliFirstName: '',
  cliSecondName: '',
  DocumentTypeId: 1,
  cliDocument: '',
  cliEmail: '',
  cliPhone: '',
  cliGender: 0,
  cliState: true
}

export const FormClient = ({data,maxId,onClose,open,createData,updateData,dataToEdit,setDataToEdit,deleteData}) => {

  const [clicked, setClicked] = useState(false)
  const [clickedDoc, setClickedDoc] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [dataDoc,setDataDoc] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [error, setError] = useState(null)
  
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({
      ...form,
      [name]: value
    })
  }

  const openDialogModal = () => {
    setOpenDialog(true);
  }

  const closeDialogModal = () => {
    setOpenDialog(false);
  }

  const isEmailAlreadyExists = (email) => {
    return data.some((item) => item.cliEmail === email)
  }
  const isDocumentAlreadyExists = (document) => {
    return data.some((item) => item.cliDocument === document)
  }
  const isPhoneAlreadyExists = (phone) => {
    return data.some((item) => item.cliPhone === phone)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!form.cliFirstName || !form.cliDocument || !form.cliPhone || form.cliDocument.length<8 || form.cliPhone.length!==9) {
      openDialogModal()
      return
    }
    try {
      if(form.cliId === null) {
        if (isDocumentAlreadyExists(form.cliDocument)) {
          alert("El N° de documento ya existe.");
          return
        } else if(isEmailAlreadyExists(form.cliEmail)) {
          alert("El correo ya existe.")
          return
        } else if(isPhoneAlreadyExists(form.cliPhone)) {
          alert("El N° de celular ya existe.");
          return
        } else {
          if(form.cliEmail==='') {
            form.cliEmail = null
          }
          createData({
            ...form,
            cliId: maxId+1,
            cliEmail: form.cliEmail
          })
        }
      } else {
        updateData(form)
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
    setForm(initialForm)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.cliId) {
      deleteData(id)
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
    getDocumentType().then((response) => {setDataDoc(response)})
    if(dataToEdit) {
      const updatedDataToEdit = {
        ...dataToEdit,
        cliSecondName: dataToEdit.cliSecondName || '',
        cliEmail: dataToEdit.cliEmail || '',
        cliPhone: dataToEdit.cliPhone || '',
      }
      setForm(updatedDataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit, maxId])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-category'
    >
    <DialogContent>
      <DialogTitle>Formulario</DialogTitle>
        <div style={{ display: 'flex' }}>
          <div className='fc-input-t'>
            <TextField
              autoFocus
              error={!form.cliFirstName && clicked}
              required
              margin="dense"
              id="firstname"
              label="Nombres"
              type="text"
              sx={{ width: '30ch' }}
              variant="outlined"
              name='cliFirstName'
              value={form.cliFirstName}
              onChange={handleChange}
              inputProps={{
                maxLength: 30,
              }}
              onClick={() => setClicked(true)}
              helperText={!form.cliFirstName ? 'Este campo es obligatorio' : ''}
            />
            <TextField
              margin="dense"
              id="secondname"
              label="Apellidos"
              type="text"
              sx={{ width: '30ch' }}
              variant="outlined"
              name='cliSecondName'
              value={form.cliSecondName}
              onChange={handleChange}
              inputProps={{
                maxLength: 30,
              }}
            />
            <FormControl sx={{ width: '30ch' }}>
              <InputLabel id="demo-simple-select-label">Tipo de documento</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='DocumentTypeId'
                value={form.DocumentTypeId}
                label="Tipo de documento"
                onChange={handleChange}
              >
                {dataDoc.map((n) => (
                  <MenuItem key={n.doctId} value={n.doctId}>{n.doctAbbreviation}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              error={!form.cliDocument && clickedDoc}
              margin="dense"
              id="document"
              label="N° de documento"
              type="text"
              sx={{ width: '30ch' }}
              variant="outlined"
              name='cliDocument'
              value={form.cliDocument}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              inputProps={{
                maxLength: 12,
                minLength: 8,
              }}
              onClick={() => setClickedDoc(true)}
              helperText={!form.cliDocument ? 'Este campo es obligatorio' : ''}
            />
            <TextField
              type='email'
              margin="dense"
              id="email"
              label="Correo electrónico"
              sx={{ width: '30ch' }}
              variant="outlined"
              name='cliEmail'
              value={form.cliEmail}
              onChange={handleChange}
              inputProps={{
                maxLength: 50,
              }}
            />
            <TextField
              required
              margin="dense"
              id="phone"
              label="N° de Celular"
              type="text"
              sx={{ width: '30ch' }}
              variant="outlined"
              name='cliPhone'
              value={form.cliPhone}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              inputProps={{
                maxLength: 9,
                minLength: 9,
              }}
              onClick={() => setClickedDoc(true)}
              helperText={!form.cliDocument ? 'Este campo es obligatorio' : ''}
            />
            <FormControl sx={{ width: '30ch' }}>
              <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sexo"
                name='cliGender'
                value={form.cliGender}
                onChange={handleChange}
              >
                <MenuItem value={0}>Hombre</MenuItem>
                <MenuItem value={1}>Mujer</MenuItem>
              </Select>
            </FormControl>
            <div className='box-state'>
              Estado:
              <label className="switch">
                <input
                  type="checkbox" 
                  name='cliState'
                  value={form.cliState}
                  checked={form.cliState}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <DialogActions>
          {form.cliId!==null ? <Button onClick={() => handleClose(dataToEdit.cliId)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </DialogContent>
      <Dialog
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
      </Dialog>
    </Dialog>
  )
}