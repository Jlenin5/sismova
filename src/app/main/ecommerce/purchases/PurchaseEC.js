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
      path: 'ecommerce/purchases/purchase-orders',
      element: <PurchaseOrders />,
    },
    {
      path: 'ecommerce/purchases/purchase-order/:id',
      element: <PurchaseOrder />,
    },
    {
      path: 'ecommerce/sales',
      element: <Navigate to="sale-orders" />,
    },
  ],
}

export default PurchaseEC