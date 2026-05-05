import { defineStore } from 'pinia'

export const useClinicStore = defineStore('clinic', {
  state: () => ({
    clinicName: 'Nyundo Clinic Dashboard',
    queuePatients: [],
    medicalRecords: [],
    appointmentsList: [],
    nextId: 101,
    availableSymptoms: ['Fever', 'Cough', 'Headache', 'Fatigue', 'Sore Throat', 'Shortness of breath', 'Nausea', 'Body aches']
  }),

  getters: {
    queueCount: (state) => state.queuePatients.length,
    recordsCount: (state) => state.medicalRecords.length,
    appointmentsCount: (state) => state.appointmentsList.length,
    currentQueueNumber: (state) => state.queuePatients.length > 0 ? state.queuePatients[0].id : null
  },

  actions: {
    loadData() {
      const storedQueue = localStorage.getItem('nyundo_queue')
      const storedRecords = localStorage.getItem('nyundo_records')
      const storedAppointments = localStorage.getItem('nyundo_appointments')
      const storedNextId = localStorage.getItem('nyundo_nextId')
      const storedClinicName = localStorage.getItem('nyundo_clinicName')

      if (storedQueue) this.queuePatients = JSON.parse(storedQueue)
      if (storedRecords) this.medicalRecords = JSON.parse(storedRecords)
      if (storedAppointments) this.appointmentsList = JSON.parse(storedAppointments)
      if (storedNextId) this.nextId = parseInt(storedNextId)
      if (storedClinicName) this.clinicName = storedClinicName

      if (this.queuePatients.length === 0 && this.medicalRecords.length === 0) {
        this.initDemoData()
      }
    },

    initDemoData() {
      this.queuePatients.push({
        id: this.nextId++,
        name: 'Uwayo Jeannette',
        age: '32 years',
        phone: '0788123456',
        nationalId: '1198801234567890',
        type: 'New',
        symptoms: ['Fever', 'Cough'],
        timestamp: new Date().toLocaleTimeString()
      })
      this.queuePatients.push({
        id: this.nextId++,
        name: 'Mukamana Grace',
        age: '45 years',
        phone: '0788223344',
        nationalId: '1197501234567891',
        type: 'Returning',
        symptoms: ['Headache', 'Fatigue'],
        timestamp: new Date().toLocaleTimeString()
      })
      this.medicalRecords.push({
        id: 99,
        name: 'Habarugira Eric',
        age: '28',
        phone: '0788334455',
        nationalId: '1199601234567892',
        type: 'New',
        symptoms: ['Sore Throat'],
        completedAt: '2025-04-28 10:30',
        completionDate: '2025-04-28'
      })
      this.medicalRecords.push({
        id: 98,
        name: 'Nyiransabimana Solange',
        age: '55',
        phone: '0788445566',
        nationalId: '1196901234567893',
        type: 'Returning',
        symptoms: ['Body aches', 'Fatigue'],
        completedAt: '2025-04-27 14:15',
        completionDate: '2025-04-27'
      })
      this.appointmentsList.push({
        id: 1,
        patientName: 'Kamali Jean',
        patientId: '1199001234567894',
        date: '2026-05-10',
        reason: 'General checkup'
      })
      this.appointmentsList.push({
        id: 2,
        patientName: 'Uwera Chantal',
        patientId: '1198501234567895',
        date: '2026-05-12',
        reason: 'Vaccination'
      })
      this.saveAllData()
    },

    saveAllData() {
      localStorage.setItem('nyundo_queue', JSON.stringify(this.queuePatients))
      localStorage.setItem('nyundo_records', JSON.stringify(this.medicalRecords))
      localStorage.setItem('nyundo_appointments', JSON.stringify(this.appointmentsList))
      localStorage.setItem('nyundo_nextId', this.nextId)
      localStorage.setItem('nyundo_clinicName', this.clinicName)
    },

    addPatient(patientData) {
      const newPatient = {
        id: this.nextId++,
        ...patientData,
        timestamp: new Date().toLocaleTimeString()
      }
      this.queuePatients.push(newPatient)
      this.saveAllData()
      return newPatient
    },

    markAsDone(patientId) {
      const patientIndex = this.queuePatients.findIndex(p => p.id === patientId)
      if (patientIndex === -1) return null
      const patient = this.queuePatients[patientIndex]
      const recordCopy = {
        ...patient,
        completedAt: new Date().toLocaleString(),
        completionDate: new Date().toISOString().slice(0, 10)
      }
      this.medicalRecords.unshift(recordCopy)
      this.queuePatients.splice(patientIndex, 1)
      this.saveAllData()
      return recordCopy
    },

    deleteRecord(recordId) {
      this.medicalRecords = this.medicalRecords.filter(r => r.id !== recordId)
      this.saveAllData()
    },

    clearAllRecords() {
      this.medicalRecords = []
      this.saveAllData()
    },

    addAppointment(appointment) {
      const newId = Date.now()
      this.appointmentsList.push({ id: newId, ...appointment })
      this.saveAllData()
    },

    deleteAppointment(appId) {
      this.appointmentsList = this.appointmentsList.filter(a => a.id !== appId)
      this.saveAllData()
    },

    updateClinicName(name) {
      this.clinicName = name
      localStorage.setItem('nyundo_clinicName', name)
    },

    resetDemoData() {
      this.queuePatients = []
      this.medicalRecords = []
      this.appointmentsList = []
      this.nextId = 101
      this.initDemoData()
      this.clinicName = 'Nyundo Clinic Dashboard'
      this.saveAllData()
    }
  }
})