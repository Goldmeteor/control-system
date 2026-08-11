<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ModuleHeader from '../components/ModuleHeader.vue'
import ProgressRing from '../components/ProgressRing.vue'
import { weekPhases, weeks } from '../data/weeks'
import {
  doneCount,
  legalDoneCount,
  legalTaskIds,
  percent,
  softwareDoneCount,
  softwareTaskIds,
  totalCount,
  weekDoneCount,
  weekTaskIds,
} from '../store'

const start = new Date('2026-08-10T00:00:00+08:00')
const currentWeek = computed(() => {
  const diff = Math.floor((Date.now() - start.getTime()) / 604800000) + 1
  return diff < 1 ? 1 : diff > 12 ? 12 : diff
})

const weekTotalCount = weekTaskIds.length
const softwareTotalCount = softwareTaskIds.length
const legalTotalCount = legalTaskIds.length

const researchPercent = weekTotalCount ? Math.round((weekDoneCount.value / weekTotalCount) * 100) : 0
const engineeringPercent = softwareTotalCount ? Math.round((softwareDoneCount.value / softwareTotalCount) * 100) : 0
const lawPercent = legalTotalCount ? Math.round((legalDoneCount.value / legalTotalCount) * 100) : 0

const banner = {
  dark: '../assets/dashboard-hero-dark.webp',
  light: '../assets/dashboard-hero-light.webp',
}

const spot = {
  dark: '../assets/dashboard-spot-dark.webp',
  light: '../assets/dashboard-spot-light.webp',
}

const progressLines = [
  { label: '路径规划', done: weekDoneCount.value, total: weekTotalCount, percent: researchPercent },
  { label: '软件工程', done: softwareDoneCount.value, total: softwareTotalCount, percent: engineeringPercent },
  { label: '法律学习', done: legalDoneCount.value, total: legalTotalCount, percent: lawPercent },
]
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      title="总览"
      subtitle="科研、工程、法律三条学习线的统一入口"
      :banner="banner"
      :spot="spot"
      compact
    >
      <template #actions>
        <span class="tiny">当前科研周：Week {{ currentWeek }}</span>
      </template>
    </ModuleHeader>

    <div class="stat-grid">
      <div class="stat-card">
        <strong>{{ totalCount }}</strong>
        <span>总任务</span>
        <small>三条学习线合计</small>
      </div>
      <div class="stat-card">
        <strong>{{ doneCount }}</strong>
        <span>已完成</span>
        <small>整体完成度 {{ percent }}%</small>
      </div>
      <div class="stat-card">
        <strong>{{ weekDoneCount }}</strong>
        <span>科研任务</span>
        <small>12 周路径规划</small>
      </div>
      <div class="stat-card">
        <strong>{{ softwareDoneCount }}</strong>
        <span>工程任务</span>
        <small>软件工程清单</small>
      </div>
    </div>

    <div class="page-section">
      <div class="progress-panel panel">
        <ProgressRing :percent="percent" label="总进度" />
        <div class="progress-copy">
          <h3>{{ percent >= 100 ? '全部完成' : percent >= 75 ? '进入收敛阶段' : percent >= 40 ? '实验闭环成形中' : percent > 0 ? '基础能力构建中' : '准备出发' }}</h3>
          <div class="line-progress">
            <div v-for="line in progressLines" :key="line.label" class="line-row">
              <span>{{ line.label }}</span>
              <div class="bar"><i :style="{ width: `${line.percent}%` }"></i></div>
              <small>{{ line.done }} / {{ line.total }}</small>
            </div>
          </div>
          <div class="tiny">已完成 {{ doneCount }} / {{ totalCount }} 项</div>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>模块分布</h2>
          <p>点击卡片进入对应学习模块</p>
        </div>
      </div>
      <div class="stat-grid">
        <RouterLink to="/roadmap" class="stat-card module-card">
          <strong>12 周</strong>
          <span>路径规划</span>
          <small>算法基石、系统闭环、复现改进、研究收敛</small>
          <div class="chip-row">
            <span v-for="phase in weekPhases" :key="phase.id" class="chip">{{ phase.label }}</span>
          </div>
        </RouterLink>
        <RouterLink to="/software" class="stat-card module-card">
          <strong>5 类</strong>
          <span>软件工程</span>
          <small>地基、全栈、安全、素养与每周工程副线</small>
        </RouterLink>
        <RouterLink to="/legal" class="stat-card module-card">
          <strong>16 周</strong>
          <span>法律学习</span>
          <small>互联网合规、备案资质与日常生活防坑</small>
        </RouterLink>
        <RouterLink to="/settings" class="stat-card module-card">
          <strong>1 份</strong>
          <span>设置</span>
          <small>主题切换与进度数据管理</small>
        </RouterLink>
      </div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>12 周科研时间线</h2>
          <p>点击节点进入路径规划逐周任务</p>
        </div>
      </div>
      <div class="panel panel-pad">
        <div class="timeline">
          <div
            v-for="week in weeks"
            :key="week.id"
            class="tl"
            :class="{ active: currentWeek === week.id }"
            @click="$router.push('/roadmap')"
          >
            <div class="tl-dot" :style="{ borderColor: week.color }">{{ week.id }}</div>
            <b>Week {{ week.id }}</b>
            <small>{{ week.date }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-progress {
  display: grid;
  gap: 10px;
  margin: 14px 0 8px;
}

.line-row {
  display: grid;
  grid-template-columns: 90px 1fr 72px;
  gap: 10px;
  align-items: center;
  color: var(--muted);
  font-size: 0.82rem;
}

.line-row .bar {
  margin: 0;
}

.module-card {
  display: block;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.chip {
  color: var(--accent);
  border: 1px solid rgba(110, 231, 255, 0.25);
  border-radius: 99px;
  background: rgba(110, 231, 255, 0.06);
  padding: 4px 8px;
  font-size: 0.7rem;
}

@media (max-width: 720px) {
  .line-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
