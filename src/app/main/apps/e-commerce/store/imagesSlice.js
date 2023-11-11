import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getImages = async () => {
    try {
      const response = await axios.get(API_URL+'images')
      return await response.data
    } catch(error) {
      throw error
    }
}

export const getMaxId = async () => {
  try {
    const response = await axios.get(API_URL+'imagemax')
    return await response.data
  } catch(error) {
    throw error
  }
}

export const postImage = async (dataJson) => {
  try {
    const response = await axios.post(API_URL+'postimage', dataJson)
    return await response.data
  } catch(error) {
    throw error
  }
}

const categoriesAdapter = createEntityAdapter({})

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.eCommerceApp.images)

const imagesSlice = createSlice({
  name: 'eCommerceApp/images',
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

export const { setCategoriesSearchText } = imagesSlice.actions

export const selectCategoriesSearchText = ({ eCommerceApp }) => eCommerceApp.images.searchText

export default imagesSlice.reducer
