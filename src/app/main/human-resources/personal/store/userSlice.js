import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getUsers = asyncThunkWithAxios('user', 'get', 'PersonalHR/users/getUsers', 'get')
export const getMaxId = asyncThunkWithAxios('usermax', 'get', 'PersonalHR/users/getMaxId', 'getmax')
export const putUser = asyncThunkWithAxios('updateuser', 'put', 'PersonalHR/users/putUser', 'put')
export const postUser = asyncThunkWithAxios('postuser', 'post', 'PersonalHR/users/postUser', 'post')
export const deleteUser = asyncThunkWithAxios('deleteuser', 'delete', 'PersonalHR/users/deleteUser', 'delete')
export const delUserMulti = asyncThunkWithAxios('delusermulti', 'delete', 'PersonalHR/users/delUserMulti', 'deletemulti')

const userAdapter = createEntityAdapter({})

export const { selectAll: selectUser, selectById: selectUserById } =
  userAdapter.getSelectors((state) => state.PersonalHR.user)

const userSlice = createSlice({
  name: 'PersonalHR/users',
  initialState: userAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setUserSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: userAdapter.setAll,
    [putUser.fulfilled]: (state, action) => userAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postUser.fulfilled]: userAdapter.addOne,
    [deleteUser.fulfilled]: userAdapter.removeOne,
    [delUserMulti.fulfilled]: userAdapter.removeMany,
  },
})

export const { setUserSearchText } = userSlice.actions

export const selectUserSearchText = ({ PersonalHR }) => PersonalHR.user.searchText

export default userSlice.reducer