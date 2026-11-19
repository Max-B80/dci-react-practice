import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="card bg-base-100 p-6 shadow space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="flex items-center justify-between p-4 bg-base-200 rounded">
        <div>
          <p className="font-bold">Dark Mode Preview</p>
          <p className="text-sm opacity-70">
            Current theme: {darkMode ? 'Dark' : 'Light'}
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`btn btn-sm ${darkMode ? 'btn-primary' : 'btn-outline'}`}
        >
          {darkMode ? 'On' : 'Off'}
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-base-200 rounded">
        <div>
          <p className="font-bold">Notifications</p>
          <p className="text-sm opacity-70">
            Status: {notifications ? 'Enabled' : 'Muted'}
          </p>
        </div>
        <button
          onClick={() => setNotifications(!notifications)}
          className={`btn btn-sm ${notifications ? 'btn-primary' : 'btn-outline'}`}
        >
          {notifications ? 'Enabled' : 'Muted'}
        </button>
      </div>
    </div>
  )
}