import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="card bg-base-100 p-8 shadow">
      <h2 className="text-3xl font-bold mb-3">Welcome to My Digital Space 👋</h2>
      <p className="text-base-content/80 mb-6">
        Hi! This is my personal web space built with React, TypeScript, Tailwind CSS, and TanStack Router.
        Feel free to explore my profile, daily tasks, hobbies, and favorite things.
      </p>
      <div className="flex gap-3">
        <Link to="/profile" className="btn btn-primary">
          About Me
        </Link>
        <Link to="/tasks" className="btn btn-outline">
          View My Tasks
        </Link>
      </div>
    </div>
  )
}