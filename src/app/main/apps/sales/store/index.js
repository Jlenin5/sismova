import { combineReducers } from '@reduxjs/toolkit'
import quotes from './quotesSlice'
import saleorder from './saleorderSlice'
import ticketinvoice from './ticketinvoiceSlice'

const reducer = combineReducers({
  quotes,
  saleorder,
  ticketinvoice,
})

export default reducer