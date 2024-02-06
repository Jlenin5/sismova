import { combineReducers } from '@reduxjs/toolkit'
import carrier from './carrierSlice'
import mobility from './mobilitySlice'

const reducer = combineReducers({
  carrier,
  mobility,
})

export default reducer