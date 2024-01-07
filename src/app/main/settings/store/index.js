import { combineReducers } from '@reduxjs/toolkit'
import users from './usersSlice'
import company from './CompanySlice'
import branchoffice from './branchofficeSlice'

const reducer = combineReducers({
  company,
  users,
  branchoffice,
  // product,
  // orders,
  // order,
})

export default reducer