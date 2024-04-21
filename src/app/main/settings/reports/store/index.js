import { combineReducers } from '@reduxjs/toolkit'
import stockReport from './stockReportSlice'

const reducer = combineReducers({
  stockReport,
})

export default reducer