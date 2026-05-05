<template>
  <div class="sidebar-vue">
    <div
      v-for="item in navItems"
      :key="item.id"
      class="nav-item-custom"
      :class="{ 'active-nav': currentPanel === item.panelId }"
      @click="$emit('update:panel', item.panelId)"
    >
      <i :class="item.icon"></i> {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPanel: {
      type: String,
      default: 'checkinPanel'
    }
  },
  data() {
    return {
      navItems: [
        { id: 1, panelId: 'checkinPanel', label: 'Check-in', icon: 'fa-solid fa-user-check' },
        { id: 2, panelId: 'patientsPanel', label: 'Patients Queue', icon: 'fa-solid fa-users' },
        { id: 3, panelId: 'appointmentsPanel', label: 'Appointments', icon: 'fa-solid fa-calendar-days' },
        { id: 4, panelId: 'recordsPanel', label: 'Medical Records', icon: 'fa-solid fa-folder-open' },
        { id: 5, panelId: 'settingsPanel', label: 'Settings', icon: 'fa-solid fa-gear' },
        { id: 6, panelId: 'gamePanel', label: 'Health Guide Game', icon: 'fa-solid fa-gamepad' }
      ]
    }
  },
  emits: ['update:panel']
}
</script>