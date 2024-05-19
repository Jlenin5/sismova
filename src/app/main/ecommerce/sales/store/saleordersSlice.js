import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getSaleOrders = asyncThunkWithAxios('saor', 'get', 'SalesEC/saleorders/getSaleOrders', 'get')
export const getMaxId = asyncThunkWithAxios('saormax', 'get', 'SalesEC/saleorders/getMaxId', 'getmax')
export const putSaleOrder = asyncThunkWithAxios('updatesaor', 'put', 'SalesEC/saleorders/putSaleOrder', 'put')
export const postSaleOrder = asyncThunkWithAxios('postsaor', 'post', 'SalesEC/saleorders/postSaleOrder', 'post')
export const deleteSaleOrder = asyncThunkWithAxios('deletesaor', 'delete', 'SalesEC/saleorders/deleteSaleOrder', 'delete')
export const delSaleOrderMulti = asyncThunkWithAxios('delsaormulti', 'delete', 'SalesEC/saleorders/delSaleOrderMulti', 'deletemulti')
export const exportSaleOrderExcel = asyncThunkWithAxios('excelsaor', 'get', 'SalesEC/saleorders/exportSaleOrderExcel', 'export')
export const exportSaleOrderPDF = asyncThunkWithAxios('pdfsaor', 'get', 'SalesEC/saleorders/exportSaleOrderPDF', 'export')

const saleOrderAdapter = createEntityAdapter({})

export const { selectAll: selectSaleOrder, selectById: selectSaleOrderById } =
  saleOrderAdapter.getSelectors((state) => state.SalesEC.saleorders)

const saleordersSlice = createSlice({
  name: 'SalesEC/saleorders',
  initialState: saleOrderAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSaleOrderSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSaleOrders.fulfilled]: (state, action) => saleOrderAdapter.setAll(state, action.payload.data),
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

export const { setSaleOrderSearchText } = saleordersSlice.actions

export const selectSaleOrderSearchText = ({ SalesEC }) => SalesEC.saleorders.searchText

export default saleordersSlice.reducer