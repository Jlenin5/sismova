import { combineReducers } from '@reduxjs/toolkit'
// import order from './orderSlice'
// import orders from './ordersSlice'
import product from './productSlice'
import products from './productsSlice'
import images from './imagesSlice'
import categories from './categoriesSlice'

const reducer = combineReducers({
  categories,
  products,
  images,
  product,
  // orders,
  // order,
})

export default reducer