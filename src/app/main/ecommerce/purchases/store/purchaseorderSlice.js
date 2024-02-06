import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getCategories = async () => {
    try {
      const response = await axios.get(API_URL+'cate')
      return await response.data
    } catch(error) {
      throw error
    }
}

export const getMaxId = async () => {
  try {
    const response = await axios.get(API_URL+'catemax')
    return await response.data
  } catch(error) {
    throw error
  }
}

export const getCategory = async (cateId) => {
  try {
    const response = await axios.get(API_URL+'cate/'+cateId)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const putCategory = async (data) => {
  try {
    const {cateId, cateName, cateState} = data
    const response = await axios.put(API_URL+'updatecate/'+cateId, {cateName, cateState})
    return await response.data
  } catch(error) {
    throw error
  }
}

export const postCategory = async (dataJson) => {
  try {
    const response = await axios.post(API_URL+'postcate', dataJson)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(API_URL+'deletecate/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const delCateMulti = async (categoryIds) => {
  try {
    const response = await axios.delete(API_URL + 'delcatemulti', {
      params: {
        dataId: categoryIds,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const purchaseorderAdapter = createEntityAdapter({})

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  purchaseorderAdapter.getSelectors((state) => state.eCommerceApp.categories)

const purchaseorderSlice = createSlice({
  name: 'eCommerceApp/categories',
  initialState: purchaseorderAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCategoriesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    // [getCategories.fulfilled]: purchaseorderAdapter.setAll,
    // [getMaxId.fulfilled]: purchaseorderAdapter.setAll,
    // [getCategory.fulfilled]: purchaseorderAdapter.setAll,
    // [putCategory.fulfilled]: purchaseorderAdapter.setAll,
    // [postCategory.fulfilled]: purchaseorderAdapter.setAll,
    // [deleteCategory.fulfilled]: purchaseorderAdapter.setAll,
    // [delCateMulti.fulfilled]: purchaseorderAdapter.setAll,
    // [removeProducts.fulfilled]: (state, action) =>
    //   purchaseorderAdapter.removeMany(state, action.payload),
  },
})

export const { setCategoriesSearchText } = purchaseorderSlice.actions

export const selectCategoriesSearchText = ({ eCommerceApp }) => eCommerceApp.categories.searchText

export default purchaseorderSlice.reducer