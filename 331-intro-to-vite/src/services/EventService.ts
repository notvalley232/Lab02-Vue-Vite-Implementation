import axios from 'axios'
import type { Event } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage: number, page: number) {
    const start = (page - 1) * perPage
    return apiClient.get('/events?_start=' + start + '&_limit=' + perPage)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
  saveEvent(event: Event) {
    const { id: _omit, ...data } = event
    return apiClient.post('/events', data)
  }
}