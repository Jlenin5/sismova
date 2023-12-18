import User from "./users"
import Company from "./company"
import Permission from "./permissions"
import Rol from "./roles"

const settingConfig = {
  settings: {
    layouts: {}
  },
  routes: [
    {
      path: 'settings/users',
      element: <User />
    },
    {
      path: 'settings/company',
      element: <Company />
    },
    {
      path: 'settings/roles',
      element: <Rol />
    },
    {
      path: 'settings/permissions',
      element: <Permission />
    }
  ]
}

export default settingConfig