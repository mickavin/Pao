"use client"
import { Button } from "@/components/ui/button"
import { Clock, Check, X } from "lucide-react"
import { useAccessibility } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

interface Reminder {
  id: number
  time: string
  medication: string
  taken: boolean | null
  upcoming?: boolean
}

interface AccessibleReminderProps {
  reminder: Reminder
  onTaken?: (id: number) => void
  onSkipped?: (id: number) => void
}

export function AccessibleReminder({ reminder, onTaken, onSkipped }: AccessibleReminderProps) {
  const { preferences, speak } = useAccessibility()
  const { simplifiedLayout } = preferences

  const handleVoiceOver = () => {
    if (preferences.textToSpeech) {
      const status = reminder.upcoming ? "à prendre à " + reminder.time : reminder.taken ? "pris" : "non pris"
      speak(`${reminder.medication}, ${status}`)
    }
  }

  const handleTaken = () => {
    if (onTaken) onTaken(reminder.id)
    if (preferences.textToSpeech) {
      speak("Médicament marqué comme pris")
    }
  }

  const handleSkipped = () => {
    if (onSkipped) onSkipped(reminder.id)
    if (preferences.textToSpeech) {
      speak("Médicament marqué comme non pris")
    }
  }

  // Emojis for simplified mode
  const getStatusEmoji = () => {
    if (reminder.upcoming) return "⏰"
    if (reminder.taken) return "✅"
    return "❌"
  }

  return (
    <div
      key={reminder.id}
      className={cn(
        `flex items-center justify-between p-3 rounded-lg border`,
        reminder.upcoming ? "bg-muted" : "bg-card",
        simplifiedLayout && "p-4 border-2",
      )}
      onClick={handleVoiceOver}
      onFocus={handleVoiceOver}
      tabIndex={0}
      role="group"
      aria-label={`Rappel pour ${reminder.medication} à ${reminder.time}, ${
        reminder.upcoming ? "à venir" : reminder.taken ? "pris" : "non pris"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            `p-2 rounded-full ${
              reminder.upcoming
                ? "bg-primary/10 text-primary"
                : reminder.taken
                  ? "bg-secondary/10 text-secondary"
                  : "bg-accent/10 text-accent"
            }`,
            simplifiedLayout && "p-3",
          )}
        >
          {simplifiedLayout ? (
            <span className="text-xl" aria-hidden="true">
              {getStatusEmoji()}
            </span>
          ) : reminder.upcoming ? (
            <Clock className="h-5 w-5" />
          ) : reminder.taken ? (
            <Check className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </div>
        <div>
          <p className={cn("font-medium", simplifiedLayout && "text-lg font-semibold")}>{reminder.medication}</p>
          <p className="text-sm text-muted-foreground">{reminder.time}</p>
        </div>
      </div>

      {reminder.upcoming && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className={cn("h-8 px-2", simplifiedLayout && "h-10 px-3")}
            onClick={handleSkipped}
            aria-label="Marquer comme non pris"
          >
            {simplifiedLayout ? <span aria-hidden="true">❌</span> : <X className="h-4 w-4" />}
            {simplifiedLayout && <span className="ml-1">Non</span>}
          </Button>
          <Button
            size="sm"
            className={cn("h-8 px-2 bg-secondary hover:bg-secondary/90", simplifiedLayout && "h-10 px-3")}
            onClick={handleTaken}
            aria-label="Marquer comme pris"
          >
            {simplifiedLayout ? <span aria-hidden="true">✅</span> : <Check className="h-4 w-4" />}
            {simplifiedLayout && <span className="ml-1">Pris</span>}
          </Button>
        </div>
      )}
    </div>
  )
}
