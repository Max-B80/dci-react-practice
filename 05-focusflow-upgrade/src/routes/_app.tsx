import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Shared Top Navbar */}
      <header className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-primary">
            FocusFlow
          </Link>
        </div>

        <nav className="flex gap-2">
          <Link
            to="/"
            className="btn btn-ghost btn-sm"
            activeProps={{ className: 'btn-active' }}
          >
            Home
          </Link>
          <Link
            to="/tasks"
            search={{ status: 'all' }}
            className="btn btn-ghost btn-sm"
            activeProps={{ className: 'btn-active' }}
          >
            My Tasks
          </Link>
        </nav>
      </header>

      {/* Main Content Area: Child pages render inside <Outlet /> */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <footer className="footer footer-center p-4 bg-base-100 text-base-content text-sm border-t border-base-300">
        <p>FocusFlow Upgrade • Built with React, TypeScript & TanStack Router</p>
      </footer>
    </div>
  )
}