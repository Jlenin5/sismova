import FuseUtils from '@fuse/utils'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { postUser } from '../store/userSlice'
import { getRoles } from 'src/app/main/settings/controls/store/rolSlice'

const ModalConvertToUser = ({open, close, emp}) => {
  const dispatch = useDispatch()
  const [rol, setRol] = useState(1)
  const [dRol, setDRol] = useState([])
  const { t } = useTranslation()

  const handleClose = () => {
    close()
  }

  const handleRolChange = (event) => {
    setRol(event.target.value)
  }

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  const nameLowerCase = emp?.first_name.toLowerCase() ?? ''
  const nameReplace = nameLowerCase.replace(/\s+/g, '') // remove whitespace
  const surnameLowerCase = emp?.surname.toLowerCase() ?? ''
  const surnameReplace = surnameLowerCase.replace(/\s+/g, '')
  const newEmail = nameReplace + '.' + surnameReplace + '@sismova.tech'
  const newNickName = emp?.first_name.substr(0,3) + (emp?.birthdate ? calculateAge(emp?.birthdate) : '')

  const handleSubmit = () => {
    dispatch(postUser({
      employee_id: emp?.id,
      nickname: emp?.first_name,
      email: newEmail,
      password: nameReplace + '.' + surnameReplace,
      uuid: FuseUtils.generateGUID(),
      status: 1
    }))
    close()
  }

  useEffect(() => {
    if(emp) {
      // dispatch(getRoles()).then(r => setDRol(r.payload))
    }
  }, [dispatch, emp])

  return (
    <Dialog open={open} className="form-dialog-category">
      <DialogTitle className="flex justify-between mt-10">
        <div>{t('user_data')}</div>
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
      <DialogContent className='grid grid-flow-row-dense grid-cols-1 gap-32' dividers>
        <div className="name">
          <Typography variant="h6" gutterBottom className="text-red">
            {t('user_name')}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {newNickName}
          </Typography>
        </div>
        <div className="name">
          <Typography variant="h6" gutterBottom className="text-red">
            {t('e_mail')}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {newEmail}
          </Typography>
        </div>
        <div className="password">
          <Typography variant="h6" gutterBottom className="text-red">
            {t('password')}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {nameReplace + '.' + surnameReplace}
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
      <DialogActions className="m-10">
        <Button variant="contained" color="error" onClick={handleClose}>{t('cancel')}</Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>{t('convert')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalConvertToUser