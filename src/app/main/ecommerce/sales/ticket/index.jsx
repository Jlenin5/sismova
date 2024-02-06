import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import TicketHeader from './TicketHeader'
import TicketTable from './TicketTable'

const index = () => {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={<TicketHeader />}
      content={<TicketTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('SalesEC', reducer)(index)