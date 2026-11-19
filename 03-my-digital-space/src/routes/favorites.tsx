import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites')({
  component: RouteComponent,
})

interface Favorite { // ⭐ Blueprint for each favorite item
  id: number
  category: string
  title: string
}

function RouteComponent() {
  const favorites: Favorite[] = [
    { id: 1, category: 'Movie', title: 'Inception' },
    { id: 2, category: 'Music', title: 'Lo-Fi Study Beats' },
    { id: 3, category: 'Game', title: 'Zelda' },
  ]

  return (
    <div className="card bg-base-100 p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      <div className="space-y-2">
        {favorites.map((item) => ( // ⭐ Rendering objects with .map()
          <div key={item.id} className="p-3 bg-base-200 rounded">
            <span className="font-bold">{item.category}:</span> {item.title}
          </div>
        ))}
      </div>
    </div>
  )
}