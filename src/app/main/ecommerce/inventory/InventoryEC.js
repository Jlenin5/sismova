import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Categories = lazy(() => import('./categories'))
const Products = lazy(() => import('./products'))
const Product = lazy(() => import('./product'))
const Brands = lazy(() => import('./brands'))
const MeasurementsUnits = lazy(() => import('./measurement-units'))

const InventoryEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'e-commerce/inventory/categories',
      element: <Categories />,
    },
    {
      path: 'e-commerce/inventory/products',
      element: <Products />,
    },
    {
      path: 'e-commerce/inventory/product/:id',
      element: <Product />,
    },
    {
      path: 'e-commerce/inventory/brands',
      element: <Brands />,
    },
    {
      path: 'e-commerce/inventory/measurement-units',
      element: <MeasurementsUnits />,
    },
    {
      path: 'e-commerce/inventory',
      element: <Navigate to="products" />,
    },
  ],
}

export default InventoryEC