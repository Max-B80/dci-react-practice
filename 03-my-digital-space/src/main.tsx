import React from 'react'
import ReactDOM from 'react-dom/client' // 2. Connects React to the browser DOM
import { RouterProvider, createRouter } from '@tanstack/react-router' // 3. Loads TanStack Router tools
import { routeTree } from './routeTree.gen' // 4. Imports the auto-generated map of all your routes
import './index.css' // 5. Loads your Tailwind + DaisyUI styles into the app

const router = createRouter({ routeTree }) // 6. Builds the router using that auto-generated route map

// 7. Gives TypeScript autocomplete for all route URLs (one-time TypeScript setup)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// 8. Finds <div id="root"> in index.html and renders the Router inside it
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)