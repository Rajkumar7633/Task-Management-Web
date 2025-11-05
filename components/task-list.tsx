"use client"

import type { Task } from "@/types/task"
import TaskListItem from "./task-list-item"
import { sortTasks } from "@/lib/sorting"

interface TaskListProps {
  tasks: Task[]
  onView: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export default function TaskList({ tasks, onView, onEdit, onDelete }: TaskListProps) {
  const sortedTasks = sortTasks(tasks)

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No tasks yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sortedTasks.map((task) => (
        <TaskListItem key={task.id} task={task} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
