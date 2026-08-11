<script setup lang="ts">
import { ref } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import {
  doneCount,
  exportJson,
  importJson,
  legalDoneCount,
  legalTotalCount,
  resetProgress,
  setTheme,
  softwareDoneCount,
  state,
  totalCount,
  weekDoneCount,
} from '../store'

const fileInput = ref<HTMLInputElement>()
const message = ref('')

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
    <div class="section-head">
      <div>
        <h1>数据与设置</h1>
        <p>进度保存在当前浏览器，可导出或导入 JSON</p>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <strong>{{ doneCount }}</strong>
        <span>已完成</span>
        <small>{{ totalCount }} 项总任务</small>
      </div>
      <div class="stat-card">
        <strong>{{ weekDoneCount }}</strong>
        <span>科研任务</span>
        <small>12 周路线</small>
      </div>
      <div class="stat-card">
        <strong>{{ softwareDoneCount }}</strong>
        <span>工程任务</span>
        <small>软件工程清单</small>
      </div>
      <div class="stat-card">
        <strong>{{ legalDoneCount }}</strong>
        <span>法律任务</span>
        <small>{{ legalTotalCount }} 项总任务</small>
      </div>
      <div class="stat-card">
        <strong>{{ state.theme === 'dark' ? '深色' : '浅色' }}</strong>
        <span>当前主题</span>
        <small>本地保存</small>
      </div>
    </div>

    <div class="page-section settings-grid">
      <section class="panel panel-pad">
        <h2>进度数据</h2>
        <p class="tiny">导出完整进度文件，或导入先前备份。</p>
        <div class="action-row">
          <button class="primary-button" type="button" @click="exportJson">导出 JSON</button>
          <button class="ghost-button" type="button" @click="fileInput?.click()">导入 JSON</button>
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
        <h2>主题</h2>
        <p class="tiny">深色科技风与浅色阅读模式。</p>
        <div class="action-row">
          <button class="ghost-button" type="button" @click="setTheme('dark')">
            <Moon :size="17" />
            深色
          </button>
          <button class="ghost-button" type="button" @click="setTheme('light')">
            <Sun :size="17" />
            浅色
          </button>
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
</style>
