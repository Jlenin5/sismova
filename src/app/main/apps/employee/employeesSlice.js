import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getDatas = createAsyncThunk( 'ecommerceApp/employees/getEployees', async () => {
    const response = await axios.get(API_URL+'emp')
    return response.data
})

export const getMaxId = async () => {
  const response = await axios.get(API_URL+'empmax')
  return await response.data
}

export const getDataId = async (empId) => {
  const response = await axios.get(API_URL+'emp/'+empId)
  return await response.data
}

export const putData = async (data) => {
  const {empId, empFirstName, empSecondName, DocumentTypeId, empDocument, empEmail, empPhone, empGender, empState} = data
  const response = await axios.put(API_URL+'updateemp/'+empId, {empFirstName, empSecondName, DocumentTypeId, empDocument, empEmail, empPhone, empGender, empState})
  return await response.data
}

export const postData = async (dataJson) => {
  const response = await axios.post(API_URL+'postemp', dataJson)
  return await response.data
}

export const destroyData = async (id) => {
  const response = await axios.delete(API_URL+'deleteemp/'+id)
  return await response.data
}

export const delDataMulti = async (empIds) => {
  const response = await axios.delete(API_URL + 'delempmulti', {
    params: {
      dataId: empIds,
    },
  })
  return response.data
}

const employeesAdapter = createEntityAdapter({})

export const { selectAll: selectEmployees, selectById: selectEmployeeById } =
  employeesAdapter.getSelectors((state) => state.ecommerceApp.employees)

const employeesSlice = createSlice({
  name: 'ecommerceApp/employees',
  initialState: employeesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setEmployeeSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getDatas.fulfilled]: (state, action) => {
      const employeesWithIds = action.payload.map(employee => ({
        id: employee.empId,
        ...employee
      }))
      employeesAdapter.setAll(state, employeesWithIds);
    },
    // [getMaxId.fulfilled]: employeesAdapter.setAll,
    // [getDataId.fulfilled]: employeesAdapter.setAll,
  },
})

export const { setEmployeeSearchText } = employeesSlice.actions

export const selectEmployeesSearchText = ({ ecommerceApp }) => ecommerceApp.employees.searchText

export default employeesSlice.reducer