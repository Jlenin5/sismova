import { combineReducers } from '@reduxjs/toolkit'
import fuse from './fuse'
import i18n from './i18nSlice'
import user from './userSlice'
import role from './roleSlice'
import categories from '../main/apps/academy/store/categoriesSlice'

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    categories,
    fuse,
    i18n,
    user,
    role,
    ...asyncReducers,
  })

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    // state = undefined
  }

  return combinedReducer(state, action)
}

export default createReducer