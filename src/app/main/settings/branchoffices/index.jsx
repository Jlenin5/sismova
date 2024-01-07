import withReducer from 'app/store/withReducer'
import { useState, useEffect } from 'react'
import reducer from '../store'
import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import BranchOfficeTable from './BranchOfficeTable'
import BranchOfficeHeader from './BranchOfficeHeader'
import { getMaxId, putData, postData, deleteData } from '../store/branchofficeSlice'

const index = () => {
  const [data, setData] = useState()
  const [page, setPage] = useState(0)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [maxId, setMaxId] = useState(null)

  const createData = (info, info2) => {
    setData([...data, info2])
    postData(info)
    setMaxId(maxId+1)
  }
  const updateData = (db, updateFile) => {
    let newData = data.map((el) => (el.boId === db.boId ? db : el))
    setData(newData)
    putData(db, updateFile)
  }
  const deleteData = (id) => {
    let newData = data.filter((el) => el.boId !== id)
    setData(newData)
    deleteData(id)
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
        <BranchOfficeHeader
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          maxId={maxId}
        />
      }
      content={
        <BranchOfficeTable
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

export default withReducer('settingsApp', reducer)(index)