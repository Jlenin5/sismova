import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import PurchaseOrderHeader from './PurchaseOrderHeader'
import PurchaseOrderTable from './PurchaseOrderTable'
import { useState, useEffect } from 'react'
import { getPurhcaseOrders, selectPurchaseOrder } from '../store/purchaseordersSlice'
import { useDispatch, useSelector } from 'react-redux'

const index = () => {
  const dispatch = useDispatch()
  const purchaseOrders = useSelector(selectPurchaseOrder)
  const [data,setData] = useState(purchaseOrders)
  const [loading, setLoading] = useState(true)
  const [lengthPage, setLengthPage] = useState(data.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(getPurhcaseOrders({ page: page + 1, rowsPerPage })).then((response) => {
      setData(response.payload.data)
      setLengthPage(response.payload.totalRows)
      setLoading(false)
    })
  }, [dispatch, page])

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={
        <PurchaseOrderHeader
          data={data}
          loading={loading}
          setLoading={setLoading}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      }
      content={
        <PurchaseOrderTable
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

export default withReducer('PurchaseEC', reducer)(index)