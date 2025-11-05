"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SnackbarProps {
  message: string
  actionLabel?: string
  onAction?: () => void
  onClose: () => void
}

export function Snackbar({ message, actionLabel, onAction, onClose }: SnackbarProps) {
  return (
    <div className="fixed bottom-4 right-4 bg-foreground text-background rounded-lg shadow-lg p-4 flex items-center gap-4 max-w-sm">
      <p className="flex-1">{message}</p>
      {actionLabel && onAction && (
        <Button size="sm" variant="ghost" onClick={onAction} className="text-background hover:bg-background/20">
          {actionLabel}
        </Button>
      )}
      <button onClick={onClose} className="text-background hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Snackbar
