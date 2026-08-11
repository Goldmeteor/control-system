<script setup lang="ts">
import { ref } from 'vue'
import { Download, Moon, Sun, Upload } from '@lucide/vue'
import ModuleHeader from '../components/ModuleHeader.vue'
import { exportJson, importJson, resetProgress, setTheme, state } from '../store'

const fileInput = ref<HTMLInputElement>()
const message = ref('')
const showClearConfirm = ref(false)

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
      subtitle="进度数据与本地存储管理"
    />

    <div class="page-section settings-grid">
      <section class="panel panel-pad settings-cell">
        <h2>主题</h2>
        <p class="tiny">深色适合夜间阅读，浅色适合日间阅读。</p>
        <div class="theme-switch" :class="state.theme">
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
          </button>
        </div>
      </section>

      <section class="panel panel-pad settings-cell">
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

      <section class="panel panel-pad settings-cell">
        <h2>数据说明</h2>
        <ul class="muted-list">
          <li>存储键：learning-hub-v1</li>
          <li>结构：版本、完成项、折叠项、主题、筛选</li>
          <li>导入前校验版本与必填字段</li>
        </ul>
      </section>

      <section class="panel panel-pad settings-cell">
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

.primary-button,
.ghost-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.settings-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.settings-cell {
  min-height: 230px;
  display: flex;
  flex-direction: column;
}

.theme-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--panel2);
  padding: 4px;
  margin: 14px 0 0;
}

.theme-option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
  min-height: 0;
  padding: 10px 14px;
  color: var(--muted);
  border: 0;
  border-radius: 8px;
  background: transparent;
  font-weight: 700;
}

.theme-option span {
  font-size: 0.88rem;
}

.theme-option.active {
  color: #06111f;
  background: linear-gradient(135deg, var(--accent2), var(--accent));
  box-shadow: 0 5px 16px rgba(110, 231, 255, 0.16);
}

.settings-cell .action-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.settings-cell .action-row button {
  width: 100%;
  justify-content: center;
}

@media (max-width: 860px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
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
