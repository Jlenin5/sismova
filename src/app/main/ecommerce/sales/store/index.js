import { combineReducers } from '@reduxjs/toolkit'
import quote from './quoteSlice'
import saleorder from './saleorderSlice'
import ticket from './ticketSlice'
import invoice from './invoiceSlice'

const reducer = combineReducers({
  quote,
  saleorder,
  ticket,
  invoice,
})

export default reducer