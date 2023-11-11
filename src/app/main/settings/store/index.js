import { combineReducers } from '@reduxjs/toolkit'
import users from './UserSlice'
// import categories from './categoriesSlice'

const reducer = combineReducers({
  // categories,
  users,
  // product,
  // orders,
  // order,
})

export default reducer