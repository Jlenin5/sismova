import { combineReducers } from '@reduxjs/toolkit'
import quote from './quoteSlice'
import quotes from './quotesSlice'
import saleorder from './saleorderSlice'
import saleorders from './saleordersSlice'
import ticket from './ticketSlice'
import invoice from './invoiceSlice'

const reducer = combineReducers({
  quote,
  quotes,
  saleorder,
  saleorders,
  ticket,
  invoice,
})

export default reducer