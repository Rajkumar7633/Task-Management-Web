"use client"

import type React from "react"

import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Eye } from "lucide-react"

interface TaskListItemProps {
  task: Task
  onView: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export default function TaskListItem({ task, onView, onEdit, onDelete }: TaskListItemProps) {
  const roi = task.timeTaken > 0 ? (task.revenue / task.timeTaken).toFixed(2) : "—"
  const priorityColor = {
    High: "bg-destructive text-destructive-foreground",
    Medium: "bg-yellow-500 text-white",
    Low: "bg-blue-500 text-white",
  }

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    onView(task)
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 bg-background border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{task.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{task.notes}</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium text-foreground">${task.revenue.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">{task.timeTaken}h</p>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-foreground">{roi}</p>
        <p className="text-xs text-muted-foreground">ROI</p>
      </div>

      <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColor[task.priority]}`}>{task.priority}</span>

      <span className="px-2 py-1 rounded text-xs font-semibold bg-muted text-muted-foreground">{task.status}</span>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            onView(task)
          }}
          title="View task"
        >
          <Eye className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(task)
          }}
          title="Edit task"
        >
          <Edit2 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(task)
          }}
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
