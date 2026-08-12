<script setup lang="ts">
import StudyPlanPage from '../components/StudyPlanPage.vue'
import {
  aiTechChecklists,
  aiTechResources,
  aiTechTemplates,
  aiTechWeeks,
} from '../data/aiTech'

function phaseLabel(week: number) {
  if (week <= 2) return 'AI 工具与技能阶段'
  if (week <= 7) return '本地模型与推理阶段'
  if (week <= 10) return '微调与数据阶段'
  return '部署与交付阶段'
}

const banner = {
  dark: '../assets/ai-tech-hero-dark.webp',
  light: '../assets/ai-tech-hero-light.webp',
}

const spot = {
  dark: '../assets/ai-tech-spot-dark.webp',
  light: '../assets/ai-tech-spot-light.webp',
}
</script>

<template>
  <StudyPlanPage
    title="AI技术"
    subtitle="MCP、Skills、本地模型、量化、微调与部署"
    :banner="banner"
    :spot="spot"
    :weeks="aiTechWeeks"
    :resources="aiTechResources"
    :checklists="aiTechChecklists"
    :templates="aiTechTemplates"
    task-prefix="ai"
    :phase-label="phaseLabel"
  />
</template>
