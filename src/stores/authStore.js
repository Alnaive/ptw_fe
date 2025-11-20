import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '../services/header'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null) // Store the authenticated user's data
  const token = ref(localStorage.getItem('token') || null) // Store the JWT token

  // Set the token
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  // Clear the token and user data
  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    delete axiosInstance.defaults.headers.common['Authorization']
  }

  // Fetch the authenticated user's data
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/authUser', {
        headers: {
          Authorization: `Bearer ${token.value}`, // Use token.value
        },
      })
      user.value = response.data // Update the user ref
      console.log('User data:', response.data)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      clearAuth() // Clear auth if the token is invalid or expired
    }
  }

  // Initialize the store (e.g., check for an existing token on app load)
  const initialize = async () => {
    if (token.value) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      await fetchUser() // Fetch the user's data if a token exists
    }
  }

  return {
    user,
    token,
    setToken,
    clearAuth,
    fetchUser,
    initialize,
  }
})
