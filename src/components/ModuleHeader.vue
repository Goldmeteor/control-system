<script setup lang="ts">
import { computed } from 'vue'

interface Visual {
  dark: string
  light: string
}

const props = defineProps<{
  title: string
  subtitle?: string
  banner?: Visual
  spot?: Visual
  compact?: boolean
}>()

const assetMap = import.meta.glob('../assets/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function resolveAsset(path?: string) {
  if (!path) return undefined
  return assetMap[path] ?? path
}

const heroStyle = computed(() =>
  props.banner
    ? {
        '--banner-image-dark': `url(${resolveAsset(props.banner.dark)})`,
        '--banner-image-light': `url(${resolveAsset(props.banner.light)})`,
      }
    : undefined,
)

const spotStyle = computed(() =>
  props.spot
    ? {
        '--spot-image-dark': `url(${resolveAsset(props.spot.dark)})`,
        '--spot-image-light': `url(${resolveAsset(props.spot.light)})`,
      }
    : undefined,
)
</script>

<template>
  <div class="section-head module-head">
    <div class="module-head-copy">
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="module-head-actions">
      <slot name="actions" />
    </div>
  </div>

  <div v-if="banner && spot" class="page-hero-row module-visuals" :class="{ compact: compact }">
    <div class="visual-banner" :class="{ 'compact-hero': compact }" :style="heroStyle" aria-hidden="true"></div>
    <div class="spot-tile" :class="{ 'compact-spot': compact }" :style="spotStyle" aria-hidden="true"></div>
  </div>
</template>

<style scoped>
.module-head {
  align-items: center;
}

.module-head-copy {
  min-width: 0;
}

.module-head-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.module-visuals.compact {
  margin: 12px 0 24px;
}

.visual-banner.compact-hero {
  height: 96px;
}

.visual-banner {
  --banner-image: var(--banner-image-dark);
}

.spot-tile.compact-spot {
  flex: 0 0 96px;
  height: 96px;
}

.spot-tile {
  --spot-image: var(--spot-image-dark);
}

:root[data-theme='light'] .visual-banner {
  --banner-image: var(--banner-image-light);
}

:root[data-theme='light'] .spot-tile {
  --spot-image: var(--spot-image-light);
}

@media (max-width: 860px) {
  .module-head {
    align-items: flex-start;
  }

  .module-head-actions {
    margin-top: 10px;
  }

  .spot-tile.compact-spot {
    flex: 1 1 auto;
    width: 100%;
    height: 88px;
  }
}
</style>
