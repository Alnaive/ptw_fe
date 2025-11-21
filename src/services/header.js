import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: { 'Content-Type': 'application/json' },
})

// ⬇️ Auto attach token setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ⬇️ Tangani 401 dengan aman
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()

    // Hanya logout jika token sudah ada tapi masih 401
    if (error.response?.status === 401 && authStore.token) {
      authStore.clearAuth()
      window.location.href = '/signin'
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
