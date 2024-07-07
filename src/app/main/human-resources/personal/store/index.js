import { combineReducers } from '@reduxjs/toolkit'
import customer from './customersSlice'
import employees from './employeesSlice'
import supplier from './supplierSlice'
import user from './userSlice'

const reducer = combineReducers({
  customer,
  employees,
  supplier,
  user,
})

export default reducer