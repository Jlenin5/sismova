import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from 'src/app/services/url'

export const getCompany = createAsyncThunk( 'settingsApp/company/getCompany', async () => {
    const response = await axios.get(API_URL+'com')
    return response.data
})

export const putCompany = async (data, updateFile) => {
  const formData = new FormData()
  formData.append('comImage', updateFile)
  for(const key in data) {
    formData.append(key, data[key])
  }
  const response = await axios.post(API_URL+'updatecom/'+data.id, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return response.data
}

const companyAdapter = createEntityAdapter({})

export const { selectAll: selectCompany, selectById: selectClientById } =
  companyAdapter.getSelectors((state) => state.settingsApp.company)

const companySlice = createSlice({
  name: 'settingsApp/company',
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

export const selectCompanySearchText = ({ settingsApp }) => settingsApp.company.searchText

export default companySlice.reducer