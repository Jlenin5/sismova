import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import EmployeeHeader from './EmployeeHeader'
import EmployeeTable from './EmployeeTable'

const index = () => {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={<EmployeeHeader />}
      content={<EmployeeTable />}
      scroll={isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('PersonalHR', reducer)(index)