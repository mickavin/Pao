"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AchievementBadge } from "@/components/ui/achievement-badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Confetti } from "@/components/ui/confetti"
import { CheckCircle2 } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: "trophy" | "medal" | "star" | "check" | "award"
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "outline"
  level?: number
  progress?: number
  maxProgress?: number
  unlocked: boolean
  rewardPoints?: number
}

interface AchievementCardProps {
  achievement: Achievement
  onClaim?: (id: string) => void
  className?: string
}

export function AchievementCard({ achievement, onClaim, className }: AchievementCardProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    if (onClaim && !claimed) {
      setShowConfetti(true)
      setClaimed(true)
      onClaim(achievement.id)
    }
  }

  const progress =
    achievement.progress !== undefined && achievement.maxProgress
      ? Math.round((achievement.progress / achievement.maxProgress) * 100)
      : undefined

  return (
    <>
      {showConfetti && <Confetti count={80} onComplete={() => setShowConfetti(false)} />}

      <Card
        className={cn(
          "overflow-hidden transition-all duration-300",
          achievement.unlocked ? "border-primary/30" : "border-muted",
          className,
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <AchievementBadge
              icon={achievement.icon}
              variant={achievement.variant || "primary"}
              level={achievement.level}
              locked={!achievement.unlocked}
              size="md"
            />

            <div className="flex-1">
              <h3 className="font-medium">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>

              {progress !== undefined && (
                <div className="mt-2">
                  <div className="progress-bar">
                    <div className="progress-bar-fill bg-gradient-primary" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {achievement.progress} / {achievement.maxProgress} ({progress}%)
                  </p>
                </div>
              )}
            </div>

            {achievement.unlocked && achievement.rewardPoints && !claimed && (
              <Button size="sm" onClick={handleClaim} className="flex items-center gap-1">
                <span>+{achievement.rewardPoints}</span>
                <span className="text-xs">🍃</span>
              </Button>
            )}

            {claimed && <CheckCircle2 className="h-5 w-5 text-success" width={50} height={50}/>}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
