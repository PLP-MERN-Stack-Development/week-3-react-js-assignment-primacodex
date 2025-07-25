"use client"

import { useState } from "react"
import { useTasks } from "@/context/TaskContext"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Loading from "@/components/ui/Loading"

export default function TaskList() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks()
  const [newTask, setNewTask] = useLocalStorage("newTask", "")
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim())
      setNewTask("")
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  if (loading) {
    return (
      <Card>
        <Loading text="Loading tasks..." />
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add Task Form */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Task</h2>
        <div className="flex space-x-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          />
          <Button onClick={handleAddTask} disabled={!newTask.trim()}>
            Add Task
          </Button>
        </div>
      </Card>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        {[
          { key: "all", label: "All Tasks" },
          { key: "pending", label: "Pending" },
          { key: "completed", label: "Completed" },
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={filter === key ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter(key as any)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Tasks List */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tasks ({filteredTasks.length})</h2>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks found.</p>
            <p className="text-sm mt-1">Add a task above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className={`${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {task.text}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</span>
                  <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
