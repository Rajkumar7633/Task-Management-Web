"use client"

import type { Task, TaskDialogState } from "@/types/task"
import TaskForm from "./task-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TaskDialogProps {
  state: TaskDialogState
  onClose: () => void
  onEdit: (task: Task) => void
  onConfirmDelete: () => void
}

export default function TaskDialog({ state, onClose, onEdit, onConfirmDelete }: TaskDialogProps) {
  if (state.type === "view" && state.task) {
    return (
      <Dialog open={state.isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.task.title}</DialogTitle>
            <DialogDescription>Task Details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="font-semibold">${state.task.revenue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Taken</p>
                <p className="font-semibold">{state.task.timeTaken}h</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="font-semibold">
                  {state.task.timeTaken > 0 ? `$${(state.task.revenue / state.task.timeTaken).toFixed(2)}/h` : "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <p className="font-semibold">{state.task.priority}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold">{state.task.status}</p>
              </div>
            </div>
            {state.task.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p>{state.task.notes}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (state.type === "edit" && state.task) {
    return (
      <Dialog open={state.isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            initialTask={state.task}
            isEditMode={true}
            onSubmit={(task) => onEdit({ ...task, id: state.task!.id, createdAt: state.task!.createdAt })}
          />
        </DialogContent>
      </Dialog>
    )
  }

  if (state.type === "delete" && state.task) {
    return (
      <Dialog open={state.isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{state.task.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return null
}
