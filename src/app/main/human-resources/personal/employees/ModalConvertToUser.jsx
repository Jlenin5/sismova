import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { postUser } from '../store/userSlice'
import { getRoles } from 'src/app/main/settings/controls/store/rolSlice'

const ModalConvertToUser = ({open, close, idE}) => {
  const dispatch = useDispatch()
  // const [emp, setEmp] = useState({})
  const [rol, setRol] = useState(1)
  const [dRol, setDRol] = useState([])
  const { t } = useTranslation()

  const handleClose = () => {
    close()
  }

  const handleRolChange = (event) => {
    setRol(event.target.value)
  }

  const handleSubmit = () => {
    dispatch(postUser({
      Employee: idE,
      // userDisplayName: emp.empDocument,
      // userPassword: emp.empDocument,
      Rol: rol
    }))
  }
  console.log(idE)

  useEffect(() => {
    if(idE) {
      // dispatch(getEmployee(Number(idE))).then(r => setEmp(r.payload))
      // dispatch(getRoles()).then(r => setDRol(r.payload))
    }
  }, [dispatch, idE])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-category'
    >
      <DialogTitle>{t('user_data')}</DialogTitle>
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12'>
        <div className="name">
          <Typography variant="h6" gutterBottom className="text-red">
            {t('name')}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {/* {emp.empFirstName} */}
          </Typography>
        </div>
        <div className="n_document">
          <Typography variant="h6" gutterBottom className="text-red">
            {t('n_document')}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {/* {emp.empDocument} */}
          </Typography>
        </div>
        <div className="display_name">
          <Typography variant="h6" gutterBottom className="text-red">
            {t('user_name')}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {/* {emp.empDocument} */}
          </Typography>
        </div>
        <div className="password">
          <Typography variant="h6" gutterBottom className="text-red">
            {t('password')}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {/* {emp.empDocument} */}
          </Typography>
        </div>
        {/* <FormControl className="mt-8 mx-4" fullWidth>
          <InputLabel id="prodWebHome">{t('select_rol')}</InputLabel>
          <Select
            labelId="prodWebHome"
            id="demo-simple-select"
            label={t('select_rol')}
            value={rol}
            onChange={handleRolChange}
          >
            {dRol.map((rol) => (
              <MenuItem value={rol.id} key={rol.id}>{rol.rolName}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleSubmit}>{t('convert')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalConvertToUser