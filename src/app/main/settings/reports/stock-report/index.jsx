import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import StockReportHeader from './StockReportHeader'
import StockReportTable from './StockReportTable'

const index = () => {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={<StockReportHeader />}
      content={<StockReportTable />}
      scroll={isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('ReportsSC', reducer)(index)