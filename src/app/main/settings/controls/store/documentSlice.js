import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getDocuments = createAsyncThunk( 'ControlsSC/documents/getDocuments', async () => {
  const response = await axios.get(API_URL+'doct')
  return response.data
})

export const getMaxId = createAsyncThunk( 'ControlsSC/documents/getMaxId', async () => {
  const response = await axios.get(API_URL+'doctmax')
  return response.data
})

export const putDocument = createAsyncThunk( 'ControlsSC/documents/putDocument', async (data) => {
  const {id, doctAbbreviation, doctName} = data
  await axios.put(API_URL+'updatedoc/'+id, {doctAbbreviation, doctName})
  return data
})

export const postDocument = createAsyncThunk( 'ControlsSC/documents/postDocument', async (dataJson) => {
  await axios.post(API_URL+'postdoct', dataJson)
  return dataJson
})

export const deleteDocument = createAsyncThunk( 'ControlsSC/documents/deleteDocument', async (id) => {
  await axios.delete(API_URL+'deletedoct/'+id)
  return id
})

export const delDocumentMulti = createAsyncThunk( 'ControlsSC/documents/delDocumentMulti', async (ids) => {
  await axios.delete(API_URL + 'deldoctmulti', {
    params: {
      dataId: ids,
    },
  })
  return ids
})

const documentAdapter = createEntityAdapter({})

export const { selectAll: selectDocument, selectById: selectDocumentById } =
  documentAdapter.getSelectors((state) => state.ControlsSC.document)

const documentSlice = createSlice({
  name: 'ControlsSC/documents',
  initialState: documentAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setDocumentSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getDocuments.fulfilled]: documentAdapter.setAll,
    [putDocument.fulfilled]: (state, action) => documentAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postDocument.fulfilled]: documentAdapter.addOne,
    [deleteDocument.fulfilled]: documentAdapter.removeOne,
    [delDocumentMulti.fulfilled]: documentAdapter.removeMany,
  },
})

export const { setDocumentSearchText } = documentSlice.actions

export const selectDocumentSearchText = ({ ControlsSC }) => ControlsSC.document.searchText

export default documentSlice.reducer