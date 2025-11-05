"use client"

import { useEffect, useRef, useState } from "react"
import TaskList from "@/components/task-list"
import TaskForm from "@/components/task-form"
import TaskSummary from "@/components/task-summary"
import TaskDialog from "@/components/task-dialog"
import type { Task, TaskDialogState } from "@/types/task"
import { Snackbar } from "@/components/snackbar"
import { loadTasksFromStorage, saveTasksToStorage } from "@/lib/storage"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [dialogState, setDialogState] = useState<TaskDialogState>({
    type: null,
    task: null,
    isOpen: false,
  })
  const [lastDeletedTask, setLastDeletedTask] = useState<Task | null>(null)
  const [showDeletedSnackbar, setShowDeletedSnackbar] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const didInit = useRef(false)

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    const loadTasks = async () => {
      const storedTasks = loadTasksFromStorage()
      setTasks(storedTasks)
      setIsLoaded(true)
    }

    // Only run once on mount (guarded for StrictMode double-invoke)
    loadTasks()
  }, [])

  useEffect(() => {
    if (showDeletedSnackbar) {
      const timer = setTimeout(() => {
        setShowDeletedSnackbar(false)
        setLastDeletedTask(null) // Ensure state is cleared
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showDeletedSnackbar])

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    saveTasksToStorage(updatedTasks)
    setDialogState({ type: null, task: null, isOpen: false })
  }

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    setTasks(updatedTasks)
    saveTasksToStorage(updatedTasks)
    setDialogState({ type: null, task: null, isOpen: false })
  }

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((t) => t.id === taskId)
    if (taskToDelete) {
      setLastDeletedTask(taskToDelete)
      setShowDeletedSnackbar(true)
      const updatedTasks = tasks.filter((t) => t.id !== taskId)
      setTasks(updatedTasks)
      saveTasksToStorage(updatedTasks)
    }
    setDialogState({ type: null, task: null, isOpen: false })
  }

  const handleUndoDelete = () => {
    if (lastDeletedTask) {
      const updatedTasks = [...tasks, lastDeletedTask]
      setTasks(updatedTasks)
      saveTasksToStorage(updatedTasks)
      setLastDeletedTask(null)
      setShowDeletedSnackbar(false)
    }
  }

  const handleCloseSnackbar = () => {
    setShowDeletedSnackbar(false)
    setLastDeletedTask(null)
  }

  const openViewDialog = (task: Task) => {
    setDialogState({ type: "view", task, isOpen: true })
  }

  const openEditDialog = (task: Task) => {
    setDialogState({ type: "edit", task, isOpen: true })
  }

  const openDeleteDialog = (task: Task) => {
    setDialogState({ type: "delete", task, isOpen: true })
  }

  const closeDialog = () => {
    setDialogState({ type: null, task: null, isOpen: false })
  }

  const confirmDelete = () => {
    if (dialogState.task) {
      handleDeleteTask(dialogState.task.id)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Task Manager</h1>
          <p className="text-muted-foreground">Manage tasks and track ROI for your sales team</p>
        </header>

        <div className="grid gap-8">
          {/* Summary Section */}
          <TaskSummary tasks={tasks} />

          {/* Task Form Section */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Add New Task</h2>
            <TaskForm onSubmit={handleAddTask} />
          </section>

          {/* Task List Section */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Tasks</h2>
            <TaskList tasks={tasks} onView={openViewDialog} onEdit={openEditDialog} onDelete={openDeleteDialog} />
          </section>
        </div>
      </div>

      {/* Task Dialog */}
      <TaskDialog state={dialogState} onClose={closeDialog} onEdit={handleEditTask} onConfirmDelete={confirmDelete} />

      {/* Undo Snackbar */}
      {showDeletedSnackbar && (
        <Snackbar
          message={`Task "${lastDeletedTask?.title}" deleted`}
          actionLabel="Undo"
          onAction={handleUndoDelete}
          onClose={handleCloseSnackbar}
        />
      )}
    </main>
  )
}
