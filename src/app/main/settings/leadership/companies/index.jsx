import withReducer from 'app/store/withReducer'
import { useState } from 'react'
import reducer from '../store'
import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import CompanyTable from './CompanyTable'
import CompanyHeader from './CompanyHeader'

const index = () => {
  const [dataToEdit, setDataToEdit] = useState(null)

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={
        <CompanyHeader
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      content={
        <CompanyTable
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('LeadershipSC', reducer)(index)