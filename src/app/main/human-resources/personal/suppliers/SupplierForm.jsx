import { useTranslation } from 'react-i18next'
import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import SupplierInterface from 'src/app/interfaces/SupplierInterface'
import { useDispatch } from 'react-redux'
import { deleteSupplier, getMaxId, postSupplier, putSupplier } from '../store/supplierSlice'
import { getDocuments } from 'src/app/main/settings/controls/store/documentSlice'

function SupplierForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(SupplierInterface)
  const [maxId, setMaxId] = useState(null)
  const [doc, setDoc] = useState([])
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
    if(!form.suppCompanyName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postSupplier({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putSupplier(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(SupplierInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteSupplier(id))
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  useEffect(() => {
    dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    dispatch(getDocuments()).then(response => setDoc(response.payload))
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(SupplierInterface)
    }
  }, [dispatch, dataToEdit])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-category'
    >
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12'>
        <FormControl fullWidth>
          <InputLabel id="DocumentType">{t('document')}</InputLabel>
          <Select
            labelId="DocumentType"
            id="demo-simple-select"
            label={t('document')}
            value={form.DocumentType}
            name="DocumentType"
            onChange={handleChange}
          >
            {
              doc.map(r => <MenuItem value={r.id} key={r.id}>{r.doctAbbreviation}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          id="name"
          label={t('n_document')}
          type="text"
          variant="outlined"
          name='suppDocument'
          value={form.suppDocument}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          id="name"
          label={t('names')}
          type="text"
          variant="outlined"
          name='suppCompanyName'
          value={form.suppCompanyName}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('e_mail')}
          type="text"
          variant="outlined"
          name='suppEmail'
          value={form.suppEmail}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('address')}
          type="text"
          variant="outlined"
          name='suppAddress'
          value={form.suppAddress}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label={t('cell_phone')}
          type="text"
          variant="outlined"
          name='suppPhone'
          value={form.suppPhone}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="suppState">{t('state')}</InputLabel>
          <Select
            labelId="suppState"
            id="demo-simple-select"
            label={t('state')}
            value={form.suppState}
            name="suppState"
            onChange={handleChange}
          >
            <MenuItem value={1}>{t('active')}</MenuItem>
            <MenuItem value={0}>{t('inactive')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SupplierForm