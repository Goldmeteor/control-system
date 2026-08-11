<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProgressRing from '../components/ProgressRing.vue'
import { softwarePriorities } from '../data/software'
import { weekPhases, weeks } from '../data/weeks'
import {
  doneCount,
  legalDoneCount,
  legalTotalCount,
  percent,
  softwareDoneCount,
  totalCount,
  weekDoneCount,
} from '../store'

const start = new Date('2026-08-10T00:00:00+08:00')
const currentWeek = computed(() => {
  const diff = Math.floor((Date.now() - start.getTime()) / 604800000) + 1
  return diff < 1 ? 0 : diff > 12 ? 13 : diff
})

const phaseCounts = computed(() =>
  weekPhases.map((phase) => ({
    ...phase,
    count: weeks.filter((week) => week.phase === phase.id).length,
  })),
)
</script>

<template>
  <div class="page-section">
    <div class="section-head">
      <div>
        <h1>学习总览</h1>
        <p>12 周双主线：路径规划科研 + 软件工程与合规</p>
      </div>
      <span class="tiny">当前：Week {{ currentWeek === 13 ? '12 已完成' : currentWeek || '未开始' }}</span>
    </div>

    <div class="page-hero-row">
      <div class="visual-banner dashboard" aria-hidden="true"></div>
      <div class="spot-tile dashboard-spot" aria-hidden="true"></div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <strong>{{ totalCount }}</strong>
        <span>总任务</span>
        <small>路径规划 + 软件工程 + 法律学习</small>
      </div>
      <div class="stat-card">
        <strong>{{ doneCount }}</strong>
        <span>已完成</span>
        <small>整体完成度 {{ percent }}%</small>
      </div>
      <div class="stat-card">
        <strong>{{ weekDoneCount }}</strong>
        <span>科研任务</span>
        <small>12 周路线主线任务</small>
      </div>
      <div class="stat-card">
        <strong>{{ softwareDoneCount }}</strong>
        <span>工程任务</span>
        <small>软件工程清单勾选项</small>
      </div>
      <div class="stat-card">
        <strong>{{ legalDoneCount }}</strong>
        <span>法律任务</span>
        <small>已勾选 {{ legalDoneCount }} / {{ legalTotalCount }}</small>
      </div>
    </div>

    <div class="page-section">
      <div class="progress-panel panel">
        <ProgressRing :percent="percent" label="总进度" />
        <div class="progress-copy">
          <h3>{{ percent >= 100 ? '路线完成' : percent >= 75 ? '进入收敛阶段' : percent >= 40 ? '实验闭环成形中' : percent > 0 ? '基础能力构建中' : '准备出发' }}</h3>
          <p>
            每周同时推进科研主线和工程素养副线；第 9-12 周集中全栈、部署与备案合规。
            法律学习作为独立 16 周模块并行推进。
          </p>
          <div class="bar"><i :style="{ width: `${percent}%` }"></i></div>
          <div class="tiny">已完成 {{ doneCount }} / {{ totalCount }} 项</div>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>12 周时间线</h2>
          <p>点击节点进入逐周任务清单</p>
        </div>
      </div>
      <div class="panel panel-pad">
        <div class="timeline">
          <div
            v-for="week in weeks"
            :key="week.id"
            class="tl"
            :class="{ done: false, active: currentWeek === week.id }"
            @click="$router.push('/roadmap')"
          >
            <div class="tl-dot" :style="{ borderColor: week.color }">{{ week.id }}</div>
            <b>Week {{ week.id }}</b>
            <small>{{ week.date }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>模块分布</h2>
          <p>五个主模块共同组成学习管理系统</p>
        </div>
      </div>
      <div class="stat-grid">
        <RouterLink to="/roadmap" class="stat-card">
          <strong>12 周</strong>
          <span>双主线路线</span>
          <small>科研任务 + 软件工程副线</small>
        </RouterLink>
        <RouterLink to="/software" class="stat-card">
          <strong>5 类</strong>
          <span>软件工程清单</span>
          <small>地基、全栈、安全、合规、素养</small>
        </RouterLink>
        <RouterLink to="/compliance" class="stat-card">
          <strong>5 项</strong>
          <span>备案与资质</span>
          <small>ICP、EDI、ISP、公安备案</small>
        </RouterLink>
        <RouterLink to="/legal" class="stat-card">
          <strong>16 周</strong>
          <span>法律学习</span>
          <small>互联网合规 + 日常生活防坑</small>
        </RouterLink>
        <RouterLink to="/settings" class="stat-card">
          <strong>1 份</strong>
          <span>进度数据</span>
          <small>本地保存与 JSON 导入导出</small>
        </RouterLink>
      </div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>阶段分布</h2>
          <p>算法基石到安全合规的推进顺序</p>
        </div>
      </div>
      <div class="stat-grid">
        <div v-for="phase in phaseCounts" :key="phase.id" class="stat-card">
          <strong>{{ phase.count }} 周</strong>
          <span>{{ phase.label }}</span>
          <small>按阶段控制学习重心</small>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>软件工程优先级</h2>
          <p>时间有限时按此顺序投入</p>
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
.visual-banner.dashboard {
  --banner-image: url('../assets/dashboard-visual.webp');
  --banner-image-light: url('../assets/dashboard-visual-light.webp');
}

.dashboard-spot {
  --spot-image: url('../assets/spot-dashboard.webp');
  --spot-image-light: url('../assets/spot-dashboard-light.webp');
}
</style>

