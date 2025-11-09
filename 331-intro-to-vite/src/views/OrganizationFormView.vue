<script setup lang="ts">
import type { Organization } from '@/types'
import { ref } from 'vue'
import OrganizationService from '@/services/OrganizationService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organization = ref<Organization>({
  id: 0,
  name: '',
  address: ''
})

const router = useRouter()
const store = useMessageStore()

function saveOrganization() {
  OrganizationService.saveOrganization(organization.value)
    .then((response) => {
      store.updateMessage('You are successfully add a new organization for ' + response.data.name)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
      router.push({ name: 'event-list-view' })
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an organization</h1>
    <form @submit.prevent="saveOrganization">
      <label>Name</label>
      <input v-model="organization.name" type="text" placeholder="Name" class="field" />
      <label>Address</label>
      <input v-model="organization.address" type="text" placeholder="Address" class="field" />
      <button type="submit">Create Organization</button>
    </form>
  </div>
  
</template>

<style scoped>
.field {
  width: 100%;
  padding: 0 10px;
  height: 52px;
  font-size: 20px;
  margin-bottom: 12px;
}
button[type='submit'] {
  display: inline-block;
  width: auto;
  padding: 10px 16px;
  border: 1px solid rgba(0,0,0,0.4);
  background: #fff;
  cursor: pointer;
}
</style>