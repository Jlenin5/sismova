import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Quote = lazy(() => import('./quote'))
const Quotes = lazy(() => import('./quotes'))
const SaleOrder = lazy(() => import('./saleorder'))
const Ticket = lazy(() => import('./ticket'))
const Invoice = lazy(() => import('./invoice'))

const SalesEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'ecommerce/sales/quote/:id',
      element: <Quote />,
    },
    {
      path: 'ecommerce/sales/quotes',
      element: <Quotes />,
    },
    {
      path: 'ecommerce/sales/sale-orders',
      element: <SaleOrder />,
    },
    {
      path: 'ecommerce/sales/tickets',
      element: <Ticket />,
    },
    {
      path: 'ecommerce/sales/invoices',
      element: <Invoice />,
    },
    {
      path: 'ecommerce/sales',
      element: <Navigate to="sale-orders" />,
    },
  ],
}

export default SalesEC