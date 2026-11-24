export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  category: string
  priority: Priority
  done: boolean
  notes: string
}