"use client"

import type { Task } from "@/types/task"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskSummaryProps {
  tasks: Task[]
}

export default function TaskSummary({ tasks }: TaskSummaryProps) {
  const totalRevenue = tasks.reduce((sum, task) => sum + task.revenue, 0)
  const totalTime = tasks.reduce((sum, task) => sum + task.timeTaken, 0)

  const calculateAverageROI = () => {
    if (totalTime === 0) {
      return "—"
    }
    return (totalRevenue / totalTime).toFixed(2)
  }

  const averageROI = calculateAverageROI()

  const completedTasks = tasks.filter((t) => t.status === "Completed").length
  const completionRate = tasks.length > 0 ? ((completedTasks / tasks.length) * 100).toFixed(1) : "0"

  const getPerformanceGrade = () => {
    const rate = Number.parseFloat(completionRate)
    if (rate >= 90) return "A"
    if (rate >= 80) return "B"
    if (rate >= 70) return "C"
    if (rate >= 60) return "D"
    return "F"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Total earned</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{averageROI}</p>
          <p className="text-xs text-muted-foreground">Per hour</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{completionRate}%</p>
          <p className="text-xs text-muted-foreground">Tasks completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Performance Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{getPerformanceGrade()}</p>
          <p className="text-xs text-muted-foreground">Overall performance</p>
        </CardContent>
      </Card>
    </div>
  )
}
