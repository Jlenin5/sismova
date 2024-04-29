import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getProducts = asyncThunkWithAxios('prod', 'get', 'inventoryEC/products/getProducts', 'get')
export const getProduct = asyncThunkWithAxios('prodmax', 'get', 'inventoryEC/products/getProduct', 'getmax')
export const getMaxId = asyncThunkWithAxios('prodmax', 'get', 'inventoryEC/products/getMaxId', 'getmax')
export const delProductMulti = asyncThunkWithAxios('delprodmulti', 'delete', 'inventoryEC/products/delProductMulti', 'deletemulti')

const productsAdapter = createEntityAdapter({})

export const { selectAll: selectProduct, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.inventoryEC.products)

const productsSlice = createSlice({
  name: 'inventoryEC/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProductSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => productsAdapter.setAll(state, action.payload.data),
    [delProductMulti.fulfilled]: productsAdapter.removeMany,
  },
})

export const { setProductSearchText } = productsSlice.actions

export const selectProductSearchText = ({ inventoryEC }) => inventoryEC.products.searchText

export default productsSlice.reducer