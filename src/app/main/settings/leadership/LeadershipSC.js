import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Company = lazy(() => import('./company'))
const BranchOffice = lazy(() => import('./branchoffice'))
const Warehouse = lazy(() => import('./warehouse'))

const SalesEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'settings/leadership/companies',
      element: <Company />,
    },
    {
      path: 'settings/leadership/branch-offices',
      element: <BranchOffice />,
    },
    {
      path: 'settings/leadership/warehouses',
      element: <Warehouse />,
    },
    {
      path: 'settings/leadership',
      element: <Navigate to="companies" />,
    },
  ],
}

export default SalesEC