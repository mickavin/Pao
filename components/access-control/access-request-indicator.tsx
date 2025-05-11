"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import Link from "next/link"

interface AccessRequestIndicatorProps {
  pendingRequestsCount: number
}

export function AccessRequestIndicator({ pendingRequestsCount }: AccessRequestIndicatorProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (pendingRequestsCount > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [pendingRequestsCount])

  if (pendingRequestsCount === 0) {
    return null
  }

  return (
    <Link href="/access-control">
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-2 border-primary/20 bg-primary/5 ${isAnimating ? "animate-pulse" : ""}`}
      >
        <Bell className="h-4 w-4 text-primary" />
        <span>
          {pendingRequestsCount} demande{pendingRequestsCount > 1 ? "s" : ""} d'accès
        </span>
      </Button>
    </Link>
  )
}
