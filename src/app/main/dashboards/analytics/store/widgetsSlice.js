import { createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getAudiences = asyncThunkWithAxios('audience', 'get', 'analyticsDashboardApp/widgets/getAudiences', 'get')

const widgetsSlice = createSlice({
  name: 'analyticsDashboardApp/widgets',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getAudiences.fulfilled]: (state, action) => action.payload,
  },
})

export const selectWidgets = ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets

export default widgetsSlice.reducer
