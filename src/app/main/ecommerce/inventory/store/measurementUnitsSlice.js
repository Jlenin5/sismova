import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getMeasurementUnits = asyncThunkWithAxios('measurement_unit', 'get', 'InventoryEC/measurementUnits/getMeasurementUnits', 'get')
export const putMeasurementUnit = asyncThunkWithAxios('update_measurement_unit', 'put', 'InventoryEC/measurementUnits/putMeasurementUnit', 'put')
export const postMeasurementUnit = asyncThunkWithAxios('post_measurement_unit', 'post', 'InventoryEC/measurementUnits/postMeasurementUnit', 'post')
export const deleteMeasurementUnit = asyncThunkWithAxios('delete_measurement_unit', 'delete', 'InventoryEC/measurementUnits/deleteMeasurementUnit', 'delete')
export const delMeasurementUnitMulti = asyncThunkWithAxios('delunitmulti', 'delete', 'InventoryEC/measurementUnits/delMeasurementUnitMulti', 'deletemulti')

const measurementUnitAdapter = createEntityAdapter({})

export const { selectAll: selectMeasurementUnit, selectById: selectMeasurementUnitById } =
  measurementUnitAdapter.getSelectors((state) => state.InventoryEC.measurementUnits)

const measurementUnitsSlice = createSlice({
  name: 'InventoryEC/measurementUnits',
  initialState: measurementUnitAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setMeasurementUnitSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getMeasurementUnits.fulfilled]: (state, action) => measurementUnitAdapter.setAll(state, action.payload.data),
    [putMeasurementUnit.fulfilled]: (state, action) => measurementUnitAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postMeasurementUnit.fulfilled]: measurementUnitAdapter.addOne,
    [deleteMeasurementUnit.fulfilled]: measurementUnitAdapter.removeOne,
    [delMeasurementUnitMulti.fulfilled]: measurementUnitAdapter.removeMany,
  },
})

export const { setMeasurementUnitSearchText } = measurementUnitsSlice.actions

export const selectMeasurementUnitSearchText = ({ InventoryEC }) => InventoryEC.measurementUnits.searchText

export default measurementUnitsSlice.reducer