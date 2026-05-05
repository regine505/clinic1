<template>
  <div>
    <h2><i class="fa-solid fa-sliders-h"></i> Dashboard Settings</h2>
    
    <div class="mb-3">
      <label class="form-label">Clinic Display Name:</label>
      <input type="text" class="form-control mb-2" v-model="clinicNameInput" placeholder="Clinic Name">
      <button class="btn-purple" @click="updateName">
        <i class="fa-solid fa-floppy-disk"></i> Save Name
      </button>
    </div>

    <div class="mb-3">
      <button class="btn btn-warning" @click="resetData">
        <i class="fa-solid fa-arrows-rotate"></i> Reset Demo Data
      </button>
    </div>

    <div class="alert alert-info">
      <i class="fa-solid fa-info-circle"></i> All data is stored in your browser (localStorage).<br>
      "Medical Records" stores completed consultations when you click "Complete Consultation".
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
      clinicNameInput: ''
    }
  },
  mounted() {
    this.clinicNameInput = this.store.clinicName
  },
  methods: {
    updateName() {
      if (this.clinicNameInput.trim()) {
        this.store.updateClinicName(this.clinicNameInput.trim())
        alert('Clinic name updated!')
      }
    },
    resetData() {
      if (confirm('Reset all clinic data to default demo?')) {
        this.store.resetDemoData()
        this.clinicNameInput = this.store.clinicName
        alert('Data reset complete!')
      }
    }
  }
}
</script>