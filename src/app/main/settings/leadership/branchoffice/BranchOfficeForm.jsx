import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import BranchOfficeInterface from 'src/app/interfaces/BranchOfficeInterface'
import { useDispatch } from 'react-redux'
import { deleteBranchoffice, getMaxId, postBranchoffice, putBranchoffice } from '../store/branchofficeSlice'
import { getUsers } from 'src/app/main/human-resources/personal/store/userSlice'
import axios from 'axios'
import ModalSearchDistrict from './ModalSearchDistrict'

const BranchOfficeForm = ({onClose,open,dataToEdit,setDataToEdit}) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(BranchOfficeInterface)
  const [maxId, setMaxId] = useState(null)
  const [user, setUser] = useState([])
  const [dist, setDist] = useState([])
  const [openDist, setOpenDist] = useState(false)

  const openSearchDistrict = () => {
    setOpenDist(true)
  }
  const closeSearchDistrict = () => {
    setOpenDist(false)
  }

  const url = 'https://sismova.tech/backsis/public/api/dis'

  const getDist = async () => {
    return await axios.get(url)
  }
  
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
    if(!form.boName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postBranchoffice({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putBranchoffice(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(BranchOfficeInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteBranchoffice(id))
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  useEffect(() => {
    dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    dispatch(getUsers()).then(response => setUser(response.payload))
    getDist().then(response => setDist(response.data))
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(BranchOfficeInterface)
    }
  }, [dispatch, dataToEdit])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-bogory'
    >
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12'>
        <TextField
          autoFocus
          id="name"
          label="Nombre de Sucursal"
          fullWidth
          variant="outlined"
          name='boName'
          value={form.boName}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="Celular"
          fullWidth
          variant="outlined"
          name='boPhone'
          value={form.boPhone}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="Correo electrónico"
          fullWidth
          variant="outlined"
          name='boEmail'
          value={form.boEmail}
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="Distrito"
          fullWidth
          variant="outlined"
          name='District'
          value={form.District}
          onChange={handleChange}
          onClick={openSearchDistrict}
        />
        <TextField
          id="name"
          label="Dirección"
          fullWidth
          variant="outlined"
          name='boAddress'
          value={form.boAddress}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="User">Encargado</InputLabel>
          <Select
            labelId="User"
            id="demo-simple-select"
            label="Encargado"
            value={form.User}
            name="User"
            onChange={handleChange}
          >
            {
              user.map(r => <MenuItem value={r.id} key={r.id}>{r.employees.empFirstName}</MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="boState">Estado</InputLabel>
          <Select
            labelId="boState"
            id="demo-simple-select"
            label="Estado"
            value={form.boState}
            name="boState"
            onChange={handleChange}
          >
            <MenuItem value={0}>Inactivo</MenuItem>
            <MenuItem value={1}>Activo</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
      <ModalSearchDistrict
        open={openDist}
        onClose={closeSearchDistrict}
      />
    </Dialog>
  )
}

export default BranchOfficeForm