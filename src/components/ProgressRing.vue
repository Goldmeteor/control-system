<script setup lang="ts">
defineProps<{
  percent: number
  label?: string
  color?: string
  size?: number
}>()
</script>

<template>
  <div
    class="progress-ring"
    :style="{
      width: `${size ?? 150}px`,
      height: `${size ?? 150}px`,
      background: `conic-gradient(${color ?? 'var(--green)'} ${percent}%, var(--line) 0)`,
    }"
  >
    <div class="ring-inner">
      <strong>{{ percent }}%</strong>
      <small v-if="label">{{ label }}</small>
    </div>
  </div>
</template>

<style scoped>
.progress-ring {
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto;
  position: relative;
}

.ring-inner {
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  border-radius: 50%;
  display: grid;
  place-content: center;
  text-align: center;
  background: var(--panel2);
}

.ring-inner strong {
  font-size: 1.8rem;
  line-height: 1;
}

.ring-inner small {
  color: var(--muted);
  margin-top: 5px;
}
</style>
