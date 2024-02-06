import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getJobPositions = asyncThunkWithAxios('jp', 'get', 'OcupationHR/jobpositions/getJobPositions', 'get')
export const getMaxId = asyncThunkWithAxios('jpmax', 'get', 'OcupationHR/jobpositions/getMaxId', 'getmax')
export const putJobPosition = asyncThunkWithAxios('updatejp', 'put', 'OcupationHR/jobpositions/putJobPosition', 'put')
export const postJobPosition = asyncThunkWithAxios('postjp', 'post', 'OcupationHR/jobpositions/postJobPosition', 'post')
export const deleteJobPosition = asyncThunkWithAxios('deletejp', 'delete', 'OcupationHR/jobpositions/deleteJobPosition', 'delete')
export const delJPMulti = asyncThunkWithAxios('deljpmulti', 'delete', 'OcupationHR/jobpositions/delJPMulti', 'deletemulti')

const jobpositionAdapter = createEntityAdapter({})

export const { selectAll: selectJobPosition, selectById: selectJobPositionById } =
  jobpositionAdapter.getSelectors((state) => state.OcupationHR.jobposition)

const jpSlice = createSlice({
  name: 'OcupationHR/jobpositions',
  initialState: jobpositionAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setJobPositionSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getJobPositions.fulfilled]: jobpositionAdapter.setAll,
    [putJobPosition.fulfilled]: (state, action) => jobpositionAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postJobPosition.fulfilled]: jobpositionAdapter.addOne,
    [deleteJobPosition.fulfilled]: jobpositionAdapter.removeOne,
    [delJPMulti.fulfilled]: jobpositionAdapter.removeMany,
  },
})

export const { setJobPositionSearchText } = jpSlice.actions

export const selectJobPositionSearchText = ({ OcupationHR }) => OcupationHR.jobposition.searchText

export default jpSlice.reducer