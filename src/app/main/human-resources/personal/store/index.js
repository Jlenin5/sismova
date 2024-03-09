import { combineReducers } from '@reduxjs/toolkit'
import client from './clientSlice'
import employees from './employeesSlice'
import employee from './employeeSlice'
import user from './userSlice'

const reducer = combineReducers({
  client,
  employees,
  employee,
  user,
})

export default reducer