"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface RewardAnimationProps {
  points: number
  onComplete?: () => void
  duration?: number
  position?: { x: number; y: number } | "center" | "auto"
  message?: string
}

export function RewardAnimation({
  points,
  onComplete,
  duration = 1500,
  position = "auto",
  message,
}: RewardAnimationProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [leaves, setLeaves] = useState<React.ReactNode[]>([])

  useEffect(() => {
    // Create container for animation
    const animationContainer = document.createElement("div")
    animationContainer.style.position = "fixed"
    animationContainer.style.pointerEvents = "none"
    animationContainer.style.zIndex = "9999"
    animationContainer.style.width = "250px"
    animationContainer.style.height = "70px"
    animationContainer.className = "bg-primary/60 text-white shadow-md text-2xl font-bold rounded p-2"

    // Position the container
    if (position === "center") {
      animationContainer.style.top = "50%"
      animationContainer.style.left = "50%"
      animationContainer.style.transform = "translate(-50%, -50%)"
    } else if (position === "auto") {
      // Default position near the reward token display
      animationContainer.style.top = "5rem"
      animationContainer.style.right = "1rem"
    } else {
      animationContainer.style.top = `${position.y}px`
      animationContainer.style.left = `${position.x}px`
    }

    document.body.appendChild(animationContainer)
    setContainer(animationContainer)

    // Generate leaves
    const count = Math.min(10, Math.max(3, Math.floor(points / 10)))
    const newLeaves = []

    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 300
      const rotate = Math.random() * 40 - 20
      const size = Math.random() * 10 + 20

      newLeaves.push(
        <div
          key={i}
          className="leaf-point absolute"
          style={{
            animationDelay: `${delay}ms`,
            transform: `rotate(${rotate}deg)`,
            left: `${Math.random() * 60 - 30}px`,
            animation: `float-up 1.5s ease-out forwards`,
          }}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/70 p-1 text-white shadow-md",
              size < 25 ? "h-6 w-6" : size < 30 ? "h-8 w-8" : "h-10 w-10",
            )}
          >
            <Leaf className={cn(size < 25 ? "h-3 w-3" : size < 30 ? "h-4 w-4" : "h-5 w-5")} />
          </div>
        </div>,
      )
    }

    // Add the points text
    newLeaves.push(
      <div
        key="points"
        className="leaf-point absolute left-0 text-xl font-bold text-primary"
        style={{
          animationDelay: "100ms",
          animation: "pulse 1s ease-in-out infinite",
        }}
      >
        +{points}
      </div>,
    )

    // Add message if provided
    if (message) {
      newLeaves.push(
        <div
          key="message"
          className="leaf-point p-2 text-sm text-muted-foreground flex items-center justify-center"
          style={{
            animationDelay: "200ms",
            animation: "fade-in 0.5s ease-in-out forwards",
          }}
        >
          <pre className="text-sm text-white whitespace-pre-wrap">{message}</pre>
        </div>,
      )
    }

    setLeaves(newLeaves)

    // Add animation keyframes if they don't exist
    if (!document.getElementById("reward-animation-keyframes")) {
      const style = document.createElement("style")
      style.id = "reward-animation-keyframes"
      style.innerHTML = `
        @keyframes float-up {
          0% { transform: translateY(20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-40px) rotate(var(--rotation)); opacity: 0; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `
      document.head.appendChild(style)
    }

    // Clean up
    const timer = setTimeout(() => {
      document.body.removeChild(animationContainer)
      if (onComplete) onComplete()
    }, duration)

    return () => {
      clearTimeout(timer)
      if (document.body.contains(animationContainer)) {
        document.body.removeChild(animationContainer)
      }
    }
  }, [points, duration, onComplete, position, message])

  if (!container) return null

  return createPortal(leaves, container)
}
