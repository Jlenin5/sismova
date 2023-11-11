import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getPermissions = async () => {
    try {
      const response = await axios.get(API_URL+'permissions')
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

const productsAdapter = createEntityAdapter({})

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products)

const productsSlice = createSlice({
  name: 'settings/permissions',
  initialState: productsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    // [getPermissions.fulfilled]: productsAdapter.setAll,
    // [getMaxId.fulfilled]: productsAdapter.setAll,
    // [getProduct.fulfilled]: productsAdapter.setAll,
    // [putProduct.fulfilled]: productsAdapter.setAll,
    // [postProduct.fulfilled]: productsAdapter.setAll,
    // [deleteProduct.fulfilled]: productsAdapter.setAll,
    // [delProductMulti.fulfilled]: productsAdapter.setAll,
  },
})

export const { setProductsSearchText } = productsSlice.actions

export const selectProductsSearchText = ({ eCommerceApp }) => eCommerceApp.products.searchText

export default productsSlice.reducer
