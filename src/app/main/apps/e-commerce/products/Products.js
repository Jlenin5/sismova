import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProductsHeader from './ProductsHeader'
import ProductsTable from './ProductsTable'
import { getMaxId, putProduct, postProduct, deleteProduct, delProductMulti } from '../store/productsSlice'

function Products() {
  const [data, setData] = useState()
  const [page, setPage] = useState(0)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [maxId, setMaxId] = useState(null)

  const createData = (info, info2) => {
    setData([...data, info2])
    postProduct(info)
    setMaxId(maxId+1)
  }
  const updateData = (db, updateFile) => {
    let newData = data.map((el) => (el.prodId === db.prodId ? db : el))
    setData(newData)
    putProduct(db, updateFile)
  }
  const deleteData = (id) => {
    let newData = data.filter((el) => el.prodId !== id)
    setData(newData)
    deleteProduct(id)
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
        <ProductsHeader
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          maxId={maxId}
        />
      }
      content={
        <ProductsTable
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

export default withReducer('eCommerceApp', reducer)(Products)