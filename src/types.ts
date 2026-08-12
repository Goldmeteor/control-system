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

export interface LegalWeek {
  id: number
  phase: string
  color: string
  icon: string
  title: string
  tag: string
  objective: string
  groups: TaskGroup[]
  deliverable: string
  gate: string
}

export interface LegalResource {
  id: string
  category: string
  title: string
  link?: string
  note: string
}

export interface LegalChecklistItem {
  text: string
  reference: string
}

export interface LegalChecklist {
  id: string
  title: string
  description: string
  items: LegalChecklistItem[]
}

export interface LegalTemplateField {
  label: string
  hint: string
}

export interface LegalTemplate {
  id: string
  title: string
  description: string
  fields: LegalTemplateField[]
}

export interface StudyWeek {
  id: number
  title: string
  tag: string
  summary: string
  objective: string
  color: string
  groups: TaskGroup[]
  deliverable: string
  gate: string
}

export interface StudyResource {
  id: string
  category: string
  title: string
  link?: string
  note: string
}

export interface StudyChecklistItem {
  text: string
  reference: string
}

export interface StudyChecklist {
  id: string
  title: string
  description: string
  items: StudyChecklistItem[]
}

export interface StudyTemplateField {
  label: string
  hint: string
}

export interface StudyTemplate {
  id: string
  title: string
  description: string
  fields: StudyTemplateField[]
}

export interface PersistedState {
  version: 1
  done: string[]
  closed: number[]
  softwareDone: string[]
  theme: 'dark' | 'light'
  filter: string
}
