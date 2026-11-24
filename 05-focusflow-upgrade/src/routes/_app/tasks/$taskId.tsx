import { createFileRoute, Link } from "@tanstack/react-router";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { initialTasks } from "../../../data/initialTasks";
import type { Task } from "../../../types/task";

export const Route = createFileRoute("/_app/tasks/$taskId")({
  component: TaskDetailPage,
});

function TaskDetailPage() {
  // 1. Grab the dynamic "$taskId" from the URL (e.g. "/tasks/1" -> taskId = "1")
  const { taskId } = Route.useParams();

  // 2. Load our saved tasks from our custom hook
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "focusflow-tasks",
    initialTasks,
  );

  // 3. Find the matching task by its id
  const task = tasks.find((t) => t.id === taskId);

  // 4. Safety check: What if someone types "/tasks/999" in the URL?
  if (!task) {
    return (
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body text-center space-y-4">
          <h1 className="text-2xl font-bold text-error">Task Not Found</h1>
          <p className="text-base-content/70">
            No task exists with ID{" "}
            <span className="font-mono font-bold">"{taskId}"</span>.
          </p>
          <div>
            <Link
              to="/tasks"
              search={{ status: "all" }}
              className="btn btn-primary btn-sm"
            >
              Back to My Tasks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Event handler: Toggle done right from the detail page too!
  function handleToggleDone() {
    setTasks(
      tasks.map((t) => (t.id === task!.id ? { ...t, done: !t.done } : t)),
    );
  }

  return (
    <div className="space-y-4">
      <Link
        to="/tasks"
        search={{ status: "all" }}
        className="btn btn-ghost btn-sm"
      >
        ← Back to My Tasks
      </Link>

      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body space-y-4">
          {/* Header: Title + Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <span
              className={`badge ${task.done ? "badge-success" : "badge-warning"}`}
            >
              {task.done ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Metadata Badges */}
          <div className="flex gap-2">
            <span className="badge badge-outline">
              Category: {task.category}
            </span>
            <span className="badge badge-outline capitalize">
              Priority: {task.priority}
            </span>
            <span className="badge badge-ghost font-mono">ID: {task.id}</span>
          </div>

          {/* Notes Section (connected back to `notes` in types/task.ts!) */}
          <div className="bg-base-200 p-4 rounded-box">
            <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-1">
              Task Notes
            </h2>
            <p className="text-base leading-relaxed">{task.notes}</p>
          </div>

          {/* Action Button */}
          <div className="card-actions justify-end">
            <button
              onClick={handleToggleDone}
              className="btn btn-primary btn-sm"
            >
              {task.done ? "Mark as Pending" : "Mark as Completed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
