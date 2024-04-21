import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getStockReports = asyncThunkWithAxios('stock_report', 'get', 'ReportsSC/reports/getStockReports', 'get')
export const getMaxId = asyncThunkWithAxios('stock_report_max', 'get', 'ReportsSC/reports/getMaxId', 'getmax')
export const putStockReport = asyncThunkWithAxios('update_stock_report', 'put', 'ReportsSC/reports/putStockReport', 'put')
export const postStockReport = asyncThunkWithAxios('post_stock_report', 'post', 'ReportsSC/reports/postStockReport', 'post')
export const deleteStockReport = asyncThunkWithAxios('delete_stock_report', 'delete', 'ReportsSC/reports/deleteStockReport', 'delete')
export const delStockReportMulti = asyncThunkWithAxios('del_stock_report_Multi', 'delete', 'ReportsSC/reports/delStockReportMulti', 'deletemulti')

const stockReportAdapter = createEntityAdapter({})

export const { selectAll: selectStockReport, selectById: selectStockReportById } =
  stockReportAdapter.getSelectors((state) => state.ReportsSC.stockReport)

const stockReportSlice = createSlice({
  name: 'ReportsSC/reports',
  initialState: stockReportAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setWorkAreaSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getStockReports.fulfilled]: stockReportAdapter.setAll,
    [putStockReport.fulfilled]: (state, action) => stockReportAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postStockReport.fulfilled]: stockReportAdapter.addOne,
    [deleteStockReport.fulfilled]: stockReportAdapter.removeOne,
    [delStockReportMulti.fulfilled]: stockReportAdapter.removeMany,
  },
})

export const { setStockReportSearchText } = stockReportSlice.actions

export const selectStockReportSearchText = ({ ReportsSC }) => ReportsSC.stockReport.searchText

export default stockReportSlice.reducer