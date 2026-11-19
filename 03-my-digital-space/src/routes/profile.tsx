import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="card bg-base-100 p-6 shadow">
      <h2 className="text-2xl font-bold mb-2">My Profile</h2>
      <p><strong>Name:</strong> Your Name</p>
      <p><strong>Course:</strong> Web Development @ DCI</p>
      <p><strong>Goal:</strong> Mastering React, TanStack Router, and TypeScript!</p>
    </div>
  )
}