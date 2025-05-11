"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sparkles, Type, Volume2 } from "lucide-react"
import { useAccessibility } from "@/components/theme-provider"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from "./hooks/use-local-storage"

export function AccessibilityOnboarding() {
  if (typeof window === "undefined") return null
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage("pao-a11y-onboarded", false)
  const [open, setOpen] = useState(false)
  const { preferences, setPreferences, speak } = useAccessibility()
  const { setTheme } = useTheme()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setOpen(true)
    }
  }, [hasSeenOnboarding])

  const steps = [
    {
      title: "Bienvenue chez Pao",
      description: "Nous proposons plusieurs fonctionnalités d'accessibilité pour adapter l'application à vos besoins.",
      action: () => {
        if (preferences.textToSpeech) {
          speak(
            "Bienvenue chez Pao. Nous proposons plusieurs fonctionnalités d'accessibilité pour adapter l'application à vos besoins.",
          )
        }
      },
    },
    {
      title: "Mode sombre",
      description: "Activez le mode sombre pour réduire la fatigue oculaire lors de l'utilisation nocturne.",
      icon: Moon,
      action: () => {
        if (preferences.textToSpeech) {
          speak("Mode sombre. Activez le mode sombre pour réduire la fatigue oculaire lors de l'utilisation nocturne.")
        }
      },
      apply: () => {
        setTheme("dark")
        setPreferences({ theme: "dark" })
      },
    },
    {
      title: "Taille du texte",
      description: "Augmentez la taille du texte pour une meilleure lisibilité.",
      icon: Type,
      action: () => {
        if (preferences.textToSpeech) {
          speak("Taille du texte. Augmentez la taille du texte pour une meilleure lisibilité.")
        }
      },
      apply: () => {
        setPreferences({ textSize: "large" })
      },
    },
    {
      title: "Synthèse vocale",
      description: "Activez la synthèse vocale pour entendre les informations importantes.",
      icon: Volume2,
      action: () => {
        if (preferences.textToSpeech) {
          speak("Synthèse vocale. Activez la synthèse vocale pour entendre les informations importantes.")
        }
      },
      apply: () => {
        setPreferences({ textToSpeech: true })
        speak("La synthèse vocale est maintenant activée")
      },
    },
    {
      title: "Interface simplifiée",
      description: "Passez à une interface plus simple avec des éléments plus grands et des pictogrammes.",
      icon: Sparkles,
      action: () => {
        if (preferences.textToSpeech) {
          speak(
            "Interface simplifiée. Passez à une interface plus simple avec des éléments plus grands et des pictogrammes.",
          )
        }
      },
      apply: () => {
        setPreferences({ simplifiedLayout: true })
      },
    },
    {
      title: "C'est terminé !",
      description: "Vous pouvez modifier ces paramètres à tout moment depuis le menu d'accessibilité.",
      action: () => {
        if (preferences.textToSpeech) {
          speak("C'est terminé ! Vous pouvez modifier ces paramètres à tout moment depuis le menu d'accessibilité.")
        }
      },
    },
  ]

  useEffect(() => {
    if (open && steps[step]) {
      steps[step].action?.()
    }
  }, [open, step])

  if (!open) return null

  const currentStep = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) {
      currentStep.apply?.()
      setStep(step + 1)
    } else {
      setHasSeenOnboarding(true)
      setOpen(false)
    }
  }

  const handleNextWithout = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      setHasSeenOnboarding(true)
      setOpen(false)
    }
  }
  const handleSkip = () => {
    setHasSeenOnboarding(true)
    setOpen(false)
  }

  if (hasSeenOnboarding) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{currentStep.title}</CardTitle>
            {currentStep.icon && (
              <div className="p-2 rounded-full bg-primary/10">
                <currentStep.icon className="h-5 w-5 text-primary" />
              </div>
            )}
          </div>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-center my-4">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <Badge key={i} variant={i === step ? "default" : "outline"} className="w-8 h-1 rounded-full p-0" />
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between mr-2">
          <Button variant="outline" onClick={handleSkip}>
            Fermer
          </Button>
          <div className="flex gap-2">
          {
            step == 0 ? (
              <Button onClick={handleNextWithout}>{"Passer"}</Button>
            ) : (
              <>
                <Button variant={step < steps.length - 1 ? "outline" : "default"} onClick={handleNextWithout}>{step < steps.length - 1 ? "Ignorer" : "Terminer"}</Button>
                {step < steps.length - 1 && (
                  <Button onClick={handleNext}>Ajouter</Button>
                )}
              </>
            )
          }


          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
