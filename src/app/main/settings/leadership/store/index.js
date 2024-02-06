import { combineReducers } from '@reduxjs/toolkit'
import company from './CompanySlice'
import branchoffice from './branchofficeSlice'

const reducer = combineReducers({
  company,
  branchoffice,
})

export default reducer