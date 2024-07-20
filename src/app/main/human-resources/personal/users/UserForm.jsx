import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import UserInterface from 'src/app/interfaces/UserInterface'
import { useDispatch } from 'react-redux'
import { deleteUser, postUser, putUser } from '../store/userSlice'
// import { getRoles } from 'src/app/main/settings/controls/store/rolSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

function UserForm(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(UserInterface)
  // const [role, setRole] = useState([])
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
    if(!form.nickname) {
      alert("Datos incompletos")
      return
    }
    form.id ? dispatch(postUser(form)) : dispatch(putUser(form))
    props.onClose()
    handleReset()
  }
  const handleReset = () => {
    setForm(UserInterface)
  }
  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteUser(id))
      handleReset()
      props.onClose()
    }
    handleReset()
    props.onClose()
  }

  useEffect(() => {
    // dispatch(getRoles()).then(response => setRole(response.payload))
    if(props.dataToEdit) {
      setForm(props.dataToEdit)
    } else {
      setForm(UserInterface)
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
          id="nickname"
          label={t('nickname')}
          variant="outlined"
          name='nickname'
          value={form.nickname}
          onChange={handleChange}
        />
        <TextField
          id="email"
          label={t('email')}
          variant="outlined"
          name='email'
          value={form.email}
          onChange={handleChange}
        />
        {/* <FormControl fullWidth>
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
        </FormControl> */}
        <TextField
          id="name"
          label="Contraseña"
          variant="outlined"
          name='userPassword'
          value={form.password || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions className="mb-20 mr-20">
        {form.id ? <Button variant="contained" color="error" onClick={() => handleClose(props.dataToEdit.id)}>{t('delete')}</Button> : <></>}
        <Button variant="contained" color="success" onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserForm