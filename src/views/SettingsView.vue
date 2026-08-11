<script setup lang="ts">
import { ref } from 'vue'
import { Download, Moon, Sun, Upload } from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import {
  doneCount,
  exportJson,
  importJson,
  legalDoneCount,
  legalTaskIds,
  resetProgress,
  setTheme,
  softwareDoneCount,
  softwareTaskIds,
  state,
  totalCount,
  weekDoneCount,
  weekTaskIds,
} from '../store'

const fileInput = ref<HTMLInputElement>()
const message = ref('')
const showClearConfirm = ref(false)

const weekTotal = weekTaskIds.length
const softwareTotal = softwareTaskIds.length
const legalTotal = legalTaskIds.length

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const ok = importJson(String(reader.result ?? ''))
    message.value = ok ? '导入成功' : '文件格式无效'
  }
  reader.readAsText(file)
}

function askClear() {
  showClearConfirm.value = true
}

function cancelClear() {
  showClearConfirm.value = false
}

function confirmClear() {
  resetProgress()
  message.value = '已清空'
  showClearConfirm.value = false
}
</script>

<template>
  <div class="page-section">
    <ModuleHeader
      title="设置"
      subtitle="主题、进度数据与本地存储管理"
    >
      <template #actions>
        <span class="tiny">当前：{{ state.theme === 'dark' ? '深色模式' : '浅色模式' }}</span>
      </template>
    </ModuleHeader>

    <div class="stat-grid">
      <div class="stat-card">
        <strong>{{ doneCount }}</strong>
        <span>已完成</span>
        <small>{{ totalCount }} 项总任务</small>
      </div>
      <div class="stat-card">
        <strong>{{ weekDoneCount }}</strong>
        <span>科研任务</span>
        <small>已勾选 {{ weekDoneCount }} / {{ weekTotal }}</small>
      </div>
      <div class="stat-card">
        <strong>{{ softwareDoneCount }}</strong>
        <span>工程任务</span>
        <small>已勾选 {{ softwareDoneCount }} / {{ softwareTotal }}</small>
      </div>
      <div class="stat-card">
        <strong>{{ legalDoneCount }}</strong>
        <span>法律任务</span>
        <small>{{ legalTotal }} 项总任务</small>
      </div>
    </div>

    <div class="page-section">
      <section class="panel panel-pad theme-panel">
        <h2>主题</h2>
        <p class="tiny">深色适合夜间阅读，浅色适合日间阅读。</p>
        <div class="theme-switch" :class="state.theme">
          <span class="theme-thumb" aria-hidden="true"></span>
          <button
            type="button"
            class="theme-option"
            :class="{ active: state.theme === 'light' }"
            :aria-pressed="state.theme === 'light'"
            title="浅色模式：适合日间阅读"
            @click="setTheme('light')"
          >
            <Sun :size="18" />
            <span>浅色</span>
            <small>日间</small>
          </button>
          <button
            type="button"
            class="theme-option"
            :class="{ active: state.theme === 'dark' }"
            :aria-pressed="state.theme === 'dark'"
            title="深色模式：适合夜间阅读"
            @click="setTheme('dark')"
          >
            <Moon :size="18" />
            <span>深色</span>
            <small>夜间</small>
          </button>
        </div>
      </section>
    </div>

    <div class="page-section settings-grid">
      <section class="panel panel-pad">
        <h2>进度数据</h2>
        <p class="tiny">导出完整进度文件，或导入先前备份。</p>
        <div class="action-row">
          <button class="primary-button" type="button" @click="exportJson">
            <Download :size="17" />
            导出 JSON
          </button>
          <button class="ghost-button" type="button" @click="fileInput?.click()">
            <Upload :size="17" />
            导入 JSON
          </button>
          <input
            ref="fileInput"
            class="hidden-input"
            type="file"
            accept="application/json"
            @change="onFileChange"
          />
        </div>
      </section>

      <section class="panel panel-pad">
        <h2>数据说明</h2>
        <ul class="muted-list">
          <li>存储键：learning-hub-v1</li>
          <li>结构：版本、完成项、折叠项、主题、筛选</li>
          <li>导入前校验版本与必填字段</li>
        </ul>
      </section>

      <section class="panel panel-pad">
        <h2>清空</h2>
        <p class="tiny">移除全部勾选状态与折叠设置。</p>
        <div class="action-row">
          <button class="danger-button" type="button" @click="askClear">清空进度</button>
        </div>
      </section>
    </div>

    <div v-if="showClearConfirm" class="clear-overlay" role="dialog" aria-modal="true">
      <div class="clear-dialog">
        <h2>确认清空进度？</h2>
        <p class="clear-warning">删除后无法恢复，所有勾选状态和折叠设置都会被移除。</p>
        <div class="action-row">
          <button class="ghost-button" type="button" @click="cancelClear">取消</button>
          <button class="danger-button" type="button" @click="confirmClear">确认清空</button>
        </div>
      </div>
    </div>

    <div v-if="message" class="page-section">
      <div class="disclaimer">{{ message }}</div>
    </div>
  </div>
</template>

<style scoped>
.hidden-input {
  display: none;
}

.theme-panel {
  max-width: 680px;
}

.theme-switch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel2);
  padding: 5px;
  margin: 14px 0 16px;
  overflow: hidden;
}

.theme-thumb {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  width: calc(50% - 5px);
  border-radius: 9px;
  background: linear-gradient(135deg, var(--accent2), var(--accent));
  box-shadow: 0 6px 18px rgba(110, 231, 255, 0.18);
  transition: transform 0.22s ease;
}

.theme-switch.dark .theme-thumb {
  transform: translateX(100%);
}

.theme-option {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-height: 58px;
  color: var(--muted);
  border: 0;
  border-radius: 9px;
  background: transparent;
}

.theme-option span {
  font-weight: 800;
  font-size: 0.9rem;
}

.theme-option small {
  font-size: 0.7rem;
}

.theme-option.active {
  color: #06111f;
}

.primary-button,
.ghost-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.clear-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(4, 10, 20, 0.68);
  backdrop-filter: blur(6px);
}

.clear-dialog {
  width: min(440px, 100%);
  border: 1px solid rgba(255, 123, 139, 0.45);
  border-radius: 14px;
  background: var(--panel);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
  padding: 22px;
}

.clear-dialog h2 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

.clear-warning {
  color: var(--red);
  font-weight: 700;
  line-height: 1.6;
  margin: 0 0 16px;
}

.clear-dialog .action-row {
  justify-content: flex-end;
}

@media (max-width: 720px) {
  .clear-dialog .action-row {
    justify-content: stretch;
  }

  .clear-dialog .action-row button {
    flex: 1;
  }
}
</style>
