import { combineReducers } from '@reduxjs/toolkit'
import company from './CompanySlice'
import branchoffice from './branchofficeSlice'
import warehouse from './warehouseSlice'

const reducer = combineReducers({
  company,
  branchoffice,
  warehouse
})

export default reducer