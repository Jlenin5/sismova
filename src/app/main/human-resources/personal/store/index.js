import { combineReducers } from '@reduxjs/toolkit'
import client from './clientSlice'
import employees from './employeesSlice'
import employee from './employeeSlice'
import supplier from './supplierSlice'
import user from './userSlice'

const reducer = combineReducers({
  client,
  employees,
  employee,
  supplier,
  user,
})

export default reducer