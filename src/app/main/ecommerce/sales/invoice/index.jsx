import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import InvoiceHeader from './InvoiceHeader'
import InvoiceTable from './InvoiceTable'

const index = () => {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={<InvoiceHeader />}
      content={<InvoiceTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('SalesEC', reducer)(index)