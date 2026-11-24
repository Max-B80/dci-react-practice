import { Link } from '@tanstack/react-router'
import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body flex-row items-center justify-between gap-4 p-4">
        {/* Left side: Checkbox + Title + Badges */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
            className="checkbox checkbox-primary"
          />

          <div>
            <Link
              to="/tasks/$taskId"
              params={{ taskId: task.id }}
              className={`font-semibold text-lg hover:underline ${
                task.done ? 'line-through opacity-50' : ''
              }`}
            >
              {task.title}
            </Link>

            <div className="flex gap-2 mt-1">
              <span className="badge badge-outline badge-sm">{task.category}</span>
              <span className="badge badge-ghost badge-sm capitalize">{task.priority}</span>
            </div>
          </div>
        </div>

        {/* Right side: Details link + Delete button */}
        <div className="flex items-center gap-2">
          <Link
            to="/tasks/$taskId"
            params={{ taskId: task.id }}
            className="btn btn-sm btn-ghost"
          >
            Details
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-sm btn-error btn-outline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}