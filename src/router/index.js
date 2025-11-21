import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/User/index.vue'
import AddUser from '../views/User/create.vue'
import UpdateUser from '../views/User/update.vue'
import DepartmentView from '../views/Department/index.vue'
import AddDepartment from '../views/Department/create.vue'
import RoleView from '../views/Role/index.vue'
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
      path: '/users',
      name: 'users',
      meta: { requiresAuth: true },
      component: UserView,
    },
    {
      path: '/user/add',
      name: 'addUser',
      component: AddUser,
      meta: { requiresAuth: true },
    },
    {
      path: '/user/update/:id',
      name: 'updateUser',
      component: UpdateUser,
      meta: { requiresAuth: true },
    },
    {
      path: '/departments',
      name: 'departments',
      meta: { requiresAuth: true },
      component: DepartmentView,
    },
    {
      path: '/department/add',
      name: 'addDepartment',
      component: AddDepartment,
      meta: { requiresAuth: true },
    },
    {
      path: '/roles',
      name: 'roles',
      meta: { requiresAuth: true },
      component: RoleView,
    },
    // {
    //   path: '/role/add',
    //   name: 'addRole',
    //   component: AddRole,
    //   meta: { requiresAuth: true },
    // },
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
      meta: { layout: 'auth' },
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
