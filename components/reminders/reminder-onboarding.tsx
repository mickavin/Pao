"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NotificationPermissionRequest } from "@/components/reminders/notification-permission-request"
import { ReminderSetupModal, type ReminderSettings } from "@/components/reminders/reminder-setup-modal"
import { Bell, Clock, CheckCircle2 } from "lucide-react"
import { useLocalStorage } from "@/components/hooks/use-local-storage"
import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/theme-provider"

interface ReminderOnboardingProps {
  onComplete?: () => void
  className?: string
}

export function ReminderOnboarding({ onComplete, className }: ReminderOnboardingProps) {
  if (typeof window === "undefined") return null
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useLocalStorage("pao-reminder-onboarded", false)
  const [step, setStep] = useState(hasCompletedOnboarding ? 3 : 0)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings | null>(null)
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  const handlePermissionComplete = (granted: boolean) => {
    setPermissionGranted(granted)
    setStep(1)
  }

  const handleReminderSave = (settings: ReminderSettings) => {
    setReminderSettings(settings)
    setStep(2)
  }

  const handleComplete = () => {
    setHasCompletedOnboarding(true)
    setStep(3)
    if (onComplete) {
      onComplete()
    }
  }

  if (step === 3 || hasCompletedOnboarding) {
    return null
  }

  return (
    <div className={cn("p-4", className)}>
      {step === 0 && <NotificationPermissionRequest onComplete={handlePermissionComplete} />}

      {step === 1 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Configurer vos rappels
              </CardTitle>
              <CardDescription>Programmez des rappels pour ne jamais oublier vos médicaments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  {permissionGranted
                    ? "Excellent ! Vous avez autorisé les notifications. Configurons maintenant vos rappels quotidiens."
                    : "Même sans notifications, vous pouvez configurer des rappels qui s'afficheront lorsque vous ouvrez l'application."}
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
                    <Bell className="h-4 w-4 text-primary" />
                    Rappels recommandés
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>Matin (8h00)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>Midi (12h00)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>Soir (20h00)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Ignorer
              </Button>
              <Button onClick={() => setIsReminderModalOpen(true)} className="flex-1 bg-primary hover:bg-primary/90">
                Configurer
              </Button>
            </CardFooter>
          </Card>

          <ReminderSetupModal
            isOpen={isReminderModalOpen}
            onClose={() => setIsReminderModalOpen(false)}
            onSave={handleReminderSave}
          />
        </>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Configuration terminée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {reminderSettings?.enabled
                ? "Vos rappels ont été configurés avec succès ! Vous recevrez des notifications aux horaires programmés."
                : "Vous avez choisi de ne pas activer les rappels. Vous pourrez les configurer plus tard dans les paramètres."}
            </p>

            {reminderSettings?.enabled && (
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-success" />
                  Rappels programmés
                </h4>
                <ul className="space-y-2 text-sm">
                  {reminderSettings.times.map((time, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleComplete}
              className={cn("w-full bg-primary hover:bg-primary/90", simplifiedLayout && "py-6")}
            >
              Continuer
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
