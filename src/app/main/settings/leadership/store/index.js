import { combineReducers } from '@reduxjs/toolkit'
import companies from './companiesSlice'
import branchoffice from './branchofficeSlice'
import warehouse from './warehouseSlice'

const reducer = combineReducers({
  companies,
  branchoffice,
  warehouse
})

export default reducer