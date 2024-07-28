import { combineReducers } from '@reduxjs/toolkit'
import category from './categorySlice'
import product from './productSlice'
import products from './productsSlice'
import measurementUnits from './measurementUnitsSlice'

const reducer = combineReducers({
  category,
  product,
  products,
  measurementUnits
})

export default reducer