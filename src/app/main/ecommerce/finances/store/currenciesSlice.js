import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getCurrencies = asyncThunkWithAxios('currencies', 'get', 'FinanceEC/currencies/getCurrencies', 'get')
export const putCurrency = asyncThunkWithAxios('update_currencies', 'put', 'FinanceEC/currencies/putCurrency', 'put')
export const postCurrency = asyncThunkWithAxios('post_currencies', 'post', 'FinanceEC/currencies/postCurrency', 'post')
export const deleteCurrency = asyncThunkWithAxios('delete_currencies', 'delete', 'FinanceEC/currencies/deleteCurrency', 'delete')
export const delCurrencyMulti = asyncThunkWithAxios('delcurmulti', 'delete', 'FinanceEC/currencies/delCurrencyMulti', 'deletemulti')

const currencyAdapter = createEntityAdapter({})

export const { selectAll: selectCurrency, selectById: selectCurrencyById } =
  currencyAdapter.getSelectors((state) => state.FinanceEC.currencies)

const currenciesSlice = createSlice({
  name: 'FinanceEC/currencies',
  initialState: currencyAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCurrencySearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCurrencies.fulfilled]: (state, action) => currencyAdapter.setAll(state, action.payload.data),
    [putCurrency.fulfilled]: (state, action) => currencyAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postCurrency.fulfilled]: currencyAdapter.addOne,
    [deleteCurrency.fulfilled]: currencyAdapter.removeOne,
    [delCurrencyMulti.fulfilled]: currencyAdapter.removeMany,
  },
})

export const { setCurrencySearchText } = currenciesSlice.actions

export const selectCurrencySearchText = ({ FinanceEC }) => FinanceEC.currencies.searchText

export default currenciesSlice.reducer