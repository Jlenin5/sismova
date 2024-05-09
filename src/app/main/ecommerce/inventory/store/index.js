import { combineReducers } from '@reduxjs/toolkit'
import category from './categorySlice'
import product from './productSlice'
import products from './productsSlice'

const reducer = combineReducers({
  category,
  product,
  products,
})

export default reducer