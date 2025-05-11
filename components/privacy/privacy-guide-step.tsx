import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PrivacyGuideStepProps {
  number: number
  title: string
  description: string
  icon: LucideIcon
  active: boolean
  completed: boolean
}

export function PrivacyGuideStep({ number, title, description, icon: Icon, active, completed }: PrivacyGuideStepProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-colors",
        active ? "border-primary/30 bg-primary/5" : "border-muted",
        completed ? "border-primary/20 bg-primary/5" : "",
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          active ? "bg-primary text-white" : "bg-muted text-muted-foreground",
          completed ? "bg-primary/20 text-primary" : "",
        )}
      >
        {completed ? <Icon className="h-4 w-4" /> : <span className="text-sm font-medium">{number}</span>}
      </div>
      <div>
        <h3 className={cn("font-medium", active ? "text-primary" : "")}>{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  )
}
