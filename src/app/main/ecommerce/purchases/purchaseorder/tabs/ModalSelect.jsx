import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import PurchaseOrderDetailInterface from 'src/app/interfaces/PurchaseOrderDetailInterface'
import ResponseDialog from './ResponseDialog'

const ModalSelect = ({open, modalClose, onClose, listProdTable, listProd, onDeleteItem}) => {
  const [openResponse, setOpenResponse] = useState({
    open: false,
    message: '',
    title: '',
    type: '',
  })
  const [form, setForm] = useState(PurchaseOrderDetailInterface)
  const [findProduct, setFindProduct] = useState([])
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleForm()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCloseResponse = () => {
    setOpenResponse({
      open: false
    })
  }

  const handleForm = () => {
    if(form.podStock < form.podQuantity) {
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
      if(form.podDiscountMethod === 1) {
        form.podDiscount = form.podDiscount
      } else {
        form.podDiscount = form.podDiscount / 100
      }
      let subTotal = parseFloat(form.podPrice) * parseInt(form.podQuantity)
      let discount = parseFloat(subTotal - form.podDiscount)
      let tax = parseFloat(discount * form.podTax)
      form.podTotal = discount + tax
      setTimeout(() => {
        handleClose()
      }, 1300)
    }
  }

  const handleDeleteItem = () => {
    onDeleteItem(findProduct.id)
    // setOpenResponse({
    //   open: true,
    //   message: t('was_successfully_removed'),
    //   title: t('success'),
    //   type: 'success'
    // })
    onClose()
  }
  
  const handleClose = () => {
    modalClose(form, listProdTable)
  }

  useEffect(() => {
    if(listProdTable) {
      if(listProd) {
        setFindProduct(listProd.find(r => r.id === listProdTable.Product) || [])
      }
      setForm(listProdTable)
    } else {
      setForm(PurchaseOrderDetailInterface)
    }
  }, [listProdTable, listProd])

  return (
    <Dialog
      open={open}
      className='form-dialog-product'
    >
      <Box
        sx={{
          width: 600,
          minHeight: 300,
          position: 'relative',
        }}
      >
        <DialogTitle className='flex justify-between'>
          {listProdTable.podName ? listProdTable.podName : findProduct.prodName}
          <Button variant="outlined" color="error" onClick={handleClose}>X</Button>
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-flow-row-dense grid-cols-2 gap-32 mt-12">
            <TextField
              label={t('sale_price')}
              required
              id="podPrice"
              variant="outlined"
              name="podPrice"
              value={form.podPrice || ''}
              onChange={handleChange}
            />
            <TextField
              label={t('quantity')}
              required
              id="podQuantity"
              variant="outlined"
              name="podQuantity"
              value={form.podQuantity || ''}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="podDiscountMethod">{t('discount_method')}</InputLabel>
              <Select
                labelId="podDiscountMethod"
                id="demo-simple-select"
                label={t('discount_method')}
                value={form.podDiscountMethod || 1}
                name="podDiscountMethod"
                onChange={handleChange}
              >
                <MenuItem value={0}>{t('percentage')}</MenuItem>
                <MenuItem value={1}>{t('fixed_value')}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={t('discount')}
              required
              id="podDiscount"
              variant="outlined"
              name="podDiscount"
              value={form.podDiscount || 0.00}
              onChange={handleChange}
            />
          </div>
          <DialogActions>
            <Button onClick={() => handleDeleteItem()}>{t('delete')}</Button>
            <Button onClick={handleSubmit}>{t('save')}</Button>
          </DialogActions>
        </DialogContent>
        <ResponseDialog
          openResponse={openResponse}
          onCloseResponse={handleCloseResponse}
        />
      </Box>
    </Dialog>
  )
}

export default ModalSelect