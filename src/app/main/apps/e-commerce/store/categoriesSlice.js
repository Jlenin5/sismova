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

const categoriesAdapter = createEntityAdapter({})

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.eCommerceApp.categories)

const categoriesSlice = createSlice({
  name: 'eCommerceApp/categories',
  initialState: categoriesAdapter.getInitialState({
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
    // [getCategories.fulfilled]: categoriesAdapter.setAll,
    // [getMaxId.fulfilled]: categoriesAdapter.setAll,
    // [getCategory.fulfilled]: categoriesAdapter.setAll,
    // [putCategory.fulfilled]: categoriesAdapter.setAll,
    // [postCategory.fulfilled]: categoriesAdapter.setAll,
    // [deleteCategory.fulfilled]: categoriesAdapter.setAll,
    // [delCateMulti.fulfilled]: categoriesAdapter.setAll,
    // [removeProducts.fulfilled]: (state, action) =>
    //   categoriesAdapter.removeMany(state, action.payload),
  },
})

export const { setCategoriesSearchText } = categoriesSlice.actions

export const selectCategoriesSearchText = ({ eCommerceApp }) => eCommerceApp.categories.searchText

export default categoriesSlice.reducer