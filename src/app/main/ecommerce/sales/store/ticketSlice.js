import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getTickets = asyncThunkWithAxios('tic', 'get', 'SalesEC/tickets/getTickets', 'get')
export const getMaxId = asyncThunkWithAxios('ticmax', 'get', 'SalesEC/tickets/getMaxId', 'getmax')
export const putTicket = asyncThunkWithAxios('updatetic', 'put', 'SalesEC/tickets/putTicket', 'put')
export const postTicket = asyncThunkWithAxios('posttic', 'post', 'SalesEC/tickets/postTicket', 'post')
export const deleteTicket = asyncThunkWithAxios('deletetic', 'delete', 'SalesEC/tickets/deleteTicket', 'delete')
export const delTicketMulti = asyncThunkWithAxios('delticmulti', 'delete', 'SalesEC/tickets/delTicketMulti', 'deletemulti')

const ticketAdapter = createEntityAdapter({})

export const { selectAll: selectTicket, selectById: selectTicketById } =
  ticketAdapter.getSelectors((state) => state.SalesEC.ticket)

const ticketSlice = createSlice({
  name: 'SalesEC/tickets',
  initialState: ticketAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setTicketSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getTickets.fulfilled]: ticketAdapter.setAll,
    [putTicket.fulfilled]: (state, action) => ticketAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postTicket.fulfilled]: ticketAdapter.addOne,
    [deleteTicket.fulfilled]: ticketAdapter.removeOne,
    [delTicketMulti.fulfilled]: ticketAdapter.removeMany,
  },
})

export const { setTicketSearchText } = ticketSlice.actions

export const selectTicketSearchText = ({ SalesEC }) => SalesEC.ticket.searchText

export default ticketSlice.reducer