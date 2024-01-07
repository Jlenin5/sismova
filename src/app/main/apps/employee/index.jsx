import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import withReducer from 'app/store/withReducer'
import reducer from './store'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HRTable from './EmployeeTable'
import HRHeader from './EmployeeHeader'
import { delDataMulti, destroyData, getMaxId, postData, putData } from './employeesSlice'

function Index() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [maxId, setMaxId] = useState(null)

  const createData = (info) => {
    setData([...data, info])
    setMaxId(maxId+1)
    postData(info)
  }
  const updateData = (db) => {
    let newData = data.map((el) => (el.empId === db.empId ? db : el))
    setData(newData)
    putData(db)
  }
  const deleteData = (id) => {
    let newData = data.filter((el) => el.empId !== id)
    setData(newData)
    destroyData(id)
  }

  const deleteMultiple = (dataMulti) => {
    const newData = data.filter((el) => !dataMulti.includes(el.empId))
    setData(newData)
    delDataMulti(dataMulti)
  }

  useEffect(() => {
    getMaxId()
    .then(response => {
      setMaxId(response.ultimo_id)
    })
    .catch((error) => {
      console.error('Error al obtener categorías', error)
      setLoading(false)
    })
  }, [])

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header = {
        <HRHeader
          data={data}
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          maxId={maxId}
        />
      }
      content = {
        <HRTable
          data={data}
          setData={setData}
          loading={loading}
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          deleteMultiple={deleteMultiple}
          maxId={maxId}
        />
      }
      scroll = {isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('ecommerceApp', reducer)(Index)