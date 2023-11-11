import Users from "./users"

const settingConfig = {
  settings: {
    layouts: {}
  },
  routes: [
    {
      path: 'settings/users',
      element: <Users />
    }
  ]
}

export default settingConfig