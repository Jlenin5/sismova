import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

export const getDocumentType = async () => {
    try {
      const response = await axios.get(API_URL+'doct')
      return await response.data
    } catch(error) {
      throw error
    }
}


const DocumentTypeAdapter = createEntityAdapter({})

export const { selectAll: selectDocumentTypes, selectById: selectCategoryById } =
  DocumentTypeAdapter.getSelectors((state) => state.eCommerceApp.documentTypes)

const DocumentTypeSlice = createSlice({
  name: 'eCommerceApp/categories',
  initialState: DocumentTypeAdapter.getInitialState({
    searchText: '',
  }),
})

export const { setCategoriesSearchText } = DocumentTypeSlice.actions

export default DocumentTypeSlice.reducer