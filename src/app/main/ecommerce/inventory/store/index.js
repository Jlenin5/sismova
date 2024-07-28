import { combineReducers } from '@reduxjs/toolkit'
import category from './categorySlice'
import product from './productSlice'
import products from './productsSlice'
import brands from './brandsSlice'
import measurementUnits from './measurementUnitsSlice'

const reducer = combineReducers({
  category,
  product,
  products,
  brands,
  measurementUnits
})

export default reducer