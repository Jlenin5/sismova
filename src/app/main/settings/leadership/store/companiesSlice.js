import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getCompanies = asyncThunkWithAxios('companies', 'get', 'LeadershipSC/companies/getCompanies', 'get')
export const putCompanies = asyncThunkWithAxios('updatecompanies', 'put', 'LeadershipSC/companies/putCompanies', 'put')
export const postCompanies = asyncThunkWithAxios('postcompanies', 'post', 'LeadershipSC/companies/postCompanies', 'post')
export const deleteCompanies = asyncThunkWithAxios('deletecompanies', 'delete', 'LeadershipSC/companies/deleteCompanies', 'delete')
export const delCompaniesMulti = asyncThunkWithAxios('delcompaniesmulti', 'delete', 'LeadershipSC/companies/delCompaniesMulti', 'deletemulti')

const companiesAdapter = createEntityAdapter({})

export const { selectAll: selectCompanies, selectById: selectCompaniesById } =
  companiesAdapter.getSelectors((state) => state.LeadershipSC.companies)

const companiesSlice = createSlice({
  name: 'LeadershipSC/companies',
  initialState: companiesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCompaniesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCompanies.fulfilled]: (state, action) => companiesAdapter.setAll(state, action.payload.data),
    [putCompanies.fulfilled]: (state, action) => companiesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postCompanies.fulfilled]: companiesAdapter.addOne,
    [deleteCompanies.fulfilled]: companiesAdapter.removeOne,
    [delCompaniesMulti.fulfilled]: companiesAdapter.removeMany,
  },
})

export const { setCompaniesSearchText } = companiesSlice.actions

export const selectCompaniesSearchText = ({ LeadershipSC }) => LeadershipSC.companies.searchText

export default companiesSlice.reducer