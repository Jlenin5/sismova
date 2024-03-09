import { createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'
import EmployeeInterface from 'src/app/interfaces/EmployeeInterface'

export const getEmployee = asyncThunkWithAxios('emp', 'get', 'PersonalHR/employees/getEmployee', 'getid')
export const getMaxId = asyncThunkWithAxios('empmax', 'get', 'PersonalHR/employees/getMaxId', 'getmax')
export const putEmployee = asyncThunkWithAxios('updateemp', 'put', 'PersonalHR/employees/putEmployee', 'put')
export const postEmployee = asyncThunkWithAxios('postemp', 'post', 'PersonalHR/employees/postEmployee', 'post')
export const deleteEmployee = asyncThunkWithAxios('deleteemp', 'delete', 'PersonalHR/employees/deleteEmployee', 'delete')

const employeeSlice = createSlice({
  name: 'PersonalHR/employee',
  initialState: null,
  reducers: {
    resetEmployee: () => null,
    newEmployee: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: EmployeeInterface,
      }),
    },
  },
  extraReducers: {
    [getEmployee.fulfilled]: (state, action) => action.payload,
    [putEmployee.fulfilled]: (state, action) => action.payload,
    [deleteEmployee.fulfilled]: (state, action) => null,
    [postEmployee.fulfilled]: (state, action) => action.payload
  },
})

export const { newEmployee, resetEmployee } = employeeSlice.actions;

export const selectEmployee = ({ PersonalHR }) => PersonalHR.employee;

export default employeeSlice.reducer