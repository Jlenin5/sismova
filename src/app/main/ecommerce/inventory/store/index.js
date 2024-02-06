import { combineReducers } from '@reduxjs/toolkit'
import category from './categorySlice'
import image from './imageSlice'
import product from './productSlice'
import products from './productsSlice'

const reducer = combineReducers({
  category,
  image,
  product,
  products,
})

export default reducer