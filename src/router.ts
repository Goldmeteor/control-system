import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'
import RoadmapView from './views/RoadmapView.vue'
import SoftwareView from './views/SoftwareView.vue'
import LegalView from './views/LegalView.vue'
import ProgrammingView from './views/ProgrammingView.vue'
import CybersecurityView from './views/CybersecurityView.vue'
import AiTechView from './views/AiTechView.vue'
import KnowledgeBaseView from './views/KnowledgeBaseView.vue'
import KnowledgeDetailView from './views/KnowledgeDetailView.vue'
import SettingsView from './views/SettingsView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/roadmap', name: 'roadmap', component: RoadmapView },
    { path: '/path-planning', name: 'path-planning', component: RoadmapView },
    { path: '/software', name: 'software', component: SoftwareView },
    { path: '/compliance', redirect: () => ({ path: '/legal', query: { tab: 'compliance' } }) },
    { path: '/legal', name: 'legal', component: LegalView },
    { path: '/programming', name: 'programming', component: ProgrammingView },
    { path: '/cybersecurity', name: 'cybersecurity', component: CybersecurityView },
    { path: '/ai-tech', name: 'ai-tech', component: AiTechView },
    { path: '/knowledge-base', name: 'knowledge-base', component: KnowledgeBaseView },
    { path: '/knowledge-base/:id', name: 'knowledge-detail', component: KnowledgeDetailView },
    { path: '/settings', name: 'settings', component: SettingsView },
  ],
})

export default router
