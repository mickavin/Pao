"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useAccessibility } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { ProgressIndicator } from "@/components/ui/progress-indicator"

interface Medication {
  id: number
  name: string
  dosage: string
  frequency: string
  remainingDays: number
  hasWarning: boolean
  warningMessage?: string
}

interface AccessibleMedicationCardProps {
  medication: Medication
}

export function AccessibleMedicationCard({ medication }: AccessibleMedicationCardProps) {
  const { preferences, speak } = useAccessibility()
  const { simplifiedLayout } = preferences

  const handleCardClick = () => {
    if (preferences.textToSpeech) {
      const text = `${medication.name}, ${medication.dosage}, ${medication.frequency}, ${medication.remainingDays} jours restants${medication.hasWarning ? `. Attention : ${medication.warningMessage}` : ""}`
      speak(text)
    }
  }

  // Get status for emoji indicator
  const getStatusType = () => {
    if (medication.hasWarning) return "warning"
    if (medication.remainingDays < 7) return "low"
    return "ok"
  }

  return (
    <Link key={medication.id} href={`/medications/${medication.id}`} onClick={handleCardClick}>
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-soft-lg",
          medication.hasWarning ? "border-warning/30" : medication.remainingDays < 7 ? "border-accent/30" : "",
          simplifiedLayout && "border-2",
        )}
      >
        <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2.5 rounded-full bg-primary/10 text-primary",
                  medication.hasWarning && "bg-warning/10 text-warning",
                  medication.remainingDays < 7 && !medication.hasWarning && "bg-accent/10 text-accent",
                  simplifiedLayout && "p-3",
                )}
              >
                {simplifiedLayout ? (
                  <span className="text-xl" aria-hidden="true">
                    {medication.hasWarning ? "⚠️" : medication.remainingDays < 7 ? "📅" : "💊"}
                  </span>
                ) : (
                  <Pill className="h-5 w-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={cn("font-medium", simplifiedLayout && "text-lg font-semibold")}>{medication.name}</h3>
                  <Badge
                    variant="outline"
                    className={cn("text-xs font-normal rounded-full px-2", simplifiedLayout && "text-sm")}
                  >
                    {medication.dosage}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{medication.frequency}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span
                className={cn(
                  "text-sm font-medium",
                  simplifiedLayout && "text-base",
                  medication.remainingDays < 7 && "text-accent font-semibold",
                )}
              >
                {medication.remainingDays} jours restants
              </span>

              {medication.hasWarning && (
                <div className="flex items-center text-xs text-warning gap-1 mt-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span className={cn(simplifiedLayout && "text-sm font-medium")}>{medication.warningMessage}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <ProgressIndicator
              value={medication.remainingDays}
              max={30}
              size="sm"
              color={medication.hasWarning ? "warning" : medication.remainingDays < 7 ? "accent" : "primary"}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
