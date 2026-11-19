import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hobbies')({
  component: RouteComponent,
})

function RouteComponent() {
  const hobbies: string[] = ['Coding', 'Reading', 'Music', 'Travel'] // ⭐ Typed array of strings

  return (
    <div className="card bg-base-100 p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">My Hobbies</h2>
      <ul className="list-disc pl-6 space-y-2">
        {hobbies.map((hobby) => ( // ⭐ Pattern #2: Rendering a list with .map()
          <li key={hobby}>{hobby}</li> // ⭐ Always give mapped elements a unique key!
        ))}
      </ul>
    </div>
  )
}