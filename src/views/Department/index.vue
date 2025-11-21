<template>
  <div>
    <div class="mb-4">
      <h2 class="text-3xl font-bold">Department Management</h2>
    </div>
  </div>
  <div class="text-black dark:text-white bg-white dark:bg-base-100 container mx-auto p-4">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
      <div class="flex space-x-4">
        <router-link to="/department/add" class="btn btn-primary">Add Department</router-link>
        <button class="btn btn-secondary">Export</button>
      </div>

      <div class="w-full md:w-auto">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="input input-bordered input-success w-full md:w-64 pl-10 text-black dark:text-white bg-white dark:bg-base-100"
            @input="debouncedSearch"
          />
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-8">
      <span class="loading loading-spinner loading-lg"></span>
      <p>Processing data...</p>
    </div>

    <div
      v-else-if="filteredData.length"
      class="overflow-x-auto text-black dark:text-white bg-white dark:bg-gray-700 rounded-lg shadow"
    >
      <table class="table w-full text-black dark:text-white">
        <thead>
          <tr>
            <th @click="sortTable('id')">ID</th>
            <th @click="sortTable('name')">Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="data in paginatedData" :key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
            <td class="flex flex-row gap-2">
              <router-link :to="`/department/update/${data.id}`" class="btn btn-sm btn-primary mb-2"
                >Edit</router-link
              >
              <button @click="deleteDepart(data.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="flex flex-col md:flex-row justify-between items-center p-4 border-t gap-4 text-black dark:text-white bg-white dark:bg-base-100"
      >
        <div class="flex items-center gap-4">
          <span class="text-sm">Items per page:</span>
          <select
            v-model="pageSize"
            class="select select-bordered select-sm"
            @change="currentPage = 1"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div class="text-sm">
          Showing {{ pagination.startItem }} to {{ pagination.endItem }} of
          {{ pagination.totalItems }} entries
        </div>

        <div class="flex space-x-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="btn btn-sm"
            :class="{ 'btn-disabled': currentPage === 1 }"
          >
            Previous
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="changePage(page)"
            class="btn btn-sm"
            :class="{ 'btn-active': currentPage === page }"
          >
            {{ page }}
          </button>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === pagination.totalPages"
            class="btn btn-sm"
            :class="{ 'btn-disabled': currentPage === pagination.totalPages }"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8 text-gray-500">
      {{ departmentData.length ? 'No matching results found' : 'No data available' }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { debounce } from 'lodash'
import axiosInstance from '@/services/header'
import { useAuthStore } from '@/stores/authStore'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

const authStore = useAuthStore()

const departmentData = ref([])
// const tableHeaders = ref([])
const isLoading = ref(false)

// Pagination and search
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const totalItems = ref(0)

// Sorting
const sortColumn = ref('')
const sortDirection = ref('asc')

// Pagination and search
const pagination = computed(() => ({
  startItem: (currentPage.value - 1) * pageSize.value + 1,
  endItem: Math.min(currentPage.value * pageSize.value, totalItems.value),
  totalItems: totalItems.value,
  totalPages: Math.ceil(totalItems.value / pageSize.value),
}))

const visiblePages = computed(() => {
  const range = 2
  let start = Math.max(1, currentPage.value - range)
  let end = Math.min(pagination.value.totalPages, currentPage.value + range)

  if (currentPage.value <= range + 1) {
    end = Math.min(2 * range + 1, pagination.value.totalPages)
  }
  if (currentPage.value >= pagination.value.totalPages - range) {
    start = Math.max(1, pagination.value.totalPages - 2 * range)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return query
    ? departmentData.value.filter((item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(query)),
      )
    : departmentData.value
})

const sortedData = computed(() => {
  if (!sortColumn.value) return filteredData.value

  return [...filteredData.value].sort((a, b) => {
    const valA = a[sortColumn.value]
    const valB = b[sortColumn.value]

    if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1
    if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})

const paginatedData = computed(() => {
  totalItems.value = sortedData.value.length
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedData.value.slice(start, end)
})

const debouncedSearch = debounce(() => {
  currentPage.value = 1
}, 300)

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    currentPage.value = page
  }
}

const sortTable = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const processDataForDisplay = () => {
  groupDataByNoID()
  currentPage.value = 1
  searchQuery.value = ''
  sortColumn.value = ''
  sortDirection.value = 'asc'
}

const deleteDepartment = async (departmentId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
  })

  if (!result.isConfirmed) return

  try {
    await axiosInstance.delete(`/users/${userId}`)

    // Remove from table
    departmentData.value = departmentData.value.filter((u) => u.id !== userId)

    // Recalculate pagination automatically
    totalItems.value = departmentData.value.length

    // If page becomes empty, go back 1 page
    if (paginatedData.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }

    Swal.fire('Deleted!', 'User has been deleted.', 'success')
  } catch (error) {
    Swal.fire('Error!', 'There was an error deleting the user.', 'error')
  }
}

onMounted(async () => {
  const response = await axiosInstance.get('/departments')
  departmentData.value = response.data
  processDataForDisplay()
})
</script>
