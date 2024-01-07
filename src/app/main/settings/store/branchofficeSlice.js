import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getDatas = createAsyncThunk( 'settingsApp/branchoffice/getBranchoffice', async () => {
    const response = await axios.get(API_URL+'bo')
    return response.data
})


export const getMaxId = async () => {
  try {
    const response = await axios.get(API_URL+'bomax')
    return await response.data
  } catch(error) {
    throw error
  }
}

export const getData = async (id) => {
  try {
    const response = await axios.get(API_URL+'bo/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const putData = async (data) => {
  try {
    const {boId, boName,boPhone,boEmail,City,boAddress,User} = data
    const response = await axios.put(API_URL+'updatebo/'+boId, {boName,boPhone,boEmail,City,boAddress,User})
    return await response.data
  } catch(error) {
    throw error
  }
}

export const postData = async (dataJson) => {
  try {
    const response = await axios.post(API_URL+'postbo', dataJson)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const deleteData = async (id) => {
  try {
    const response = await axios.delete(API_URL+'deletebo/'+id)
    return await response.data
  } catch(error) {
    throw error
  }
}

export const delDataMulti = async (boId) => {
  try {
    const response = await axios.delete(API_URL + 'delbomulti', {
      params: {
        bo_id: boId,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const branchofficeAdapter = createEntityAdapter({})

export const { selectAll: selectBranchOffice, selectById: selectClientById } =
  branchofficeAdapter.getSelectors((state) => state.settingsApp.branchoffice)

const branchofficeSlice = createSlice({
  name: 'settingsApp/branchoffice',
  initialState: branchofficeAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCompanySearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getDatas.fulfilled]: branchofficeAdapter.setAll,
  },
})

export const { setCompanySearchText } = branchofficeSlice.actions

export const selectBranchOfficeSearchText = ({ settingsApp }) => settingsApp.branchoffice.searchText

export default branchofficeSlice.reducer