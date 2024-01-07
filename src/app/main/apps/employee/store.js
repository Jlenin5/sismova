import { combineReducers } from '@reduxjs/toolkit'
import employees from './employeesSlice'

const reducer = combineReducers({
  employees
})

export default reducer