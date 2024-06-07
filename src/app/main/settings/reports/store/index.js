import { combineReducers } from '@reduxjs/toolkit'
import stockReport from './stockReportSlice'
import stockReportDetail from './stockReportDetailSlice'

const reducer = combineReducers({
  stockReport,
  stockReportDetail,
})

export default reducer