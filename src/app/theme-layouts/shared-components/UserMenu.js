import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { selectUser } from 'app/store/userSlice'
import { useDispatch } from 'react-redux'
import { setRole } from 'app/store/roleSlice'
import axios from 'axios';


function UserMenu(props) {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [dataRol, setDataRol] = useState([])
  const [dataAvatar,setDataAvatar] = useState([])

  const [userMenu, setUserMenu] = useState(null)

  const url = 'https://sismova.tech/backsis/public/api/'

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget)
  }

  const getAvatar = async() => {
    const response = await axios.get(url+'ava')
    return response.data
  }
  const filtAva = dataAvatar.find(r => r.id === user.Avatar)

  const userMenuClose = () => {
    setUserMenu(null)
  }

  useEffect(() => {
    dispatch(setRole())
    .then((response) => {
      setDataRol(response.payload)
    })
    getAvatar().then(r => setDataAvatar(r))
  }, [dispatch])

  const rolapi = dataRol.find((e) => e.id === user.Rol)

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
          {rolapi ? 
            <Typography className="text-11 font-medium capitalize" color="text.secondary">
              {rolapi.rolName.toString()}
              {(!rolapi.rolName || (Array.isArray(rolapi.rolName) && rolapi.rolName.length === 0)) && 'Guest'}
            </Typography>
          : ''}
        </div>

        {filtAva ? (
            filtAva.avaName ? 
              <Avatar className="md:mx-4" alt="user photo" src={`https://sismova.tech/backsis/public/images/avatars/${filtAva.avaName ? filtAva.avaName : 'nocamera.png'}`} />
             : 
              <Avatar className="md:mx-4">{user.userDisplayName.charAt(0)}</Avatar>
        ) : ''}
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
        {
          rolapi ? 
          !rolapi.rolName || rolapi.rolName.length === 0 ? (
            <>
              <MenuItem component={Link} to="/sign-in" role="button">
                <ListItemIcon className="min-w-40">
                  <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </MenuItem>
              <MenuItem component={Link} to="/sign-up" role="button">
                <ListItemIcon className="min-w-40">
                  <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
                </ListItemIcon>
                <ListItemText primary="Sign up" />
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
                <ListItemIcon className="min-w-40">
                  <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
                </ListItemIcon>
                <ListItemText primary="Mi perfil" />
              </MenuItem>
              <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
                <ListItemIcon className="min-w-40">
                  <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
                </ListItemIcon>
                <ListItemText primary="Correo" />
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
                <ListItemText primary="Salir" />
              </MenuItem>
            </>
          )
          :
          ''
        }
      </Popover>
    </>
  )
}

export default UserMenu