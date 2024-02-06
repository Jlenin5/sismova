import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sismova.tech/backsis/public/api/'

const asyncThunkWithAxios = (endpoint, method, actionName, changeMethod) => {
  return createAsyncThunk(actionName, async (data) => {
    var response = null
    if (changeMethod === 'put') {
      response = await axios[method](API_URL + endpoint + '/'+ data.id, data)
    } else if (changeMethod === 'postFormData') {
      if(method==='post') {
        response = await axios.post(API_URL + endpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      } else {
        response = await axios.post(API_URL + endpoint + '/' + data.id, data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      }
    } else if (changeMethod === 'getid' || changeMethod === 'delete') {
      response = await axios[method](API_URL + endpoint + '/' + data)
    } else if (changeMethod === 'deletemulti') {
      response = await axios.delete(API_URL + endpoint, {
        params: {
          dataId: data,
        },
      })
    } else {
      response = await axios[method](API_URL + endpoint, data)
    }
    if (method === 'get') {
      return response.data
    } else if (method === 'post' || method === 'put') {
      if (changeMethod === 'postFormData') {
        // console.log(data)
        return data
      } else {
        // console.log(data)
        return data
      }
    } else if (method === 'delete') {
      return data
    }
  })
}

export default asyncThunkWithAxios