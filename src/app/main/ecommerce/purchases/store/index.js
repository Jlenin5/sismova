import { combineReducers } from '@reduxjs/toolkit'
import purchaseorder from './purchaseorderSlice'
import purchaseorders from './purchaseordersSlice'

const reducer = combineReducers({
  purchaseorder,
  purchaseorders,
})

export default reducer