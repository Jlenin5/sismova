import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getCategories = asyncThunkWithAxios('cate', 'get', 'inventoryEC/categories/getCategories', 'get')
export const getMaxId = asyncThunkWithAxios('catemax', 'get', 'inventoryEC/categories/getMaxId', 'getmax')
export const putCategory = asyncThunkWithAxios('updatecate', 'put', 'inventoryEC/categories/putCategory', 'put')
export const postCategory = asyncThunkWithAxios('postcate', 'post', 'inventoryEC/categories/postCategory', 'post')
export const deleteCategory = asyncThunkWithAxios('deletecate', 'delete', 'inventoryEC/categories/deleteCategory', 'delete')
export const delCategoryMulti = asyncThunkWithAxios('delcatemulti', 'delete', 'inventoryEC/categories/delCategoryMulti', 'deletemulti')

const categoryAdapter = createEntityAdapter({})

export const { selectAll: selectCategory, selectById: selectCategoryById } =
  categoryAdapter.getSelectors((state) => state.inventoryEC.category)

const categorySlice = createSlice({
  name: 'inventoryEC/categories',
  initialState: categoryAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCategorySearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCategories.fulfilled]: categoryAdapter.setAll,
    [putCategory.fulfilled]: (state, action) => categoryAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postCategory.fulfilled]: categoryAdapter.addOne,
    [deleteCategory.fulfilled]: categoryAdapter.removeOne,
    [delCategoryMulti.fulfilled]: categoryAdapter.removeMany,
  },
})

export const { setCategorySearchText } = categorySlice.actions

export const selectCategorySearchText = ({ inventoryEC }) => inventoryEC.category.searchText

export default categorySlice.reducer