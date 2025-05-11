"use client"

import { useEffect, useRef } from "react"

interface ConfettiProps {
  active?: boolean
  count?: number
  duration?: number
  colors?: string[]
  onComplete?: () => void
}

export function Confetti({
  active = true,
  count = 100,
  duration = 3000,
  colors = ["#7ED6A5", "#A2DDF5", "#FBCFD6", "#FBBF24", "#F87171"],
  onComplete,
}: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasRunRef = useRef(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only run once when active is true
    if (active && !hasRunRef.current) {
      hasRunRef.current = true

      // Create container if it doesn't exist
      if (!containerRef.current) {
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.top = "0"
        container.style.left = "0"
        container.style.width = "100%"
        container.style.height = "100%"
        container.style.pointerEvents = "none"
        container.style.zIndex = "9999"
        document.body.appendChild(container)
        containerRef.current = container
      }

      // Generate confetti pieces
      for (let i = 0; i < count; i++) {
        const piece = document.createElement("div")
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 10 + 5
        const left = Math.random() * 100
        const delay = Math.random() * 500

        piece.className = "confetti-piece"
        piece.style.position = "absolute"
        piece.style.backgroundColor = color
        piece.style.width = `${size}px`
        piece.style.height = `${size}px`
        piece.style.left = `${left}%`
        piece.style.top = "-20px"
        piece.style.borderRadius = "50%"
        piece.style.opacity = "0.8"

        // Add animation
        piece.style.animation = `confetti-fall ${duration * Math.random()}ms ease-in forwards`
        piece.style.animationDelay = `${delay}ms`

        containerRef.current.appendChild(piece)
      }

      // Add animation keyframes if they don't exist
      if (!document.getElementById("confetti-keyframes")) {
        const style = document.createElement("style")
        style.id = "confetti-keyframes"
        style.innerHTML = `
          @keyframes confetti-fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.8;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `
        document.head.appendChild(style)
      }

      // Clean up
      timerRef.current = setTimeout(() => {
        if (containerRef.current && document.body.contains(containerRef.current)) {
          document.body.removeChild(containerRef.current)
          containerRef.current = null
        }
        hasRunRef.current = false
        if (onComplete) onComplete()
      }, duration + 1000)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current)
        containerRef.current = null
      }
    }
  }, [active, count, colors, duration, onComplete]) // Include all dependencies

  return null // Component doesn't render anything directly
}
