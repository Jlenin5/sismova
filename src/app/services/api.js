import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// api_web
// const API_URL = 'https://sismova.tech/backsis/public/api/'
// api local
const API_URL = 'http://127.0.0.1:8000/api/'

const asyncThunkWithAxios = (endpoint, method, actionName, changeMethod) => {
  return createAsyncThunk(actionName, async (params) => {
    var response = null
    if (changeMethod === 'put') {
      response = await axios[method](API_URL + endpoint + '/'+ params.id, params)
    } else if (changeMethod === 'postFormData') {
      if(method==='post') {
        response = await axios.post(API_URL + endpoint, params, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      } else {
        response = await axios.post(API_URL + endpoint + '/' + params.id, params, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      }
    } else if (changeMethod === 'getid' || changeMethod === 'delete') {
      response = await axios[method](API_URL + endpoint + '/' + params)
    } else if (changeMethod === 'deletemulti') {
      response = await axios.delete(API_URL + endpoint, {
        params: {
          dataId: params,
        },
      })
    } else if(changeMethod === 'export') {
      let url = API_URL + endpoint + `?page=${params.page}&per_page=${params.rowsPerPage}&search_text=${params.searchText}`
      response = await axios[method](url, params)
      window.open(url,'_blank')
    } else {
      if(params) {
        response = await axios[method](
          API_URL + endpoint + `?page=${params.page}&per_page=${params.rowsPerPage}&search_text=${params.searchText}`,
          params
        )
      } else {
        response = await axios[method](API_URL + endpoint, params)
      }
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