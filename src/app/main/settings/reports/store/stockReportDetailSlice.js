import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getStockReport = asyncThunkWithAxios('stock_report', 'get', 'ReportsSC/stockReport/getStockReport', 'getid')

const stockReportDetailSlice = createSlice({
  name: 'ReportsSC/stockReport',
  initialState: null,
  reducers: {
    dataStockReport: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: ProductInterface,
      }),
    },
  },
  extraReducers: {
    [getStockReport.fulfilled]: (state, action) => action.payload.data,
  },
})

export const selectStockReport = ({ ReportsSC }) => ReportsSC.stockReportDetail

export default stockReportDetailSlice.reducer