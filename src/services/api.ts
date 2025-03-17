import axios from 'axios'

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

Api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with a status code out of 2xx range
      const statusCode = error.response.status
      const errorMessage = error.response.data.message || 'An error occurred'

      // Handle different status codes accordingly
      if (statusCode === 401) {
        // Handle unauthorized error, for example by redirecting to login
        console.error('Unauthorized access - redirecting to login')
      } else if (statusCode === 500) {
        // Handle server errors
        console.error('Server error - try again later')
      } else if (statusCode === 403) {
        console.error('Authentication error')
      } else {
        // Handle other types of errors
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
