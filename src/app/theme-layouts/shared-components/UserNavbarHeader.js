import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { selectUser } from 'app/store/userSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Root = styled('div')(({ theme }) => ({
  '& .username, & .email': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  '& .avatar': {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}))

function UserNavbarHeader(props) {
  const [dataEmployee,setDataEmployee] = useState([])
  const [dataAvatar,setDataAvatar] = useState([])
  const user = useSelector(selectUser)

  const url = 'https://sismova.tech/backsis/public/api/'

  const getEmployee = async() => {
    const response = await axios.get(url+'emp')
    return response.data
  }

  const getAvatar = async() => {
    const response = await axios.get(url+'ava')
    return response.data
  }

  useEffect(() => {
    getEmployee().then(r => setDataEmployee(r))
    getAvatar().then(r => setDataAvatar(r))
  }, [])

  
  const filtHr = dataEmployee.find(r => r.id === user.Employee)
  const filtAva = dataAvatar.find(r => r.id === user.Avatar)

  return (
    <Root className="user relative flex flex-col items-center justify-center p-16 pb-14 shadow-0">
      <div className="flex items-center justify-center mb-24">
        <Avatar
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.secondary',
          }}
          className="avatar text-32 font-bold w-96 h-96"
          src={`https://sismova.tech/backsis/public/images/avatars/${filtAva ? filtAva.avaName : 'nocamera.png'}`}
          alt={user.userDisplayName}
        >
          {user.userDisplayName.charAt(0)}
        </Avatar>
      </div>
      <Typography className="username text-14 whitespace-nowrap font-medium">
        {user.userDisplayName}
      </Typography>
      <Typography className="email text-13 whitespace-nowrap font-medium" color="text.secondary">
        {filtHr ? filtHr.empEmail : ''}
      </Typography>
    </Root>
  )
}

export default UserNavbarHeader