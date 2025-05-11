"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface Quest {
  id: string
  title: string
  description: string
  reward: number
  progress: number
  maxProgress: number
  completed: boolean
  expires: string
}

interface DailyQuestProps {
  quest: Quest
  onComplete: (id: string) => void
  className?: string
}

export function DailyQuest({ quest, onComplete, className }: DailyQuestProps) {
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(quest.completed)

  const handleComplete = () => {
    if (isCompleted) return

    setIsCompleting(true)
    setTimeout(() => {
      setIsCompleted(true)
      setIsCompleting(false)
      onComplete(quest.id)
    }, 1000)
  }

  const progressPercentage = (quest.progress / quest.maxProgress) * 100

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium">Quête du jour</h2>
            <p className="text-sm">{quest.title}</p>
            <p className="text-xs text-muted-foreground">{quest.description}</p>

            {!isCompleted && (
              <div className="mt-2 w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-primary h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-1">{isCompleted ? "Complété" : `Expire ${quest.expires}`}</p>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-sm font-medium">
              <span>+{quest.reward}</span>
              <span className="text-primary">🍃</span>
            </div>

            {!isCompleted ? (
              <Button
                size="sm"
                className="mt-2"
                onClick={handleComplete}
                disabled={isCompleting || quest.progress < quest.maxProgress}
              >
                {isCompleting ? "..." : "Compléter"}
              </Button>
            ) : (
              <div className="mt-2 flex items-center text-success">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="text-sm">Complété</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
