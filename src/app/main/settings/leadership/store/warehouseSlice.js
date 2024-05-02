import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getWarehouses = asyncThunkWithAxios('warehouse', 'get', 'LeadershipSC/warehouses/getWarehouses', 'get')
export const getMaxId = asyncThunkWithAxios('warehousemax', 'get', 'LeadershipSC/warehouses/getMaxId', 'getmax')
export const putWarehouse = asyncThunkWithAxios('updatewarehouse', 'put', 'LeadershipSC/warehouses/putWarehouse', 'put')
export const postWarehouse = asyncThunkWithAxios('postwarehouse', 'post', 'LeadershipSC/warehouses/postWarehouse', 'post')
export const deleteWarehouse = asyncThunkWithAxios('deletewarehouse', 'delete', 'LeadershipSC/warehouses/deleteWarehouse', 'delete')
export const delWarehouseMulti = asyncThunkWithAxios('delwarehousemulti', 'delete', 'LeadershipSC/warehouses/delWarehouseMulti', 'deletemulti')

const warehouseAdapter = createEntityAdapter({})

export const { selectAll: selectWarehouse, selectById: selectWarehouseById } =
  warehouseAdapter.getSelectors((state) => state.LeadershipSC.warehouse)

const warehouseSlice = createSlice({
  name: 'LeadershipSC/warehouses',
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
    [getWarehouses.fulfilled]: (state, action) => warehouseAdapter.setAll(state, action.payload.data),
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

export const selectWarehouseSearchText = ({ LeadershipSC }) => LeadershipSC.warehouse.searchText

export default warehouseSlice.reducer