import { combineReducers } from '@reduxjs/toolkit'
import jobposition from './jpSlice'
import workarea from './waSlice'

const reducer = combineReducers({
  jobposition,
  workarea,
})

export default reducer