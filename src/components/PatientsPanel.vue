<template>
  <div>
    <h2><i class="fa-solid fa-users-viewfinder"></i> Active Patients Queue</h2>
    
    <div class="card-stats mb-3">
      <span><i class="fa-solid fa-person-walking-arrow-right"></i> Total Waiting: {{ store.queueCount }} patients</span>
    </div>

    <div v-if="store.queueCount === 0" class="empty-msg text-center text-muted my-5">
      <i class="fa-regular fa-face-frown fa-2x"></i>
      <p class="mt-2">No active patients. Add via Check-in panel.</p>
    </div>

    <div v-for="patient in store.queuePatients" :key="patient.id" class="list-item-card">
      <div>
        <strong><i class="fa-solid fa-user-injured"></i> {{ patient.name }}</strong><br>
        <small>ID: {{ patient.nationalId }} | Age: {{ patient.age }} | Phone: {{ patient.phone }} | Type: {{ patient.type }}</small>
        <div v-if="patient.symptoms && patient.symptoms.length">
          <small class="text-muted"><i class="fa-solid fa-lungs"></i> Symptoms: 
            <span v-for="sym in patient.symptoms" :key="sym" class="symptom-badge">{{ sym }}</span>
          </small>
        </div>
      </div>
      <button class="btn-purple" style="background:#2e7d32;" @click="store.markAsDone(patient.id)">
        <i class="fa-solid fa-stethoscope"></i> Complete Consultation
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