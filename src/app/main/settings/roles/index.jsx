import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { useState, useEffect } from 'react'
import { getMaxId, putRol, postRol, deleteRol } from '../store/rolesSlice'
import RolTable from './RolTable'
import RolHeader from './RolHeader'

function Index() {

  const [data, setData] = useState()
  const [page, setPage] = useState(0)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [maxId, setMaxId] = useState(null)

  const createData = (info) => {
    setData([...data, info])
    setMaxId(maxId+1)
    postRol(info)
  }
  const updateData = (db) => {
    let newData = data.map((el) => (el.rolId === db.rolId ? db : el))
    setData(newData)
    putRol(db)
  }
  const deleteData = (id) => {
    let newData = data.filter((el) => el.rolId !== id)
    setData(newData)
    deleteRol(id)
  }

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  useEffect(() => {
    getMaxId()
    .then((response) => {
      setMaxId(response.ultimo_id)
    })
    .catch((error) => {
      console.error('Error al obtener productos', error)
    })
  }, [])

  return (
    <FusePageCarded
      header={
        <RolHeader
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          maxId={maxId}
        />
      }
      content={
        <RolTable
          data={data}
          page={page}
          setPage={setPage}
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          setData={setData}
          maxId={maxId}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('settingsApp', reducer)(Index)