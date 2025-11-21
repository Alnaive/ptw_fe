<template>
  <div class="relative">
    <!-- Only show main app chrome when not on auth layout -->
    <template v-if="!isAuth">
      <!-- Navbar with toggle button -->
      <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

      <!-- Sidebar -->
      <Sidebar :isSidebarOpen="isSidebarOpen" @closeSidebar="closeSidebar" />

      <!-- Bottom Nav-->
      <BottomNav />
    </template>

    <!-- Main Content -->
    <div class="p-8 transition-all duration-300" :class="{ 'ml-64': isSidebarOpen && !isAuth }">
      <div>
        <AuthLayout v-if="isAuth">
          <RouterView />
        </AuthLayout>
        <template v-else>
          <RouterView class="z-index-20" />
        </template>
      </div>
      <div>
        <!-- <Footer v-if="!isAuth" class="z-index-0" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import BottomNav from './components/BottomNav.vue'
import Footer from './components/Footer.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const route = useRoute()
const isAuth = computed(() => route.meta && route.meta.layout === 'auth')

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>
