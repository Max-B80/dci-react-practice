import { createFileRoute, Link } from '@tanstack/react-router'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { initialTasks } from '../../data/initialTasks'
import type { Task } from '../../types/task'

export const Route = createFileRoute('/_app/')({
  component: HomePage,
})

function HomePage() {
  // Connects directly to our Custom Hook + Starter Data!
  const [tasks] = useLocalStorage<Task[]>('focusflow-tasks', initialTasks)

  const totalCount = tasks.length
  const completedCount = tasks.filter((t) => t.done).length
  const pendingCount = totalCount - completedCount

  return (
    <div className="space-y-6">
      {/* Welcome Hero Card */}
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Welcome to FocusFlow</h1>
          <p className="text-base-content/70">
            Organize your daily study tasks, filter by completion status, and inspect detailed notes—all saved automatically in your browser.
          </p>

          {/* Live Stats connected to useLocalStorage */}
          <div className="stats stats-vertical sm:stats-horizontal shadow bg-base-200 mt-4">
            <div className="stat">
              <div className="stat-title">Total Tasks</div>
              <div className="stat-value text-primary">{totalCount}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-warning">{pendingCount}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Completed</div>
              <div className="stat-value text-success">{completedCount}</div>
            </div>
          </div>

          <div className="card-actions justify-end mt-4">
            <Link
              to="/tasks"
              search={{ status: 'all' }}
              className="btn btn-primary"
            >
              Open Task Board
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}