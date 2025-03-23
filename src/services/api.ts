import axios from 'axios'
import { toast } from 'react-toastify'

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

Api.defaults.withCredentials = true

Api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      // Server responded with a status code out of 2xx range
      const statusCode = error.response.status
      const errorMessage = error.response.data.message || 'An error occurred'

      // Handle different status codes accordingly
      if (statusCode === 401) {
        /**
         * If the user is not authenticated, attempt to refresh the token
         */
        // try {
        //   // const url = `${ process.env.NEXT_PUBLIC_BACKEND_URL }/auth/refresh`
        //   // const response = await axios.get(url, { withCredentials: true })
        //   const response = await Api.get('/auth/refresh')
        //   return response
        // } catch (error) {
        //   console.error(error)
        // }
        console.error('Unauthorized access.')
      } else if (statusCode === 500) {
        // Handle server errors
        console.error('Server error - try again later')
      } else if (statusCode === 403) {
        toast.error('This resource is forbidden.')
        console.error('Authentication error')
      } else {
        // Handle other types of errors
        toast.error(errorMessage)
        console.error(`Error ${statusCode}: ${errorMessage}`)
      }
    } else if (error.request) {
      // No response received (network error, timeout, etc.)
      console.error('Network error - check your internet connection')
    } else {
      // Something else happened during the request
      console.error('Request error:', error.message)
    }
    return Promise.reject(error)
  },
)

export default Api
