import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Categories = lazy(() => import('./categories'))
const Products = lazy(() => import('./products'))
const Product = lazy(() => import('./product'))
const MeasurementsUnits = lazy(() => import('./measurement-units'))

const InventoryEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'ecommerce/inventory/categories',
      element: <Categories />,
    },
    {
      path: 'ecommerce/inventory/products',
      element: <Products />,
    },
    {
      path: 'ecommerce/inventory/product/:id',
      element: <Product />,
    },
    {
      path: 'ecommerce/inventory/measurement-units',
      element: <MeasurementsUnits />,
    },
    {
      path: 'ecommerce/inventory',
      element: <Navigate to="products" />,
    },
  ],
}

export default InventoryEC