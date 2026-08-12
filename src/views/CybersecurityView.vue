<script setup lang="ts">
import StudyPlanPage from '../components/StudyPlanPage.vue'
import {
  cybersecurityChecklists,
  cybersecurityResources,
  cybersecurityTemplates,
  cybersecurityWeeks,
} from '../data/cybersecurity'

function phaseLabel(week: number) {
  if (week <= 5) return 'Web 安全基础阶段'
  if (week <= 9) return '渗透与逆向阶段'
  if (week <= 13) return '工控与密码学阶段'
  return '合规与实战阶段'
}

const banner = {
  dark: '../assets/cybersecurity-hero-dark.webp',
  light: '../assets/cybersecurity-hero-light.webp',
}

const spot = {
  dark: '../assets/cybersecurity-spot-dark.webp',
  light: '../assets/cybersecurity-spot-light.webp',
}
</script>

<template>
  <StudyPlanPage
    title="网络安全"
    subtitle="Web 安全、渗透、逆向、工控安全与密码学"
    :banner="banner"
    :spot="spot"
    :weeks="cybersecurityWeeks"
    :resources="cybersecurityResources"
    :checklists="cybersecurityChecklists"
    :templates="cybersecurityTemplates"
    task-prefix="sec"
    :phase-label="phaseLabel"
  />
</template>
