import axios from 'axios'

const API_BASE_URL = 'https://sismova.tech/backsis/public/api/'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error de respuesta:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('Error de solicitud:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance