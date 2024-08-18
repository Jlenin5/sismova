import _ from '@lodash'
import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import QuoteHeader from './QuoteHeader'
import QuoteTable from './QuoteTable'
import { getQuotes, selectQuote, selectQuoteSearchText } from '../store/quotesSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Index() {
  const dispatch = useDispatch()
  const quotations = useSelector(selectQuote)
  const searchText = useSelector(selectQuoteSearchText)
  const [data, setData] = useState(quotations)
  const [loading, setLoading] = useState(true)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [lengthPage, setLengthPage] = useState(quotations.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData(page, rowsPerPage, searchText)
  }, [page, rowsPerPage, searchText])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(quotations, (item) => item.code.toLowerCase().includes(searchText.toLowerCase()))
      )
    } else {
      setData(quotations)
    }
  }, [quotations, searchText])

  const fetchData = (page, rowsPerPage, search) => {
    setLoading(true)
    setTimeout(() => {
      dispatch(getQuotes({ page: page + 1, rowsPerPage, search })).then((response) => {
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
        <QuoteHeader
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
        <QuoteTable
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

export default withReducer('SalesEC', reducer)(Index)