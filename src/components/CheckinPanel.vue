<template>
  <div>
    <h2><i class="fa-solid fa-notes-medical"></i> Patient Check-in</h2>
    
    <div class="card-stats mb-4 d-flex justify-content-between align-items-center">
      <span><i class="fa-solid fa-chart-line"></i> Current Queue Position</span>
      <span class="queue-badge">#{{ store.queueCount + 1 }}</span>
    </div>

    <div class="row">
      <div class="col-md-6">
        <label class="form-label"><i class="fa-solid fa-user"></i> Full Name *</label>
        <input type="text" class="form-control mb-3" v-model="formData.name" placeholder="Enter full name">

        <label class="form-label"><i class="fa-solid fa-id-card"></i> National ID *</label>
        <input type="text" class="form-control mb-3" v-model="formData.nationalId" placeholder="16 digits National ID">
        <div v-if="nationalIdError" class="text-danger mb-2"><small>{{ nationalIdError }}</small></div>

        <label class="form-label"><i class="fa-solid fa-cake-candles"></i> Age</label>
        <input type="text" class="form-control mb-3" v-model="formData.age" placeholder="e.g., 25 years or 15/05/1990">

        <label class="form-label"><i class="fa-solid fa-phone"></i> Phone</label>
        <input type="text" class="form-control mb-3" v-model="formData.phone" placeholder="Phone number">
      </div>
      
      <div class="col-md-6">
        <label class="form-label"><i class="fa-solid fa-stethoscope"></i> Patient Type</label>
        <div class="mb-3">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" value="New" v-model="formData.type">
            <label class="form-check-label">New Patient</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" value="Returning" v-model="formData.type">
            <label class="form-check-label">Returning</label>
          </div>
        </div>

        <label class="form-label"><i class="fa-solid fa-lungs"></i> Select Symptoms</label>
        <div class="mb-3">
          <div v-for="symptom in store.availableSymptoms" :key="symptom" class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" :value="symptom" v-model="formData.symptoms">
            <label class="form-check-label">{{ symptom }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <button class="btn-purple me-2" @click="submitCheckIn">
        <i class="fa-solid fa-paper-plane"></i> SUBMIT & GET QUEUE #
      </button>
      <button class="btn btn-outline-secondary" @click="clearForm">
        <i class="fa-solid fa-broom"></i> CLEAR
      </button>
    </div>

    <div v-if="showSuccess" class="alert alert-success mt-4">
      <i class="fa-solid fa-circle-check"></i> <strong>Check-in Successful!</strong> Your queue number is <strong>#{{ lastQueueNumber }}</strong>. Please wait for your turn.
    </div>

    <div class="queue-box mt-4">
      <i class="fa-solid fa-list"></i> <strong>Current Waiting Queue ({{ store.queueCount }} patients)</strong>
      <div v-if="store.queueCount === 0" class="empty-msg text-center text-muted my-3">
        <i class="fa-regular fa-hourglass-half"></i> No patients waiting. Add new patient!
      </div>
      <div v-for="patient in store.queuePatients" :key="patient.id" class="list-item-card">
        <span>
          <strong>#{{ String(patient.id).slice(-3).padStart(3,'0') }}</strong>
          {{ patient.name }} | {{ patient.age }} | Type: {{ patient.type }}
          <span v-if="patient.symptoms && patient.symptoms.length">
            <i class="fa-solid fa-stethoscope ms-2"></i> {{ patient.symptoms.join(', ') }}
          </span>
        </span>
        <button class="btn-success-sm" @click="store.markAsDone(patient.id)">
          <i class="fa-solid fa-check-circle"></i> Done
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useClinicStore } from '../stores/clinicStore'

export default {
  setup() {
    const store = useClinicStore()
    return { store }
  },
  data() {
    return {
      formData: {
        name: '',
        nationalId: '',
        age: '',
        phone: '',
        type: 'New',
        symptoms: []
      },
      showSuccess: false,
      lastQueueNumber: null
    }
  },
  computed: {
    nationalIdError() {
      if (!this.formData.nationalId) return null
      const idRegex = /^[0-9]{16}$/
      if (!idRegex.test(this.formData.nationalId)) {
        return 'National ID must be 16 digits'
      }
      return null
    },
    isFormValid() {
      return this.formData.name.trim() !== '' && 
             this.formData.nationalId && 
             /^[0-9]{16}$/.test(this.formData.nationalId)
    }
  },
  methods: {
    submitCheckIn() {
      if (!this.isFormValid) {
        alert('Please fill all required fields correctly (Name and valid 16-digit National ID)')
        return
      }
      
      const newPatient = this.store.addPatient({
        name: this.formData.name.trim(),
        nationalId: this.formData.nationalId,
        age: this.formData.age || 'Not provided',
        phone: this.formData.phone || 'N/A',
        type: this.formData.type,
        symptoms: this.formData.symptoms
      })
      
      this.lastQueueNumber = String(newPatient.id).slice(-3).padStart(3, '0')
      this.showSuccess = true
      this.clearForm()
      
      setTimeout(() => {
        this.showSuccess = false
      }, 4000)
    },
    clearForm() {
      this.formData = {
        name: '',
        nationalId: '',
        age: '',
        phone: '',
        type: 'New',
        symptoms: []
      }
    }
  }
}
</script>