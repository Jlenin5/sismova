import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Companies = lazy(() => import('./companies'))
const BranchOffice = lazy(() => import('./branchoffice'))
const Warehouse = lazy(() => import('./warehouse'))

const LeadershipSC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'settings/leadership/companies',
      element: <Companies />,
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

export default LeadershipSC