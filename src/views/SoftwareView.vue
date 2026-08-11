<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  BookOpenCheck,
  ChevronDown,
  ExternalLink,
  FileText,
  ListChecks,
} from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import { softwareChecklists, softwareResources, softwareTemplates } from '../data/softwareResources'
import { softwarePlanWeeks } from '../data/softwarePlan'
import { state, toggleTask } from '../store'

type TabId = 'weeks' | 'resources' | 'checklists' | 'templates'

const start = new Date('2026-08-10T00:00:00+08:00')
const currentWeek = computed(() => {
  const diff = Math.floor((Date.now() - start.getTime()) / 604800000) + 1
  return diff < 1 ? 1 : diff > 12 ? 12 : diff
})

const currentPhase = computed(() => {
  if (currentWeek.value <= 4) return '算法与实验阶段'
  if (currentWeek.value <= 8) return '复现与研究阶段'
  if (currentWeek.value <= 10) return '全栈开发阶段'
  return '部署与合规阶段'
})

const activeTab = ref<TabId>('weeks')
const query = ref('')
const openWeekId = ref<number | null>(null)
const openAll = ref(false)
const softwareWeeks = softwarePlanWeeks

const banner = {
  dark: '../assets/software-hero-dark.webp',
  light: '../assets/software-hero-light.webp',
}

const spot = {
  dark: '../assets/software-spot-dark.webp',
  light: '../assets/software-spot-light.webp',
}

const tabs = [
  { id: 'weeks', label: '任务清单', icon: BookOpenCheck },
  { id: 'resources', label: '教程与教材', icon: ExternalLink },
  { id: 'checklists', label: '自查清单', icon: ListChecks },
  { id: 'templates', label: '模板', icon: FileText },
] as const

const filteredWeeks = computed(() => {
  const q = query.value.trim().toLowerCase()
  return softwareWeeks.filter((week) => {
    if (!q) return true
    const tasks = week.groups.flatMap((group) => group.tasks)
    return [week.title, week.tag, ...tasks].join(' ').toLowerCase().includes(q)
  })
})

function weekDone(weekId: number) {
  const week = softwareWeeks[weekId - 1]
  if (!week) return { done: 0, total: 0, percent: 0 }
  const total = week.groups.reduce((sum, group) => sum + group.tasks.length, 0)
  const done = week.groups.reduce(
    (sum, group, groupIndex) =>
      sum + group.tasks.filter((_, taskIndex) => state.done.includes(`sw${weekId}-g${groupIndex}-t${taskIndex}`)).length,
    0,
  )
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}

function toggleWeek(id: number) {
  openAll.value = false
  openWeekId.value = openWeekId.value === id ? null : id
}

