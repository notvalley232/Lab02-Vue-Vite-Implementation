<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink> |
          <RouterLink :to="{ name: 'student-list-view' }">Students</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>

nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}
</style>
