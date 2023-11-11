import { lazy } from 'react'

const RolSetting = lazy(() => import('./RolSetting'))

const RolSettingConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: 'settings/roles',
      element: <RolSetting />
    }
  ]
}

export default RolSettingConfig