<template>
  <div class="prose">
    <h2 class="text-2xl font-semibold text-center mb-6">Create Account</h2>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div class="form-control">
        <label class="label"><span class="label-text">Email</span></label>
        <input v-model="form.email" type="email" required placeholder="you@example.com" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Password</span></label>
        <input v-model="form.password" type="password" required minlength="6" placeholder="••••••••" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Confirm Password</span></label>
        <input v-model="form.confirm" type="password" required minlength="6" placeholder="••••••••" class="input input-bordered w-full" />
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="btn btn-primary">Sign Up</button>
        <router-link to="/signin" class="text-sm text-primary hover:underline">Already have an account?</router-link>
      </div>
    </form>

    <p v-if="error" class="text-sm text-error mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import auth from '../services/auth'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const store = useAuthStore()
const form = reactive({ email: '', password: '', confirm: '' })
const error = ref('')

async function onSubmit() {
  error.value = ''
  if (form.password !== form.confirm) {
    error.value = 'Passwords do not match'
    return
  }
  try {
    const user = await auth.signUp({ email: form.email, password: form.password })
    store.setUser(user)
    router.push('/')
  } catch (err) {
    error.value = 'Failed to create account.'
  }
}
</script>
<template>
  <div class="prose">
    <h2 class="text-2xl font-semibold text-center mb-6">Create Account</h2>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="form.password"
          type="password"
          required
          minlength="6"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          v-model="form.confirm"
          type="password"
          required
          minlength="6"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div class="flex items-center justify-between">
        <button
            <div class="form-control">
              <label class="label"><span class="label-text">Confirm Password</span></label>
              <input
                v-model="form.confirm"
                type="password"
                required
                minlength="6"
                placeholder="••••••••"
                class="input input-bordered w-full"
              />
            </div>

    <p v-if="error" class="text-sm text-red-600 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import auth from '../services/auth'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const store = useAuthStore()
const form = reactive({ email: '', password: '', confirm: '' })
const error = ref('')
          <h2 class="text-2xl font-semibold text-center mb-6">Create Account</h2>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="form-control">
              <label class="label"><span class="label-text">Email</span></label>
              <input v-model="form.email" type="email" required placeholder="you@example.com" class="input input-bordered w-full" />
            </div>

            <div class="form-control">
              <label class="label"><span class="label-text">Password</span></label>
              <input v-model="form.password" type="password" required minlength="6" placeholder="••••••••" class="input input-bordered w-full" />
            </div>

            <div class="flex items-center justify-between">
              <button type="submit" class="btn btn-primary">Sign Up</button>
              <router-link to="/signin" class="text-sm text-primary hover:underline">Already have an account?</router-link>
            </div>
          </form>

          <p v-if="error" class="text-sm text-error mt-4">{{ error }}</p>

async function onSubmit() {
  error.value = ''
  if (form.password !== form.confirm) {
    error.value = 'Passwords do not match'
    return
  }
  try {
    const user = await auth.signUp({ email: form.email, password: form.password })
    store.setUser(user)
    router.push('/')
  } catch (err) {
    error.value = 'Failed to create account.'
  }
}
</script>
