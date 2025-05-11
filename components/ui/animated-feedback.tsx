"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

interface AnimatedFeedbackProps {
  type: "success" | "error" | "warning" | "info" | null
  message: string
  duration?: number
  onComplete?: () => void
}

export function AnimatedFeedback({ type, message, duration = 3000, onComplete }: AnimatedFeedbackProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (type && message) {
      setVisible(true)

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        setVisible(false)
        if (onComplete) {
          onComplete()
        }
      }, duration)
    } else {
      setVisible(false)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [type, message, duration, onComplete])

  if (!type || !message) return null

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  }

  const colors = {
    success: "bg-success/10 text-success border-success/20",
    error: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    info: "bg-primary/10 text-primary border-primary/20",
  }

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className={cn("flex items-center gap-2 px-4 py-3 rounded-xl border shadow-sm", colors[type])}>
        {icons[type]}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}
