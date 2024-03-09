import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const ErrorDelete = ({ open, handleClose }) => {

  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t('error')}!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('set_another_image_as_primary_before_deleting_this_one')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorDelete