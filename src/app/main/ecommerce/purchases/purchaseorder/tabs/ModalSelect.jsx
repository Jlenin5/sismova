import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Controller, useFormContext } from 'react-hook-form'
import Button from '@mui/material/Button'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { useEffect, useState } from 'react'
import ProductInterface from 'src/app/interfaces/ProductInterface'

const ModalSelect = ({open, onClose, listProd}) => {
  const [form, setForm] = useState(ProductInterface)
  const methods = useFormContext()
  const { control } = methods
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleClose = () => {
    onClose(form, listProd)
  }

  useEffect(() => {
    if(listProd) {
      setForm({ ...listProd, prodName: listProd.prodName || '' })
      setForm({ ...listProd, prodSalePrice: listProd.prodSalePrice || '' })
    } else {
      setForm(ProductInterface)
    }
  }, [listProd])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-product'
    >
      <Box
        className='box-nav-form'
        sx={{
          width: 300,
          minHeight: 250,
          position: 'relative',
          backgroundColor: 'white'
        }}
      >
        <DialogContent className='grid grid-flow-row-dense grid-cols-1 gap-32 mt-12'>
          <TextField
            label={t('name')}
            required
            autoFocus
            id="prodName"
            variant="outlined"
            name="prodName"
            value={form.prodName}
            onChange={handleChange}
          />
          <TextField
            label={t('sale_price')}
            required
            autoFocus
            id="prodSalePrice"
            variant="outlined"
            name="prodSalePrice"
            value={form.prodSalePrice}
            onChange={handleChange}
          />
          {/* <Controller
            name="featuredImageId"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) =>
              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="creamyellow"
                onClick={() => {
                  onChange(sendId)
                  returnClick('click')
                }}
                onKeyDown={() => {
                  onChange(sendId)
                  returnClick('click')
                }}
                startIcon={<FuseSvgIcon className="hidden sm:flex">material-outline:star_purple500</FuseSvgIcon>}
              >
                Imagen principal
              </Button>
            }
          /> */}
          <DialogActions>
            <Button onClick={() => handleClose()}>Eliminar</Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default ModalSelect