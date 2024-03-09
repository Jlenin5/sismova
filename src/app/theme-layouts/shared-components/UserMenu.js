import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { selectUser } from 'app/store/userSlice'

function UserMenu(props) {
  const user = useSelector(selectUser)
  const [userMenu, setUserMenu] = useState(null)
  const { t } = useTranslation()

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget)
  }

  const userMenuClose = () => {
    setUserMenu(null)
  }

  const roles = user.roles.rolName
  const avatar = user.employees.avatars.avaName

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.userDisplayName}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="text.secondary">
            {roles.toString()}
            {(!roles || (Array.isArray(roles) && roles.length === 0)) && 'Guest'}
          </Typography>
        </div>

        {avatar ? (
          <Avatar className="md:mx-4" alt="user photo" src={`https://sismova.tech/backsis/public/images/avatars/${avatar ? avatar : 'nocamera.png'}`} />
        ) : (
          <Avatar className="md:mx-4">{user.userDisplayName.charAt(0)}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!roles || roles.length === 0 ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t('sign_in')} />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t('sign_up')} />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t('my_profile')} />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t('mail')} />
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/sign-out"
              onClick={() => {
                userMenuClose()
              }}
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t('sign_out')} />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  )
}

export default UserMenu