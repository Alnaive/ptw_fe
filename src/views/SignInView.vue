<template>
  <div class="vld-parent">
    <!-- Loading overlay -->
    <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="loader" />
  </div>
  <div class="flex container mx-auto p-4">
    <form class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
      <legend class="fieldset-legend">Login</legend>

      <!-- Email/Username Input -->
      <label class="fieldset-label">Username</label>
      <input v-model="formData.username" type="text" class="input" placeholder="Username" />

      <!-- Password Input -->
      <label class="fieldset-label">Password</label>
      <input v-model="formData.password" type="password" class="input" placeholder="Password" />

      <!-- Login Button -->
      <button @click.prevent="login" class="btn btn-neutral mt-4">Login</button>

      <!-- Error Message -->
      <div v-if="errorLogin" class="text-red-500 mt-2">
        {{ errorLogin }}
      </div>
    </form>
  </div>
</template>

<script setup>
import axiosInstance from '../services/header'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // Ensure this path is correct
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

// Router and Auth Store
const router = useRouter()
const authStore = useAuthStore()

// Loading State
const isLoading = ref(false)
const loader = 'dots'
const fullPage = ref(false)

// Form Data
const formData = ref({
  username: null,
  password: null,
})

// Error Message
const errorLogin = ref('')

// Login Function
async function login() {
  const payload = {
    username: formData.value.username,
    password: formData.value.password,
  }

  try {
    console.log('Starting login process...') // Debugging
    isLoading.value = true
    errorLogin.value = '' // Clear previous errors

    console.log('Sending payload:', payload) // Debugging
    const res = await axiosInstance.post('/auth/signin/', payload, { timeout: 5000 }) // Add timeout

    console.log('Received response:', res) // Debugging

    if (res.data.token) {
      console.log('Login successful, setting token...') // Debugging
      authStore.setToken(res.data.token) // Set the token
      console.log(authStore.token) // Debugging
      await authStore.fetchUser() // Fetch the user's data
      isLoading.value = false
      router.push({ name: 'home' }) // Redirect to dashboard
    }
  } catch (error) {
    isLoading.value = false
    console.error('Login error:', error) // Debugging

    if (error.response) {
      errorLogin.value = error.response.data?.message || 'Login failed. Please try again.'
    } else if (error.request) {
      // The request was made but no response was received
      errorLogin.value = 'No response from the server. Please check your network connection.'
    } else {
      // Something happened in setting up the request
      errorLogin.value = 'An unexpected error occurred. Please try again.'
    }
  }
}
</script>
