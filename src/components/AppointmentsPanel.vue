<template>
  <div>
    <h2><i class="fa-solid fa-calendar-check"></i> Appointments & Scheduling</h2>
    
    <div class="row mb-4">
      <div class="col-md-6">
        <input type="text" class="form-control mb-2" v-model="newAppointment.patientName" placeholder="Patient Name">
      </div>
      <div class="col-md-3">
        <input type="date" class="form-control mb-2" v-model="newAppointment.date">
      </div>
      <div class="col-md-3">
        <input type="text" class="form-control mb-2" v-model="newAppointment.reason" placeholder="Reason">
      </div>
      <div class="col-12">
        <button class="btn-purple" @click="addAppointment">
          <i class="fa-regular fa-calendar-plus"></i> Add Appointment
        </button>
      </div>
    </div>

    <div v-if="store.appointmentsCount === 0" class="empty-msg text-center text-muted my-4">
      <i class="fa-regular fa-calendar-xmark"></i> No appointments scheduled.
    </div>

    <div v-for="apt in store.appointmentsList" :key="apt.id" class="list-item-card">
      <span>
        <i class="fa-regular fa-calendar"></i> <strong>{{ apt.patientName }}</strong> - {{ apt.date }} : {{ apt.reason }}
      </span>
      <button class="btn btn-danger btn-sm" @click="store.deleteAppointment(apt.id)">
        <i class="fa-regular fa-trash-can"></i> Cancel
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
  },
  data() {
    return {
      newAppointment: {
        patientName: '',
        date: new Date().toISOString().slice(0, 10),
        reason: ''
      }
    }
  },
  methods: {
    addAppointment() {
      if (!this.newAppointment.patientName.trim()) {
        alert('Please enter patient name')
        return
      }
      this.store.addAppointment({
        patientName: this.newAppointment.patientName,
        patientId: 'manual',
        date: this.newAppointment.date,
        reason: this.newAppointment.reason || 'General consultation'
      })
      this.newAppointment = {
        patientName: '',
        date: new Date().toISOString().slice(0, 10),
        reason: ''
      }
    }
  }
}
</script>