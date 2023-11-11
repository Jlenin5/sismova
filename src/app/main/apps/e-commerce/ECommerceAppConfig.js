import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Images = lazy(() => import('./images/Images'))
const Categories = lazy(() => import('./categories/Categories'))
const Products = lazy(() => import('./products/Products'))
const Product = lazy(() => import('./product/Product'))
const Order = lazy(() => import('./order/Order'))
const Orders = lazy(() => import('./orders/Orders'))

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/e-commerce/images',
      element: <Images />,
    },
    {
      path: 'apps/e-commerce/categories',
      element: <Categories />,
    },
    {
      path: 'apps/e-commerce/products',
      element: <Products />,
    },
    {
      path: 'apps/e-commerce/products/:productId/*',
      element: <Product />,
    },
    {
      path: 'apps/e-commerce/orders',
      element: <Orders />,
    },
    {
      path: 'apps/e-commerce/orders/:orderId',
      element: <Order />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="products" />,
    },
  ],
}

export default ECommerceAppConfig
