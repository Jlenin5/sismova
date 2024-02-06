import { combineReducers } from '@reduxjs/toolkit'
import coin from './coinSlice'
import tax from './taxSlice'

const reducer = combineReducers({
  coin,
  tax,
})

export default reducer