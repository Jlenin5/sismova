import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getClients = createAsyncThunk( 'eCommerceApp/products/getClientts', async () => {
  try {
    const response = await axios.get(API_URL+'cli')
    return await response.data
  } catch(error) {
    throw error
  }
})

export const getMaxId = async () => {
  try {
    const response = await axios.get(API_URL+'climax')
    return await response.data
  } catch(error) {
    throw error
  }
}

export const getClient = async (cliId) => {
  try {
    const response = await axios.get(API_URL+'cli/'+cliId)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const putClient = async (data) => {
  try {
    const {cliId, cliFirstName, cliSecondName, DocumentTypeId, cliDocument, cliEmail, cliPhone, cliGender, cliState} = data
    const response = await axios.put(API_URL+'updatecli/'+cliId, {cliFirstName, cliSecondName, DocumentTypeId, cliDocument, cliEmail, cliPhone, cliGender, cliState})
    return await response.data
  } catch(error) {
    throw error
  }
}

export const postClient = async (dataJson) => {
  try {
    const response = await axios.post(API_URL+'postcli', dataJson)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(API_URL+'deletecli/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const delCliMulti = async (clientIds) => {
  try {
    const response = await axios.delete(API_URL + 'delclimulti', {
      params: {
        dataId: clientIds,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const clientsAdapter = createEntityAdapter({})

export const { selectAll: selectClients, selectById: selectClientById } =
  clientsAdapter.getSelectors((state) => state.eCommerceApp.clients)

const clientsSlice = createSlice({
  name: 'eCommerceApp/clients',
  initialState: clientsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setClientsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getClients.fulfilled]: clientsAdapter.setAll,
  },
})

export const { setClientsSearchText } = clientsSlice.actions

export const selectClientsSearchText = ({ eCommerceApp }) => eCommerceApp.clients.searchText

export default clientsSlice.reducer