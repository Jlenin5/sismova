import { lazy } from 'react'

const CompanySetting = lazy(() => import('./CompanySetting'))

const CompanySettingConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: 'settings/company',
      element: <CompanySetting />
    }
  ]
}

export default CompanySettingConfig