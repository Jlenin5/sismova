import _ from '@lodash'
import withReducer from 'app/store/withReducer'
import reducer from '../store'
import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import BranchOfficeTable from './BranchOfficeTable'
import BranchOfficeHeader from './BranchOfficeHeader'
import { getBranchoffices, selectBranchOffice, selectBranchOfficeSearchText } from '../store/branchofficeSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Index() {
  const dispatch = useDispatch()
  const branch_offices = useSelector(selectBranchOffice)
  const searchText = useSelector(selectBranchOfficeSearchText)
  const [data, setData] = useState(branch_offices)
  const [loading, setLoading] = useState(true)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [lengthPage, setLengthPage] = useState(branch_offices.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData(page, rowsPerPage, searchText)
  }, [page, rowsPerPage, searchText])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(branch_offices, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    } else {
      setData(branch_offices)
    }
  }, [branch_offices, searchText])

  const fetchData = (page, rowsPerPage, search) => {
    setLoading(true)
    setTimeout(() => {
      dispatch(getBranchoffices({ page: page + 1, rowsPerPage, search })).then((response) => {
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
        <BranchOfficeHeader
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
        <BranchOfficeTable
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