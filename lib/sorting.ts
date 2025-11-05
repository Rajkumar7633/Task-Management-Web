import type { Task } from "@/types/task"

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Primary sort: ROI (descending)
    const roiA = a.timeTaken > 0 ? a.revenue / a.timeTaken : 0
    const roiB = b.timeTaken > 0 ? b.revenue / b.timeTaken : 0

    if (roiA !== roiB) {
      return roiB - roiA
    }

    // Secondary sort: Priority (High > Medium > Low)
    const priorityOrder = { High: 3, Medium: 2, Low: 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]

    if (priorityDiff !== 0) {
      return priorityDiff
    }

    // First tie-breaker: By creation date (oldest first)
    const dateCompare = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    if (dateCompare !== 0) {
      return dateCompare
    }

    // Final tie-breaker: Alphabetical by title for complete stability
    return a.title.localeCompare(b.title)
  })
}
