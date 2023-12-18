import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClientsHeader from './ClientsHeader'
import ClientsTable from './ClientsTable'
import { delCliMulti, deleteClient, getClients, getMaxId, postClient, putClient, selectClients, selectClientsSearchText } from '../store/clientsSlice'

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
    postClient(info)
  }
  const updateData = (db) => {
    let newData = data.map((el) => (el.cliId === db.cliId ? db : el))
    setData(newData)
    putClient(db)
  }
  const deleteData = (id) => {
    let newData = data.filter((el) => el.cliId !== id)
    setData(newData)
    deleteClient(id)
  }

  const deleteMultiple = (dataMulti) => {
    const newData = data.filter((el) => !dataMulti.includes(el.cliId))
    setData(newData)
    delCliMulti(dataMulti)
  }

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

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

  return (
    <FusePageCarded
      header = {
        <ClientsHeader
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
        <ClientsTable
          data={data}
          loading={loading}
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          deleteMultiple={deleteMultiple}
          setData={setData}
          maxId={maxId}
        />
      }
      scroll = {isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('eCommerceApp', reducer)(Index)