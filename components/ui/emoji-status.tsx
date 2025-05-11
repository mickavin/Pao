import { cn } from "@/lib/utils"

type MoodType = "great" | "good" | "neutral" | "bad" | "awful"
type PainType = "none" | "mild" | "moderate" | "severe" | "extreme"
type EnergyType = "energetic" | "good" | "neutral" | "tired" | "exhausted"
type SleepType = "excellent" | "good" | "fair" | "poor" | "terrible"

interface EmojiStatusProps {
  type: "mood" | "pain" | "energy" | "sleep"
  value: MoodType | PainType | EnergyType | SleepType
  size?: "sm" | "md" | "lg"
  withLabel?: boolean
  className?: string
}

const moodEmojis: Record<MoodType, { emoji: string; label: string; color: string }> = {
  great: { emoji: "😊", label: "Super", color: "bg-success/10 text-success" },
  good: { emoji: "🙂", label: "Bien", color: "bg-secondary/10 text-secondary" },
  neutral: { emoji: "😐", label: "Moyen", color: "bg-primary/10 text-primary" },
  bad: { emoji: "😔", label: "Pas bien", color: "bg-warning/10 text-warning" },
  awful: { emoji: "😣", label: "Terrible", color: "bg-destructive/10 text-destructive" },
}

const painEmojis: Record<PainType, { emoji: string; label: string; color: string }> = {
  none: { emoji: "😌", label: "Aucune", color: "bg-success/10 text-success" },
  mild: { emoji: "😕", label: "Légère", color: "bg-secondary/10 text-secondary" },
  moderate: { emoji: "😣", label: "Modérée", color: "bg-primary/10 text-primary" },
  severe: { emoji: "😖", label: "Sévère", color: "bg-warning/10 text-warning" },
  extreme: { emoji: "😫", label: "Extrême", color: "bg-destructive/10 text-destructive" },
}

const energyEmojis: Record<EnergyType, { emoji: string; label: string; color: string }> = {
  energetic: { emoji: "⚡", label: "Énergique", color: "bg-success/10 text-success" },
  good: { emoji: "😊", label: "Bonne", color: "bg-secondary/10 text-secondary" },
  neutral: { emoji: "😐", label: "Moyenne", color: "bg-primary/10 text-primary" },
  tired: { emoji: "😴", label: "Fatigué", color: "bg-warning/10 text-warning" },
  exhausted: { emoji: "🥱", label: "Épuisé", color: "bg-destructive/10 text-destructive" },
}

const sleepEmojis: Record<SleepType, { emoji: string; label: string; color: string }> = {
  excellent: { emoji: "😴", label: "Excellent", color: "bg-success/10 text-success" },
  good: { emoji: "🛌", label: "Bon", color: "bg-secondary/10 text-secondary" },
  fair: { emoji: "😐", label: "Moyen", color: "bg-primary/10 text-primary" },
  poor: { emoji: "😫", label: "Mauvais", color: "bg-warning/10 text-warning" },
  terrible: { emoji: "😩", label: "Terrible", color: "bg-destructive/10 text-destructive" },
}

export function EmojiStatus({ type, value, size = "md", withLabel = false, className }: EmojiStatusProps) {
  let emojiData: { emoji: string; label: string; color: string }

  switch (type) {
    case "mood":
      emojiData = moodEmojis[value as MoodType]
      break
    case "pain":
      emojiData = painEmojis[value as PainType]
      break
    case "energy":
      emojiData = energyEmojis[value as EnergyType]
      break
    case "sleep":
      emojiData = sleepEmojis[value as SleepType]
      break
    default:
      emojiData = { emoji: "❓", label: "Inconnu", color: "bg-muted text-muted-foreground" }
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className={cn(
          "emoji-status flex items-center justify-center rounded-full",
          emojiData.color,
          size === "sm" && "h-6 w-6 text-sm",
          size === "md" && "h-8 w-8 text-base",
          size === "lg" && "h-10 w-10 text-lg",
        )}
      >
        <span role="img" aria-label={emojiData.label}>
          {emojiData.emoji}
        </span>
      </div>
      {withLabel && <span className="text-sm font-medium">{emojiData.label}</span>}
    </div>
  )
}
