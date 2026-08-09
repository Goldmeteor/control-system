<script setup lang="ts">
import { computed, ref } from 'vue'
import { softwareCategories, softwarePriorities } from '../data/software'
import { state, toggleTask } from '../store'
import type { SoftwareCategory } from '../types'

const query = ref('')
const activeCategory = ref('all')

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
    <div class="section-head">
      <div>
        <h1>软件工程清单</h1>
        <p>专业地基、全栈开发、部署安全、备案合规与工程素养</p>
      </div>
    </div>

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
