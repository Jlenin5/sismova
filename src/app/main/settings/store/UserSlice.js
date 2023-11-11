import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getUsers = async () => {
    try {
      const response = await axios.get(API_URL+'users')
      return await response.data
    } catch(error) {
      throw error
    }
}

// export const getMaxId = async () => {
//   try {
//     const response = await axios.get(API_URL+'productmax')
//     return await response.data
//   } catch(error) {
//     throw error
//   }
// }

// export const getProduct = async (id) => {
//   try {
//     const response = await axios.get(API_URL+'product/'+id)
//     return await response.data
//   } catch(error) {
//     throw error
//   }
// }

// export const putProduct = async (data) => {
//   try {
//     const {id, s_number,name,description,brand,vendor,cost,price,tax,weight,image,stock,state} = data
//     const response = await axios.put(API_URL+'updateproduct/'+id, {s_number,name,description,brand,vendor,cost,price,tax,weight,image,stock,state})
//     return await response.data
//   } catch(error) {
//     throw error
//   }
// }

// export const postProduct = async (dataJson) => {
//   try {
//     const response = await axios.post(API_URL+'postproduct', dataJson)
//     return await response.data
//   } catch(error) {
//     throw error
//   }
// }

// export const deleteProduct = async (id) => {
//   try {
//     const response = await axios.delete(API_URL+'deleteproduct/'+id)
//     return await response.data
//   } catch(error) {
//     throw error
//   }
// }

// export const delProductMulti = async (productId) => {
//   try {
//     const response = await axios.delete(API_URL + 'delproductmulti', {
//       params: {
//         product_id: productId,
//       },
//     })
//     return response.data
//   } catch (error) {
//     throw error
//   }
// }

const usersAdapter = createEntityAdapter({})

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors((state) => state.eCommerceApp.users)

const usersSlice = createSlice({
  name: 'settings/users',
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
    // [getUsers.fulfilled]: usersAdapter.setAll,
    // [getMaxId.fulfilled]: usersAdapter.setAll,
    // [getProduct.fulfilled]: usersAdapter.setAll,
    // [putProduct.fulfilled]: usersAdapter.setAll,
    // [postProduct.fulfilled]: usersAdapter.setAll,
    // [deleteProduct.fulfilled]: usersAdapter.setAll,
    // [delProductMulti.fulfilled]: usersAdapter.setAll,
  },
})

export const { setUsersSearchText } = usersSlice.actions

export const selectUsersSearchText = ({ eCommerceApp }) => eCommerceApp.users.searchText

export default usersSlice.reducer