function scrollToWeek(id: number) {
  document.getElementById(`software-week-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      title="软件工程"
      subtitle="工程地基、全栈开发、部署安全、工程素养与每周工程副线"
      :banner="banner"
      :spot="spot"
      compact
    >
      <template #actions>
        <span class="tiny">当前：{{ currentPhase }} · 第{{ currentWeek }}周</span>
      </template>
    </ModuleHeader>

    <div class="page-section">
      <div class="panel panel-pad">
        <div class="timeline">
          <div
            v-for="week in softwareWeeks"
            :key="week.id"
            class="tl"
            :class="{ done: weekDone(week.id).done === weekDone(week.id).total, active: openAll || openWeekId === week.id }"
            @click="scrollToWeek(week.id)"
          >
            <div class="tl-dot" :style="{ borderColor: week.color }">
              {{ weekDone(week.id).percent === 100 ? '✓' : week.id }}
            </div>
            <b>第 {{ week.id }} 周</b>
            <small>{{ week.tag }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="search-row">
        <input v-model="query" class="control" type="search" placeholder="搜索周次、任务、技能…" />
      </div>
    </div>

    <div class="page-section">
      <div class="tab-row">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <component :is="tab.icon" :size="17" />
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'weeks'" class="page-section">
      <div class="page-section week-list">
        <article
          v-for="week in filteredWeeks"
          :id="`software-week-${week.id}`"
          :key="week.id"
          class="week-card"
          :style="{ '--week': week.color }"
        >
          <div class="week-header" @click="toggleWeek(week.id)">
            <div class="week-num">{{ String(week.id).padStart(2, '0') }}</div>
            <div class="week-title">
              <h3>第{{ week.id }}周 · {{ week.title }}</h3>
              <p>{{ week.summary }}</p>
            </div>
            <div class="week-side">
              <div class="week-goal">
                <b>本周目标</b>
                <span>{{ week.objective }}</span>
              </div>
              <div class="week-score">
                <div
                  class="mini-ring"
                  :style="{ '--p': weekDone(week.id).percent }"
                  :data-p="`${weekDone(week.id).percent}%`"
                ></div>
                <ChevronDown
                  :size="19"
                  :style="{ transform: openAll || openWeekId === week.id ? 'rotate(180deg)' : 'none' }"
                />
              </div>
            </div>
          </div>
          <div v-show="openAll || openWeekId === week.id" class="week-body">
            <div class="task-grid">
              <div
                v-for="(group, groupIndex) in week.groups"
                :key="group.name"
                class="task-group"
              >
                <h4>{{ group.name }}</h4>
                <label
                  v-for="(task, taskIndex) in group.tasks"
                  :key="task"
                  class="task"
                  :class="{ checked: state.done.includes(`sw${week.id}-g${groupIndex}-t${taskIndex}`) }"
                >
                  <input
                    type="checkbox"
                    :checked="state.done.includes(`sw${week.id}-g${groupIndex}-t${taskIndex}`)"
                    @change="toggleTask(`sw${week.id}-g${groupIndex}-t${taskIndex}`)"
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

    <div v-else-if="activeTab === 'resources'" class="page-section">
      <div class="section-head">
        <div>
          <h2>教程与教材</h2>
          <p>前端、后端、数据库、部署与安全的官方资源</p>
        </div>
      </div>
      <div class="panel panel-pad table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>类型</th>
              <th>名称</th>
              <th>用途</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in softwareResources" :key="resource.id">
              <td><span class="kind-badge">{{ resource.category }}</span></td>
              <td>
                <a
                  v-if="resource.link"
                  :href="resource.link"
                  target="_blank"
                  rel="noreferrer"
                  class="resource-link"
                >
                  {{ resource.title }}
                  <ExternalLink :size="14" />
                </a>
                <strong v-else>{{ resource.title }}</strong>
              </td>
              <td>{{ resource.note }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else-if="activeTab === 'checklists'" class="page-section">
      <div class="section-head">
        <div>
          <h2>自查清单</h2>
          <p>项目交付、部署上线与安全自测</p>
        </div>
      </div>
      <div class="resource-grid">
        <article v-for="checklist in softwareChecklists" :key="checklist.id" class="resource-card">
          <h3>{{ checklist.title }}</h3>
          <p>{{ checklist.description }}</p>
          <ul>
            <li v-for="item in checklist.items" :key="item.text">
              {{ item.text }}
              <small>{{ item.reference }}</small>
            </li>
          </ul>
        </article>
      </div>
    </div>

    <div v-else class="page-section">
      <div class="section-head">
        <div>
          <h2>模板</h2>
          <p>README、接口文档与部署文档</p>
        </div>
      </div>
      <div class="resource-grid">
        <article v-for="template in softwareTemplates" :key="template.id" class="resource-card">
          <FileText :size="20" />
          <h3>{{ template.title }}</h3>
          <p>{{ template.description }}</p>
          <div class="field-list">
            <div v-for="field in template.fields" :key="field.label" class="field-item">
              <b>{{ field.label }}</b>
              <span>{{ field.hint }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<style scoped>
.tab-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.tab-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel2);
}

.tab-button.active {
  color: var(--text);
  border-color: rgba(110, 231, 255, 0.45);
  background: rgba(110, 231, 255, 0.09);
}

.week-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 0;
}

.week-goal {
  width: max-content;
  max-width: 560px;
  text-align: right;
  min-width: 0;
}

.week-goal b {
  display: block;
  color: var(--yellow);
  font-size: 0.72rem;
  margin-bottom: 3px;
}

.week-goal span {
  display: block;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.week-score {
  justify-content: flex-end;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.resource-card {
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
  padding: 16px;
}

.resource-card h3 {
  margin: 0 0 6px;
  font-size: 1rem;
}

.resource-card > p {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.6;
}

.resource-card ul {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.65;
}

.resource-card ul small {
  display: block;
  color: var(--accent);
  font-size: 0.72rem;
}

.resource-card > svg {
  color: var(--accent2);
  margin-bottom: 8px;
}

.field-list {
  display: grid;
  gap: 9px;
}

.field-item {
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--panel2);
  padding: 10px 12px;
}

.field-item b {
  display: block;
  color: var(--text);
  font-size: 0.86rem;
  margin-bottom: 4px;
}

.field-item span {
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.55;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-weight: 700;
  word-break: break-word;
}

@media (max-width: 860px) {
  .tab-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .resource-grid {
    grid-template-columns: 1fr;
  }

  .week-header {
    grid-template-columns: auto 1fr;
  }

  .week-side {
    grid-column: 1 / -1;
    align-items: flex-start;
    margin-top: 4px;
  }

  .week-goal {
    max-width: none;
    text-align: left;
    width: 100%;
  }
}

</style>
