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
    if(form.stock < form.quantity) {
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
      if(form.discount_method === 1) {
        form.discount = form.discount
      } else {
        form.discount = form.discount / 100
      }
      let subTotal = parseFloat(form.price) * parseInt(form.quantity)
      let discount = parseFloat(subTotal - form.discount)
      let tax = parseFloat(discount * form.tax_net)
      form.total = (subTotal * tax).toFixed(2)
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
        setFindProduct(listProd.find(r => r.id === listProdTable.id) || [])
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
          {listProdTable.product_name ? listProdTable.product_name : findProduct.product_name}
          <Button variant="outlined" color="error" onClick={handleClose}>X</Button>
        </DialogTitle>
        <DialogContent>
        <div className="grid grid-flow-row-dense grid-cols-2 gap-32 mt-12">
            <TextField
              label={t('sale_price')}
              required
              id="price"
              variant="outlined"
              name="price"
              value={form.price || listProdTable.sale_price}
              onChange={handleChange}
            />
            <TextField
              label={t('quantity')}
              required
              id="quantity"
              variant="outlined"
              name="quantity"
              value={form.quantity || 1}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="discount_method">{t('discount_method')}</InputLabel>
              <Select
                labelId="discount_method"
                id="demo-simple-select"
                label={t('discount_method')}
                value={form.discount_method || 1}
                name="discount_method"
                onChange={handleChange}
              >
                <MenuItem value={0}>{t('percentage')}</MenuItem>
                <MenuItem value={1}>{t('fixed_value')}</MenuItem>
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