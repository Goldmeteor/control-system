<script setup lang="ts">
import StudyPlanPage from '../components/StudyPlanPage.vue'
import {
  programmingChecklists,
  programmingResources,
  programmingTemplates,
  programmingWeeks,
} from '../data/programming'

function phaseLabel(week: number) {
  if (week <= 2) return '入门与环境阶段'
  if (week <= 4) return '核心语法阶段'
  if (week <= 6) return '工具与仿真阶段'
  return '综合产出阶段'
}

const banner = {
  dark: '../assets/programming-hero-dark.webp',
  light: '../assets/programming-hero-light.webp',
}

const spot = {
  dark: '../assets/programming-spot-dark.webp',
  light: '../assets/programming-spot-light.webp',
}
</script>

<template>
  <StudyPlanPage
    title="编程基础"
    subtitle="从语言选型到环境、语法、工具和综合脚本"
    :banner="banner"
    :spot="spot"
    :weeks="programmingWeeks"
    :resources="programmingResources"
    :checklists="programmingChecklists"
    :templates="programmingTemplates"
    task-prefix="pg"
    :phase-label="phaseLabel"
  />
</template>
