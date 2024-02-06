import { combineReducers } from '@reduxjs/toolkit'
import client from './clientSlice'
import employee from './employeeSlice'
import user from './userSlice'

const reducer = combineReducers({
  client,
  employee,
  user,
})

export default reducer