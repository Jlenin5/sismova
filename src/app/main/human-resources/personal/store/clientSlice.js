import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getClients = asyncThunkWithAxios('cli', 'get', 'PersonalHR/clients/getClients', 'get')
export const getMaxId = asyncThunkWithAxios('climax', 'get', 'PersonalHR/clients/getMaxId', 'getmax')
export const putClient = asyncThunkWithAxios('updatecli', 'put', 'PersonalHR/clients/putClient', 'put')
export const postClient = asyncThunkWithAxios('postcli', 'post', 'PersonalHR/clients/postClient', 'post')
export const deleteClient = asyncThunkWithAxios('deletecli', 'delete', 'PersonalHR/clients/deleteClient', 'delete')
export const delClientMulti = asyncThunkWithAxios('delclimulti', 'delete', 'PersonalHR/clients/delClientMulti', 'deletemulti')

const clientAdapter = createEntityAdapter({})

export const { selectAll: selectClient, selectById: selectClientById } =
  clientAdapter.getSelectors((state) => state.PersonalHR.client)

const clientSlice = createSlice({
  name: 'PersonalHR/clients',
  initialState: clientAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setClientSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getClients.fulfilled]: clientAdapter.setAll,
    [putClient.fulfilled]: (state, action) => clientAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postClient.fulfilled]: clientAdapter.addOne,
    [deleteClient.fulfilled]: clientAdapter.removeOne,
    [delClientMulti.fulfilled]: clientAdapter.removeMany,
  },
})

export const { setClientSearchText } = clientSlice.actions

export const selectClientSearchText = ({ PersonalHR }) => PersonalHR.client.searchText

export default clientSlice.reducer