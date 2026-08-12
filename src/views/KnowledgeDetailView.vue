<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ExternalLink } from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import { findKnowledgeItem, findKnowledgeTabForItem } from '../data/knowledgeBase'

const route = useRoute()
const router = useRouter()

const item = computed(() => findKnowledgeItem(String(route.params.id ?? '')))
const activeTab = computed(() => String(route.query.tab ?? findKnowledgeTabForItem(item.value?.id ?? '')))
const searchQuery = computed(() => String(route.query.q ?? ''))

function goBack() {
  router.push({
    path: '/knowledge-base',
    query: { tab: activeTab.value, q: searchQuery.value },
  })
}

const reason = computed(() => {
  if (!item.value) return ''
  if (activeTab.value === 'commands') return `这是 ${item.value.title} 的常用写法，掌握后能提升终端操作效率。`
  if (activeTab.value === 'resources') return `这是学习 ${item.value.title} 的权威来源，建议优先阅读官方文档。`
  if (activeTab.value === 'misc') return `这个知识点容易混淆，理解后能避免在选型和设计中踩坑。`
  return `${item.value.title} 是技术体系中的基础概念，理解它有助于串联相邻知识点。`
})
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      :title="item?.title ?? '未找到该知识点'"
      :subtitle="item ? '知识库详情' : '请返回知识库重新选择'"
    >
      <template #actions>
        <button class="ghost-button" type="button" @click="goBack">
          <ArrowLeft :size="17" />
          返回知识库
        </button>
      </template>
    </ModuleHeader>

    <div v-if="item" class="page-section detail-layout">
      <section class="panel panel-pad detail-card">
        <h2>定义</h2>
        <p>{{ item.text }}</p>
      </section>

      <section class="panel panel-pad detail-card">
        <h2>为什么重要</h2>
        <p>{{ reason }}</p>
      </section>

      <section class="panel panel-pad detail-card">
        <h2>怎么用</h2>
        <p v-if="item.link">这个条目有官方资源，点击下方按钮直接访问。</p>
        <p v-else-if="item.ref">{{ item.ref }}</p>
        <p v-else>暂无额外使用说明，先理解定义即可。</p>
        <a
          v-if="item.link"
          :href="item.link"
          target="_blank"
          rel="noreferrer"
          class="primary-button"
        >
          <ExternalLink :size="17" />
          打开官方链接
        </a>
      </section>

      <section
        v-for="section in item.detail ?? []"
        :key="section.heading"
        class="panel panel-pad detail-card"
      >
        <h2>{{ section.heading }}</h2>
        <ul>
          <li v-for="line in section.content" :key="line">{{ line }}</li>
        </ul>
      </section>
    </div>

    <div v-else class="page-section">
      <div class="disclaimer">未找到该知识点，请返回知识库重新选择。</div>
    </div>
  </div>
</template>

<style scoped>
.detail-layout {
  display: grid;
  gap: 14px;
}

.detail-card {
  min-width: 0;
}

.detail-card h2 {
  margin: 0 0 10px;
  font-size: 1.05rem;
  color: var(--accent);
}

.detail-card p,
.detail-card li {
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.75;
}

.detail-card ul {
  margin: 0;
  padding-left: 20px;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  border-radius: 9px;
  padding: 10px 14px;
  font-weight: 700;
  color: #06111f;
  background: linear-gradient(135deg, var(--accent2), var(--accent));
}

.ghost-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--panel2);
  padding: 10px 14px;
  font-weight: 700;
}
</style>
