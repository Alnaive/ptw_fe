<template>
  <div class="navbar bg-base-100 shadow-lg">
    <div class="flex-none invisible sm:visible">
      <button @click="toggleSidebar" class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="flex-none flex items-center space-x-2">
      <button @click="theme.toggle()" class="btn btn-ghost" :aria-pressed="theme.isDark.value">
        <span v-if="theme.isDark.value">🌙</span>
        <span v-else>☀️</span>
      </button>
      <template v-if="!auth.user">
        <RouterLink to="/signin" class="btn btn-ghost">Sign In</RouterLink>
        <RouterLink to="/signup" class="btn btn-primary text-white">Sign Up</RouterLink>
      </template>
      <template v-else>
        <span class="mr-2">{{ auth.user.username }}</span>
        <button @click="onSignOut" class="btn btn-ghost">Sign Out</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useTheme } from '../composables/useTheme'
import axiosInstance from '@/services/header'
import { onMounted } from 'vue'
const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggleSidebar'])
const router = useRouter()
const auth = useAuthStore()
const theme = useTheme()

const toggleSidebar = () => {
  emit('toggleSidebar')
}

function onSignOut() {
  auth.clearAuth()
  router.push({ name: 'signin' })
}

onMounted( async ()  => {
  if (auth.token) {
    await auth.fetchUser()
  }
})
</script>
