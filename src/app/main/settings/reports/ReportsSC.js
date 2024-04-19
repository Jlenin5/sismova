import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const CustomerReport = lazy(() => import('./customer-report'))
const ProductReport = lazy(() => import('./product-report'))
const PurchasingReport = lazy(() => import('./purchasing-report'))
const SalesReport = lazy(() => import('./sales-report'))
const StockReport = lazy(() => import('./stock-report'))
const SuppliersReport = lazy(() => import('./suppliers-report'))
const WarehouseReport = lazy(() => import('./warehouse-report'))

const ReportsSC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'settings/reports/customer-report',
      element: <CustomerReport />,
    },
    {
      path: 'settings/reports/product-report',
      element: <ProductReport />,
    },
    {
      path: 'settings/reports/purchasing-report',
      element: <PurchasingReport />,
    },
    {
      path: 'settings/reports/sales-report',
      element: <SalesReport />,
    },
    {
      path: 'settings/reports/stock-report',
      element: <StockReport />,
    },
    {
      path: 'settings/reports/suppliers-report',
      element: <SuppliersReport />,
    },
    {
      path: 'settings/reports/warehouse-report',
      element: <WarehouseReport />,
    },
    {
      path: 'settings/reports',
      element: <Navigate to="stock-report" />,
    },
  ],
}

export default ReportsSC