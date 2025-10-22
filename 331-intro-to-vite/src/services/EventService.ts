import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/notvalley232/Lab02-Vue-Vite-Implementation',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage: Number, page: Number) {
    const start = (page - 1) * perPage
    return apiClient.get('/events?_start=' + start + '&_limit=' + perPage)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  }
}