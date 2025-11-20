<template>
  <div class="flex space-x-2">
    <div class="card bg-blue-200 p-2 w-[520px]">
      <canvas id="acquisitions"></canvas>
    </div>
    <div class="flex">
      <ul class="list bg-blue-400 text-black rounded-box shadow-md">
        <li class="p-4 pb-2 text-xl opacity-60 tracking-wide">Recent Input</li>
        <li class="list-row">
          <div>
            <div>Dio Lupa</div>
            <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
          </div>
          <p class="list-col-wrap text-xs">
            "Remaining Reason" became an instant hit, praised for its haunting sound and emotional
            depth. A viral performance brought it widespread recognition, making it one of Dio
            Lupa’s most iconic tracks.
          </p>
        </li>
        <li class="list-row">
          <div>
            <div>Dio Lupa</div>
            <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
          </div>
          <p class="list-col-wrap text-xs">
            "Remaining Reason" became an instant hit, praised for its haunting sound and emotional
            depth. A viral performance brought it widespread recognition, making it one of Dio
            Lupa’s most iconic tracks.
          </p>
        </li>
        <li class="list-row">
          <div>
            <div>Dio Lupa</div>
            <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
          </div>
          <p class="list-col-wrap text-xs">
            "Remaining Reason" became an instant hit, praised for its haunting sound and emotional
            depth. A viral performance brought it widespread recognition, making it one of Dio
            Lupa’s most iconic tracks.
          </p>
        </li>
      </ul>
    </div>
  </div>
  <div class="flex mt-2 space-x-2">
    <div class="flex">
      <div class="stats shadow bg-blue-400">
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div class="stat-title">Total Likes</div>
          <div class="stat-value text-primary">25.6K</div>
          <div class="stat-desc">21% more than last month</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div class="stat-title">Page Views</div>
          <div class="stat-value text-secondary">2.6M</div>
          <div class="stat-desc">21% more than last month</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <div class="avatar avatar-online">
              <div class="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
              </div>
            </div>
          </div>
          <div class="stat-value">86%</div>
          <div class="stat-title">Tasks done</div>
          <div class="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
    </div>
    <div class="grow">
      <ul class="list bg-base-100 rounded-box shadow-md bg-blue-400">
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

        <li class="list-row">
          <div>
            <img
              class="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
          </div>
          <button class="btn btn-square btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
          <button class="btn btn-square btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                ></path>
              </g>
            </svg>
          </button>
        </li>

        <li class="list-row">
          <div>
            <img
              class="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/4@94.webp"
            />
          </div>
          <div>
            <div>Ellie Beilish</div>
            <div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
          </div>
          <button class="btn btn-square btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
          <button class="btn btn-square btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                ></path>
              </g>
            </svg>
          </button>
        </li>

        <li class="list-row">
          <div>
            <img
              class="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            />
          </div>
          <div>
            <div>Sabrino Gardener</div>
            <div class="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
          </div>
          <button class="btn btn-square btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
          <button class="btn btn-square btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                ></path>
              </g>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const data = ref([
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
])

onMounted(() => {
  const ctx = document.getElementById('acquisitions')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.value.map((row) => row.year),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.value.map((row) => row.count),
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
})
</script>

<style scoped>
/* Optional: Style the canvas container */
#acquisitions {
  width: 100%;
  height: 400px;
}
</style>
