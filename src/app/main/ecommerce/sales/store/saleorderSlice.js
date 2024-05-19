import { createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'
import SaleOrderInterface from 'src/app/interfaces/SaleOrderInterface'

export const getSaleOrder = asyncThunkWithAxios('saor', 'get', 'SalesEC/saleorder/getSaleOrder', 'getid')
export const getMaxId = asyncThunkWithAxios('saormax', 'get', 'SalesEC/saleorder/getMaxId', 'getmax')
export const putSaleOrder = asyncThunkWithAxios('updatesaor', 'put', 'SalesEC/saleorder/putSaleOrder', 'put')
export const postSaleOrder = asyncThunkWithAxios('postsaor', 'post', 'SalesEC/saleorder/postSaleOrder', 'post')
export const deleteSaleOrder = asyncThunkWithAxios('deletesaor', 'delete', 'SalesEC/saleorder/deleteSaleOrder', 'delete')

const saleorderSlice = createSlice({
  name: 'SalesEC/saleorder',
  initialState: null,
  reducers: {
    resetSaleOrder: () => null,
    newSaleOrder: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: SaleOrderInterface,
      }),
    },
  },
  extraReducers: {
    [getSaleOrder.fulfilled]: (state, action) => action.payload,
    [putSaleOrder.fulfilled]: (state, action) => action.payload,
    [deleteSaleOrder.fulfilled]: (state, action) => null,
    [postSaleOrder.fulfilled]: (state, action) => action.payload
  },
})

export const { newSaleOrder, resetSaleOrder } = saleorderSlice.actions;

export const selectSaleOrder = ({ SalesEC }) => SalesEC.saleorder;

export default saleorderSlice.reducer