import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getRoles = createAsyncThunk( 'ControlsSC/roles/getRoles', async () => {
  const response = await axios.get(API_URL+'rol')
  return response.data
})

export const getMaxId = createAsyncThunk( 'ControlsSC/roles/getMaxId', async () => {
  const response = await axios.get(API_URL+'rolmax')
  return response.data
})

export const putRol = createAsyncThunk( 'ControlsSC/roles/putRol', async (data) => {
  const {id, rolName} = data
  await axios.put(API_URL+'updaterol/'+id, {rolName})
  return data
})

export const postRol = createAsyncThunk( 'ControlsSC/roles/postRol', async (dataJson) => {
  await axios.post(API_URL+'postrol', dataJson)
  return dataJson
})

export const deleteRol = createAsyncThunk( 'ControlsSC/roles/deleteRol', async (id) => {
  await axios.delete(API_URL+'deleterol/'+id)
  return id
})

export const delRolMulti = createAsyncThunk( 'ControlsSC/roles/delRolMulti', async (ids) => {
  await axios.delete(API_URL + 'delrolmulti', {
    params: {
      dataId: ids,
    },
  })
  return ids
})

const rolAdapter = createEntityAdapter({})

export const { selectAll: selectRol, selectById: selectRolById } =
  rolAdapter.getSelectors((state) => state.ControlsSC.rol)

const rolSlice = createSlice({
  name: 'ControlsSC/roles',
  initialState: rolAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setRolSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getRoles.fulfilled]: rolAdapter.setAll,
    [putRol.fulfilled]: (state, action) => rolAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postRol.fulfilled]: rolAdapter.addOne,
    [deleteRol.fulfilled]: rolAdapter.removeOne,
    [delRolMulti.fulfilled]: rolAdapter.removeMany,
  },
})

export const { setRolSearchText } = rolSlice.actions

export const selectRolSearchText = ({ ControlsSC }) => ControlsSC.rol.searchText

export default rolSlice.reducer