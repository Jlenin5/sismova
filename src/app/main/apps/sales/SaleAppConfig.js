import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Quotes = lazy(() => import('./quotes'))
const SaleOrder = lazy(() => import('./saleorder'))
const TicketInvoice = lazy(() => import('./ticketinvoice'))

const SaleAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/sales/sale-orders',
      element: <SaleOrder />,
    },
    {
      path: 'apps/sales/ticket-invoice',
      element: <TicketInvoice />,
    },
    {
      path: 'apps/sales/quotes',
      element: <Quotes />,
    },
    {
      path: 'apps/sales',
      element: <Navigate to="sale-orders" />,
    },
  ],
}

export default SaleAppConfig