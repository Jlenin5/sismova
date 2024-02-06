import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getMobilities = asyncThunkWithAxios('mob', 'get', 'TransportHR/mobilities/getMobilities', 'get')
export const getMaxId = asyncThunkWithAxios('mobmax', 'get', 'TransportHR/mobilities/getMaxId', 'getmax')
export const putMobility = asyncThunkWithAxios('updatemob', 'put', 'TransportHR/mobilities/putMobility', 'put')
export const postMobility = asyncThunkWithAxios('postmob', 'post', 'TransportHR/mobilities/postMobility', 'post')
export const deleteMobility = asyncThunkWithAxios('deletemob', 'delete', 'TransportHR/mobilities/deleteMobility', 'delete')
export const delMobMulti = asyncThunkWithAxios('delmobmulti', 'delete', 'TransportHR/mobilities/delMobMulti', 'deletemulti')

const mobilityAdapter = createEntityAdapter({})

export const { selectAll: selectMobility, selectById: selectMobilityById } =
  mobilityAdapter.getSelectors((state) => state.TransportHR.mobility)

const mobilitySlice = createSlice({
  name: 'TransportHR/mobilities',
  initialState: mobilityAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setMobilitySearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getMobilities.fulfilled]: mobilityAdapter.setAll,
    [putMobility.fulfilled]: (state, action) => mobilityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postMobility.fulfilled]: mobilityAdapter.addOne,
    [deleteMobility.fulfilled]: mobilityAdapter.removeOne,
    [delMobMulti.fulfilled]: mobilityAdapter.removeMany,
  },
})

export const { setMobilitySearchText } = mobilitySlice.actions

export const selectMobilitySearchText = ({ TransportHR }) => TransportHR.mobility.searchText

export default mobilitySlice.reducer