import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getTaxes = asyncThunkWithAxios('tax', 'get', 'FinanceEC/taxes/getTaxes', 'get')
export const getMaxId = asyncThunkWithAxios('taxmax', 'get', 'FinanceEC/taxes/getMaxId', 'getmax')
export const putTax = asyncThunkWithAxios('updatetax', 'put', 'FinanceEC/taxes/putTax', 'put')
export const postTax = asyncThunkWithAxios('posttax', 'post', 'FinanceEC/taxes/postTax', 'post')
export const deleteTax = asyncThunkWithAxios('deletetax', 'delete', 'FinanceEC/taxes/deleteTax', 'delete')
export const delTaxMulti = asyncThunkWithAxios('deltaxmulti', 'delete', 'FinanceEC/taxes/delTaxMulti', 'deletemulti')

const taxAdapter = createEntityAdapter({})

export const { selectAll: selectTaxes, selectById: selectTaxById } =
  taxAdapter.getSelectors((state) => state.FinanceEC.tax)

const taxSlice = createSlice({
  name: 'FinanceEC/taxes',
  initialState: taxAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setTaxesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getTaxes.fulfilled]: taxAdapter.setAll,
    [putTax.fulfilled]: (state, action) => taxAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postTax.fulfilled]: taxAdapter.addOne,
    [deleteTax.fulfilled]: taxAdapter.removeOne,
    [delTaxMulti.fulfilled]: taxAdapter.removeMany,
  },
})

export const { setTaxesSearchText } = taxSlice.actions

export const selectTaxesSearchText = ({ FinanceEC }) => FinanceEC.tax.searchText

export default taxSlice.reducer