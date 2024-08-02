import { useTranslation } from 'react-i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ModalConvertToUser from './ModalConvertToUser'
import { deleteEmployee } from '../store/employeesSlice'
import EmployeeForm from './EmployeeForm'

const ITEM_HEIGHT = 48

function OptionsAction(props) {
  const dispatch = useDispatch()
  const [openEditEmployee, setOpenEditEmployee] = useState(false)
  const [openCovertUser, setOpenConvertUser] = useState(false)
  const { t } = useTranslation()

  const openModalEditEmployee = () => {
    handleClose()
    setOpenEditEmployee(true)
  }

  const closeModalEditEmployee = () => {
    props.fetchData(props.page, props.rowsPerPage, '')
    setOpenEditEmployee(false)
  }

  const openModalConvertUser = () => {
    handleClose()
    setOpenConvertUser(true)
  }
  
  const closeModalConvertUser = () => {
    props.fetchData(props.page, props.rowsPerPage, '')
    setOpenConvertUser(false)
  }

  const handleClose = () => {
    props.setAnchorEl(null)
  }

  return (
    <>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={props.anchorEl}
        open={props.openOption}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => openModalEditEmployee( props.setDataToEdit(props.idE))}>
          {t('edit')}
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          dispatch(deleteEmployee(props.idE.id))
        }}>
          {t('delete')}
        </MenuItem>
        {
          props.idE?.user ? '' :
          <MenuItem onClick={openModalConvertUser}>
            {t('convert_to_user')}
          </MenuItem>
        }
      </Menu>
      <ModalConvertToUser
        open={openCovertUser}
        close={closeModalConvertUser}
        emp={props.idE}
      />
      <EmployeeForm
        open={openEditEmployee}
        onClose={closeModalEditEmployee}
        idE={props.idE}
        dataToEdit={props.dataToEdit}
        setDataToEdit={props.setDataToEdit}
      />
    </>
  )
}

export default OptionsAction