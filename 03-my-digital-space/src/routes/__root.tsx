import { createRootRoute, Link, Outlet } from '@tanstack/react-router' // ⭐ 1. Add Link here!

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* DaisyUI Navbar — stays visible on every page */}
      <header className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            My Digital Space
          </Link>
        </div>

        {/* ⭐ Navigation Links: use <Link to="..."> instead of <a href="..."> so the page never reloads */}
        <nav className="flex gap-2 flex-wrap">
          <Link to="/" className="btn btn-ghost btn-sm" activeProps={{ className: 'btn-active' }}>
            Home
          </Link>
          <Link to="/profile" className="btn btn-ghost btn-sm" activeProps={{ className: 'btn-active' }}>
            Profile
          </Link>
          <Link to="/hobbies" className="btn btn-ghost btn-sm" activeProps={{ className: 'btn-active' }}>
            Hobbies
          </Link>
          <Link to="/tasks" className="btn btn-ghost btn-sm" activeProps={{ className: 'btn-active' }}>
            Tasks
          </Link>
          <Link to="/favorites" className="btn btn-ghost btn-sm" activeProps={{ className: 'btn-active' }}>
            Favorites
          </Link>
          <Link to="/settings" className="btn btn-ghost btn-sm" activeProps={{ className: 'btn-active' }}>
            Settings
          </Link>
        </nav>
      </header>

      {/* Main page content area */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6">
        <Outlet /> {/* ⭐ Every clicked page renders right here */}
      </main>

      {/* Simple Footer — also stays on every page */}
      <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
        <p>© 2026 My Digital Space — Built with React & TanStack Router</p>
      </footer>
    </div>
  )
}