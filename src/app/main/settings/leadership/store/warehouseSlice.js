import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getWarehouses = asyncThunkWithAxios('wh', 'get', 'settingsApp/warehouses/getWarehouses', 'get')
export const getMaxId = asyncThunkWithAxios('whmax', 'get', 'settingsApp/warehouses/getMaxId', 'getmax')
export const putWarehouse = asyncThunkWithAxios('updatewh', 'put', 'settingsApp/warehouses/putWarehouse', 'put')
export const postWarehouse = asyncThunkWithAxios('postwh', 'post', 'settingsApp/warehouses/postWarehouse', 'post')
export const deleteWarehouse = asyncThunkWithAxios('deletewh', 'delete', 'settingsApp/warehouses/deleteWarehouse', 'delete')
export const delWarehouseMulti = asyncThunkWithAxios('delwhmulti', 'delete', 'settingsApp/warehouses/delWarehouseMulti', 'deletemulti')

const warehouseAdapter = createEntityAdapter({})

export const { selectAll: selectWarehouse, selectById: selectWarehouseById } =
  warehouseAdapter.getSelectors((state) => state.settingsApp.warehouse)

const warehouseSlice = createSlice({
  name: 'settingsApp/warehouses',
  initialState: warehouseAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setWarehouseSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getWarehouses.fulfilled]: warehouseAdapter.setAll,
    [putWarehouse.fulfilled]: (state, action) => warehouseAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postWarehouse.fulfilled]: warehouseAdapter.addOne,
    [deleteWarehouse.fulfilled]: warehouseAdapter.removeOne,
    [delWarehouseMulti.fulfilled]: warehouseAdapter.removeMany,
  },
})

export const { setWarehouseSearchText } = warehouseSlice.actions

export const selectWarehouseSearchText = ({ settingsApp }) => settingsApp.warehouse.searchText

export default warehouseSlice.reducer