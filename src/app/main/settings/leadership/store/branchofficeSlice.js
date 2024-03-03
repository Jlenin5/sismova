import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getBranchoffices = asyncThunkWithAxios('bo', 'get', 'LeadershipSC/branchoffice/getBranchoffices', 'get')
export const getMaxId = asyncThunkWithAxios('bomax', 'get', 'LeadershipSC/branchoffice/getMaxId', 'getmax')
export const putBranchoffice = asyncThunkWithAxios('updatebo', 'put', 'LeadershipSC/branchoffice/putBranchoffice', 'put')
export const postBranchoffice = asyncThunkWithAxios('postbo', 'post', 'LeadershipSC/branchoffice/postBranchoffice', 'post')
export const deleteBranchoffice = asyncThunkWithAxios('deletebo', 'delete', 'LeadershipSC/branchoffice/deleteBranchoffice', 'delete')
export const delBOMulti = asyncThunkWithAxios('delbomulti', 'delete', 'LeadershipSC/branchoffice/delBranchofficeMulti', 'deletemulti')

const branchofficeAdapter = createEntityAdapter({})

export const { selectAll: selectBranchOffice, selectById: selectBranchOfficeById } =
  branchofficeAdapter.getSelectors((state) => state.LeadershipSC.branchoffice)

const branchofficeSlice = createSlice({
  name: 'LeadershipSC/branchoffice',
  initialState: branchofficeAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setBranchOfficeSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getBranchoffices.fulfilled]: branchofficeAdapter.setAll,
    [putBranchoffice.fulfilled]: (state, action) => branchofficeAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postBranchoffice.fulfilled]: branchofficeAdapter.addOne,
    [deleteBranchoffice.fulfilled]: branchofficeAdapter.removeOne,
    [delBOMulti.fulfilled]: branchofficeAdapter.removeMany,
  },
})

export const { setBranchOfficeSearchText } = branchofficeSlice.actions

export const selectBranchOfficeSearchText = ({ LeadershipSC }) => LeadershipSC.branchoffice.searchText

export default branchofficeSlice.reducer