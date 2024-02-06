import { combineReducers } from '@reduxjs/toolkit'
import document from './documentSlice'
import permission from './permissionSlice'
import rol from './rolSlice'

const reducer = combineReducers({
  document,
  permission,
  rol,
})

export default reducer