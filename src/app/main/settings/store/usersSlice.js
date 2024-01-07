import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getUsers = createAsyncThunk( 'settingsApp/users/getUsers', async () => {
    try {
      const response = await axios.get(API_URL+'user')
      return response.data
    } catch(error) {
      throw error
    }
})

export const getMaxId = async () => {
  try {
    const response = await axios.get(API_URL+'usermax')
    return await response.data
  } catch(error) {
    throw error
  }
}

export const getUser = async (id) => {
  try {
    const response = await axios.get(API_URL+'user/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const putUser = async (data) => {
  try {
    const {id, s_number,name,description,brand,vendor,cost,price,tax,weight,image,stock,state} = data
    const response = await axios.put(API_URL+'updateproduct/'+id, {s_number,name,description,brand,vendor,cost,price,tax,weight,image,stock,state})
    return await response.data
  } catch(error) {
    throw error
  }
}

export const postUser = async (dataJson) => {
  try {
    const response = await axios.post(API_URL+'postuser', dataJson)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(API_URL+'deleteuser/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const delUserMulti = async (userId) => {
  try {
    const response = await axios.delete(API_URL + 'delusermulti', {
      params: {
        product_id: userId,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const usersAdapter = createEntityAdapter({})

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors((state) => state.settingsApp.users)

const usersSlice = createSlice({
  name: 'settingsApp/users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      const userWithIds = action.payload.map(user => ({
        id: user.userId,
        ...user
      }))
      usersAdapter.setAll(state, userWithIds)
    },
    // [getMaxId.fulfilled]: usersAdapter.setAll,
  },
})

export const { setUsersSearchText } = usersSlice.actions

export const selectUsersSearchText = ({ settingsApp }) => settingsApp.users.searchText

export default usersSlice.reducer