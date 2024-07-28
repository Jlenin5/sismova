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
      path: 'e-commerce/finances/coins',
      element: <Coins />,
    },
    {
      path: 'e-commerce/finances/taxes',
      element: <Taxes />,
    },
    {
      path: 'e-commerce/finances',
      element: <Navigate to="taxes" />,
    },
  ],
}

export default FinanceEC