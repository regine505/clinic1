<template>
  <div>
    <h2><i class="fa-solid fa-folder-open"></i> Medical Records (Completed Consultations)</h2>
    <button class="btn btn-danger mb-3" @click="store.clearAllRecords()">
      <i class="fa-solid fa-trash-can"></i> Clear All Records
    </button>

    <div v-if="store.recordsCount === 0" class="empty-msg text-center text-muted my-5">
      <i class="fa-regular fa-folder-open fa-2x"></i>
      <p class="mt-2">No medical records yet. Complete consultations to add records.</p>
    </div>

    <div v-for="rec in store.medicalRecords" :key="rec.id" class="list-item-card">
      <div>
        <strong><i class="fa-solid fa-notes-medical"></i> {{ rec.name }}</strong><br>
        <small>ID: {{ rec.nationalId }} | Age: {{ rec.age }} | Phone: {{ rec.phone }}</small>
        <div v-if="rec.symptoms && rec.symptoms.length">
          <small>Symptoms: {{ rec.symptoms.join(', ') }}</small>
        </div>
        <small class="text-muted">✔ Completed: {{ rec.completedAt }}</small>
      </div>
      <button class="btn btn-sm btn-outline-danger" @click="store.deleteRecord(rec.id)">
        <i class="fa-solid fa-trash"></i> Remove
      </button>
    </div>
  </div>
</template>

<script>
import { useClinicStore } from '../stores/clinicStore'

export default {
  setup() {
    const store = useClinicStore()
    return { store }
  }
}
</script>