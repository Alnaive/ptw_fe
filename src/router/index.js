import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const SignInView = () => import('../views/SignInView.vue')
const SignUpView = () => import('../views/SignUpView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: { layout: 'auth' },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
        meta: {  layout: 'auth' },
    },
  ],
})

// Navigation guards: redirect authenticated users away from auth pages
import { useAuthStore } from '../stores/authStore'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.token) {
    next('/signin') // Redirect to login if not authenticated
  } else {
    next()
  }
})

export default router
