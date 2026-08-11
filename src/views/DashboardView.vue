<script setup lang="ts">
import { computed } from 'vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import ProgressRing from '../components/ProgressRing.vue'
import { weeks } from '../data/weeks'
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

const stats = computed(() => [
  {
    label: '总任务',
    value: doneCount.value,
    total: totalCount.value,
    percent: percent.value,
    hint: '三条学习线合计',
  },
  {
    label: '科研任务',
    value: weekDoneCount.value,
    total: weekTotalCount,
    percent: researchPercent,
    hint: '12 周路径规划',
  },
  {
    label: '工程任务',
    value: softwareDoneCount.value,
    total: softwareTotalCount,
    percent: engineeringPercent,
    hint: '软件工程清单',
  },
  {
    label: '法律任务',
    value: legalDoneCount.value,
    total: legalTotalCount,
    percent: lawPercent,
    hint: '法律学习与备案合规',
  },
])

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
    />

    <div class="stat-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
        <small>{{ stat.hint }}</small>
        <div class="card-progress">
          <div class="bar"><i :style="{ width: `${stat.percent}%` }"></i></div>
          <b>{{ stat.value }} / {{ stat.total }} · {{ stat.percent }}%</b>
        </div>
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
          <h2>12 周科研时间线</h2>
          <p>路径规划科研主线当前进度</p>
        </div>
      </div>
      <div class="panel panel-pad">
        <div class="timeline dashboard-timeline">
          <div v-for="week in weeks" :key="week.id" class="tl">
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
.card-progress {
  margin-top: 10px;
}

.card-progress .bar {
  margin: 0 0 5px;
}

.card-progress b {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
}

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

.dashboard-timeline .tl {
  cursor: default;
}

.dashboard-timeline .tl:hover .tl-dot {
  border-color: var(--line);
  box-shadow: none;
}

@media (max-width: 720px) {
  .line-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
