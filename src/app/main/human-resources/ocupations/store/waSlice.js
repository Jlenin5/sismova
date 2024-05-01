import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getWorkAreas = asyncThunkWithAxios('wa', 'get', 'OcupationHR/workareas/getWorkAreas', 'get')
export const getMaxId = asyncThunkWithAxios('wamax', 'get', 'OcupationHR/workareas/getMaxId', 'getmax')
export const putWorkArea = asyncThunkWithAxios('updatewa', 'put', 'OcupationHR/workareas/putWorkArea', 'put')
export const postWorkArea = asyncThunkWithAxios('postwa', 'post', 'OcupationHR/workareas/postWorkArea', 'post')
export const deleteWorkArea = asyncThunkWithAxios('deletewa', 'delete', 'OcupationHR/workareas/deleteWorkArea', 'delete')
export const delWAMulti = asyncThunkWithAxios('delwamulti', 'delete', 'OcupationHR/workareas/delWAMulti', 'deletemulti')

const workareaAdapter = createEntityAdapter({})

export const { selectAll: selectWorkArea, selectById: selectWorkAreaById } =
  workareaAdapter.getSelectors((state) => state.OcupationHR.workarea)

const waSlice = createSlice({
  name: 'OcupationHR/workareas',
  initialState: workareaAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setWorkAreaSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getWorkAreas.fulfilled]: (state, action) => workareaAdapter.setAll(state, action.payload.data),
    [putWorkArea.fulfilled]: (state, action) => workareaAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postWorkArea.fulfilled]: workareaAdapter.addOne,
    [deleteWorkArea.fulfilled]: workareaAdapter.removeOne,
    [delWAMulti.fulfilled]: workareaAdapter.removeMany,
  },
})

export const { setWorkAreaSearchText } = waSlice.actions

export const selectWorkAreaSearchText = ({ OcupationHR }) => OcupationHR.workarea.searchText

export default waSlice.reducer