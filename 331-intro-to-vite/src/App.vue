<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'

const message = ref('')
</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">About</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'student-list-view' }">Students</RouterLink>
        </nav>
      </div>
    </header>

    <div id="flashMessage" class="animate-fade" v-if="message">
      <h4>{{ message }}</h4>
    </div>
    <RouterView />
  </div>
</template>

<style>
</style>
