import { combineReducers } from '@reduxjs/toolkit'
import document from './documentSlice'
import permission from './permissionSlice'
import rol from './rolSlice'
import serie from './serieSlice'

const reducer = combineReducers({
  document,
  permission,
  rol,
  serie,
})

export default reducer