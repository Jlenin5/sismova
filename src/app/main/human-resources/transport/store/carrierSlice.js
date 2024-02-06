import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getCarriers = asyncThunkWithAxios('carr', 'get', 'TransportHR/carriers/getCarriers', 'get')
export const getMaxId = asyncThunkWithAxios('carrmax', 'get', 'TransportHR/carriers/getMaxId', 'getmax')
export const putCarrier = asyncThunkWithAxios('updatecarr', 'put', 'TransportHR/carriers/putCarrier', 'put')
export const postCarrier = asyncThunkWithAxios('postcarr', 'post', 'TransportHR/carriers/postCarrier', 'post')
export const deleteCarrier = asyncThunkWithAxios('deletecarr', 'delete', 'TransportHR/carriers/deleteCarrier', 'delete')
export const delCarrierMulti = asyncThunkWithAxios('delcarrmulti', 'delete', 'TransportHR/carriers/delCarrierMulti', 'deletemulti')

const carrierAdapter = createEntityAdapter({})

export const { selectAll: selectCarrier, selectById: selectCarrierById } =
  carrierAdapter.getSelectors((state) => state.TransportHR.carrier)

const carrierSlice = createSlice({
  name: 'TransportHR/carriers',
  initialState: carrierAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCarrierSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCarriers.fulfilled]: carrierAdapter.setAll,
    [putCarrier.fulfilled]: (state, action) => carrierAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postCarrier.fulfilled]: carrierAdapter.addOne,
    [deleteCarrier.fulfilled]: carrierAdapter.removeOne,
    [delCarrierMulti.fulfilled]: carrierAdapter.removeMany,
  },
})

export const { setCarrierSearchText } = carrierSlice.actions

export const selectCarrierSearchText = ({ TransportHR }) => TransportHR.carrier.searchText

export default carrierSlice.reducer