import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesHeader from './CategoriesHeader'
import CategoriesTable from './CategoriesTable'
import { delCateMulti, deleteCategory, getCategories, getMaxId, postCategory, putCategory, selectCategories, selectCategoriesSearchText } from '../store/categoriesSlice'

function Categories() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [page, setPage] = useState(0)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [maxId, setMaxId] = useState(null)
  // const categories = useSelector(selectCategories)
  // const searchText = useSelector(selectCategoriesSearchText)

  const createData = (info) => {
    setData([...data, info])
    setMaxId(maxId+1)
    postCategory(info)
  }
  const updateData = (db) => {
    let newData = data.map((el) => (el.cateId === db.cateId ? db : el))
    setData(newData)
    putCategory(db)
  }
  const deleteData = (id) => {
    let newData = data.filter((el) => el.cateId !== id)
    setData(newData)
    deleteCategory(id)
  }

  const deleteMultiple = (dataMulti) => {
    const newData = data.filter((el) => !dataMulti.includes(el.cateId))
    setData(newData)
    delCateMulti(dataMulti)
  }

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  useEffect(() => {
    getCategories()
    .then((response) => {
      setData(response)
      setLoading(false)
    })
    getMaxId()
    .then(response => {
      setMaxId(response.ultimo_id)
    })
    .catch((error) => {
      console.error('Error al obtener categorías', error)
      setLoading(false)
    })
  }, [])

  // useEffect(() => {
  //   if (searchText.length !== 0) {
  //     setData(
  //       _.filter(categories, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
  //     )
  //     setPage(0)
  //   } else {
  //     setData(categories)
  //   }
  // }, [categories, searchText])

  return (
    <FusePageCarded
      header = {
        <CategoriesHeader
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          maxId={maxId}
        />
      }
      content = {
        <CategoriesTable
          data={data}
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

export default withReducer('ecommerceApp', reducer)(Categories)