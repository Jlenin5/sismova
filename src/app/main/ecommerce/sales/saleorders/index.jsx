import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import SaleOrderHeader from './SaleOrderHeader'
import SaleOrderTable from './SaleOrderTable'
import { useState, useEffect } from 'react'
import { getSaleOrders, selectSaleOrder } from '../store/saleordersSlice'
import { useDispatch, useSelector } from 'react-redux'

const index = () => {

  const dispatch = useDispatch()
  const purchaseOrders = useSelector(selectSaleOrder)
  const [data,setData] = useState(purchaseOrders)
  const [loading, setLoading] = useState(true)
  const [lengthPage, setLengthPage] = useState(data.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(getSaleOrders({ page: page + 1, rowsPerPage })).then((response) => {
      setData(response.payload.data)
      setLengthPage(response.payload.totalRows)
      setLoading(false)
    })
  }, [dispatch, page])

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={
        <SaleOrderHeader
          data={data}
          loading={loading}
          setLoading={setLoading}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      }
      content={
        <SaleOrderTable
          data={data}
          setData={setData}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('SalesEC', reducer)(index)