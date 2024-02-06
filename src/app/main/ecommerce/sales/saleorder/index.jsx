import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import SaleOrderHeader from './SaleOrderHeader'
import SaleOrderTable from './SaleOrderTable'

const index = () => {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={<SaleOrderHeader />}
      content={<SaleOrderTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('SalesEC', reducer)(index)