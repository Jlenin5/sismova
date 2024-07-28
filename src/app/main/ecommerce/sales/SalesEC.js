import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Quote = lazy(() => import('./quote'))
const Quotes = lazy(() => import('./quotes'))
const SaleOrders = lazy(() => import('./saleorders'))
const SaleOrder = lazy(() => import('./saleorder'))
const Ticket = lazy(() => import('./ticket'))
const Invoice = lazy(() => import('./invoice'))

const SalesEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'e-commerce/sales/quote/:id',
      element: <Quote />,
    },
    {
      path: 'e-commerce/sales/quotes',
      element: <Quotes />,
    },
    {
      path: 'e-commerce/sales/sale-orders',
      element: <SaleOrders />,
    },
    {
      path: 'e-commerce/sales/sale-order/:id',
      element: <SaleOrder />,
    },
    {
      path: 'e-commerce/sales/tickets',
      element: <Ticket />,
    },
    {
      path: 'e-commerce/sales/invoices',
      element: <Invoice />,
    },
    {
      path: 'e-commerce/sales',
      element: <Navigate to="sale-orders" />,
    },
  ],
}

export default SalesEC