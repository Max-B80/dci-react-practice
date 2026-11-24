import type { Task } from '../types/task'

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Master TanStack Router Nested & Dynamic Routes',
    category: 'React',
    priority: 'high',
    done: false,
    notes: 'Practice _app.tsx layout routes, $taskId dynamic parameters, and ?status= search params.',
  },
  {
    id: '2',
    title: 'Review TypeScript Interfaces & Props',
    category: 'TypeScript',
    priority: 'medium',
    done: true,
    notes: 'Ensure every reusable component has a clear Props interface so VS Code catches typos early.',
  },
  {
    id: '3',
    title: 'Prepare FocusFlow Demo for Class Presentation',
    category: 'Presentation',
    priority: 'high',
    done: false,
    notes: 'Walk through useLocalStorage custom hook, URL filtering, and task detail view step by step.',
  },
]