import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getBrands = asyncThunkWithAxios('brands', 'get', 'inventoryEC/brands/getBrands', 'get')
export const putBrand = asyncThunkWithAxios('update_brands', 'put', 'inventoryEC/brands/putBrand', 'put')
export const postBrand = asyncThunkWithAxios('post_brands', 'post', 'inventoryEC/brands/postBrand', 'post')
export const deleteBrand = asyncThunkWithAxios('delete_brands', 'delete', 'inventoryEC/brands/deleteBrand', 'delete')
export const delBrandMulti = asyncThunkWithAxios('delbrandsmulti', 'delete', 'inventoryEC/brands/delBrandMulti', 'deletemulti')

const brandAdapter = createEntityAdapter({})

export const { selectAll: selectBrand, selectById: selectBrandById } =
  brandAdapter.getSelectors((state) => state.inventoryEC.brands)

const brandsSlice = createSlice({
  name: 'inventoryEC/brands',
  initialState: brandAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setBrandSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getBrands.fulfilled]: (state, action) => brandAdapter.setAll(state, action.payload.data),
    [putBrand.fulfilled]: (state, action) => brandAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postBrand.fulfilled]: brandAdapter.addOne,
    [deleteBrand.fulfilled]: brandAdapter.removeOne,
    [delBrandMulti.fulfilled]: brandAdapter.removeMany,
  },
})

export const { setBrandSearchText } = brandsSlice.actions

export const selectBrandSearchText = ({ inventoryEC }) => inventoryEC.brands.searchText

export default brandsSlice.reducer