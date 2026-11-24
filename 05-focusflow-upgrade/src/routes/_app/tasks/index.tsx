import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { initialTasks } from '../../../data/initialTasks'
import { TaskCard } from '../../../components/TaskCard'
import type { Task, Priority } from '../../../types/task'

// 1. Define the 3 allowed URL search param values (?status=all | pending | done)
type FilterStatus = 'all' | 'pending' | 'done'

interface TasksSearch {
  status: FilterStatus
}

export const Route = createFileRoute('/_app/tasks/')({
  // 2. Validate the URL "?status=" safely (ternary check!)
  validateSearch: (search: Record<string, unknown>): TasksSearch => ({
    status:
      search.status === 'pending' || search.status === 'done'
        ? search.status
        : 'all',
  }),
  component: TasksPage,
})

function TasksPage() {
  // 3. Read the current "?status=" directly from the URL
  const { status } = Route.useSearch()

  // 4. Connect to our Custom Hook + Starter Data
  const [tasks, setTasks] = useLocalStorage<Task[]>('focusflow-tasks', initialTasks)

  // 5. Local form state (useState) for adding a new task
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('React')
  const [priority, setPriority] = useState<Priority>('medium')
  const [notes, setNotes] = useState('')

  // Event handler: Add a new task
  function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category.trim() || 'General',
      priority,
      done: false,
      notes: notes.trim() || 'No extra notes added yet.',
    }

    setTasks([newTask, ...tasks])
    setTitle('')
    setNotes('')
  }

  // Event handler: Toggle done (true <-> false)
  function handleToggle(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  // Event handler: Delete a task
  function handleDelete(id: string) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Filter tasks based on the URL's ?status= search param
  const filteredTasks = tasks.filter((task) => {
    if (status === 'pending') return !task.done
    if (status === 'done') return task.done
    return true // 'all'
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        {/* Filter Buttons that update ?status= in the URL */}
        <div className="join">
          <Link
            to="/tasks"
            search={{ status: 'all' }}
            className={`btn btn-sm join-item ${status === 'all' ? 'btn-primary' : ''}`}
          >
            All ({tasks.length})
          </Link>
          <Link
            to="/tasks"
            search={{ status: 'pending' }}
            className={`btn btn-sm join-item ${status === 'pending' ? 'btn-primary' : ''}`}
          >
            Pending ({tasks.filter((t) => !t.done).length})
          </Link>
          <Link
            to="/tasks"
            search={{ status: 'done' }}
            className={`btn btn-sm join-item ${status === 'done' ? 'btn-primary' : ''}`}
          >
            Done ({tasks.filter((t) => t.done).length})
          </Link>
        </div>
      </div>

      {/* Add New Task Form */}
      <form
        onSubmit={handleAddTask}
        className="card bg-base-100 p-4 shadow-sm border border-base-300 space-y-3"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="What do you need to focus on?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered flex-1"
          />
          <input
            type="text"
            placeholder="Category (e.g. React)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered sm:w-40"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="select select-bordered sm:w-36"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Optional notes (shown on the detail page)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input input-bordered flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>

      {/* Reusable TaskCard List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-base-content/60 bg-base-100 rounded-box border border-base-300">
            No tasks match the "{status}" filter.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}