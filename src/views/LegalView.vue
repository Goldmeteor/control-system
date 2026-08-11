<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  BookOpenCheck,
  ChevronDown,
  ExternalLink,
  FileText,
  ListChecks,
  ShieldCheck,
} from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import { complianceDisclaimer, complianceLicenses } from '../data/compliance'
import {
  legalComplianceQuick,
  legalChecklists,
  legalResources,
  legalWeekKnowledge,
  legalTemplates,
  legalWeeks,
} from '../data/legal'
import { state, toggleTask } from '../store'
import type { LegalWeek } from '../types'

type TabId = 'weeks' | 'resources' | 'checklists' | 'compliance' | 'templates'

const activeTab = ref<TabId>('weeks')
const route = useRoute()
const openWeekId = ref<number | null>(null)
const openComplianceId = ref<string | null>(null)
const query = ref('')

const legalStart = new Date('2026-08-10T00:00:00+08:00')
const currentLegalWeek = computed(() => {
  const diff = Math.floor((Date.now() - legalStart.getTime()) / 604800000) + 1
  return diff < 1 ? 1 : diff > 16 ? 16 : diff
})

function legalPhaseForWeek(week: number) {
  if (week <= 4) return '法律地基阶段'
  if (week <= 8) return '互联网合规阶段'
  if (week <= 12) return '生活高频阶段'
  return '输出实战阶段'
}

watch(
  () => route.query.tab,
  (tab) => {
    if (tab === 'compliance') activeTab.value = 'compliance'
  },
  { immediate: true },
)

const tabs = [
  { id: 'weeks', label: '任务清单', icon: BookOpenCheck },
  { id: 'resources', label: '教程与教材', icon: ExternalLink },
  { id: 'checklists', label: '自查清单', icon: ListChecks },
  { id: 'compliance', label: '备案合规', icon: ShieldCheck },
  { id: 'templates', label: '模板', icon: FileText },
] as const

const banner = {
  dark: '../assets/legal-hero-dark.webp',
  light: '../assets/legal-hero-light.webp',
}

const spot = {
  dark: '../assets/legal-spot-dark.webp',
  light: '../assets/legal-spot-light.webp',
}

const legalWeekTags = [
  '法律关系与民法典总则',
  '合同成立与借贷风险',
  '消费维权与网络交易',
  '个人信息与人格权',
  '网络安全与运营者义务',
  '备案资质与服务器合规',
  '数据安全与隐私处理',
  '内容审核与刑事红线',
  '合同审查与违约责任',
  '劳动权益与社保合规',
  '生活纠纷与维权路径',
  '刑法红线与维权边界',
  '网站合规自查实战',
  '合同批注与条款复盘',
  '案例笔记与知识地图',
  '律师沟通与最终验收',
]

