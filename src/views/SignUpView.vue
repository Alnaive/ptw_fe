<template>
  <div class="vld-parent">
    <!-- Loading overlay -->
    <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="loader" />
  </div>
  <div class="flex container mx-auto p-4">
    <form  @submit.prevent="signup()" class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
      <legend class="fieldset-legend">SignUp</legend>
      
      <label class="fieldset-label">Name</label>
      <input v-model="formData.name" type="text" class="input" placeholder="name" />
      <!-- Email/Username Input -->
      <label class="fieldset-label">Username</label>
      <input v-model="formData.username" type="text" class="input" placeholder="Username" />

      <!-- Password Input -->
      <label class="fieldset-label">Password</label>
      <input v-model="formData.password" type="password" class="input" placeholder="Password" />

      <!-- Login Button -->
      <button type="submit" class="btn btn-neutral mt-4">Signup</button>
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
  name: null,
  username: null,
  password: null,
})

// Error Message
const errorLogin = ref('')

// Login Function
async function signup() {
  const payload = {
    name: formData.value.name,
    username: formData.value.username,
    password: formData.value.password,
  }
  
  await axiosInstance.post('/auth/signup', payload).then(function (res) {
    if (res) {
      console.log()
      router.push({ name: 'signin' })
    }
  })
}
</script>
