import { combineReducers } from '@reduxjs/toolkit'
import client from './clientSlice'
import employees from './employeesSlice'
import supplier from './supplierSlice'
import user from './userSlice'

const reducer = combineReducers({
  client,
  employees,
  supplier,
  user,
})

export default reducer