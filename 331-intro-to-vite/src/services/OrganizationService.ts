import axios from 'axios'
import type { Organization } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  saveOrganization(organization: Organization) {
    const { id: _omit, ...data } = organization
    return apiClient.post('/organizations', data)
  }
}