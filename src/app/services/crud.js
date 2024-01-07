import api from './api'

const getDatas = async () => {
  try {
    const response = await api.get('cate')
    return response.data
  } catch (error) {
    throw error
  }
}

const postData = async (nuevaCategoria) => {
  try {
    const response = await api.post('category', nuevaCategoria)
    return response.data
  } catch (error) {
    throw error
  }
}

const getDatId = async (categoriaId) => {
  try {
    const response = await api.get(`category/${categoriaId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

const putData = async (categoriaId, categoriaActualizada) => {
  try {
    const response = await api.put(`category/${categoriaId}`, categoriaActualizada)
    return response.data
  } catch (error) {
    throw error
  }
}

const deleteData = async (categoriaId) => {
  try {
    const response = await api.delete(`category/${categoriaId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export { getDatas, postData, getDatId, putData, deleteData }