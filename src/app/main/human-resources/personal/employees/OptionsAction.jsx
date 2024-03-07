import { useTranslation } from 'react-i18next'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Employee from './EmployeeForm'
import { useState } from 'react';

const ITEM_HEIGHT = 48

const OptionsAction = ({dataToEdit, setDataToEdit, openOption, anchorEl, setAnchorEl}) => {

  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const handleClickOpen = () => {
    handleClose()
    setOpen(true)
  }
  const handleCloseEdit = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClickOpen}>
          {t('edit')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {t('delete')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {t('show_details')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {t('convert_to_user')}
        </MenuItem>
      </Menu>
      <Employee
        open={open}
        onClose={handleCloseEdit}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
    </>
  )
}

export default OptionsAction