import './form.css'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import UserInterface from 'src/app/interfaces/UserInterface'
import { useDispatch } from 'react-redux'
import { getMaxId, postUser, putUser } from '../store/userSlice'
import { getRoles } from 'src/app/main/settings/controls/store/rolSlice'
import { getJobPositions } from '../../ocupations/store/jpSlice'
import { getWorkAreas } from '../../ocupations/store/waSlice'
import { getEmployees } from '../store/employeeSlice'

function UserForm({onClose,open,dataToEdit,setDataToEdit}) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(UserInterface)
  const [maxId, setMaxId] = useState(null)
  const [role, setRole] = useState([])
  const [jobPosition, setJobPosition] = useState([])
  const [workArea, setWorkArea] = useState([])
  const [employee, setEmployee] = useState([])
  
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
    if(!form.userDisplayName) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      dispatch(postUser({
        ...form,
        id: maxId+1
      }))
      setMaxId(maxId+1)
    } else {
      dispatch(putUser(form))
    }
    onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(UserInterface)
    setDataToEdit(null)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      deleteData(id)
      handleReset()
      onClose()
    }
    handleReset()
    onClose()
  }

  useEffect(() => {
    dispatch(getMaxId()).then(response => setMaxId(response.payload.ultimo_id))
    dispatch(getRoles()).then(response => setRole(response.payload))
    dispatch(getJobPositions()).then(response => setJobPosition(response.payload))
    dispatch(getWorkAreas()).then(response => setWorkArea(response.payload))
    dispatch(getEmployees()).then(response => setEmployee(response.payload))
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(UserInterface)
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
          <InputLabel id="Employee">Personal</InputLabel>
          <Select
            labelId="Employee"
            id="demo-simple-select"
            label="Personal"
            value={form.Employee}
            name="Employee"
            onChange={handleChange}
          >
            {
              employee.map(r => <MenuItem value={r.id} key={r.id}>{r.empFirstName}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          id="name"
          label="Imágen"
          variant="outlined"
          name='Avatar'
          value={form.Avatar}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="WorkArea">Área de Trabajo</InputLabel>
          <Select
            labelId="WorkArea"
            id="demo-simple-select"
            label="Área de Trabajo"
            value={form.WorkArea}
            name="WorkArea"
            onChange={handleChange}
          >
            {
              workArea.map(r => <MenuItem value={r.id} key={r.id}>{r.waName}</MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="JobPosition">Posición Laboral</InputLabel>
          <Select
            labelId="JobPosition"
            id="demo-simple-select"
            label="Posición Laboral"
            value={form.JobPosition}
            name="JobPosition"
            onChange={handleChange}
          >
            {
              jobPosition.map(r => <MenuItem value={r.id} key={r.id}>{r.jpName}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          id="name"
          label="Nombre de usuario"
          variant="outlined"
          name='userDisplayName'
          value={form.userDisplayName}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="Rol">Rol</InputLabel>
          <Select
            labelId="Rol"
            id="demo-simple-select"
            label="Rol"
            value={form.Rol}
            name="Rol"
            onChange={handleChange}
          >
            {
              role.map(r => <MenuItem value={r.id} key={r.id}>{r.rolName}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          id="name"
          label="Contraseña"
          variant="outlined"
          name='userPassword'
          value={form.userPassword}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        {form.id!==null ? <Button onClick={() => handleClose(dataToEdit.id)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserForm