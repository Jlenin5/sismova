import { createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'
import ProductInterface from 'src/app/interfaces/ProductInterface'

export const getProduct = asyncThunkWithAxios('prod', 'get', 'inventoryEC/products/getProduct', 'getid')
export const getMaxId = asyncThunkWithAxios('prodmax', 'get', 'inventoryEC/products/getMaxId', 'getmax')
export const putProduct = asyncThunkWithAxios('updateprod', 'put', 'inventoryEC/products/putProduct', 'put')
export const postProduct = asyncThunkWithAxios('postprod', 'post', 'inventoryEC/products/postProduct', 'post')
export const deleteProduct = asyncThunkWithAxios('deleteprod', 'delete', 'inventoryEC/products/deleteProduct', 'delete')

const productSlice = createSlice({
  name: 'inventoryEC/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: ProductInterface,
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [putProduct.fulfilled]: (state, action) => action.payload,
    [deleteProduct.fulfilled]: (state, action) => null,
    [postProduct.fulfilled]: (state, action) => action.payload
  },
})

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ inventoryEC }) => inventoryEC.product;

export default productSlice.reducer