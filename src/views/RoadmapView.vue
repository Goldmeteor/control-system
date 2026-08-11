<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown } from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import { weekPhases, weeks } from '../data/weeks'
import { state, toggleTask } from '../store'
import type { Week } from '../types'

const start = new Date('2026-08-10T00:00:00+08:00')
const currentWeek = computed(() => {
  const diff = Math.floor((Date.now() - start.getTime()) / 604800000) + 1
  return diff < 1 ? 1 : diff > 12 ? 12 : diff
})

const query = ref('')
const phaseFilter = ref('all')
const openWeekId = ref<number | null>(currentWeek.value)
const openAll = ref(false)

const banner = {
  dark: '../assets/path-hero-dark.webp',
  light: '../assets/path-hero-light.webp',
}

const spot = {
  dark: '../assets/path-spot-dark.webp',
  light: '../assets/path-spot-light.webp',
}

const filteredWeeks = computed(() => {
  const q = query.value.trim().toLowerCase()
  return weeks.filter((week) => {
    const matchPhase = phaseFilter.value === 'all' || week.phase === phaseFilter.value
    if (!matchPhase) return false
    if (!q) return true
    return [
      week.title,
      week.tag,
      week.objective,
      ...week.groups.flatMap((group) => group.tasks),
      week.deliverable,
      week.gate,
    ]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
})

function taskId(week: Week, groupIndex: number, taskIndex: number) {
  return `w${week.id}-g${groupIndex}-t${taskIndex}`
}

function weekDone(week: Week) {
  const total = week.groups.reduce((sum, group) => sum + group.tasks.length, 0)
  const done = week.groups.reduce(
    (sum, group, groupIndex) =>
      sum + group.tasks.filter((_, taskIndex) => state.done.includes(taskId(week, groupIndex, taskIndex))).length,
    0,
  )
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}

function toggleWeek(id: number) {
  openAll.value = false
  openWeekId.value = openWeekId.value === id ? null : id
}

function toggleAll() {
  openAll.value = !openAll.value
}

function scrollToWeek(id: number) {
  document.getElementById(`week-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      title="路径规划 · 12周科研路线"
      subtitle="移动机器人路径规划研究主线，从算法实现到研究提案的完整推进路线"
      :banner="banner"
      :spot="spot"
      compact
    >
      <template #actions>
        <span class="tiny">当前：第 {{ currentWeek }} 周</span>
        <button class="control" type="button" @click="toggleAll">
          {{ openAll ? '全部折叠' : '全部展开' }}
        </button>
      </template>
    </ModuleHeader>

    <div class="search-row">
      <input v-model="query" class="control" type="search" placeholder="搜索周次、算法、任务…" />
      <select
        class="control"
        :value="phaseFilter"
        @change="phaseFilter = ($event.target as HTMLSelectElement).value"
      >
        <option value="all">全部阶段</option>
        <option v-for="phase in weekPhases" :key="phase.id" :value="phase.id">{{ phase.label }}</option>
      </select>
    </div>

    <div class="panel panel-pad">
      <div class="timeline">
        <div
          v-for="week in weeks"
          :key="week.id"
          class="tl"
          :class="{ done: weekDone(week).done === weekDone(week).total, active: openAll || openWeekId === week.id }"
          @click="scrollToWeek(week.id)"
        >
          <div class="tl-dot" :style="{ borderColor: week.color }">
            {{ weekDone(week).percent === 100 ? '✓' : week.id }}
          </div>
          <b>Week {{ week.id }}</b>
          <small>{{ week.date }}</small>
        </div>
      </div>
    </div>

    <div class="page-section week-list">
      <article
        v-for="week in filteredWeeks"
        :id="`week-${week.id}`"
        :key="week.id"
        class="week-card"
        :style="{ '--week': week.color }"
      >
        <div class="week-header" @click="toggleWeek(week.id)">
          <div class="week-num">{{ week.icon }}</div>
          <div class="week-title">
            <h3>Week {{ week.id }} · {{ week.title }}</h3>
            <p>{{ week.date }}　{{ week.tag }}</p>
          </div>
          <div class="week-score">
            <div
              class="mini-ring"
              :style="{ '--p': weekDone(week).percent }"
              :data-p="`${weekDone(week).percent}%`"
            ></div>
            <ChevronDown
              :size="19"
              :style="{ transform: openAll || openWeekId === week.id ? 'rotate(180deg)' : 'none' }"
            />
          </div>
        </div>
        <div v-show="openAll || openWeekId === week.id" class="week-body">
          <div class="objective"><strong>本周目标：</strong>{{ week.objective }}</div>
          <div class="task-grid">
            <div v-for="(group, groupIndex) in week.groups" :key="group.name" class="task-group">
              <h4>{{ group.name }}</h4>
              <label
                v-for="(task, taskIndex) in group.tasks"
                :key="task"
                class="task"
                :class="{ checked: state.done.includes(taskId(week, groupIndex, taskIndex)) }"
              >
                <input
                  type="checkbox"
                  :checked="state.done.includes(taskId(week, groupIndex, taskIndex))"
                  @change="toggleTask(taskId(week, groupIndex, taskIndex))"
                />
                <span>{{ task }}</span>
              </label>
            </div>
          </div>
          <div class="week-bottom">
            <div class="deliver">
              <b>本周交付</b>
              <p>{{ week.deliverable }}</p>
            </div>
            <div class="gate">
              <b>过关条件</b>
              <p>{{ week.gate }}</p>
            </div>
          </div>
        </div>
      </article>
      <div v-if="filteredWeeks.length === 0" class="empty-state">没有匹配内容</div>
    </div>
  </div>
</template>
