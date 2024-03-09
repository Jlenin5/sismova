import { useTranslation } from 'react-i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ModalConvertToUser from './ModalConvertToUser'
import ShowDetails from './ShowDetails'
import { deleteEmployee } from '../store/employeesSlice'

const ITEM_HEIGHT = 48

const OptionsAction = ({idE, openOption, anchorEl, setAnchorEl}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openCovertUser, setOpenConvertUser] = useState(false)
  const [openShowDetails, setOpenShowDetails] = useState(false)
  const { t } = useTranslation()

  const editEmployee = () => {
    handleClose()
    navigate(`/human-resources/personal/employee/${idE}`)
  }

  const openModalConvertUser = () => {
    handleClose()
    setOpenConvertUser(true)
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
        <MenuItem onClick={() => {
          handleClose()
          dispatch(deleteEmployee(idE))
        }}>
          {t('delete')}
        </MenuItem>
        <MenuItem onClick={openModalShowDetails}>
          {t('show_details')}
        </MenuItem>
        <MenuItem onClick={openModalConvertUser}>
          {t('convert_to_user')}
        </MenuItem>
      </Menu>
      <ModalConvertToUser
        open={openCovertUser}
        close={closeModalConvertUser}
        idE={idE}
      />
      <ShowDetails
        open={openShowDetails}
        close={closeModalShowDetails}
        idE={idE}
      />
    </>
  )
}

export default OptionsAction