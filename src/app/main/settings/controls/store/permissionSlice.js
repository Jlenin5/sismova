import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getPermissions = createAsyncThunk( 'ControlsSC/permissions/getPermissions', async () => {
  const response = await axios.get(API_URL+'perm')
  return response.data
})

export const getMaxId = createAsyncThunk( 'ControlsSC/permissions/getMaxId', async () => {
  const response = await axios.get(API_URL+'permmax')
  return response.data
})

export const putPermission = createAsyncThunk( 'ControlsSC/permissions/putPermission', async (data) => {
  const {id, Rol, NamesMenu} = data
  await axios.put(API_URL+'updateperm/'+id, {Rol, NamesMenu})
  return data
})

export const postPermission = createAsyncThunk( 'ControlsSC/permissions/postPermission', async (dataJson) => {
  await axios.post(API_URL+'postperm', dataJson)
  return dataJson
})

export const deletePermission = createAsyncThunk( 'ControlsSC/permissions/deletePermission', async (id) => {
  await axios.delete(API_URL+'deleteperm/'+id)
  return id
})

export const delPermMulti = createAsyncThunk( 'ControlsSC/permissions/delPermMulti', async (ids) => {
  await axios.delete(API_URL + 'delpermmulti', {
    params: {
      dataId: ids,
    },
  })
  return ids
})

const permissionAdapter = createEntityAdapter({})

export const { selectAll: selectPermission, selectById: selectPermissionById } =
  permissionAdapter.getSelectors((state) => state.ControlsSC.permission)

const permissionSlice = createSlice({
  name: 'ControlsSC/permissions',
  initialState: permissionAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setPermissionSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getPermissions.fulfilled]: permissionAdapter.setAll,
    [putPermission.fulfilled]: (state, action) => permissionAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postPermission.fulfilled]: permissionAdapter.addOne,
    [deletePermission.fulfilled]: permissionAdapter.removeOne,
    [delPermMulti.fulfilled]: permissionAdapter.removeMany,
  },
})

export const { setPermissionSearchText } = permissionSlice.actions

export const selectPermissionSearchText = ({ ControlsSC }) => ControlsSC.permission.searchText

export default permissionSlice.reducer