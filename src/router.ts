import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'
import RoadmapView from './views/RoadmapView.vue'
import SoftwareView from './views/SoftwareView.vue'
import ComplianceView from './views/ComplianceView.vue'
import SettingsView from './views/SettingsView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/roadmap', name: 'roadmap', component: RoadmapView },
    { path: '/software', name: 'software', component: SoftwareView },
    { path: '/compliance', name: 'compliance', component: ComplianceView },
    { path: '/settings', name: 'settings', component: SettingsView },
  ],
})

export default router
