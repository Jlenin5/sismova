import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getCompany = createAsyncThunk( 'eCommerceApp/company/getCompany', async () => {
    try {
      const response = await axios.get(API_URL+'com')
      return await response.data
    } catch(error) {
      throw error
    }
})

export const putCompany = async (data) => {
  try {
    const {comId, comName, comRUC, comEmail, comAddress, comPhone} = data
    const response = await axios.put(API_URL+'updatecom/'+comId, {comName, comRUC, comEmail, comAddress, comPhone})
    return await response.data
  } catch(error) {
    throw error
  }
}

const companyAdapter = createEntityAdapter({})

export const { selectAll: selectCompany, selectById: selectClientById } =
  companyAdapter.getSelectors((state) => state.eCommerceApp.company)

const companySlice = createSlice({
  name: 'eCommerceApp/company',
  initialState: companyAdapter.getInitialState({
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
    [getCompany.fulfilled]: companyAdapter.setAll,
  },
})

export const { setCompanySearchText } = companySlice.actions

export const selectCompanySearchText = ({ eCommerceApp }) => eCommerceApp.company.searchText

export default companySlice.reducer