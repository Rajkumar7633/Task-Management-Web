export interface Task {
  id: string
  title: string
  revenue: number
  timeTaken: number
  priority: "High" | "Medium" | "Low"
  status: "Pending" | "In Progress" | "Completed"
  notes: string
  createdAt: string
}

export interface TaskDialogState {
  type: "view" | "edit" | "delete" | null
  task: Task | null
  isOpen: boolean
}
