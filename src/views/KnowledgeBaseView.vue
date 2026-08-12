<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import { knowledgeItems, knowledgeTabs } from '../data/knowledgeBase'

const activeTab = ref('terms')
const query = ref('')

const filteredItems = computed(() => {
  const q = query.value.trim().toLowerCase()
  const items = knowledgeItems[activeTab.value] ?? []
  if (!q) return items
  return items.filter((item) =>
    [item.title, item.text, item.ref ?? ''].join(' ').toLowerCase().includes(q),
  )
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

    <div class="page-section knowledge-grid">
      <article v-for="item in filteredItems" :key="item.title" class="knowledge-card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
        <small v-if="item.ref">{{ item.ref }}</small>
      </article>
    </div>

    <div v-if="filteredItems.length === 0" class="empty-state">没有匹配内容</div>
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

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
}

.knowledge-card {
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
  padding: 15px;
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
