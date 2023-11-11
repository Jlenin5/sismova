import api from './api'

const obtenerCategorias = async () => {
  try {
    const response = await api.get('category')
    return response.data
  } catch (error) {
    throw error
  }
}

const crearCategoria = async (nuevaCategoria) => {
  try {
    const response = await api.post('category', nuevaCategoria)
    return response.data
  } catch (error) {
    throw error
  }
}

const obtenerCategoriaPorId = async (categoriaId) => {
  try {
    const response = await api.get(`category/${categoriaId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

const actualizarCategoria = async (categoriaId, categoriaActualizada) => {
  try {
    const response = await api.put(`category/${categoriaId}`, categoriaActualizada)
    return response.data
  } catch (error) {
    throw error
  }
}

const eliminarCategoria = async (categoriaId) => {
  try {
    const response = await api.delete(`category/${categoriaId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export { obtenerCategorias, crearCategoria, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria }