export interface TaskGroup {
  name: string
  tasks: string[]
}

export interface Week {
  id: number
  phase: string
  color: string
  icon: string
  date: string
  title: string
  tag: string
  objective: string
  groups: TaskGroup[]
  softwareLine: string[]
  deliverable: string
  gate: string
}

export interface SoftwareSection {
  name: string
  items: string[]
}

export interface SoftwareCategory {
  id: string
  title: string
  description: string
  priority?: string
  sections: SoftwareSection[]
}

export interface ComplianceStep {
  name: string
  detail: string
}

export interface ComplianceLicense {
  id: string
  name: string
  short: string
  kind: '备案' | '许可证'
  scenario: string
  subject: string
  authority: string
  conditions: string[]
  materials: string[]
  steps: ComplianceStep[]
  timeline: string
  pitfalls: string[]
  color: string
}

export interface PersistedState {
  version: 1
  done: string[]
  closed: number[]
  softwareDone: string[]
  theme: 'dark' | 'light'
  filter: string
}
