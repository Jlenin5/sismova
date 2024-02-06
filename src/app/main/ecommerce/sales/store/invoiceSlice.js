import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getInvoices = asyncThunkWithAxios('inv', 'get', 'SalesEC/invoices/getInvoices', 'get')
export const getMaxId = asyncThunkWithAxios('invmax', 'get', 'SalesEC/invoices/getMaxId', 'getmax')
export const putInvoice = asyncThunkWithAxios('updateinv', 'put', 'SalesEC/invoices/putInvoice', 'put')
export const postInvoice = asyncThunkWithAxios('postinv', 'post', 'SalesEC/invoices/postInvoice', 'post')
export const deleteInvoice = asyncThunkWithAxios('deleteinv', 'delete', 'SalesEC/invoices/deleteInvoice', 'delete')
export const delInvoiceMulti = asyncThunkWithAxios('delinvmulti', 'delete', 'SalesEC/invoices/delInvoiceMulti', 'deletemulti')

const invoiceAdapter = createEntityAdapter({})

export const { selectAll: selectInvoice, selectById: selectInvoiceById } =
  invoiceAdapter.getSelectors((state) => state.SalesEC.invoice)

const invoiceSlice = createSlice({
  name: 'SalesEC/invoices',
  initialState: invoiceAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setInvoiceSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getInvoices.fulfilled]: invoiceAdapter.setAll,
    [putInvoice.fulfilled]: (state, action) => invoiceAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postInvoice.fulfilled]: invoiceAdapter.addOne,
    [deleteInvoice.fulfilled]: invoiceAdapter.removeOne,
    [delInvoiceMulti.fulfilled]: invoiceAdapter.removeMany,
  },
})

export const { setInvoiceSearchText } = invoiceSlice.actions

export const selectInvoiceSearchText = ({ SalesEC }) => SalesEC.invoice.searchText

export default invoiceSlice.reducer