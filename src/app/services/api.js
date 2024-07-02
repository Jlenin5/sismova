import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from './url'

const asyncThunkWithAxios = (endpoint, method, actionName, changeMethod) => {
  return createAsyncThunk(actionName, async (params) => {
    let response = null

    if (changeMethod === 'put') {
      response = await axios[method](API_URL + endpoint + '/' + params.id, params)
    } else if (changeMethod === 'postFormData') {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      if (method === 'post') {
        response = await axios.post(API_URL + endpoint, params, config)
      } else {
        response = await axios.post(API_URL + endpoint + '/' + params.id, params, config)
      }
    } else if (changeMethod === 'getid' || changeMethod === 'delete') {
      response = await axios[method](API_URL + endpoint + '/' + params)
    } else if (changeMethod === 'deletemulti') {
      response = await axios.delete(API_URL + endpoint, {
        params: {
          dataId: params,
        },
      })
    } else if (changeMethod === 'export') {
      const url = API_URL + endpoint + `?page=${params.page}&per_page=${params.rowsPerPage}&search_text=${params.searchText}`
      response = await axios[method](url, params)
      window.open(url, '_blank')
    } else {
      const url = params
        ? API_URL + endpoint + `?page=${params.page}&per_page=${params.rowsPerPage}&search_text=${params.searchText}`
        : API_URL + endpoint
      response = await axios[method](url, params)
    }

    if (method === 'get') {
      return response.data
    } else if (method === 'post' || method === 'put') {
      if (changeMethod === 'postFormData') {
        return params
      } else {
        return params
      }
    } else if (method === 'delete') {
      return params
    }
  })
}

export default asyncThunkWithAxios