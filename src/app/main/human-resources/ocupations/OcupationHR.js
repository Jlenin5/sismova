import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const WorkArea = lazy(() => import('./workarea'))
const JobPosition = lazy(() => import('./jobposition'))

const OcupationHR = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'human-resources/ocupations/work-areas',
      element: <WorkArea />,
    },
    {
      path: 'human-resources/ocupations/job-positions',
      element: <JobPosition />,
    },
    {
      path: 'human-resources/ocupations',
      element: <Navigate to="work-area" />,
    },
  ],
}

export default OcupationHR