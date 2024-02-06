import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getCoins = asyncThunkWithAxios('cur', 'get', 'FinanceEC/coins/getCoins', 'get')
export const getMaxId = asyncThunkWithAxios('curmax', 'get', 'FinanceEC/coins/getMaxId', 'getmax')
export const putCoin = asyncThunkWithAxios('updatecur', 'put', 'FinanceEC/coins/putCoin', 'put')
export const postCoin = asyncThunkWithAxios('postcur', 'post', 'FinanceEC/coins/postCoin', 'post')
export const deleteCoin = asyncThunkWithAxios('deletecur', 'delete', 'FinanceEC/coins/deleteCoin', 'delete')
export const delCoinMulti = asyncThunkWithAxios('delcurmulti', 'delete', 'FinanceEC/coins/delCoinMulti', 'deletemulti')

const coinAdapter = createEntityAdapter({})

export const { selectAll: selectCoin, selectById: selectCoinById } =
  coinAdapter.getSelectors((state) => state.FinanceEC.coin)

const coinSlice = createSlice({
  name: 'FinanceEC/coins',
  initialState: coinAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCoinSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCoins.fulfilled]: coinAdapter.setAll,
    [putCoin.fulfilled]: (state, action) => coinAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postCoin.fulfilled]: coinAdapter.addOne,
    [deleteCoin.fulfilled]: coinAdapter.removeOne,
    [delCoinMulti.fulfilled]: coinAdapter.removeMany,
  },
})

export const { setCoinSearchText } = coinSlice.actions

export const selectCoinSearchText = ({ FinanceEC }) => FinanceEC.coin.searchText

export default coinSlice.reducer