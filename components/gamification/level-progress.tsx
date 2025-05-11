"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RewardToken } from "@/components/ui/reward-token"
import { PandaMascot } from "@/components/ui/panda-mascot"

interface LevelProgressProps {
  level: number
  experience: number
  experienceToNextLevel: number
  tokens: number
  showMascot?: boolean
}

export function LevelProgress({
  level,
  experience,
  experienceToNextLevel,
  tokens,
  showMascot = false,
}: LevelProgressProps) {
  const progressPercentage = Math.min(100, (experience / experienceToNextLevel) * 100)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium">Niveau {level}</h2>
          <RewardToken count={tokens} size="sm" />
        </div>

        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-primary h-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-1">
          <p className="text-sm text-muted-foreground">
            {experience}/{experienceToNextLevel} XP pour le niveau {level + 1}
          </p>
          <p className="text-sm font-medium">{Math.round(progressPercentage)}%</p>
        </div>

        {showMascot && (
          <div className="mt-3 flex justify-center">
            <PandaMascot
              message={`Continue comme ça ! Plus que ${experienceToNextLevel - experience} XP pour le niveau ${
                level + 1
              } !`}
              size="sm"
              mood="happy"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
