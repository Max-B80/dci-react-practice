import { useState } from 'react' // ⭐ 1. Import useState for interactive data
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tasks')({
  component: RouteComponent,
})

interface Task { // ⭐ 2. TypeScript blueprint for each task
  id: number
  text: string
}

function RouteComponent() {
  // ⭐ Pattern #1: State for the list of tasks + state for the input box
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Learn TanStack Router' },
    { id: 2, text: 'Practice React useState' },
  ])
  const [inputText, setInputText] = useState('')

  // ⭐ Pattern #3: Add a new task without mutating the old array
  function handleAddTask(e: React.FormEvent) {
    e.preventDefault() // Stops the browser from reloading on form submit
    if (!inputText.trim()) return // Ignore empty input

    const newTask: Task = {
      id: Date.now(), // Quick unique ID
      text: inputText,
    }

    setTasks((prev) => [...prev, newTask]) // ⭐ Copy old tasks + add newTask at the end
    setInputText('') // Clear the input box
  }

  // ⭐ Pattern #5: Delete a task using .filter()
  function handleDeleteTask(idToDelete: number) {
    setTasks((prev) => prev.filter((task) => task.id !== idToDelete)) // ⭐ Keep everything EXCEPT the deleted ID
  }

  return (
    <div className="card bg-base-100 p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      {/* Form to add a new task */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          className="input input-bordered flex-1"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      {/* ⭐ Pattern #2: Render the list using .map() */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-3 bg-base-200 rounded">
            <span>{task.text}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn btn-error btn-xs"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}