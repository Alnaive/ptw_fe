import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const authStore = useAuthStore()
      authStore.clearAuth() // Clear auth state on token expiry
      window.location.href = '/signin' // Redirect to login
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
