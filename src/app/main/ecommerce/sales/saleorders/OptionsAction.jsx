import { useTranslation } from 'react-i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from 'src/app/services/url'
// import { deleteEmployee } from '../store/employeesSlice'

const ITEM_HEIGHT = 48

const OptionsAction = ({idE, openOption, anchorEl, setAnchorEl}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const editEmployee = () => {
    handleClose()
    navigate(`/ecommerce/sales/sale-order/${idE}`)
  }

  const purchaseOrderPdf = () => {
    handleClose()
    window.open(`${API_URL}pdfpuorid/${idE}`)
  }
  const closeModalConvertUser = () => {
    setOpenConvertUser(false)
  }

  const openModalShowDetails = () => {
    handleClose()
    setOpenShowDetails(true)
  }
  const closeModalShowDetails = () => {
    setOpenShowDetails(false)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={openOption}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={editEmployee}>
          {t('edit')}
        </MenuItem>
        <MenuItem onClick={purchaseOrderPdf}>
          {t('pdf')}
        </MenuItem>
      </Menu>
    </>
  )
}

export default OptionsAction