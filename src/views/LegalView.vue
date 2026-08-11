<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  BookOpenCheck,
  ChevronDown,
  ExternalLink,
  FileText,
  ListChecks,
  Scale,
} from '@lucide/vue'
import {
  legalChecklists,
  legalPhases,
  legalResources,
  legalSummary,
  legalWeekKnowledge,
  legalTemplates,
  legalWeeks,
} from '../data/legal'
import { legalDoneCount, legalTotalCount, state, toggleTask } from '../store'
import type { LegalWeek } from '../types'

type TabId = 'weeks' | 'resources' | 'checklists' | 'templates'

const activeTab = ref<TabId>('weeks')
const openWeekId = ref<number | null>(1)
const query = ref('')
const phaseFilter = ref('all')

const tabs = [
  { id: 'weeks', label: '16周任务', icon: BookOpenCheck },
  { id: 'resources', label: '教程与教材', icon: ExternalLink },
  { id: 'checklists', label: '自查清单', icon: ListChecks },
  { id: 'templates', label: '模板', icon: FileText },
] as const

const filteredWeeks = computed(() => {
  const q = query.value.trim().toLowerCase()
  return legalWeeks.filter((week) => {
    if (phaseFilter.value !== 'all' && week.phase !== phaseFilter.value) return false
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

const phaseCounts = computed(() =>
  legalPhases.map((phase) => ({
    ...phase,
    count: legalWeeks.filter((week) => week.phase === phase.id).length,
  })),
)

const legalPercent = computed(() =>
  legalTotalCount.value === 0
    ? 0
    : Math.round((legalDoneCount.value / legalTotalCount.value) * 100),
)

function taskId(week: LegalWeek, groupIndex: number, taskIndex: number) {
  return `l${week.id}-g${groupIndex}-t${taskIndex}`
}

function weekDone(week: LegalWeek) {
  const total = week.groups.reduce((sum, group) => sum + group.tasks.length, 0)
  const done = week.groups.reduce(
    (sum, group, groupIndex) =>
      sum +
      group.tasks.filter((_, taskIndex) =>
        state.done.includes(taskId(week, groupIndex, taskIndex)),
      ).length,
    0,
  )
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}

function checklistItemId(checklistIndex: number, itemIndex: number) {
  return `lc${checklistIndex}-i${itemIndex}`
}

function toggleWeek(id: number) {
  openWeekId.value = openWeekId.value === id ? null : id
}

function scrollToWeek(id: number) {
  document.getElementById(`legal-week-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <div class="page-section">
    <div class="section-head">
      <div>
        <h1>法律学习</h1>
        <p>{{ legalSummary.duration }} · {{ legalSummary.weeklyHours }} · 工作生活均衡</p>
      </div>
      <span class="tiny">实用防坑路线，不替代法学学位与执业资格</span>
    </div>

    <div class="disclaimer">
      目标：{{ legalSummary.success }}。教材版本和法规会更新，以国家法律法规数据库最新文本为准。
    </div>

    <div class="page-hero-row">
      <div class="visual-banner legal" aria-hidden="true"></div>
      <div class="spot-tile legal-spot" aria-hidden="true"></div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <strong>16 周</strong>
        <span>学习周期</span>
        <small>四个阶段：法律地基、互联网合规、生活高频、输出实战</small>
      </div>
      <div class="stat-card">
        <strong>10h</strong>
        <span>每周投入</span>
        <small>课程3h、法条3h、案例2h、输出2h</small>
      </div>
      <div class="stat-card">
        <strong>{{ legalTotalCount }}</strong>
        <span>可勾选任务</span>
        <small>周任务 + 两份自查清单</small>
      </div>
      <div class="stat-card">
        <strong>{{ legalDoneCount }}</strong>
        <span>已完成</span>
        <small>当前完成度 {{ legalPercent }}%</small>
      </div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>阶段分布</h2>
          <p>每四周切换一个学习重心</p>
        </div>
      </div>
      <div class="stat-grid">
        <div v-for="phase in phaseCounts" :key="phase.id" class="stat-card">
          <strong>{{ phase.count }} 周</strong>
          <span>{{ phase.label }}</span>
          <small>{{ phase.range }}，共 {{ phase.count * 40 }} 小时</small>
        </div>
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
      <div class="search-row">
        <input v-model="query" class="control" type="search" placeholder="搜索周次、主题、任务…" />
        <select v-model="phaseFilter" class="control">
          <option value="all">全部阶段</option>
          <option v-for="phase in legalPhases" :key="phase.id" :value="phase.id">
            {{ phase.label }}
          </option>
        </select>
      </div>

      <div class="panel panel-pad">
        <div class="legal-progress">
          <div>
            <b>16 周总进度</b>
            <span>{{ legalPercent }}% · {{ legalDoneCount }} / {{ legalTotalCount }}</span>
          </div>
          <div class="bar"><i :style="{ width: `${legalPercent}%` }"></i></div>
        </div>
        <div class="legal-timeline">
          <div
            v-for="week in legalWeeks"
            :key="week.id"
            class="lt"
            :class="{ done: weekDone(week).done === weekDone(week).total, active: openWeekId === week.id }"
            @click="scrollToWeek(week.id)"
          >
            <div class="lt-dot" :style="{ borderColor: week.color }">
              {{ weekDone(week).percent === 100 ? '✓' : week.icon }}
            </div>
            <b>第 {{ week.id }} 周</b>
            <small>{{ week.tag }}</small>
          </div>
        </div>
      </div>

      <div class="legal-week-list">
        <article
          v-for="week in filteredWeeks"
          :id="`legal-week-${week.id}`"
          :key="week.id"
          class="week-card"
          :style="{ '--week': week.color }"
        >
          <div class="week-header" @click="toggleWeek(week.id)">
            <div class="week-num">{{ week.icon }}</div>
            <div class="week-title">
              <h3>第 {{ week.id }} 周 · {{ week.title }}</h3>
              <p>{{ week.tag }} · {{ week.objective }}</p>
            </div>
            <div class="week-score">
              <div
                class="mini-ring"
                :style="{ '--p': weekDone(week).percent }"
                :data-p="`${weekDone(week).percent}%`"
              ></div>
              <ChevronDown
                :size="19"
                :style="{ transform: openWeekId === week.id ? 'rotate(180deg)' : 'none' }"
              />
            </div>
          </div>
          <div v-show="openWeekId === week.id" class="week-body">
            <div class="objective"><strong>本周目标：</strong>{{ week.objective }}</div>
            <div class="knowledge-block">
              <b>核心知识点</b>
              <ul>
                <li v-for="point in legalWeekKnowledge[week.id]" :key="point">{{ point }}</li>
              </ul>
            </div>
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

    <div v-else-if="activeTab === 'resources'" class="page-section">
      <div class="section-head">
        <div>
          <h2>教程与教材</h2>
          <p>课程、读物、工具书和官方数据库</p>
        </div>
      </div>
      <div class="panel panel-pad table-wrap">
        <table class="matrix-table legal-resource-table">
          <thead>
            <tr>
              <th>类型</th>
              <th>名称</th>
              <th>用途</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in legalResources" :key="resource.id">
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
          <p>第13周前逐步填写，第16周完成终版</p>
        </div>
      </div>
      <div class="checklist-grid">
        <article
          v-for="(checklist, checklistIndex) in legalChecklists"
          :key="checklist.id"
          class="checklist-card"
        >
          <div class="checklist-head">
            <Scale :size="19" />
            <div>
              <h3>{{ checklist.title }}</h3>
              <p>{{ checklist.description }}</p>
            </div>
          </div>
          <label
            v-for="(item, itemIndex) in checklist.items"
            :key="item.text"
            class="task"
            :class="{ checked: state.done.includes(checklistItemId(checklistIndex, itemIndex)) }"
          >
            <input
              type="checkbox"
              :checked="state.done.includes(checklistItemId(checklistIndex, itemIndex))"
              @change="toggleTask(checklistItemId(checklistIndex, itemIndex))"
            />
            <span>
              {{ item.text }}
              <small>{{ item.reference }}</small>
            </span>
          </label>
        </article>
      </div>
    </div>

    <div v-else class="page-section">
      <div class="section-head">
        <div>
          <h2>输出模板</h2>
          <p>案例笔记、合同审查、找律师准备单</p>
        </div>
      </div>
      <div class="template-grid">
        <article v-for="template in legalTemplates" :key="template.id" class="template-card">
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
.visual-banner.legal {
  --banner-image: url('../assets/legal-hero-dark.webp');
  --banner-image-light: url('../assets/legal-hero-light.webp');
}

.legal-spot {
  --spot-image: url('../assets/legal-spot-dark.webp');
  --spot-image-light: url('../assets/legal-spot-light.webp');
}

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

.knowledge-block {
  border: 1px solid color-mix(in srgb, var(--accent2) 30%, var(--line));
  border-radius: 10px;
  background: rgba(139, 124, 255, 0.07);
  padding: 12px 14px;
  margin-bottom: 14px;
}

.knowledge-block b {
  display: block;
  color: var(--accent2);
  font-size: 0.85rem;
  margin-bottom: 7px;
}

.knowledge-block ul {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.7;
}

.legal-progress {
  display: grid;
  gap: 8px;
  margin-bottom: 20px;
}

.legal-progress > div:first-child {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.84rem;
}

.legal-progress b {
  color: var(--text);
}

.legal-timeline {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 8px 10px;
  position: relative;
}

.lt {
  text-align: center;
  cursor: pointer;
  min-width: 0;
}

.lt-dot {
  width: 46px;
  height: 46px;
  margin: 0 auto;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--text);
  font-size: 0.78rem;
  font-weight: 900;
  background: var(--panel2);
  border: 2px solid var(--line);
}

.lt.active .lt-dot,
.lt:hover .lt-dot {
  box-shadow: 0 0 0 5px rgba(110, 231, 255, 0.09);
}

.lt.done .lt-dot {
  color: #06151c;
  background: var(--green);
  border-color: var(--green);
}

.lt b {
  display: block;
  margin-top: 7px;
  font-size: 0.76rem;
}

.lt small {
  display: block;
  color: var(--muted);
  font-size: 0.66rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.legal-week-list {
  display: grid;
  gap: 15px;
  margin-top: 24px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-weight: 700;
  word-break: break-word;
}

.checklist-grid,
.template-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.checklist-card,
.template-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
  padding: 17px;
  min-width: 0;
}

.checklist-head {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--accent);
  margin-bottom: 10px;
}

.checklist-head h3,
.template-card h3 {
  margin: 0;
  font-size: 1.02rem;
}

.checklist-head p,
.template-card > p {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.6;
}

.checklist-card .task {
  border-top: 1px solid var(--line);
}

.checklist-card .task small {
  display: block;
  color: var(--accent);
  font-size: 0.72rem;
  margin-top: 3px;
}

.template-card > svg {
  color: var(--accent2);
  margin-bottom: 8px;
}

.field-list {
  display: grid;
  gap: 9px;
  margin-top: 13px;
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

@media (max-width: 1120px) {
  .legal-timeline {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .checklist-grid,
  .template-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .tab-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .legal-timeline {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lt-dot {
    width: 42px;
    height: 42px;
  }
}
</style>
