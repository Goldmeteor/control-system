<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Search } from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import {
  knowledgeGroupMap,
  knowledgeGroupOrder,
  knowledgeItems,
  knowledgeTabs,
} from '../data/knowledgeBase'
import type { KnowledgeItem } from '../data/knowledgeBase'

const route = useRoute()
const activeTab = ref(route.query.tab ? String(route.query.tab) : 'terms')
const query = ref(route.query.q ? String(route.query.q) : '')

watch(
  () => route.query,
  (next) => {
    if (next.tab && knowledgeTabs.some((tab) => tab.id === next.tab)) {
      activeTab.value = String(next.tab)
    }
    if (next.q !== undefined) query.value = String(next.q)
  },
)

const filteredItems = computed(() => {
  const q = query.value.trim().toLowerCase()
  const items = knowledgeItems[activeTab.value] ?? []
  if (!q) return items
  return items.filter((item) =>
    [item.title, item.text, item.ref ?? ''].join(' ').toLowerCase().includes(q),
  )
})

const groupedItems = computed(() => {
  const map = new Map<string, KnowledgeItem[]>()
  for (const item of filteredItems.value) {
    const group = knowledgeGroupMap[item.id] ?? '其他'
    if (!map.has(group)) map.set(group, [])
    map.get(group)?.push(item)
  }
  return [...map.entries()]
    .map(([name, items]) => ({ name, items }))
    .sort((a, b) => {
      const ai = knowledgeGroupOrder.indexOf(a.name)
      const bi = knowledgeGroupOrder.indexOf(b.name)
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi)
    })
})
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      title="知识库"
      subtitle="术语、命令、资源和杂项知识的速查手册"
    />

    <div class="page-section">
      <div class="search-row">
        <Search :size="18" />
        <input v-model="query" class="control" type="search" placeholder="搜索术语、命令、资源…" />
      </div>
    </div>

    <div class="page-section">
      <div class="tab-row">
        <button
          v-for="tab in knowledgeTabs"
          :key="tab.id"
          type="button"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span>{{ tab.label }}</span>
        </button>
      </div>
      <p class="tiny tab-note">{{ knowledgeTabs.find((tab) => tab.id === activeTab)?.description }}</p>
    </div>

    <div class="page-section">
      <section v-for="group in groupedItems" :key="group.name" class="knowledge-group">
        <div class="section-head">
          <div>
            <h2>{{ group.name }}</h2>
          </div>
        </div>
        <div class="knowledge-grid">
          <RouterLink
            v-for="item in group.items"
            :key="item.id"
            :to="{ name: 'knowledge-detail', params: { id: item.id }, query: { tab: activeTab, q: query } }"
            class="knowledge-card knowledge-link"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <small v-if="item.ref">{{ item.ref }}</small>
            <span class="card-hint">点击卡片查看详情</span>
          </RouterLink>
        </div>
      </section>
    </div>

    <div v-if="groupedItems.length === 0" class="empty-state">没有匹配内容</div>
  </div>
</template>

<style scoped>
.search-row {
  display: flex;
  align-items: center;
  color: var(--muted);
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

.tab-note {
  margin-top: 10px;
}

.knowledge-group {
  margin-bottom: 24px;
}

.knowledge-group .section-head {
  margin-bottom: 10px;
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
}

.knowledge-card {
  display: block;
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
  padding: 15px;
}

.knowledge-link {
  text-decoration: none;
  transition: 0.18s;
}

.knowledge-link:hover {
  border-color: rgba(110, 231, 255, 0.45);
  background: rgba(110, 231, 255, 0.07);
  transform: translateY(-2px);
}

.knowledge-card h3 {
  margin: 0 0 6px;
  font-size: 1rem;
}

.knowledge-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.83rem;
  line-height: 1.6;
}

.knowledge-card small {
  display: block;
  margin-top: 8px;
  color: var(--accent);
  font-size: 0.74rem;
}

.card-hint {
  display: inline-block;
  margin-top: 10px;
  color: var(--yellow);
  font-size: 0.74rem;
  font-weight: 700;
}

@media (max-width: 1120px) {
  .knowledge-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .tab-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .knowledge-grid {
    grid-template-columns: 1fr;
  }
}
</style>
