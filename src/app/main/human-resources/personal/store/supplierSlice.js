import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getSuppliers = asyncThunkWithAxios('supp', 'get', 'PersonalHR/suppliers/getSuppliers', 'get')
export const getMaxId = asyncThunkWithAxios('suppmax', 'get', 'PersonalHR/suppliers/getMaxId', 'getmax')
export const putSupplier = asyncThunkWithAxios('updatesupp', 'put', 'PersonalHR/suppliers/putSupplier', 'put')
export const postSupplier = asyncThunkWithAxios('postsupp', 'post', 'PersonalHR/suppliers/postSupplier', 'post')
export const deleteSupplier = asyncThunkWithAxios('deletesupp', 'delete', 'PersonalHR/suppliers/deleteSupplier', 'delete')
export const delSupplierMulti = asyncThunkWithAxios('delsuppmulti', 'delete', 'PersonalHR/suppliers/delSupplierMulti', 'deletemulti')

const supplierAdapter = createEntityAdapter({})

export const { selectAll: selectSupplier, selectById: selectSupplierById } =
  supplierAdapter.getSelectors((state) => state.PersonalHR.supplier)

const supplierSlice = createSlice({
  name: 'PersonalHR/suppliers',
  initialState: supplierAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSupplierSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSuppliers.fulfilled]: (state, action) => supplierAdapter.setAll(state, action.payload.data),
    [putSupplier.fulfilled]: (state, action) => supplierAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postSupplier.fulfilled]: supplierAdapter.addOne,
    [deleteSupplier.fulfilled]: supplierAdapter.removeOne,
    [delSupplierMulti.fulfilled]: supplierAdapter.removeMany,
  },
})

export const { setSupplierSearchText } = supplierSlice.actions

export const selectSupplierSearchText = ({ PersonalHR }) => PersonalHR.supplier.searchText

export default supplierSlice.reducer