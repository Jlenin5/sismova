import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { useEffect, useState } from 'react'
import QuoteDetailInterface from 'src/app/interfaces/QuoteDetailInterface'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import ResponseDialog from './ResponseDialog'

const ModalSelect = ({open, modalClose, onClose, listProdTable, listProd, onDeleteItem}) => {
  const [openResponse, setOpenResponse] = useState({
    open: false,
    message: '',
    title: '',
    type: '',
  })
  const [form, setForm] = useState(QuoteDetailInterface)
  const [findProduct, setFindProduct] = useState([])
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleForm()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleCloseResponse = () => {
    setOpenResponse({
      open: false
    })
  }

  const handleForm = () => {
    if(Number(form.quantity) > form.reserve) {
      setOpenResponse({
        open: true,
        message: t('quantity_exceeds_stock'),
        title: t('error'),
        type: 'error'
      })
    } else {
      setOpenResponse({
        open: true,
        message: t('data_saved_successfully'),
        title: t('success'),
        type: 'success'
      })
      // if(form.discount_method === 1) {
      //   form.discount = form.discount
      // } else {
      //   form.discount = form.discount / 100
      // }
      let subTotal = parseFloat(form.price) * parseInt(form.quantity)
      let discount = parseFloat(subTotal - form.discount)
      let tax = parseFloat(discount * (form.tax_net / 100))
      form.total = (subTotal + tax).toFixed(2)
      setTimeout(() => {
        handleClose()
      }, 1300)
    }
  }

  const handleDeleteItem = () => {
    onDeleteItem(findProduct.id)
    setOpenResponse({
      open: true,
      message: t('was_successfully_removed'),
      title: t('success'),
      type: 'success'
    })
    setTimeout(() => {
      onClose()
    }, 1300)
  }

  const handleClose = () => {
    modalClose(form, listProdTable)
  }

  const singleNumber = (e) => {
    const keyCode = e.which || e.keyCode
    const isNumber = (keyCode >= 48 && keyCode <= 57) || keyCode === 46
    const isControlKey = [8, 9, 13, 27, 37, 39].includes(keyCode)
    if (!(isNumber || isControlKey)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if(listProdTable) {
      if(listProd) {
        setFindProduct(listProd.find(r => r.id === listProdTable.id) || [])
      }
      setForm(listProdTable)
    } else {
      setForm(QuoteDetailInterface)
    }
  }, [listProdTable, listProd])

  return (
    <Dialog open={open}>
      <DialogTitle className="flex justify-between mt-10">
        <div>{listProdTable.product_name ? listProdTable.product_name : findProduct.product_name}</div>
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
      <DialogContent dividers>
        <TextField
          label={t('name')}
          required
          autoFocus
          fullWidth
          className='my-12'
          id="product_name"
          variant="outlined"
          name="product_name"
          value={form.product_name || ''}
          onChange={handleChange}
        />
        <div className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12 mb-12'>
          <TextField
            label={t('quantity')}
            required
            id="quantity"
            variant="outlined"
            name="quantity"
            value={form.quantity || 1}
            onChange={handleChange}
            onKeyPress={singleNumber}
          />
          <TextField
            label={t('sale_price')}
            required
            id="price"
            variant="outlined"
            name="price"
            value={form.price || ''}
            onChange={handleChange}
          />
          <TextField
            label={t('tax')}
            required
            id="tax_net"
            variant="outlined"
            name="tax_net"
            value={form.tax_net || 18}
            onChange={handleChange}
            onKeyPress={singleNumber}
          />
          <FormControl fullWidth>
            <InputLabel id="discount_type">{t('discount_type')}</InputLabel>
            <Select
              labelId="discount_type"
              id="demo-simple-select"
              label={t('discount_type')}
              value={form.discount_type || ''}
              name="discount_type"
              onChange={handleChange}
            >
              <MenuItem value={1}>{t('fixed')}</MenuItem>
              <MenuItem value={0}>{t('percentage')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={t('discount')}
            required
            id="discount"
            variant="outlined"
            name="discount"
            value={form.discount || 0}
            onChange={handleChange}
            onKeyPress={singleNumber}
          />
          <FormControl fullWidth>
            <InputLabel id="client_accept">{t('client_accept')}</InputLabel>
            <Select
              labelId="client_accept"
              id="demo-simple-select"
              label={t('client_accept')}
              value={form.client_accept || 0}
              name="status"
              onChange={handleChange}
            >
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions className="m-8">
        <Button variant="contained" color="error" onClick={() => handleDeleteItem()}>{t('delete')}</Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>{t('save')}</Button>
      </DialogActions>
      <ResponseDialog
        openResponse={openResponse}
        onCloseResponse={handleCloseResponse}
      />
    </Dialog>
  )
}

export default ModalSelect