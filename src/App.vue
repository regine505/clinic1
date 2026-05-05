<template>
  <div>
    <div class="clinic-header d-flex justify-content-between align-items-center flex-wrap">
      <div class="d-flex align-items-center gap-3">
        <i class="fa-solid fa-hospital-user fa-2x"></i>
        <h2 class="mb-0">{{ store.clinicName }}</h2>
      </div>
      <div class="mt-2 mt-sm-0">
        <i class="fa-solid fa-wifi"></i> Wi-Fi Connected
        <span class="badge bg-light text-dark ms-2">
          <i class="fa-regular fa-clock"></i> Queue: {{ store.queueCount }}
        </span>
      </div>
    </div>

    <div class="container my-4">
      <div class="row g-4">
        <div class="col-lg-3 col-md-4">
          <Sidebar :currentPanel="currentPanel" @update:panel="currentPanel = $event" />
        </div>
        <div class="col-lg-9 col-md-8">
          <div class="main-panel">
            <CheckinPanel v-if="currentPanel === 'checkinPanel'" />
            <PatientsPanel v-if="currentPanel === 'patientsPanel'" />
            <AppointmentsPanel v-if="currentPanel === 'appointmentsPanel'" />
            <RecordsPanel v-if="currentPanel === 'recordsPanel'" />
            <SettingsPanel v-if="currentPanel === 'settingsPanel'" />
            <HealthGuideGame v-if="currentPanel === 'gamePanel'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useClinicStore } from './stores/clinicStore'
import Sidebar from './components/Sidebar.vue'
import CheckinPanel from './components/CheckinPanel.vue'
import PatientsPanel from './components/PatientsPanel.vue'
import AppointmentsPanel from './components/AppointmentsPanel.vue'
import RecordsPanel from './components/RecordsPanel.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import HealthGuideGame from './components/HealthGuideGame.vue'

export default {
  components: {
    Sidebar,
    CheckinPanel,
    PatientsPanel,
    AppointmentsPanel,
    RecordsPanel,
    SettingsPanel,
    HealthGuideGame
  },
  data() {
    return {
      currentPanel: 'checkinPanel'
    }
  },
  setup() {
    const store = useClinicStore()
    store.loadData()
    return { store }
  }
}
</script>