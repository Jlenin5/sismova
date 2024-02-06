import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getEmployees = asyncThunkWithAxios('emp', 'get', 'PersonalHR/employees/getEmployees', 'get')
export const getMaxId = asyncThunkWithAxios('empmax', 'get', 'PersonalHR/employees/getMaxId', 'getmax')
export const putEmployee = asyncThunkWithAxios('updateemp', 'put', 'PersonalHR/employees/putEmployee', 'put')
export const postEmployee = asyncThunkWithAxios('postemp', 'post', 'PersonalHR/employees/postEmployee', 'post')
export const deleteEmployee = asyncThunkWithAxios('deleteemp', 'delete', 'PersonalHR/employees/deleteEmployee', 'delete')
export const delEmployeeMulti = asyncThunkWithAxios('delempmulti', 'delete', 'PersonalHR/employees/delEmployeeMulti', 'deletemulti')

const employeeAdapter = createEntityAdapter({})

export const { selectAll: selectEmployee, selectById: selectEmployeeById } =
  employeeAdapter.getSelectors((state) => state.PersonalHR.employee)

const employeeSlice = createSlice({
  name: 'PersonalHR/employees',
  initialState: employeeAdapter.getInitialState({
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
    [getEmployees.fulfilled]: employeeAdapter.setAll,
    [putEmployee.fulfilled]: (state, action) => employeeAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postEmployee.fulfilled]: employeeAdapter.addOne,
    [deleteEmployee.fulfilled]: employeeAdapter.removeOne,
    [delEmployeeMulti.fulfilled]: employeeAdapter.removeMany,
  },
})

export const { setEmployeeSearchText } = employeeSlice.actions

export const selectEmployeeSearchText = ({ PersonalHR }) => PersonalHR.employee.searchText

export default employeeSlice.reducer