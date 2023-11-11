import withReducer from 'app/store/withReducer'
import { useState, useEffect } from 'react'
import reducer from '../store'
import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import Users from './Users'

function Index() {
  const [data, setData] = useState()

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      content={
        <Users
          data={data}
          setData={setData}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('settings', reducer)(Index)