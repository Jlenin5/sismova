import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import _ from '@lodash'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const setRole = createAsyncThunk('role/setRole', async () => {
  const response = await axios.get(API_URL+'rol')
  return response.data
})

const rolesAdapter = createEntityAdapter({})

const initialState = {
  name: 'admin'
}

const roleSlice = createSlice({
  name: 'role',
  initialState,
  extraReducers: {
    [setRole.fulfilled]: rolesAdapter.setAll
  },
})

export const selectRole = ({ role }) => role

export default roleSlice.reducer