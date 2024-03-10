import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const url = 'https://sismova.tech/backsis/public/api/prca'

const SelectCategory = ({open,setOpen}) => {
  const routeParams = useParams()
  const [dProdCate, setDProdCate] = useState([])

  const handleClose = () => {
    setOpen(false);
  }
  
  const getProdCates = async () => {
    return await axios.get(url)
  }

  useEffect(() => {
    getProdCates().then(r => setDProdCate(r.data))
  }, [])

  const prcaFilter = dProdCate.filter(r => r.Product === Number(routeParams.id))

  console.log(prcaFilter)
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          height: '480px'
        },
      }}
    >
      <DialogTitle>Selecciona categorías</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectCategory