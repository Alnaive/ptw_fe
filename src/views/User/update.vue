<template>
  <div class="flex container mx-auto p-4">
    <form
      @submit.prevent="updateUser"
      class="fieldset w-xs bg-base-200 border border-base-300 p-6 rounded-box space-y-2"
    >
      <legend class="fieldset-legend text-lg font-bold">Update User</legend>

      <label class="fieldset-label">Name</label>
      <input v-model="formData.name" type="text" class="input" placeholder="name" />

      <label class="fieldset-label">Username</label>
      <input v-model="formData.username" type="text" class="input" placeholder="username" />

      <label class="fieldset-label">Password (optional)</label>
      <input
        v-model="formData.password"
        type="password"
        class="input"
        placeholder="leave blank to keep existing password"
      />

      <label class="fieldset-label">Department</label>
      <select v-model="formData.departmentId" class="select select-bordered">
        <option disabled value="">-- Select Department --</option>
        <option v-for="dep in departments" :key="dep.id" :value="dep.id">
          {{ dep.name }}
        </option>
      </select>

      <label class="fieldset-label">Role</label>
      <select v-model="formData.role" class="select select-bordered">
        <option disabled value="">-- Select Role --</option>
        <option v-for="role in roles" :key="role" :value="role.id">{{ role.name }}</option>
      </select>

      <button type="submit" class="btn btn-neutral mt-4 w-full" :disabled="isLoading">
        {{ isLoading ? 'Updating...' : 'Update User' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import axiosInstance from '@/services/header'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import 'vue-loading-overlay/dist/css/index.css'
import Swal from 'sweetalert2'

// Router
const router = useRouter()
const route = useRoute()

// Loading state
const isLoading = ref(false)
const loader = 'dots'
const fullPage = ref(false)

// Dropdown options
const departments = ref([])
const roles = ref([]) // change based on your system

// Form data
const formData = ref({
  id: null,
  name: '',
  username: '',
  password: '',
  departmentId: '',
  role: '',
})

// Load departments (optional)
const loadDepartments = async () => {
  try {
    const res = await axiosInstance.get('/departments')
    departments.value = res.data
  } catch (error) {
    console.error('Failed to load departments', error)
  }
}

const loadRoles = async () => {
  try {
    const res = await axiosInstance.get('/roles') // Adjust endpoint as needed
    roles.value = res.data
  } catch (error) {
    console.error('Failed to load roles', error)
  }
}

// Main: load user data for edit
onMounted(async () => {
  const userId = route.params.id
  if (!userId) return

  isLoading.value = true
  try {
    const res = await axiosInstance.get(`/users/${userId}`)

    formData.value = {
      id: res.data.id,
      name: res.data.name,
      username: res.data.username,
      password: '', // left blank so user can choose to change or not
      departmentId: res.data.departmentId,
      role: res.data.role,
    }

    loadDepartments()
    loadRoles()
  } catch (error) {
    console.error('Error loading user:', error)
    Swal.fire('Error', 'Failed to load user data.', 'error')
  } finally {
    isLoading.value = false
  }
})

// Validation function
const validateForm = () => {
  if (!formData.value.name) return 'Name is required.'
  if (!formData.value.username) return 'Username is required.'
  if (!formData.value.departmentId) return 'Department is required.'
  if (!formData.value.role) return 'Role is required.'
  return null
}

// Update user
const updateUser = async () => {
  const error = validateForm()
  if (error) {
    return Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: error,
    })
  }

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to update this user?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, update user',
    cancelButtonText: 'Cancel',
  })

  if (!result.isConfirmed) return

  isLoading.value = true

  try {
    const payload = {
      name: formData.value.name,
      username: formData.value.username,
      departmentId: formData.value.departmentId,
      role: formData.value.role,
    }

    if (formData.value.password) {
      payload.password = formData.value.password
    }

    await axiosInstance.put(`/users/update/${formData.value.id}`, payload)

    await Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'User has been successfully updated.',
    })

    router.push({ name: 'users' })
  } catch (error) {
    console.error('Failed to update user:', error)
    Swal.fire('Error!', 'There was an error updating the user.', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
