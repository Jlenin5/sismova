import { combineReducers } from '@reduxjs/toolkit'
import currencies from './currenciesSlice'
import tax from './taxSlice'

const reducer = combineReducers({
  currencies,
  tax,
})

export default reducer