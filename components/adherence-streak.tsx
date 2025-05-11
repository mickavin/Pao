"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/theme-provider"
import { AchievementBadge } from "@/components/ui/achievement-badge"
import { Award, Calendar, Zap } from "lucide-react"

const streakData = [
  { day: "Lun", completed: true },
  { day: "Mar", completed: true },
  { day: "Mer", completed: true },
  { day: "Jeu", completed: true },
  { day: "Ven", completed: true },
  { day: "Sam", completed: false },
  { day: "Dim", completed: true, current: true },
]

export function AdherenceStreak() {
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  const currentStreak = 5
  const longestStreak = 14
  const totalDays = 42

  return (
    <Card className="overflow-hidden">
      <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Ton parcours</h3>
          <span className="text-sm text-muted-foreground">Jour 42</span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            {streakData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-1 text-xs font-medium",
                    day.completed
                      ? day.current
                        ? "bg-gradient-primary text-white"
                        : "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {day.day[0]}
                </div>
                <span className="text-xs">{day.day}</span>
              </div>
            ))}
          </div>

          <div className="flex pt-2" style={{
              justifyContent: "space-around",
              flexDirection: "row",
              alignItems: "center",
          }}>
            <AchievementBadge
              icon={<Zap className="h-5 w-5 text-primary" />}
              label="Série actuelle"
              description={`${currentStreak} jours consécutifs`}
              color="primary"
            />

            <AchievementBadge
              icon={<Award className="h-5 w-5 text-secondary" />}
              label="Meilleure série"
              description={`${longestStreak} jours consécutifs`}
              color="secondary"
            />

            <AchievementBadge
              icon={<Calendar className="h-5 w-5 text-accent" />}
              label="Parcours total"
              description={`${totalDays} jours de suivi`}
              color="accent"
            />
          </div>

          <div className="pt-2">
            <p className="text-sm text-center text-muted-foreground">
              Chaque jour compte. Continue ton beau parcours ! 💪
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
