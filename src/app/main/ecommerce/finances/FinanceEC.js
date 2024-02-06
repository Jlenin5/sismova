import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Coins = lazy(() => import('./coins'))
const Taxes = lazy(() => import('./taxes'))

const FinanceEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'ecommerce/finances/coins',
      element: <Coins />,
    },
    {
      path: 'ecommerce/finances/taxes',
      element: <Taxes />,
    },
    {
      path: 'ecommerce/finances',
      element: <Navigate to="taxes" />,
    },
  ],
}

export default FinanceEC