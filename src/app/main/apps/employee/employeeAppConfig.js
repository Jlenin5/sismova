import { lazy } from 'react'

const Employees = lazy(() => import('.'))

const employeeAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/employees',
      element: <Employees />,
    },
  ],
}

export default employeeAppConfig