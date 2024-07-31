import { createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'
import PurchaseOrderInterface from 'src/app/interfaces/PurchaseOrderInterface'

export const getPurchaseOrder = asyncThunkWithAxios('puor', 'get', 'PurchaseEC/purchaseorders/getPurchaseOrder', 'show')
export const putPurchaseOrder = asyncThunkWithAxios('updatepuor', 'put', 'PurchaseEC/purchaseorders/putPurchaseOrder', 'put')
export const postPurchaseOrder = asyncThunkWithAxios('postpuor', 'post', 'PurchaseEC/purchaseorders/postPurchaseOrder', 'post')
export const deletePurchaseOrder = asyncThunkWithAxios('deletepuor', 'delete', 'PurchaseEC/purchaseorders/deletePurchaseOrder', 'delete')

const purchaseorderSlice = createSlice({
  name: 'PurchaseEC/purchaseorder',
  initialState: null,
  reducers: {
    resetPurchaseOrder: () => null,
    newPurchaseOrder: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: PurchaseOrderInterface,
      }),
    },
  },
  extraReducers: {
    [getPurchaseOrder.fulfilled]: (state, action) => action.payload.data,
    [putPurchaseOrder.fulfilled]: (state, action) => action.payload,
    [deletePurchaseOrder.fulfilled]: (state, action) => null,
    [postPurchaseOrder.fulfilled]: (state, action) => action.payload
  },
})

export const { newPurchaseOrder, resetPurchaseOrder } = purchaseorderSlice.actions;

export const selectPurchaseOrder = ({ PurchaseEC }) => PurchaseEC.purchaseorder;

export default purchaseorderSlice.reducer