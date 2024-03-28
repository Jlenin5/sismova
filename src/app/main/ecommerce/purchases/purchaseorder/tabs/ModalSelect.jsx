import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Controller, useFormContext } from 'react-hook-form'
import Button from '@mui/material/Button'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { useEffect, useState } from 'react'
import PurchaseOrderDetailInterface from 'src/app/interfaces/PurchaseOrderDetailInterface'

const ModalSelect = ({open, onClose, listProd}) => {
  const [form, setForm] = useState(PurchaseOrderDetailInterface)
  const methods = useFormContext()
  const { control } = methods
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleClose = () => {
    onClose(form, listProd)
  }

  useEffect(() => {
    if(listProd) {
      console.log(listProd)
      setForm({
        podProdName: listProd.podProdName || '',
        podProdPrice: listProd.podProdPrice || ''
      })
      // setForm({ ...listProd, podProdName: listProd.podProdName || '' })
      // setForm({ ...listProd, podProdPrice: listProd.podProdPrice || '' })
    } else {
      setForm(PurchaseOrderDetailInterface)
    }
  }, [listProd])
  console.log(form)

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
            id="podProdName"
            variant="outlined"
            name="podProdName"
            value={form.podProdName}
            onChange={handleChange}
          />
          <TextField
            label={t('sale_price')}
            required
            autoFocus
            id="podProdPrice"
            variant="outlined"
            name="podProdPrice"
            value={form.podProdPrice}
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