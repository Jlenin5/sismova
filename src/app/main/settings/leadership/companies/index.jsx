import _ from '@lodash'
import withReducer from 'app/store/withReducer'
import reducer from '../store'
import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import CompanyTable from './CompanyTable'
import CompanyHeader from './CompanyHeader'
import { getCompanies, selectCompanies, selectCompaniesSearchText } from '../store/companiesSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Index() {
  const dispatch = useDispatch()
  const companies = useSelector(selectCompanies)
  const searchText = useSelector(selectCompaniesSearchText)
  const [data, setData] = useState(companies)
  const [loading, setLoading] = useState(true)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [lengthPage, setLengthPage] = useState(companies.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData(page, rowsPerPage, searchText)
  }, [page, rowsPerPage, searchText])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(companies, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    } else {
      setData(companies)
    }
  }, [companies, searchText])

  const fetchData = (page, rowsPerPage, search) => {
    setLoading(true)
    setTimeout(() => {
      dispatch(getCompanies({ page: page + 1, rowsPerPage, search })).then((response) => {
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
        <CompanyHeader
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
        <CompanyTable
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

export default withReducer('LeadershipSC', reducer)(Index)