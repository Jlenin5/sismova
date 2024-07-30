import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Currencies = lazy(() => import('./currencies'))
const Taxes = lazy(() => import('./taxes'))

const FinanceEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'e-commerce/finances/currencies',
      element: <Currencies />,
    },
    {
      path: 'e-commerce/finances/taxes',
      element: <Taxes />,
    },
    {
      path: 'e-commerce/finances',
      element: <Navigate to="currencies" />,
    },
  ],
}

export default FinanceEC