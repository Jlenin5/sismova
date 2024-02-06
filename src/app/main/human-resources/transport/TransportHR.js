import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Carrier = lazy(() => import('./carrier'))
const Mobility = lazy(() => import('./mobility'))

const TransportHR = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'human-resources/transport/carrier',
      element: <Carrier />,
    },
    {
      path: 'human-resources/transport/mobility',
      element: <Mobility />,
    },
    {
      path: 'human-resources/transport',
      element: <Navigate to="carrier" />,
    },
  ],
}

export default TransportHR