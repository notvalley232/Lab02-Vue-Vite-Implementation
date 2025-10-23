<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>
<template>
  <div>
    <div id="flashMessage" v-if="message">
      <h4>{{ message }}</h4>
    </div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<style scoped>
@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellofade 3s ease-in-out;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
}
</style>