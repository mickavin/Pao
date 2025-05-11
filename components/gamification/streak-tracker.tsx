import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StreakDay {
  date: string
  completed: boolean
  current?: boolean
}

interface StreakTrackerProps {
  currentStreak: number
  bestStreak: number
  days: StreakDay[]
  className?: string
}

export function StreakTracker({ currentStreak, bestStreak, days, className }: StreakTrackerProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-medium">Série actuelle: {currentStreak} jours</h2>
            <p className="text-xs text-muted-foreground">Meilleure série: {bestStreak} jours</p>
          </div>
          <span className="text-2xl">🔥</span>
        </div>

        <div className="flex justify-between">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  day.completed ? "bg-primary text-primary-foreground" : "bg-muted",
                  day.current && "ring-2 ring-offset-2 ring-primary",
                )}
              >
                {day.completed ? "✓" : ""}
              </div>
              <span className="text-xs mt-1">{new Date(day.date).getDate()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
