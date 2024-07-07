import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getCustomers = asyncThunkWithAxios('customers', 'get', 'PersonalHR/customers/getCustomers', 'get')
export const putCustomer = asyncThunkWithAxios('updatecustomers', 'put', 'PersonalHR/customers/putCustomer', 'put')
export const postCustomer = asyncThunkWithAxios('postcustomers', 'post', 'PersonalHR/customers/postCustomer', 'post')
export const deleteCustomer = asyncThunkWithAxios('deletecustomers', 'delete', 'PersonalHR/customers/deleteCustomer', 'delete')
export const delCustomerMulti = asyncThunkWithAxios('delcustomersmulti', 'delete', 'PersonalHR/customers/delCustomerMulti', 'deletemulti')

const customersAdapter = createEntityAdapter({})

export const { selectAll: selectCustomer, selectById: selectCustomerById } =
  customersAdapter.getSelectors((state) => state.PersonalHR.customer)

const customersSlice = createSlice({
  name: 'PersonalHR/customers',
  initialState: customersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setcustomersearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCustomers.fulfilled]: (state, action) => customersAdapter.setAll(state, action.payload.data),
    [putCustomer.fulfilled]: (state, action) => customersAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postCustomer.fulfilled]: customersAdapter.addOne,
    [deleteCustomer.fulfilled]: customersAdapter.removeOne,
    [delCustomerMulti.fulfilled]: customersAdapter.removeMany,
  },
})

export const { setcustomersearchText } = customersSlice.actions

export const selectCustomerSearchText = ({ PersonalHR }) => PersonalHR.customer.searchText

export default customersSlice.reducer