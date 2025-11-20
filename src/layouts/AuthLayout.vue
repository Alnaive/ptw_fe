<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 dark:bg-base-300">
    <div class="w-full max-w-md">
      <div class="card bg-base-100 shadow-xl dark:shadow-none">
        <div class="card-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// AuthLayout uses DaisyUI card styles
</script>
