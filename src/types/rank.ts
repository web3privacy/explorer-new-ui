import type { Project } from './project'

export interface Rank {
  id: string
  name: string
  references: Reference[]
}

interface Reference {
  field: keyof Project
  label: {
    name: string
    positive: string
    negative: string
  }
  condition: Condition
  points: number
}

interface Condition {
  minLength?: number
  exists?: boolean
  equals?: boolean | string
}
