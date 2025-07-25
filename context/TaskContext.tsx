"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

interface TaskState {
  tasks: Task[]
  loading: boolean
}

interface TaskContextType extends TaskState {
  addTask: (text: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

type TaskAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_TASKS":
      return { ...state, tasks: action.payload, loading: false }
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] }
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload ? { ...task, completed: !task.completed } : task)),
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }
    default:
      return state
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    loading: true,
  })

  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("tasks", [])

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      dispatch({ type: "SET_TASKS", payload: storedTasks })
    }, 500)
  }, [storedTasks])

  useEffect(() => {
    if (!state.loading) {
      setStoredTasks(state.tasks)
    }
  }, [state.tasks, state.loading, setStoredTasks])

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: "ADD_TASK", payload: newTask })
  }

  const toggleTask = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: id })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id })
  }

  return (
    <TaskContext.Provider
      value={{
        ...state,
        addTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}
