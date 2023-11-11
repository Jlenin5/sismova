import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getProducts = createAsyncThunk( 'eCommerceApp/products/getProductos', async () => {
    try {
      const response = await axios.get(API_URL+'prod')
      return await response.data
    } catch(error) {
      throw error
    }
})

export const getMaxId = async () => {
  try {
    const response = await axios.get(API_URL+'prodmax')
    return await response.data
  } catch(error) {
    throw error
  }
}

export const getProduct = async (id) => {
  try {
    const response = await axios.get(API_URL+'prod/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const putProduct = async (data, updateFile) => {
  try {
    const formData = new FormData()
    formData.append('prodImage', updateFile)
    for(const key in data) {
      formData.append(key, data[key])
    }
    const response = await axios.post(API_URL+'updateprod/'+data.prodId, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return await response.data
  } catch(error) {
    throw error
  }
}

export const postProduct = async (dataJson) => {
  try {
    const response = await axios.post(API_URL+'postprod', dataJson, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return await response.data
  } catch(error) {
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(API_URL+'deleteprod/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const delProductMulti = async (productId) => {
  try {
    const response = await axios.delete(API_URL + 'delprodmulti', {
      params: {
        dataId: productId,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const productsAdapter = createEntityAdapter({})

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products)

const productsSlice = createSlice({
  name: 'eCommerceApp/products',
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
    [getProducts.fulfilled]: productsAdapter.setAll,
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
