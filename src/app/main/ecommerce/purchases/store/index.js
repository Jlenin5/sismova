import { combineReducers } from '@reduxjs/toolkit'
import purchaseorder from './purchaseorderSlice'

const reducer = combineReducers({
  purchaseorder,
})

export default reducer