<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const editEvent = () => {
  // Simulate editing the event
  store.updateMessage('Data has been updated')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.id as string } })
}
</script>
<template>
  <div>
    <p>Edit event here</p>
    <button @click="editEvent">Edit Event</button>
  </div>
</template>