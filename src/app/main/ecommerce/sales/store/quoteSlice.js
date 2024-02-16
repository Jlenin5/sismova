import { createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'
import QuotationInterface from 'src/app/interfaces/QuotationInterface'

export const getQuote = asyncThunkWithAxios('qt', 'get', 'SalesEC/quote/getQuote', 'getid')
export const getMaxId = asyncThunkWithAxios('qtmax', 'get', 'SalesEC/quote/getMaxId', 'getmax')
export const putQuote = asyncThunkWithAxios('updateqt', 'put', 'SalesEC/quote/putQuote', 'put')
export const postQuote = asyncThunkWithAxios('postqt', 'post', 'SalesEC/quote/postQuote', 'post')
export const deleteQuote = asyncThunkWithAxios('deleteqt', 'delete', 'SalesEC/quote/deleteQuote', 'delete')

const quoteSlice = createSlice({
  name: 'SalesEC/quote',
  initialState: null,
  reducers: {
    resetQuote: () => null,
    newQuote: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: QuotationInterface,
      }),
    },
  },
  extraReducers: {
    [getQuote.fulfilled]: (state, action) => action.payload,
    [putQuote.fulfilled]: (state, action) => action.payload,
    [deleteQuote.fulfilled]: (state, action) => null,
    [postQuote.fulfilled]: (state, action) => action.payload
  },
})

export const { newQuote, resetQuote } = quoteSlice.actions;

export const selectQuote = ({ SalesEC }) => SalesEC.quote;

export default quoteSlice.reducer