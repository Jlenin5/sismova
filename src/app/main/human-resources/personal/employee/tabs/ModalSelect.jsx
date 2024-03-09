import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import Box from '@mui/material/Box'
import { Controller, useFormContext } from 'react-hook-form'
import Button from '@mui/material/Button'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'

const ModalSelect = ({open, onClose, sendId, setSendId, clickNumber, setClickNumber, onRemoveImage}) => {
  const methods = useFormContext()
  const { control } = methods
  const { t } = useTranslation()

  const returnClick = (press) => {
    if(press === 'click') {
      setSendId(sendId)
      setClickNumber(sendId)
    } else {
      if(clickNumber === sendId) {
        setClickNumber(sendId)
      } else {
        setClickNumber(clickNumber)
        setSendId(null)
      }
    }
    onClose()
  }

  return (
    <Dialog
      onClose={returnClick}
      open={open}
      className='form-dialog-product'
    >
      <Box
        className='box-nav-form'
        sx={{
          width: 230,
          minHeight: 100,
          position: 'relative',
          backgroundColor: 'white'
        }}
      >
        <DialogContent>
          <Controller
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
                {t('main_image')}
              </Button>
            }
          />
          <Button
            className="whitespace-nowrap mx-4 mt-10"
            variant="contained"
            color="primary"
            onClick={() => {
              onRemoveImage(sendId);
              returnClick();
            }}
            startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
          >
            {t('delete_image')}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default ModalSelect