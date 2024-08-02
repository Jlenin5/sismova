import { useTranslation } from 'react-i18next'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteEmployee, postEmployee, putEmployee } from '../store/employeesSlice'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EmployeeInterface from 'src/app/interfaces/EmployeeInterface'
import { getWorkAreas } from '../../ocupations/store/waSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { getJobPositions } from '../../ocupations/store/jpSlice'

function EmployeeForm(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(EmployeeInterface)
  const [workAreas, setWorkAreas] = useState([])
  const [jobPositions, setJobPositions] = useState([])
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
    
    if(!form.first_name || !form.document_number || form.document_number.length<8) {
      return
    }
    try {
      form.id ? dispatch(putEmployee(form)) : dispatch(postEmployee(form))
      props.onClose()
      handleReset()
    } catch(error) {
      if (error.response && error.response.status === 409) {
      }
    }
  }
  
  const handleReset = () => {
    setForm(EmployeeInterface)
  }

  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteEmployee(id))
      handleReset()
      props.onClose()
    }
    handleReset()
    props.onClose()
  }

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode
    const isNumber = (keyCode >= 48 && keyCode <= 57) 
    const isControlKey = [8, 9, 13, 27, 37, 39].includes(keyCode)
    if (!(isNumber || isControlKey)) {
      e.preventDefault()
    }
  }

  const handleDateChange = (date) => {
    setForm({
      ...form,
      birthdate: date
    });
  };

  useEffect(() => {
    dispatch(getWorkAreas()).then(r => setWorkAreas(r.payload.data))
    dispatch(getJobPositions()).then(r => setJobPositions(r.payload.data))
    props.dataToEdit ? setForm(props.dataToEdit) : setForm(EmployeeInterface)
  }, [dispatch, props.dataToEdit])

  return (
    <Dialog open={props.open} className="form-dialog-category">
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
          required
          id="first_name"
          label={t('first_name')}
          type="text"
          fullWidth
          variant="outlined"
          name='first_name'
          value={form.first_name}
          onChange={handleChange}
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
          required
          id="surname"
          label={t('surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='surname'
          value={form.surname || ''}
          onChange={handleChange}
        />
        <TextField
          required
          id="second_surname"
          label={t('second_surname')}
          type="text"
          fullWidth
          variant="outlined"
          name='second_surname'
          value={form.second_surname || ''}
          onChange={handleChange}
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
            value={form.document_type || ''}
            onChange={handleChange}
          >
            <MenuItem value={1}>{t('dni')}</MenuItem>
            <MenuItem value={2}>{t('ruc')}</MenuItem>
            <MenuItem value={3}>{t('ce')}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="document_number"
          label={t('n_document')}
          type="text"
          fullWidth
          variant="outlined"
          name='document_number'
          value={form.document_number}
          onChange={handleChange}
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
        <Autocomplete
          freeSolo
          fullWidth
          id="combo-box-department"
          options={jobPositions}
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => {
            setForm({ ...form, job_position_id: data ? data.id : 0 })
            return data
          }}
          name="job_position_id"
          value={jobPositions.find((option) => option.id === form.job_position_id) || null}
          renderInput={(params) => (
            <TextField {...params} label={t('select_job_position')} />
          )}
        />
        <DatePicker
          name='birthdate'
          value={form.birthdate ? new Date(form.birthdate) : null}
          onChange={(date) => {
            handleDateChange(date);
          }}
          format="dd/MM/yyyy"
          slotProps={{
            textField: {
              label: t('birthdate'),
              variant: 'outlined',
            },
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="gender">{t('sex')}</InputLabel>
          <Select
            labelId="gender"
            id="demo-simple-select"
            label={t('sex')}
            name='gender'
            value={form.gender}
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('man')}</MenuItem>
            <MenuItem value={1}>{t('woman')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status">{t('status')}</InputLabel>
          <Select
            labelId="status"
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
        {form.id ? <Button variant="contained" color="error" onClick={() => handleClose(props.dataToEdit.id)}>{t('delete')}</Button> : <></>}
        <Button variant="contained" color="success" onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeForm