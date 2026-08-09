<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {
  ClipboardList,
  LayoutDashboard,
  Moon,
  Route,
  Settings,
  ShieldCheck,
  Sun,
} from '@lucide/vue'
import { setTheme, state } from './store'

const route = useRoute()

const navItems = [
  { to: '/', label: '总览', icon: LayoutDashboard },
  { to: '/roadmap', label: '12周路线', icon: Route },
  { to: '/software', label: '软件工程', icon: ClipboardList },
  { to: '/compliance', label: '备案合规', icon: ShieldCheck },
  { to: '/settings', label: '数据', icon: Settings },
]

const pageTitle = computed(() => {
  const item = navItems.find((nav) => nav.to === route.path)
  return item?.label ?? '学习管理'
})

onMounted(() => setTheme(state.theme))
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-mark">
        <div class="brand-icon">LH</div>
        <div>
          <strong>Learning Hub</strong>
          <small>12 周双主线</small>
        </div>
      </div>
      <nav class="side-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="side-link"
        >
          <component :is="item.icon" :size="19" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <button class="theme-toggle" type="button" @click="setTheme(state.theme === 'dark' ? 'light' : 'dark')">
        <Sun v-if="state.theme === 'dark'" :size="18" />
        <Moon v-else :size="18" />
        <span>{{ state.theme === 'dark' ? '浅色' : '深色' }}</span>
      </button>
    </aside>

    <div class="main-column">
      <header class="topbar">
        <div class="mobile-brand">Learning Hub</div>
        <div class="page-title">{{ pageTitle }}</div>
        <div class="topbar-actions">
          <RouterLink to="/settings" class="icon-button" aria-label="数据">
            <Settings :size="18" />
          </RouterLink>
        </div>
      </header>
      <nav class="mobile-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-link"
        >
          <component :is="item.icon" :size="17" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
