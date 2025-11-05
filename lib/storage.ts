import type { Task } from "@/types/task"

const STORAGE_KEY = "tasks"

export const loadTasksFromStorage = (): Task[] => {
  try {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading tasks from storage:", error)
    return []
  }
}

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  } catch (error) {
    console.error("Error saving tasks to storage:", error)
  }
}

export const exportTasksAsCSV = (tasks: Task[]): void => {
  const headers = ["Title", "Revenue", "Time Taken", "ROI", "Priority", "Status", "Notes"]
  const rows = tasks.map((task) => [
    task.title,
    task.revenue,
    task.timeTaken,
    task.timeTaken > 0 ? (task.revenue / task.timeTaken).toFixed(2) : "—",
    task.priority,
    task.status,
    task.notes,
  ])

  const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `tasks-${new Date().toISOString().split("T")[0]}.csv`
  link.click()
  window.URL.revokeObjectURL(url)
}
