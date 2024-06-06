import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ShowDetails = ({open, close, idE}) => {
  const dispatch = useDispatch()
  // const [emp, setEmp] = useState({})
  const { t } = useTranslation()

  const handleClose = () => {
    close()
  }

  useEffect(() => {
    if(idE) {
      // dispatch(getEmployee(Number(idE))).then(r => setEmp(r.payload))
    }
  }, [dispatch, idE])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-category'
    >
      <DialogTitle>{t('user_data')}</DialogTitle>
      <DialogContent className='grid grid-flow-row-dense grid-cols-2 gap-32 mt-12'>
      </DialogContent>
    </Dialog>  
  )
}

export default ShowDetails