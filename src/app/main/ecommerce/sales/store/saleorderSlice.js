import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getSaleOrders = asyncThunkWithAxios('tic', 'get', 'SalesEC/saleorders/getSaleOrders', 'get')
export const getMaxId = asyncThunkWithAxios('ticmax', 'get', 'SalesEC/saleorders/getMaxId', 'getmax')
export const putSaleOrder = asyncThunkWithAxios('updatetic', 'put', 'SalesEC/saleorders/putSaleOrder', 'put')
export const postSaleOrder = asyncThunkWithAxios('posttic', 'post', 'SalesEC/saleorders/postSaleOrder', 'post')
export const deleteSaleOrder = asyncThunkWithAxios('deletetic', 'delete', 'SalesEC/saleorders/deleteSaleOrder', 'delete')
export const delSaleOrderMulti = asyncThunkWithAxios('delticmulti', 'delete', 'SalesEC/saleorders/delSaleOrderMulti', 'deletemulti')

const saleOrderAdapter = createEntityAdapter({})

export const { selectAll: selectSaleOrder, selectById: selectSaleOrderById } =
  saleOrderAdapter.getSelectors((state) => state.SalesEC.saleorder)

const saleorderSlice = createSlice({
  name: 'SalesEC/saleorders',
  initialState: saleOrderAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setsaleordersearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSaleOrders.fulfilled]: saleOrderAdapter.setAll,
    [putSaleOrder.fulfilled]: (state, action) => saleOrderAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postSaleOrder.fulfilled]: saleOrderAdapter.addOne,
    [deleteSaleOrder.fulfilled]: saleOrderAdapter.removeOne,
    [delSaleOrderMulti.fulfilled]: saleOrderAdapter.removeMany,
  },
})

export const { setsaleordersearchText } = saleorderSlice.actions

export const selectsaleordersearchText = ({ SalesEC }) => SalesEC.saleorder.searchText

export default saleorderSlice.reducer