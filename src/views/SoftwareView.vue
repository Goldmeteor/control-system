<script setup lang="ts">
import { computed, ref } from 'vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import { softwareCategories, softwarePriorities } from '../data/software'
import { state, toggleTask } from '../store'
import type { SoftwareCategory } from '../types'

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

const query = ref('')
const activeCategory = ref('all')

const banner = {
  dark: '../assets/software-hero-dark.webp',
  light: '../assets/software-hero-light.webp',
}

const spot = {
  dark: '../assets/software-spot-dark.webp',
  light: '../assets/software-spot-light.webp',
}

const filteredCategories = computed(() => {
  const q = query.value.trim().toLowerCase()
  return softwareCategories
    .filter((category) => activeCategory.value === 'all' || category.id === activeCategory.value)
    .map((category) => {
      if (!q) return category
      return {
        ...category,
        sections: category.sections
          .map((section) => ({
            ...section,
            items: section.items.filter((item) => item.toLowerCase().includes(q)),
          }))
          .filter((section) => section.items.length > 0),
      }
    })
    .filter((category) => category.sections.length > 0)
})

function taskId(categoryIndex: number, sectionIndex: number, itemIndex: number) {
  return `s${categoryIndex}-g${sectionIndex}-t${itemIndex}`
}

function categoryStats(categoryIndex: number, category: SoftwareCategory) {
  const total = category.sections.reduce((sum, section) => sum + section.items.length, 0)
  const done = category.sections.reduce(
    (sum, section, sectionIndex) =>
      sum + section.items.filter((_, itemIndex) => state.done.includes(taskId(categoryIndex, sectionIndex, itemIndex))).length,
    0,
  )
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
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
        <span class="tiny">当前：{{ currentPhase }} · Week {{ currentWeek }}</span>
      </template>
    </ModuleHeader>

    <div class="search-row">
      <input v-model="query" class="control" type="search" placeholder="搜索课程、技能、项目…" />
      <select
        class="control"
        :value="activeCategory"
        @change="activeCategory = ($event.target as HTMLSelectElement).value"
      >
        <option value="all">全部分类</option>
        <option v-for="category in softwareCategories" :key="category.id" :value="category.id">
          {{ category.title }}
        </option>
      </select>
    </div>

    <div class="page-section software-info-grid">
      <div class="stat-card">
        <strong>{{ currentPhase }}</strong>
        <span>当前阶段</span>
        <small>软件工程副线按 12 周节奏推进</small>
      </div>
      <div class="stat-card">
        <strong>1. {{ softwarePriorities[0] }}</strong>
        <span>首要优先级</span>
        <small>时间有限时先补地基，再做产出型项目</small>
      </div>
    </div>

    <div class="page-section category-grid">
      <section
        v-for="(category, categoryIndex) in filteredCategories"
        :key="category.id"
        class="category-card"
      >
        <div class="category-head">
          <div>
            <h2>{{ category.title }}</h2>
            <p>{{ category.description }}</p>
          </div>
          <span class="priority-pill">{{ category.priority ?? `${categoryStats(categoryIndex, category).done}/${categoryStats(categoryIndex, category).total} 项` }}</span>
        </div>
        <div class="soft-sections">
          <div v-for="(section, sectionIndex) in category.sections" :key="section.name" class="soft-section">
            <h3>{{ section.name }}</h3>
            <label
              v-for="(item, itemIndex) in section.items"
              :key="item"
              class="soft-task"
              :class="{ checked: state.done.includes(taskId(categoryIndex, sectionIndex, itemIndex)) }"
            >
              <input
                type="checkbox"
                :checked="state.done.includes(taskId(categoryIndex, sectionIndex, itemIndex))"
                @change="toggleTask(taskId(categoryIndex, sectionIndex, itemIndex))"
              />
              <span>{{ item }}</span>
            </label>
          </div>
        </div>
      </section>
      <div v-if="filteredCategories.length === 0" class="empty-state">没有匹配内容</div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>总优先级</h2>
          <p>时间有限时按此顺序推进</p>
        </div>
      </div>
      <div class="panel panel-pad">
        <ul class="muted-list">
          <li v-for="item in softwarePriorities" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.software-info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;
  margin-top: 0;
}

.software-info-grid .stat-card strong {
  font-size: 1.12rem;
  line-height: 1.35;
}

.category-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.category-grid .soft-sections {
  grid-template-columns: 1fr;
}

@media (max-width: 1120px) {
  .category-grid {
    grid-template-columns: 1fr;
  }

  .category-grid .soft-sections {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .software-info-grid {
    grid-template-columns: 1fr;
  }

  .category-grid .soft-sections {
    grid-template-columns: 1fr;
  }
}
</style>
