import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Employee from './employee'

const Employees = lazy(() => import('./employees'))
const Clients = lazy(() => import('./clients'))
const Users = lazy(() => import('./users'))

const PersonalHR = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'human-resources/personal/employees',
      element: <Employees />,
    },
    {
      path: 'human-resources/personal/employee/:id',
      element: <Employee />,
    },
    {
      path: 'human-resources/personal/clients',
      element: <Clients />,
    },
    {
      path: 'human-resources/personal/users',
      element: <Users />,
    },
    {
      path: 'human-resources/personal',
      element: <Navigate to="employees" />,
    },
  ],
}

export default PersonalHR