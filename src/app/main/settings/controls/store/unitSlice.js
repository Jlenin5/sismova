import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getUnits = asyncThunkWithAxios('unit', 'get', 'ControlsSC/units/getUnits', 'get')
export const getMaxId = asyncThunkWithAxios('unitmax', 'get', 'ControlsSC/units/getMaxId', 'getmax')
export const putUnit = asyncThunkWithAxios('updateunit', 'put', 'ControlsSC/units/putUnit', 'put')
export const postUnit = asyncThunkWithAxios('postunit', 'post', 'ControlsSC/units/postUnit', 'post')
export const deleteUnit = asyncThunkWithAxios('deleteunit', 'delete', 'ControlsSC/units/deleteUnit', 'delete')
export const delUnitMulti = asyncThunkWithAxios('delunitmulti', 'delete', 'ControlsSC/units/delUnitMulti', 'deletemulti')

const unitAdapter = createEntityAdapter({})

export const { selectAll: selectUnit, selectById: selectUnitById } =
  unitAdapter.getSelectors((state) => state.ControlsSC.unit)

const unitSlice = createSlice({
  name: 'ControlsSC/units',
  initialState: unitAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setUnitSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUnits.fulfilled]: (state, action) => unitAdapter.setAll(state, action.payload.data),
    [putUnit.fulfilled]: (state, action) => unitAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postUnit.fulfilled]: unitAdapter.addOne,
    [deleteUnit.fulfilled]: unitAdapter.removeOne,
    [delUnitMulti.fulfilled]: unitAdapter.removeMany,
  },
})

export const { setUnitSearchText } = unitSlice.actions

export const selectUnitSearchText = ({ ControlsSC }) => ControlsSC.unit.searchText

export default unitSlice.reducer