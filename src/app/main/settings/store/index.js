import { combineReducers } from '@reduxjs/toolkit'
import users from './UserSlice'
import company from './CompanySlice'

const reducer = combineReducers({
  company,
  users,
  // product,
  // orders,
  // order,
})

export default reducer