import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import CurrencyInterface from 'src/app/interfaces/CurrencyInterface'
import { useDispatch } from 'react-redux'
import { deleteCurrency, postCurrency, putCurrency } from '../store/currenciesSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

function CurrencyForm(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(CurrencyInterface)
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
    if(!form.name) {
      alert("Datos incompletos")
      return
    }
    form.id ? dispatch(putCurrency(form)) : dispatch(postCurrency(form))
    props.onClose()
    handleReset()
  }
  
  const handleReset = () => {
    setForm(CurrencyInterface)
  }

  const handleClose = (id) => {
    if(id===form.id) {
      dispatch(deleteCurrency(id))
      handleReset()
      props.onClose()
    }
    handleReset()
    props.onClose()
  }

  useEffect(() => {
    props.dataToEdit ? setForm(props.dataToEdit) : setForm(CurrencyInterface)
  }, [props.dataToEdit])

  return (
    <Dialog open={props.open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{!form.id ? t('register_currency') : t('update_currency')}</div>
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
          id="name"
          label={t('name')}
          type="text"
          fullWidth
          variant="outlined"
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          id="code"
          label={t('code')}
          type="text"
          fullWidth
          variant="outlined"
          name='code'
          value={form.code}
          onChange={handleChange}
        />
        <TextField
          id="symbol"
          label={t('symbol')}
          type="text"
          fullWidth
          variant="outlined"
          name='symbol'
          value={form.symbol}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="status">{t('status')}</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            label={t('status')}
            value={form.status}
            name="status"
            onChange={handleChange}
          >
            <MenuItem value={0}>{t('inactive')}</MenuItem>
            <MenuItem value={1}>{t('active')}</MenuItem>
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

export default CurrencyForm