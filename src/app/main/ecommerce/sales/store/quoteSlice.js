import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getQuotes = asyncThunkWithAxios('qt', 'get', 'SalesEC/quotes/getQuotes', 'get')
export const getMaxId = asyncThunkWithAxios('qtmax', 'get', 'SalesEC/quotes/getMaxId', 'getmax')
export const putQuote = asyncThunkWithAxios('updateqt', 'put', 'SalesEC/quotes/putQuote', 'put')
export const postQuote = asyncThunkWithAxios('postqt', 'post', 'SalesEC/quotes/postQuote', 'post')
export const deleteQuote = asyncThunkWithAxios('deleteqt', 'delete', 'SalesEC/quotes/deleteQuote', 'delete')
export const delQuoteMulti = asyncThunkWithAxios('delqtmulti', 'delete', 'SalesEC/quotes/delQuoteMulti', 'deletemulti')

const quoteAdapter = createEntityAdapter({})

export const { selectAll: selectQuote, selectById: selectQuoteById } =
  quoteAdapter.getSelectors((state) => state.SalesEC.quote)

const quoteSlice = createSlice({
  name: 'SalesEC/quotes',
  initialState: quoteAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setQuoteSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getQuotes.fulfilled]: quoteAdapter.setAll,
    [putQuote.fulfilled]: (state, action) => quoteAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postQuote.fulfilled]: quoteAdapter.addOne,
    [deleteQuote.fulfilled]: quoteAdapter.removeOne,
    [delQuoteMulti.fulfilled]: quoteAdapter.removeMany,
  },
})

export const { setQuoteSearchText } = quoteSlice.actions

export const selectQuoteSearchText = ({ SalesEC }) => SalesEC.quote.searchText

export default quoteSlice.reducer