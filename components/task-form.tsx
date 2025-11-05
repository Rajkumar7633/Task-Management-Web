"use client"

import type React from "react"

import { useState } from "react"
import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void
  initialTask?: Task
  isEditMode?: boolean
}

export default function TaskForm({ onSubmit, initialTask, isEditMode = false }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: initialTask?.title || "",
    revenue: initialTask?.revenue || 0,
    timeTaken: initialTask?.timeTaken || 0,
    priority: initialTask?.priority || "Medium",
    status: initialTask?.status || "Pending",
    notes: initialTask?.notes || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "revenue" || name === "timeTaken" ? Number.parseFloat(value) || 0 : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }

    // Validate revenue
    if (formData.revenue < 0) {
      newErrors.revenue = "Revenue cannot be negative"
    }

    // Validate time taken
    if (formData.timeTaken < 0) {
      newErrors.timeTaken = "Time taken cannot be negative"
    }

    // Additional edge case validation for ROI calculation
    if (formData.revenue > 0 && formData.timeTaken === 0) {
      newErrors.timeTaken = "Time taken must be greater than 0 when revenue is specified"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)

    // Reset form if not in edit mode
    if (!isEditMode) {
      setFormData({
        title: "",
        revenue: 0,
        timeTaken: 0,
        priority: "Medium",
        status: "Pending",
        notes: "",
      })
      setErrors({})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Task Title</label>
        <Input
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? "border-destructive" : ""}
          required
        />
        {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Revenue ($)</label>
          <Input
            name="revenue"
            type="number"
            placeholder="0"
            value={formData.revenue}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={errors.revenue ? "border-destructive" : ""}
          />
          {errors.revenue && <p className="text-sm text-destructive mt-1">{errors.revenue}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Time Taken (hours)</label>
          <Input
            name="timeTaken"
            type="number"
            placeholder="0"
            value={formData.timeTaken}
            onChange={handleChange}
            step="0.5"
            min="0"
            className={errors.timeTaken ? "border-destructive" : ""}
          />
          {errors.timeTaken && <p className="text-sm text-destructive mt-1">{errors.timeTaken}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Priority</label>
          <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Status</label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
        <Textarea
          name="notes"
          placeholder="Add any additional notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        {isEditMode ? "Update Task" : "Add Task"}
      </Button>
    </form>
  )
}
