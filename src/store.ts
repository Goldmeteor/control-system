import { computed, reactive, watch } from 'vue'
import type { PersistedState } from './types'
import { allLegalTaskIds } from './data/legal'
import { allSoftwarePlanTaskIds } from './data/softwarePlan'
import { allWeekTaskIds } from './data/weeks'

const STORAGE_KEY = 'learning-hub-v1'

function defaultState(): PersistedState {
  return {
    version: 1,
    done: [],
    closed: [],
    softwareDone: [],
    theme: 'dark',
    filter: 'all',
  }
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    if (parsed.version !== 1) return defaultState()
    return {
      version: 1,
      done: Array.isArray(parsed.done) ? parsed.done : [],
      closed: Array.isArray(parsed.closed) ? parsed.closed : [],
      softwareDone: Array.isArray(parsed.softwareDone) ? parsed.softwareDone : [],
      theme: parsed.theme === 'light' ? 'light' : 'dark',
      filter: typeof parsed.filter === 'string' ? parsed.filter : 'all',
    }
  } catch {
    return defaultState()
  }
}

const state = reactive<PersistedState>(loadState())

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

watch(
  state,
  () => save(),
  { deep: true },
)

const weekTaskIds = allWeekTaskIds()
const softwareTaskIds = allSoftwarePlanTaskIds()
const legalTaskIds = allLegalTaskIds()
const allTaskIds = [...weekTaskIds, ...softwareTaskIds, ...legalTaskIds]

const weekDoneCount = computed(() =>
  weekTaskIds.filter((id) => state.done.includes(id)).length,
)
const softwareDoneCount = computed(() =>
  softwareTaskIds.filter((id) => state.done.includes(id)).length,
)
const legalDoneCount = computed(() =>
  legalTaskIds.filter((id) => state.done.includes(id)).length,
)
const legalTotalCount = computed(() => legalTaskIds.length)
const doneCount = computed(() => state.done.filter((id) => allTaskIds.includes(id)).length)
const totalCount = computed(() => allTaskIds.length)
const percent = computed(() =>
  totalCount.value === 0 ? 0 : Math.round((doneCount.value / totalCount.value) * 100),
)

function toggleTask(id: string) {
  const index = state.done.indexOf(id)
  if (index >= 0) {
    state.done.splice(index, 1)
  } else {
    state.done.push(id)
  }
}

function toggleWeek(id: number) {
  const index = state.closed.indexOf(id)
  if (index >= 0) {
    state.closed.splice(index, 1)
  } else {
    state.closed.push(id)
  }
}

function toggleSoftware(categoryIndex: number, sectionIndex: number, itemIndex: number) {
  const id = `s${categoryIndex}-g${sectionIndex}-t${itemIndex}`
  toggleTask(id)
}

function setFilter(filter: string) {
  state.filter = filter
}

function setTheme(theme: 'dark' | 'light') {
  state.theme = theme
  document.documentElement.dataset.theme = theme
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'learning-hub-progress.json'
  link.click()
  URL.revokeObjectURL(url)
}

function importJson(raw: string): boolean {
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    if (parsed.version !== 1) return false
    state.done = Array.isArray(parsed.done) ? parsed.done : []
    state.closed = Array.isArray(parsed.closed) ? parsed.closed : []
    state.softwareDone = Array.isArray(parsed.softwareDone) ? parsed.softwareDone : []
    state.theme = parsed.theme === 'light' ? 'light' : 'dark'
    state.filter = typeof parsed.filter === 'string' ? parsed.filter : 'all'
    return true
  } catch {
    return false
  }
}

function resetProgress() {
  state.done = []
  state.closed = []
  state.softwareDone = []
  state.filter = 'all'
}

export {
  state,
  weekTaskIds,
  softwareTaskIds,
  legalTaskIds,
  weekDoneCount,
  softwareDoneCount,
  legalDoneCount,
  legalTotalCount,
  doneCount,
  totalCount,
  percent,
  toggleTask,
  toggleWeek,
  toggleSoftware,
  setFilter,
  setTheme,
  exportJson,
  importJson,
  resetProgress,
}
