<script setup lang="ts">
import { computed, ref } from 'vue'
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

const weekTotal = weekTaskIds.length
const softwareTotal = softwareTaskIds.length
const legalTotal = legalTaskIds.length

const weekPercent = weekTotal ? Math.round((weekDoneCount.value / weekTotal) * 100) : 0
const softwarePercent = softwareTotal ? Math.round((softwareDoneCount.value / softwareTotal) * 100) : 0
const legalPercent = legalTotal ? Math.round((legalDoneCount.value / legalTotal) * 100) : 0

const progressLines = computed(() => [
  { label: '路径规划', done: weekDoneCount.value, total: weekTotal, percent: weekPercent },
  { label: '软件工程', done: softwareDoneCount.value, total: softwareTotal, percent: softwarePercent },
  { label: '法律学习', done: legalDoneCount.value, total: legalTotal, percent: legalPercent },
])

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

function clearProgress() {
  if (window.confirm('确认清空全部学习进度？')) {
    resetProgress()
    message.value = '已清空'
  }
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
        <small>12 周路径规划</small>
      </div>
      <div class="stat-card">
        <strong>{{ softwareDoneCount }}</strong>
        <span>工程任务</span>
        <small>软件工程清单</small>
      </div>
      <div class="stat-card">
        <strong>{{ legalDoneCount }}</strong>
        <span>法律任务</span>
        <small>{{ legalTotal }} 项总任务</small>
      </div>
    </div>

    <div class="page-section settings-overview">
      <section class="panel panel-pad">
        <h2>学习线进度</h2>
        <div class="settings-progress-list">
          <div v-for="line in progressLines" :key="line.label" class="settings-progress-row">
            <span>{{ line.label }}</span>
            <div class="bar"><i :style="{ width: `${line.percent}%` }"></i></div>
            <small>{{ line.done }} / {{ line.total }}</small>
          </div>
        </div>
      </section>

      <section class="panel panel-pad">
        <h2>主题</h2>
        <p class="tiny">深色适合夜间阅读，浅色适合日间阅读。</p>
        <div class="theme-switch" :class="state.theme">
          <span class="theme-thumb" aria-hidden="true"></span>
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
        </div>
        <div class="theme-preview" :class="state.theme">
          <div class="preview-bar"></div>
          <div class="preview-body">
            <div class="preview-side"></div>
            <div class="preview-main">
              <div class="preview-card preview-card-wide"></div>
              <div class="preview-card-row">
                <div class="preview-card"></div>
                <div class="preview-card"></div>
              </div>
            </div>
          </div>
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
          <button class="danger-button" type="button" @click="clearProgress">清空进度</button>
        </div>
      </section>
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

.settings-overview {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 15px;
  margin-top: 26px;
}

.settings-progress-list {
  display: grid;
  gap: 14px;
  margin-top: 14px;
}

.settings-progress-row {
  display: grid;
  grid-template-columns: 82px 1fr 70px;
  gap: 10px;
  align-items: center;
  color: var(--muted);
  font-size: 0.82rem;
}

.settings-progress-row .bar {
  margin: 0;
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

.theme-switch.light .theme-thumb {
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

.theme-preview {
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg2);
}

.preview-bar {
  height: 18px;
  border-bottom: 1px solid var(--line);
  background: var(--panel);
}

.preview-body {
  display: grid;
  grid-template-columns: 64px 1fr;
  min-height: 120px;
}

.preview-side {
  border-right: 1px solid var(--line);
  background: var(--panel);
}

.preview-main {
  display: grid;
  gap: 10px;
  padding: 14px;
}

.preview-card {
  height: 30px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--panel);
}

.preview-card-wide {
  height: 42px;
  border-color: rgba(110, 231, 255, 0.35);
  background: linear-gradient(90deg, rgba(110, 231, 255, 0.12), rgba(139, 124, 255, 0.08));
}

.preview-card-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.primary-button,
.ghost-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

@media (max-width: 1120px) {
  .settings-overview {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .settings-progress-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
