import _ from '@lodash'
import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import ProductHeader from './ProductHeader'
import ProductTable from './ProductTable'
import { getProducts, selectProduct, selectProductSearchText } from '../store/productsSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Index() {
  const dispatch = useDispatch()
  const products = useSelector(selectProduct)
  const searchText = useSelector(selectProductSearchText)
  const [data, setData] = useState(products)
  const [loading, setLoading] = useState(true)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [lengthPage, setLengthPage] = useState(products.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData(page, rowsPerPage, searchText)
  }, [page, rowsPerPage, searchText])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(products, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    } else {
      setData(products)
    }
  }, [products, searchText])

  const fetchData = (page, rowsPerPage, search) => {
    setLoading(true)
    setTimeout(() => {
      dispatch(getProducts({ page: page + 1, rowsPerPage, search })).then((response) => {
        setPage(page)
        setRowsPerPage(rowsPerPage)
        setLengthPage(response.payload.totalRows)
        setLoading(false)
      })
    })
  }
  
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={
        <ProductHeader
          data={data}
          loading={loading}
          setLoading={setLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          lengthPage={lengthPage}
          fetchData={fetchData}
        />
      }
      content={
        <ProductTable
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          data={data}
          setData={setData}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          lengthPage={lengthPage}
          fetchData={fetchData}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('inventoryEC', reducer)(Index)