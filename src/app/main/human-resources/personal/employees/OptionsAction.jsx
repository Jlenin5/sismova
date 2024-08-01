import { useTranslation } from 'react-i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ModalConvertToUser from './ModalConvertToUser'
import ShowDetails from './ShowDetails'
import { deleteEmployee } from '../store/employeesSlice'
import EmployeeForm from './EmployeeForm'

const ITEM_HEIGHT = 48

function OptionsAction(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openEditEmployee, setOpenEditEmployee] = useState(false)
  const [openCovertUser, setOpenConvertUser] = useState(false)
  const [openShowDetails, setOpenShowDetails] = useState(false)
  const { t } = useTranslation()

  // const editEmployee = () => {
  //   handleClose()
  //   navigate(`/human-resources/personal/employee/${idE}`)
  // }

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

  const openModalShowDetails = () => {
    handleClose()
    setOpenShowDetails(true)
  }
  const closeModalShowDetails = () => {
    props.fetchData(props.page, props.rowsPerPage, '')
    setOpenShowDetails(false)
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
        idE={props.idE}
      />
      <EmployeeForm
        open={openEditEmployee}
        onClose={closeModalEditEmployee}
        idE={props.idE}
        dataToEdit={props.dataToEdit}
        setDataToEdit={props.setDataToEdit}
      />
      {/* <ShowDetails
        open={openShowDetails}
        close={closeModalShowDetails}
        idE={idE}
      /> */}
    </>
  )
}

export default OptionsAction