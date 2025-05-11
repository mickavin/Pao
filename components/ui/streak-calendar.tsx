import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"

interface StreakDay {
  date: string
  completed: boolean
  current?: boolean
}

interface StreakCalendarProps {
  days: StreakDay[]
  className?: string
  showLabels?: boolean
}

export function StreakCalendar({ days, className, showLabels = true }: StreakCalendarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {showLabels && (
        <div className="streak-calendar">
          {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
            <div key={i} className="flex h-6 items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
      )}

      <div className="streak-calendar">
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "streak-day",
              day.completed ? (day.current ? "streak-day-current" : "streak-day-completed") : "streak-day-missed",
            )}
            title={day.date}
          >
            {day.completed ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          </div>
        ))}
      </div>
    </div>
  )
}
