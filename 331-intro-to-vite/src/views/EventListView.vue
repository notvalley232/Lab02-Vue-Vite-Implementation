<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventSummary from '@/components/EventSummary.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)
const pageSize = computed(() => props.pageSize)

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

const changePageSize = (event: any) => {
  const target = event.target as HTMLSelectElement
  const newPageSize = parseInt(target.value)
  router.push({
    name: 'event-list-view',
    query: { page: 1, pageSize: newPageSize }
  })
}

onMounted(() => {
  // Get total count once when component mounts
  EventService.getEvents(100, 1) // Get all events to count total
    .then((allEventsResponse) => {
      totalEvents.value = allEventsResponse.data.length
    })
    .catch((err) => {
      console.error('Error getting total count:', err)
    })

  watchEffect(() => {
    loading.value = true
    error.value = null
    
    // Get the specific page data
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data
        loading.value = false
      })
      .catch((err) => {
        console.error('There was an error!', err)
        error.value = 'Failed to load events. Please try again.'
        loading.value = false
        router.push({ name: 'network-error-view' })
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  
  <!-- Page Size Selector -->
  <div class="page-size-selector">
    <label for="pageSize">Events per page: </label>
    <select 
      id="pageSize" 
      :value="pageSize" 
      @change="changePageSize($event)"
    >
      <option value="2">2 events</option>
      <option value="3">3 events</option>
      <option value="4">4 events</option>
      <option value="6">6 events</option>
      <option value="10">10 events</option>
    </select>
  </div>
  
  <!-- Loading and Error States -->
  <div v-if="loading" class="loading">Loading events...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  
  <!-- Events Display -->
  <div v-else class="flex flex-col items-center">
    <div v-if="events && events.length === 0" class="no-events">
      No events found.
    </div>
    <template v-else-if="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <EventSummary v-for="event in events" :key="`summary-${event.id}`" :event="event" />
    </template>
  </div>
  
  <!-- Pagination - Always show when not loading and no error -->
  <div v-if="!loading && !error && totalEvents > 0" class="pagination">
    <RouterLink 
      id="page-prev"
      :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }" 
      rel="prev" 
      v-if="page > 1"
      >&#60; Prev Page</RouterLink
    >

    <RouterLink 
      id="page-next"
      :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }" 
      rel="next" 
      v-if="hasNexPage"
      >Next Page &#62;</RouterLink
    >
  </div>
</template>

<style>
.page-size-selector {
  margin: 20px 0;
  text-align: center;
}

.page-size-selector label {
  margin-right: 10px;
  font-weight: bold;
  color: #2c3e50;
}

.page-size-selector select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: #2c3e50;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #e74c3c;
  background-color: #fdf2f2;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 20px;
}

.no-events {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 0 20px;
}

.pagination a {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  color: #2c3e50;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.pagination a:hover {
  background-color: #e9ecef;
  color: #495057;
}

#page-prev {
  margin-right: auto;
}

#page-next {
  margin-left: auto;
}
</style>
