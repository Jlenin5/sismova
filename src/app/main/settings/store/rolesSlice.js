import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getRoles = createAsyncThunk( 'settingsApp/roles/getRoles', async () => {
    try {
      const response = await axios.get(API_URL+'rol')
      return response.data
    } catch(error) {
      throw error
    }
})

export const getMaxId = async () => {
  try {
    const response = await axios.get(API_URL+'rolmax')
    return await response.data
  } catch(error) {
    throw error
  }
}

export const getRol = async (id) => {
  try {
    const response = await axios.get(API_URL+'rol/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const putRol = async (data) => {
  try {
    const {rolId, rolName} = data
    const response = await axios.put(API_URL+'updateproduct/'+rolId, {rolName})
    return await response.data
  } catch(error) {
    throw error
  }
}

export const postRol = async (dataJson) => {
  try {
    console.log(dataJson)
    const response = await axios.post(API_URL+'postrol', dataJson)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const deleteRol = async (id) => {
  try {
    const response = await axios.delete(API_URL+'deleterol/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const delRolMulti = async (rolId) => {
  try {
    const response = await axios.delete(API_URL + 'delrolmulti', {
      params: {
        dataId: rolId,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const rolesAdapter = createEntityAdapter({})

export const { selectAll: selectRoles, selectById: selectRolById } = rolesAdapter.getSelectors((state) => state.settingsApp.roles)

const rolesSlice = createSlice({
  name: 'settingsApp/roles',
  initialState: rolesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setRolesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getRoles.fulfilled]: rolesAdapter.setAll,
    // [getMaxId.fulfilled]: rolesAdapter.setAll,
  },
})

export const { setRolesSearchText } = rolesSlice.actions

export const selectRolesSearchText = ({ settingsApp }) => settingsApp.roles.searchText

export default rolesSlice.reducer