const filteredWeeks = computed(() => {
  const q = query.value.trim().toLowerCase()
  return legalWeeks.filter((week) => {
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

function toggleWeek(id: number) {
  openWeekId.value = openWeekId.value === id ? null : id
}

function toggleCompliance(id: string) {
  openComplianceId.value = openComplianceId.value === id ? null : id
}

function scrollToWeek(id: number) {
  document.getElementById(`legal-week-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      title="法律学习"
      subtitle="实用法律计划，覆盖互联网合规、备案资质与日常生活防坑"
      :banner="banner"
      :spot="spot"
      compact
    >
      <template #actions>
        <span class="tiny">当前：{{ legalPhaseForWeek(currentLegalWeek) }} · 第{{ currentLegalWeek }}周</span>
      </template>
    </ModuleHeader>

    <div class="page-section">
      <div class="panel panel-pad">
        <div class="legal-timeline">
          <div
            v-for="week in legalWeeks"
            :key="week.id"
            class="lt"
            :class="{ done: weekDone(week).done === weekDone(week).total, active: openWeekId === week.id }"
            @click="scrollToWeek(week.id)"
          >
            <div class="lt-dot" :style="{ borderColor: week.color }">
              {{ weekDone(week).percent === 100 ? '✓' : week.id }}
            </div>
            <b>第 {{ week.id }} 周</b>
            <small>{{ legalWeekTags[week.id - 1] }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="search-row">
        <input v-model="query" class="control" type="search" placeholder="搜索周次、主题、任务…" />
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
            <div class="week-side">
              <div class="week-goal">
                <b>本周目标</b>
                <span>{{ week.objective }}</span>
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
          </div>
          <div v-show="openWeekId === week.id" class="week-body">
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
      <div class="resource-grid">
        <article v-for="checklist in legalChecklists" :key="checklist.id" class="resource-card">
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

    <div v-else-if="activeTab === 'compliance'" class="page-section">
      <div class="section-head">
        <div>
          <h2>互联网合规速查</h2>
          <p>先判断业务类型，再办理对应备案或许可证</p>
        </div>
      </div>
      <div class="compliance-quick-grid">
        <div v-for="item in legalComplianceQuick" :key="item.id" class="compliance-quick-card">
          <ShieldCheck :size="18" />
          <div>
            <b>{{ item.title }}</b>
            <span>{{ item.text }}</span>
            <small>{{ item.ref }}</small>
          </div>
        </div>
      </div>

      <div class="disclaimer">{{ complianceDisclaimer }}</div>

      <div class="section-head">
        <div>
          <h2>备案与资质对比</h2>
          <p>一句话区分适用场景</p>
        </div>
      </div>
      <div class="panel panel-pad table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>一句话</th>
              <th>适用场景</th>
              <th>主体</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in complianceLicenses" :key="item.id">
              <td><strong>{{ item.name }}</strong></td>
              <td>{{ item.kind }}</td>
              <td>{{ item.short }}</td>
              <td>{{ item.scenario }}</td>
              <td>{{ item.subject }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="page-section accordion">
        <article
          v-for="item in complianceLicenses"
          :key="item.id"
          class="compliance-card"
          :style="{ '--comp': item.color }"
        >
          <button class="compliance-head" type="button" @click="toggleCompliance(item.id)">
            <span class="kind-badge">{{ item.kind }}</span>
            <div>
              <h2>{{ item.name }}</h2>
              <p>{{ item.short }}</p>
            </div>
            <ChevronDown
              :size="20"
              :style="{ transform: openComplianceId === item.id ? 'rotate(180deg)' : 'none' }"
            />
          </button>
          <div v-if="openComplianceId === item.id" class="compliance-body">
            <div class="detail-grid">
              <div class="detail-block">
                <h3>适用场景</h3>
                <p>{{ item.scenario }}</p>
              </div>
              <div class="detail-block">
                <h3>主体限制</h3>
                <p>{{ item.subject }}</p>
              </div>
              <div class="detail-block">
                <h3>审批机构</h3>
                <p>{{ item.authority }}</p>
              </div>
              <div class="detail-block">
                <h3>预计时限</h3>
                <p>{{ item.timeline }}</p>
              </div>
              <div class="detail-block">
                <h3>关键条件</h3>
                <ul>
                  <li v-for="condition in item.conditions" :key="condition">{{ condition }}</li>
                </ul>
              </div>
              <div class="detail-block">
                <h3>材料清单</h3>
                <ul>
                  <li v-for="material in item.materials" :key="material">{{ material }}</li>
                </ul>
              </div>
              <div class="detail-block full-width">
                <h3>办理步骤</h3>
                <ol class="step-list">
                  <li v-for="(step, index) in item.steps" :key="step.name">
                    <strong>{{ index + 1 }}. {{ step.name }}</strong>
                    <br />
                    {{ step.detail }}
                  </li>
                </ol>
              </div>
              <div class="detail-block full-width">
                <h3>常见坑</h3>
                <ul>
                  <li v-for="pitfall in item.pitfalls" :key="pitfall">{{ pitfall }}</li>
                </ul>
              </div>
            </div>
          </div>
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
.tab-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
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

.compliance-quick-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 11px;
  margin-bottom: 16px;
}

.compliance-quick-card {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel2);
  padding: 12px;
  color: var(--accent);
}

.compliance-quick-card > div {
  min-width: 0;
}

.compliance-quick-card b {
  display: block;
  color: var(--text);
  font-size: 0.88rem;
  margin-bottom: 4px;
}

.compliance-quick-card span,
.compliance-quick-card small {
  display: block;
  color: var(--muted);
  line-height: 1.5;
}

.compliance-quick-card span {
  font-size: 0.8rem;
}

.compliance-quick-card small {
  font-size: 0.7rem;
  margin-top: 4px;
  color: var(--accent);
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

.legal-timeline {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 8px 10px;
  position: relative;
}

.legal-timeline::before {
  content: '';
  position: absolute;
  left: 5%;
  right: 5%;
  top: 22px;
  height: 2px;
  background: var(--line);
}

.legal-timeline::after {
  content: '';
  position: absolute;
  left: 5%;
  right: 5%;
  top: 113px;
  height: 2px;
  background: var(--line);
}

.lt {
  text-align: center;
  cursor: pointer;
  min-width: 0;
  position: relative;
  z-index: 1;
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
  position: relative;
  z-index: 1;
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

.resource-grid,
.template-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.resource-card,
.template-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
  padding: 17px;
  min-width: 0;
}

.resource-card h3,
.template-card h3 {
  margin: 0;
  font-size: 1.02rem;
}

.resource-card > p,
.template-card > p {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.6;
}

.resource-card ul {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.7;
}

.resource-card ul small {
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

  .compliance-quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .resource-grid,
  .template-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .legal-timeline::before,
  .legal-timeline::after {
    display: none;
  }

  .tab-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

@media (max-width: 560px) {
  .legal-timeline {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .compliance-quick-grid {
    grid-template-columns: 1fr;
  }

  .lt-dot {
    width: 42px;
    height: 42px;
  }
}
</style>
