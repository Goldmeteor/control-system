<script setup lang="ts">
import ModuleHeader from '../components/ModuleHeader.vue'
import ProgressRing from '../components/ProgressRing.vue'
import { weeks } from '../data/weeks'
import {
  doneCount,
  legalDoneCount,
  legalTaskIds,
  otherDoneCount,
  otherTaskIds,
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
const otherTotalCount = otherTaskIds.length

const overviewStart = new Date('2026-08-10T00:00:00+08:00')

function formatDay(date: Date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

const dashboardWeeks = Array.from({ length: 16 }, (_, index) => {
  const id = index + 1
  const existing = weeks.find((week) => week.id === id)
  const startDay = new Date(overviewStart.getTime() + index * 7 * 86400000)
  const endDay = new Date(startDay.getTime() + 6 * 86400000)
  return {
    id,
    color: existing?.color ?? (id <= 8 ? '#6ee7ff' : id <= 12 ? '#4cc9f0' : '#5ee6a8'),
    date: existing?.date ?? `${formatDay(startDay)} - ${formatDay(endDay)}`,
  }
})

const researchPercent = weekTotalCount ? Math.round((weekDoneCount.value / weekTotalCount) * 100) : 0
const engineeringPercent = softwareTotalCount ? Math.round((softwareDoneCount.value / softwareTotalCount) * 100) : 0
const lawPercent = legalTotalCount ? Math.round((legalDoneCount.value / legalTotalCount) * 100) : 0
const otherPercent = otherTotalCount ? Math.round((otherDoneCount.value / otherTotalCount) * 100) : 0

const banner = {
  dark: '../assets/dashboard-hero-dark.webp',
  light: '../assets/dashboard-hero-light.webp',
}

const spot = {
  dark: '../assets/dashboard-spot-dark.webp',
  light: '../assets/dashboard-spot-light.webp',
}

const lines = [
  {
    label: '科研任务',
    done: weekDoneCount.value,
    total: weekTotalCount,
    percent: researchPercent,
  },
  {
    label: '工程任务',
    done: softwareDoneCount.value,
    total: softwareTotalCount,
    percent: engineeringPercent,
  },
  {
    label: '法律任务',
    done: legalDoneCount.value,
    total: legalTotalCount,
    percent: lawPercent,
  },
  {
    label: '其他',
    done: otherDoneCount.value,
    total: otherTotalCount,
    percent: otherPercent,
  },
]

function progressStatus(value: number) {
  if (value >= 100) return '全部完成'
  if (value >= 75) return '进入收敛阶段'
  if (value >= 40) return '实验闭环成形中'
  if (value > 0) return '基础能力构建中'
  return '准备出发'
}

function dailyTip() {
  if (percent.value >= 100) {
    return '全部完成，可以导出进度，准备进入下一阶段了。'
  }

  const sorted = [...lines].sort((a, b) => a.percent - b.percent)
  const minLine = sorted[0]
  const maxLine = sorted[sorted.length - 1]
  const allZero = lines.every((line) => line.percent === 0)
  const lowCount = lines.filter((line) => line.percent < 20).length

  if (allZero) {
    return '今天从最容易完成的一项开始，先让总进度离开 0。'
  }

  if (lines.every((line) => line.percent >= 60)) {
    return minLine.percent >= 75
      ? '离全部完成不远了，今天适合做收尾和复盘。'
      : '四条线都在推进，今天保持节奏就很好了。'
  }

  if (lowCount >= 2) {
    return '先集中突破落后较多的一条，不要四条同时硬啃。'
  }

  const othersAbove60 = lines
    .filter((line) => line.label !== minLine.label)
    .every((line) => line.percent >= 60)

  if (minLine.percent < 20) {
    if (minLine.label === '科研任务') return '科研任务还没动起来，今天可以多学一点路径规划内容哦。'
    if (minLine.label === '工程任务') return '软件工程进度落后了，今天适合补一补项目或部署任务。'
    if (minLine.label === '其他') return '编程、网络安全或 AI 内容还没动起来，今天先挑一个小任务开始吧。'
    return '法律学习掉队了，今天看一节案例课程也不错。'
  }

  if (minLine.percent < 60) {
    if (othersAbove60) {
      if (minLine.label === '科研任务') return '科研是当前短板，今天优先安排路径规划任务。'
      if (minLine.label === '工程任务') return '工程任务拖后腿了，今天适合补部署或项目产出。'
      if (minLine.label === '其他') return '其他学习线落后了，今天补一个编程、安全或 AI 小任务。'
      return '法律线需要追一追，今天补一条核心知识点。'
    }
    if (minLine.label === '科研任务') return '科研线有点落后，今天先拿下一个算法任务吧。'
    if (minLine.label === '工程任务') return '工程线需要加强，今天从一个小任务开始最不费力。'
    if (minLine.label === '其他') return '其他学习线进度偏慢，今天从一个小任务开始最不费力。'
    return '法律线进度偏慢，今天整理一条合规自查清单吧。'
  }

  if (maxLine.percent - minLine.percent >= 30) {
    if (maxLine.label === '科研任务') return '科研跑在前面，今天可以分一点时间给工程和法律。'
    if (maxLine.label === '工程任务') return '工程线状态不错，今天稍微照顾一下科研和法律。'
    if (maxLine.label === '其他') return '其他学习线状态不错，今天可以把时间分给科研、工程和法律。'
    return '法律线走得很稳，今天可以把时间分给其他两条线。'
  }

  return '四条线都刚起步，今天优先补落后最多的一条。'
}
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      title="总览"
      subtitle="科研、工程、法律和其他学习线的统一入口"
      :banner="banner"
      :spot="spot"
      compact
    />

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>时间线</h2>
        </div>
      </div>
      <div class="panel panel-pad">
        <div class="timeline dashboard-timeline">
          <div v-for="week in dashboardWeeks" :key="week.id" class="tl">
            <div class="tl-dot" :style="{ borderColor: week.color }">{{ week.id }}</div>
            <b>第 {{ week.id }} 周</b>
            <small>{{ week.date }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="progress-panel panel">
        <ProgressRing :percent="percent" label="总进度" />
        <div class="progress-copy">
          <div class="progress-heading">
            <h3>{{ dailyTip() }}</h3>
            <span>已完成 {{ doneCount }} / {{ totalCount }} 项</span>
          </div>
          <div class="line-progress">
            <div v-for="line in lines" :key="line.label" class="line-row">
              <span class="line-label">{{ line.label }}</span>
              <div class="bar"><i :style="{ width: `${line.percent}%` }"></i></div>
              <small>{{ line.done }} / {{ line.total }} · {{ progressStatus(line.percent) }}</small>
            </div>
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
  padding: 0;
}

.progress-heading {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: nowrap;
}

.progress-heading h3 {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.3;
  white-space: normal;
  flex: 1 1 auto;
  min-width: 0;
}

.progress-heading span {
  flex: 0 0 auto;
  color: var(--muted);
  font-size: 0.82rem;
  padding-bottom: 5px;
  white-space: nowrap;
}

.line-row {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr) auto;
  gap: 8px 10px;
  align-items: center;
  color: var(--muted);
  font-size: 0.82rem;
  padding: 6px 2px;
}

.line-label {
  font-weight: 800;
  color: var(--text);
}

.line-row .bar {
  margin: 0;
}

.line-row small {
  text-align: right;
  padding-right: 10px;
  white-space: nowrap;
}

.dashboard-timeline .tl {
  cursor: default;
}

.dashboard-timeline .tl:hover .tl-dot {
  border-color: var(--line);
  box-shadow: none;
}

.dashboard-timeline {
  grid-template-columns: repeat(16, minmax(0, 1fr));
}

.dashboard-timeline small {
  white-space: nowrap;
  font-size: 0.62rem;
}

@media (max-width: 1120px) {
  .dashboard-timeline {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .dashboard-timeline {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .line-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .line-row small {
    text-align: left;
    padding-right: 0;
    white-space: normal;
  }

  .progress-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
}
</style>
