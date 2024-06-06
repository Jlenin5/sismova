import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { useState } from 'react'
import EmployeeHeader from './EmployeeHeader'
import EmployeeTable from './EmployeeTable'

const index = () => {

  const [dataToEdit, setDataToEdit] = useState(null)

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={
        <EmployeeHeader
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      content={
        <EmployeeTable
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      scroll={isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('PersonalHR', reducer)(index)