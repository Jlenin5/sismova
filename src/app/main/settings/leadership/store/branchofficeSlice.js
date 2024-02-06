import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getBranchoffices = createAsyncThunk( 'LeadershipSC/branchoffice/getBranchoffices', async () => {
  const response = await axios.get(API_URL+'bo')
  return response.data
})

export const getMaxId = createAsyncThunk( 'LeadershipSC/branchoffice/getMaxId', async () => {
  const response = await axios.get(API_URL+'bomax')
  return await response.data
})

export const putBranchoffice = createAsyncThunk( 'LeadershipSC/branchoffice/putBranchoffice', async (data) => {
  const {id, boName,boPhone,boEmail,District,boAddress,User,boState} = data
  axios.put(API_URL+'updatebo/'+id, {boName,boPhone,boEmail,District,boAddress,User,boState})
  return data
})

export const postBranchoffice = createAsyncThunk( 'LeadershipSC/branchoffice/postBranchoffice', async (dataJson) => {
  axios.post(API_URL+'postbo', dataJson)
  return dataJson
})

export const deleteBranchoffice = createAsyncThunk( 'LeadershipSC/branchoffice/deleteBranchoffice', async (id) => {
  axios.delete(API_URL+'deletebo/'+id)
  return id
})

export const delBOMulti = createAsyncThunk( 'LeadershipSC/branchoffice/delBOMulti', async (ids) => {
    axios.delete(API_URL + 'delbomulti', {
      params: {
        bo_id: ids,
      },
    })
    return ids
})

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