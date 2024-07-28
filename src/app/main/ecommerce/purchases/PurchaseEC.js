import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const PurchaseOrder = lazy(() => import('./purchaseorder'))
const PurchaseOrders = lazy(() => import('./purchaseorders'))

const PurchaseEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'e-commerce/purchases/purchase-orders',
      element: <PurchaseOrders />,
    },
    {
      path: 'e-commerce/purchases/purchase-order/:id',
      element: <PurchaseOrder />,
    },
    {
      path: 'e-commerce/sales',
      element: <Navigate to="sale-orders" />,
    },
  ],
}

export default PurchaseEC