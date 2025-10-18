<template>
  <div class="student-list-view">
    <h1>Student Information</h1>
    <div v-if="loading" class="loading">
      Loading students...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="students-grid">
      <StudentCard 
        v-for="student in students" 
        :key="student.id" 
        :student="student" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import type { Student } from '@/types.ts'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref<Student[]>([])
const loading = ref(true)
const error = ref('')

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      // The API returns data in a different format, we need to extract the value array
      students.value = response.data.value || response.data
      loading.value = false
    })
    .catch((err) => {
      console.error('Error fetching students:', err)
      error.value = 'Failed to load student information'
      loading.value = false
    })
})
</script>

<style scoped>
.student-list-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  padding: 40px;
}

.error {
  text-align: center;
  font-size: 1.2em;
  color: #d32f2f;
  padding: 40px;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 20px 0;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
}

@media (max-width: 768px) {
  .students-grid {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 2em;
  }
}
</style>