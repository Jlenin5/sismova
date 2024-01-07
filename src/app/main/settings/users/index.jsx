import withReducer from 'app/store/withReducer'
import { useState, useEffect } from 'react'
import reducer from '../store'
import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import Users from './UserTable'
import UserTable from './UserTable'
import UserHeader from './UserHeader'
import { getMaxId, putUser, postUser, deleteUser } from '../store/usersSlice'

function Index() {
  
  const [data, setData] = useState()
  const [page, setPage] = useState(0)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [maxId, setMaxId] = useState(null)

  const createData = (info, info2) => {
    setData([...data, info2])
    postUser(info)
    setMaxId(maxId+1)
  }
  const updateData = (db, updateFile) => {
    let newData = data.map((el) => (el.userdId === db.userdId ? db : el))
    setData(newData)
    putUser(db, updateFile)
  }
  const deleteData = (id) => {
    let newData = data.filter((el) => el.userdId !== id)
    setData(newData)
    deleteUser(id)
  }

  useEffect(() => {
    getMaxId()
    .then((response) => {
      setMaxId(response.ultimo_id)
    })
    .catch((error) => {
      console.error('Error al obtener usuarios', error)
    })
  }, [])

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={
        <UserHeader
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          maxId={maxId}
        />
      }
      content={
        <UserTable
          data={data}
          setData={setData}
          page={page}
          setPage={setPage}
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          maxId={maxId}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('settingsApp', reducer)(Index)