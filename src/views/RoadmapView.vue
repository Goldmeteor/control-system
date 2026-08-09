<script setup lang="ts">
import { computed, ref } from 'vue'
import { weekPhases, weeks } from '../data/weeks'
import { setFilter, state, toggleTask, toggleWeek } from '../store'
import type { Week } from '../types'

const query = ref('')

const filteredWeeks = computed(() => {
  const q = query.value.trim().toLowerCase()
  return weeks.filter((week) => {
    const matchPhase = state.filter === 'all' || week.phase === state.filter
    if (!matchPhase) return false
    if (!q) return true
    const searchText = [
      week.title,
      week.tag,
      week.objective,
      ...week.groups.flatMap((group) => group.tasks),
      ...week.softwareLine,
      week.deliverable,
      week.gate,
    ]
      .join(' ')
      .toLowerCase()
    return searchText.includes(q)
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

function toggleAll() {
  if (state.closed.length === weeks.length) {
    state.closed = []
  } else {
    state.closed = weeks.map((week) => week.id)
  }
}

function scrollToWeek(id: number) {
  document.getElementById(`week-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <div class="page-section">
    <div class="section-head">
      <div>
        <h1>12 周双主线路线</h1>
        <p>每周目标、任务清单、工程副线与过关条件</p>
      </div>
      <button class="control" type="button" @click="toggleAll">
        {{ state.closed.length === weeks.length ? '全部展开' : '全部折叠' }}
      </button>
    </div>

    <div class="search-row">
      <input v-model="query" class="control" type="search" placeholder="搜索周次、算法、任务…" />
      <select
        class="control"
        :value="state.filter"
        @change="setFilter(($event.target as HTMLSelectElement).value)"
      >
        <option value="all">全部阶段</option>
        <option v-for="phase in weekPhases" :key="phase.id" :value="phase.id">{{ phase.label }}</option>
      </select>
    </div>

    <div class="page-hero-row">
      <div class="visual-banner roadmap" aria-hidden="true"></div>
      <div class="spot-tile roadmap-spot" aria-hidden="true"></div>
    </div>

    <div class="page-section">
      <div class="panel panel-pad">
        <div class="timeline">
          <div
            v-for="week in weeks"
            :key="week.id"
            class="tl"
            :class="{ done: weekDone(week).done === weekDone(week).total }"
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
            <div class="mini-ring" :style="{ '--p': weekDone(week).percent }" :data-p="`${weekDone(week).percent}%`"></div>
            <span class="chev">⌄</span>
          </div>
        </div>
        <div v-show="!state.closed.includes(week.id)" class="week-body">
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
          <div class="software-line">
            <b>软件工程副线</b>
            <ul>
              <li v-for="item in week.softwareLine" :key="item">{{ item }}</li>
            </ul>
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

<style scoped>
.visual-banner.roadmap {
  --banner-image: url('../assets/roadmap-visual.png');
  --banner-image-light: url('../assets/roadmap-visual-light.png');
}

.roadmap-spot {
  --spot-image: url('../assets/spot-roadmap.png');
  --spot-image-light: url('../assets/spot-roadmap-light.png');
}
</style>
