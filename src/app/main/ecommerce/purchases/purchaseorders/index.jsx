import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import PurchaseOrderHeader from './PurchaseOrderHeader'
import PurchaseOrderTable from './PurchaseOrderTable'

const index = () => {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={<PurchaseOrderHeader />}
      content={<PurchaseOrderTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('PurchaseEC', reducer)(index)