import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Documents = lazy(() => import('./documents'))
const Permissions = lazy(() => import('./permissions'))
const Roles = lazy(() => import('./roles'))
const Units = lazy(() => import('./units'))

const SalesEC = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'settings/controls/documents',
      element: <Documents />,
    },
    {
      path: 'settings/controls/permissions',
      element: <Permissions />,
    },
    {
      path: 'settings/controls/roles',
      element: <Roles />,
    },
    {
      path: 'settings/controls/units',
      element: <Units />,
    },
    {
      path: 'settings/controls',
      element: <Navigate to="documents" />,
    },
  ],
}

export default SalesEC