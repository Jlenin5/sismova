import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import api from './api'

export const obtenerCategorias = createAsyncThunk( 'settingsApp/branchoffice/getBranchoffice', async () => {
  try {
    const response = await api.get('cate')
    return response.data
  } catch (error) {
    throw error
  }
})

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
const categoriasAdapter = createEntityAdapter({})

export const { selectAll: selectCategoria, selectById: selectClientById } =
  categoriasAdapter.getSelectors((state) => state.settingsApp.branchoffice)

const categoriasSlice = createSlice({
  name: 'settingsApp/branchoffice',
  // initialState: categoriasAdapter.getInitialState({
  //   searchText: '',
  // }),
  data: [
    {
      boId: 1,
      boName: '',
      boPhone: '',
      boEmail: '',
      District: 1,
      boAddress: '',
      User: 1
    }
  ],
  reducers: {
    // setData: (state, action) => {
    //   state.data = action.payload
    // }
    // setCompanySearchText: {
    //   reducer: (state, action) => {
    //     state.searchText = action.payload
    //   },
    //   prepare: (event) => ({ payload: event.target.value || '' }),
    // },
  },
  // extraReducers: {
  //   [obtenerCategorias.fulfilled]: categoriasAdapter.setAll,
  // },
})

// export const { setData } = categoriasSlice.actions

// export const { setCompanySearchText } = categoriasSlice.actions

// export const selectCategoriaSearchText = ({ settingsApp }) => settingsApp.branchoffice.searchText

export default categoriasSlice.reducer

export { crearCategoria, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria }