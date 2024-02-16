import { combineReducers } from '@reduxjs/toolkit'
import quote from './quoteSlice'
import quotes from './quotesSlice'
import saleorder from './saleorderSlice'
import ticket from './ticketSlice'
import invoice from './invoiceSlice'

const reducer = combineReducers({
  quote,
  quotes,
  saleorder,
  ticket,
  invoice,
})

export default reducer