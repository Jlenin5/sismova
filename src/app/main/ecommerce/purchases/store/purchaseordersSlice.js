import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getPurhcaseOrders = asyncThunkWithAxios('puor', 'get', 'PurchaseEC/purchaseorders/getPurhcaseOrders', 'get')
export const getMaxId = asyncThunkWithAxios('puormax', 'get', 'PurchaseEC/purchaseorders/getMaxId', 'getmax')
export const putPurchaseOrder = asyncThunkWithAxios('updatepuor', 'put', 'PurchaseEC/purchaseorders/putPurchaseOrder', 'put')
export const postPurchaseOrder = asyncThunkWithAxios('postpuor', 'post', 'PurchaseEC/purchaseorders/postPurchaseOrder', 'post')
export const deletePurchaseOrder = asyncThunkWithAxios('deletepuor', 'delete', 'PurchaseEC/purchaseorders/deletePurchaseOrder', 'delete')
export const delPurchaseOrderMulti = asyncThunkWithAxios('delpuormulti', 'delete', 'PurchaseEC/purchaseorders/delPurchaseOrderMulti', 'deletemulti')

const purchaseOrderAdapter = createEntityAdapter({})

export const { selectAll: selectPurchaseOrder, selectById: selectPurchaseOrderById } =
  purchaseOrderAdapter.getSelectors((state) => state.PurchaseEC.purchaseorders)

const purchaseordersSlice = createSlice({
  name: 'PurchaseEC/purchaseorders',
  initialState: purchaseOrderAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setPurchaseOrderSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getPurhcaseOrders.fulfilled]: purchaseOrderAdapter.setAll,
    [putPurchaseOrder.fulfilled]: (state, action) => purchaseOrderAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postPurchaseOrder.fulfilled]: purchaseOrderAdapter.addOne,
    [deletePurchaseOrder.fulfilled]: purchaseOrderAdapter.removeOne,
    [delPurchaseOrderMulti.fulfilled]: purchaseOrderAdapter.removeMany,
  },
})

export const { setPurchaseOrderSearchText } = purchaseordersSlice.actions

export const selectPurchaseOrderSearchText = ({ PurchaseEC }) => PurchaseEC.purchaseorders.searchText

export default purchaseordersSlice.reducer