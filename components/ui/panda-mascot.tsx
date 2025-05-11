"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface PandaMascotProps {
  message?: string
  size?: "sm" | "md" | "lg"
  mood?: "happy" | "excited" | "neutral" | "thinking" | "sleeping"
  className?: string
  animated?: boolean
}

export function PandaMascot({ message, size = "md", mood = "neutral", className, animated = true }: PandaMascotProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Emoji-based mascot
  const moodEmoji = {
    happy: "🐼😊",
    excited: "🐼🎉",
    neutral: "🐼",
    thinking: "🐼🤔",
    sleeping: "🐼😴",
  }

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [animated])

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(sizeClasses[size], "transition-transform duration-300", isAnimating && "transform scale-110")}
        style={{
          animation: isAnimating ? `${mood === "excited" ? "bounce" : "wiggle"} 1s ease` : "none",
        }}
      >
        {moodEmoji[mood]}
      </div>

      {message && (
        <div className="relative">
          <div className="absolute w-3 h-3 bg-muted rotate-45 left-[-6px] top-1/2 transform -translate-y-1/2"></div>
          <p className="text-sm bg-muted p-2 rounded-lg max-w-xs relative z-10">{message}</p>
        </div>
      )}

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
      `}</style>
    </div>
  )
}
