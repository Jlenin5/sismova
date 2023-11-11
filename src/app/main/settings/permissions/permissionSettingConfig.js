import { lazy } from 'react'

const PermissionSetting = lazy(() => import('./PermissionSetting'))

const PermissionSettingConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: 'settings/permissions',
      element: <PermissionSetting />
    }
  ]
}

export default PermissionSettingConfig