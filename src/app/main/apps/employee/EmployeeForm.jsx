import './form.css'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getDocumentType } from '../e-commerce/store/DocumentTypeSlice'

const initialForm = {
  empId: null,
  empFirstName: '',
  empSecondName: '',
  DocumentType: 1,
  empDocument: '',
  empEmail: '',
  empPhone: '',
  empGender: 0,
  empState: true
}

const EmployeeForm = ({data,maxId,onClose,open,createData,updateData,dataToEdit,setDataToEdit,deleteData}) => {

  const [form, setForm] = useState(initialForm)
  const [clicked, setClicked] = useState(false)
  const [clickedDoc, setClickedDoc] = useState(false)
  const [dataDoc,setDataDoc] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  
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
    return data.some((item) => item.empEmail === email)
  }
  const isDocumentAlreadyExists = (document) => {
    return data.some((item) => item.empDocument === document)
  }
  const isPhoneAlreadyExists = (phone) => {
    return data.some((item) => item.empPhone === phone)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!form.empFirstName || !form.empDocument || form.empDocument.length<8) {
      openDialogModal()
      return
    }
    try {
      if(form.empId === null) {
        if (isDocumentAlreadyExists(form.empDocument)) {
          alert("El N° de documento ya existe.");
          return
        } else if(isEmailAlreadyExists(form.empEmail)) {
          alert("El correo ya existe.")
          return
        } else if(isPhoneAlreadyExists(form.empPhone)) {
          alert("El N° de celular ya existe.");
          return
        } else {
          if(form.empEmail==='') {
            form.empEmail = null
          }
          if(form.empPhone==='') {
            form.empPhone = null
          }
          createData({
            ...form,
            empId: maxId+1,
            empEmail: form.empEmail,
            empPhone: form.empPhone
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
    if(id===form.empId) {
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
        empSecondName: dataToEdit.empSecondName || '',
        empEmail: dataToEdit.empEmail || '',
        empPhone: dataToEdit.empPhone || '',
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
      <DialogTitle>Formulario</DialogTitle>
      <DialogContent className="ctn-inputs fc-input-t">
        <TextField
          autoFocus
          error={!form.empFirstName && clicked}
          required
          margin="dense"
          id="name"
          label="Nombres"
          type="text"
          className='input'
          variant="outlined"
          name='empFirstName'
          value={form.empFirstName}
          onChange={handleChange}
          inputProps={{
            maxLength: 30,
          }}
          onClick={() => setClicked(true)}
              helperText={!form.empFirstName ? 'Este campo es obligatorio' : ''}
        />
        <TextField
          margin="dense"
          id="name"
          label="Apellidos"
          type="text"
          className='input'
          variant="outlined"
          name='empSecondName'
          value={form.empSecondName}
          onChange={handleChange}
          inputProps={{
            maxLength: 30,
          }}
        />
        <FormControl sx={{ width: '28.5ch', top: '1ch' }}>
          <InputLabel id="demo-simple-select-label">Tipo de documento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='DocumentType'
            value={form.DocumentType}
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
          error={!form.empDocument && clickedDoc}
          margin="dense"
          id="name"
          label="N° de documento"
          type="text"
          className='input'
          variant="outlined"
          name='empDocument'
          value={form.empDocument}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          inputProps={{
            maxLength: 12,
            minLength: 8,
          }}
          onClick={() => setClickedDoc(true)}
          helperText={!form.empDocument ? 'Este campo es obligatorio' : ''}
        />
        <TextField
          margin="dense"
          id="name"
          label="Correo electrónico"
          type="email"
          className='input'
          variant="outlined"
          name='empEmail'
          value={form.empEmail}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="N° de celular"
          type="text"
          className='input'
          variant="outlined"
          name='empPhone'
          value={form.empPhone}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          inputProps={{
            maxLength: 9,
            minLength: 9,
          }}
          onClick={() => setClickedDoc(true)}
        />
        <FormControl sx={{ width: '28.5ch', top: '2ch' }}>
          <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sexo"
            name='empGender'
            value={form.empGender}
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
              name='empState'
              value={form.empState}
              checked={form.empState}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        {form.empId!==null ? <Button onClick={() => handleClose(dataToEdit.empId)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
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

export default EmployeeForm