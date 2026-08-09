<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { complianceDisclaimer, complianceLicenses } from '../data/compliance'

const openId = ref<string | null>('icp-record')

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="page-section">
    <div class="section-head">
      <div>
        <h1>备案与资质</h1>
        <p>ICP 备案、ICP 许可证、EDI、ISP 与公安联网备案完整流程</p>
      </div>
    </div>

    <div class="disclaimer">{{ complianceDisclaimer }}</div>

    <div class="page-section">
      <div class="section-head">
        <div>
          <h2>五类对比</h2>
          <p>一句话区分适用场景</p>
        </div>
      </div>
      <div class="panel panel-pad table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>一句话</th>
              <th>适用场景</th>
              <th>主体</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in complianceLicenses" :key="item.id">
              <td><strong>{{ item.name }}</strong></td>
              <td>{{ item.kind }}</td>
              <td>{{ item.short }}</td>
              <td>{{ item.scenario }}</td>
              <td>{{ item.subject }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="page-section accordion">
      <article
        v-for="item in complianceLicenses"
        :key="item.id"
        class="compliance-card"
        :style="{ '--comp': item.color }"
      >
        <button class="compliance-head" type="button" @click="toggle(item.id)">
          <span class="kind-badge">{{ item.kind }}</span>
          <div>
            <h2>{{ item.name }}</h2>
            <p>{{ item.short }}</p>
          </div>
          <ChevronDown
            :size="20"
            :style="{ transform: openId === item.id ? 'rotate(180deg)' : 'none' }"
          />
        </button>
        <div v-if="openId === item.id" class="compliance-body">
          <div class="detail-grid">
            <div class="detail-block">
              <h3>适用场景</h3>
              <p>{{ item.scenario }}</p>
            </div>
            <div class="detail-block">
              <h3>主体限制</h3>
              <p>{{ item.subject }}</p>
            </div>
            <div class="detail-block">
              <h3>审批机构</h3>
              <p>{{ item.authority }}</p>
            </div>
            <div class="detail-block">
              <h3>预计时限</h3>
              <p>{{ item.timeline }}</p>
            </div>
            <div class="detail-block">
              <h3>关键条件</h3>
              <ul>
                <li v-for="condition in item.conditions" :key="condition">{{ condition }}</li>
              </ul>
            </div>
            <div class="detail-block">
              <h3>材料清单</h3>
              <ul>
                <li v-for="material in item.materials" :key="material">{{ material }}</li>
              </ul>
            </div>
            <div class="detail-block full-width">
              <h3>办理步骤</h3>
              <ol class="step-list">
                <li v-for="(step, index) in item.steps" :key="step.name">
                  <strong>{{ index + 1 }}. {{ step.name }}</strong>
                  <br />
                  {{ step.detail }}
                </li>
              </ol>
            </div>
            <div class="detail-block full-width">
              <h3>常见坑</h3>
              <ul>
                <li v-for="pitfall in item.pitfalls" :key="pitfall">{{ pitfall }}</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
