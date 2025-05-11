"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Check, X } from "lucide-react"
import { Confetti } from "@/components/ui/confetti"
import { AnimatedFeedback } from "@/components/ui/animated-feedback"
import { cn } from "@/lib/utils"

const initialReminders = [
  {
    id: 1,
    time: "08:00",
    medication: "Doliprane 1000mg",
    taken: true,
  },
  {
    id: 2,
    time: "13:00",
    medication: "Levothyrox 75µg",
    taken: false,
  },
  {
    id: 3,
    time: "20:00",
    medication: "Doliprane 1000mg",
    taken: null,
    upcoming: true,
  },
]

export function DailyReminders() {
  const [reminders, setReminders] = useState(initialReminders)
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "warning" | null; message: string }>({
    type: null,
    message: "",
  })

  const handleTaken = (id: number) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, taken: true, upcoming: false } : reminder)),
    )

    // First set confetti to false to reset the component state
    setShowConfetti(false)

    // Use setTimeout to ensure state update has completed before showing confetti again
    setTimeout(() => {
      setShowConfetti(true)
    }, 10)

    setFeedback({
      type: "success",
      message: "Bravo ! Continue comme ça 👏",
    })
  }

  const handleSkipped = (id: number) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, taken: false, upcoming: false } : reminder)),
    )
    setFeedback({
      type: "warning",
      message: "Pas de souci, on continue ensemble 💪",
    })
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-4">Rappels du jour</h3>
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-300 md:flex-row flex-col",
                  reminder.upcoming
                    ? "bg-muted/50 border-primary/20"
                    : reminder.taken
                      ? "bg-success/5 border-success/20"
                      : "bg-warning/5 border-warning/20",
                )}
              >
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <div
                    className={cn(
                      "p-2.5 rounded-full",
                      reminder.upcoming
                        ? "bg-primary/10 text-primary"
                        : reminder.taken
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning",
                    )}
                  >
                    {reminder.upcoming ? (
                      <Clock className="h-5 w-5" />
                    ) : reminder.taken ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{reminder.medication}</p>
                    <p className="text-sm text-muted-foreground">{reminder.time}</p>
                  </div>
                </div>

                {reminder.upcoming && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 px-3 rounded-xl"
                      onClick={() => handleSkipped(reminder.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      <span>Passer</span>
                    </Button>
                    <Button
                      size="sm"
                      className="h-9 px-3 bg-success hover:bg-success/90 rounded-xl"
                      onClick={() => handleTaken(reminder.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      <span>Pris</span>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {reminders.every((r) => !r.upcoming) && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Tous les rappels du jour sont traités. Bravo pour ton suivi ! 🎉
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Confetti active={showConfetti} count={80} onComplete={() => setShowConfetti(false)} />

      <AnimatedFeedback
        type={feedback.type}
        message={feedback.message}
        onComplete={() => setFeedback({ type: null, message: "" })}
      />
    </>
  )
}
