import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import ProductHeader from './ProductHeader'
import ProductTable from './ProductTable'

const index = () => {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={<ProductHeader />}
      content={<ProductTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('inventoryEC', reducer)(index)