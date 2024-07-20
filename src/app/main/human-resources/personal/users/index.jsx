import _ from '@lodash'
import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import UserHeader from './UserHeader'
import UserTable from './UserTable'
import { getUsers, selectUser, selectUserSearchText } from '../store/userSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Index() {
  const dispatch = useDispatch()
  const users = useSelector(selectUser)
  const searchText = useSelector(selectUserSearchText)
  const [data, setData] = useState(users)
  const [loading, setLoading] = useState(true)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [lengthPage, setLengthPage] = useState(users.length)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData(page, rowsPerPage, searchText)
  }, [page, rowsPerPage, searchText])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(users, (item) => item.nickname.toLowerCase().includes(searchText.toLowerCase()))
      )
    } else {
      setData(users)
    }
  }, [users, searchText])

  const fetchData = (page, rowsPerPage, search) => {
    setLoading(true)
    setTimeout(() => {
      dispatch(getUsers({ page: page + 1, rowsPerPage, search })).then((response) => {
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
      header = {
        <UserHeader
          data={data}
          loading={loading}
          setLoading={setLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          lengthPage={lengthPage}
          fetchData={fetchData}
        />
      }
      content = {
        <UserTable
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
      scroll = {isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('PersonalHR', reducer)(Index)