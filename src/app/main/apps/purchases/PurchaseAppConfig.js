import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const PurchaseOrder = lazy(() => import('./purchaseorder'))

const PurchaseAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/purchases/purchase-orders',
      element: <PurchaseOrder />,
    },
    {
      path: 'apps/sales',
      element: <Navigate to="purchase-orders" />,
    },
  ],
}

export default PurchaseAppConfig