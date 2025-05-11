"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, Type, Volume2, Sun, Moon, RefreshCw } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAccessibility, type ColorMode, type HighContrastMode, type TextSize } from "@/components/theme-provider"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function AccessibilitySettingsPage() {
  const { preferences, setPreferences, resetPreferences, speak } = useAccessibility()
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme change
  const handleThemeChange = (value: ColorMode) => {
    setPreferences({ theme: value })
    setTheme(value)
  }

  // Handle high contrast change
  const handleHighContrastChange = (value: HighContrastMode) => {
    setPreferences({ highContrast: value })
  }

  // Handle text size change
  const handleTextSizeChange = (value: TextSize) => {
    setPreferences({ textSize: value })
  }

  // Handle toggle changes
  const handleToggleChange = (key: keyof typeof preferences) => (checked: boolean) => {
    setPreferences({ [key]: checked })
  }

  // Function to test text-to-speech
  const testSpeech = () => {
    speak("Ceci est un test de lecture vocale sur l'application Pao.")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Retour</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Accessibilité</h1>
        </div>
        <Button onClick={resetPreferences} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Apparence</CardTitle>
          <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-3">Thème</h3>
              <RadioGroup
                value={preferences.theme}
                onValueChange={(value) => handleThemeChange(value as ColorMode)}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer">
                    <Sun className="h-4 w-4" />
                    <span>Clair</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer">
                    <Moon className="h-4 w-4" />
                    <span>Sombre</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system" className="flex items-center gap-2 cursor-pointer">
                    <span>💻</span>
                    <span>Suivre les préférences système</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3">Contraste élevé</h3>
              <RadioGroup
                value={preferences.highContrast}
                onValueChange={(value) => handleHighContrastChange(value as HighContrastMode)}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="contrast-none" />
                  <Label htmlFor="contrast-none" className="flex items-center gap-2 cursor-pointer">
                    <span>Standard</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high-contrast-light" id="contrast-light" />
                  <Label htmlFor="contrast-light" className="flex items-center gap-2 cursor-pointer">
                    <Eye className="h-4 w-4" />
                    <span>Contraste élevé (clair)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high-contrast-dark" id="contrast-dark" />
                  <Label htmlFor="contrast-dark" className="flex items-center gap-2 cursor-pointer">
                    <Eye className="h-4 w-4" />
                    <span>Contraste élevé (sombre)</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3">Taille du texte</h3>
              <div className="grid gap-2">
                <RadioGroup
                  value={preferences.textSize}
                  onValueChange={(value) => handleTextSizeChange(value as TextSize)}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="text-default" />
                    <Label htmlFor="text-default" className="flex items-center gap-2 cursor-pointer">
                      <Type className="h-4 w-4" />
                      <span>Standard</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="text-large" />
                    <Label htmlFor="text-large" className="flex items-center gap-2 cursor-pointer">
                      <Type className="h-5 w-5" />
                      <span className="text-lg">Grand</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="x-large" id="text-x-large" />
                    <Label htmlFor="text-x-large" className="flex items-center gap-2 cursor-pointer">
                      <Type className="h-6 w-6" />
                      <span className="text-xl">Très grand</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Options d'accessibilité</CardTitle>
          <CardDescription>Personnalisez l'expérience pour améliorer l'accessibilité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="reduced-motion" className="flex flex-col space-y-1">
              <span className="font-medium">Réduire les animations</span>
              <span className="font-normal text-sm text-muted-foreground">
                Limite les animations et les transitions
              </span>
            </Label>
            <Switch
              id="reduced-motion"
              checked={preferences.reducedMotion}
              onCheckedChange={handleToggleChange("reducedMotion")}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="simplified-layout" className="flex flex-col space-y-1">
              <span className="font-medium">Interface simplifiée</span>
              <span className="font-normal text-sm text-muted-foreground">
                Afficher une interface épurée avec des éléments plus grands
              </span>
            </Label>
            <Switch
              id="simplified-layout"
              checked={preferences.simplifiedLayout}
              onCheckedChange={handleToggleChange("simplifiedLayout")}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="screen-reader" className="flex flex-col space-y-1">
              <span className="font-medium">Optimisé pour lecteur d'écran</span>
              <span className="font-normal text-sm text-muted-foreground">
                Améliore la compatibilité avec les lecteurs d'écran
              </span>
            </Label>
            <Switch
              id="screen-reader"
              checked={preferences.screenReader}
              onCheckedChange={handleToggleChange("screenReader")}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="text-to-speech" className="flex flex-col space-y-1">
                <span className="font-medium">Synthèse vocale</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Lire à haute voix le contenu et les notifications
                </span>
              </Label>
              <Switch
                id="text-to-speech"
                checked={preferences.textToSpeech}
                onCheckedChange={handleToggleChange("textToSpeech")}
              />
            </div>
            {preferences.textToSpeech && (
              <Button variant="outline" size="sm" onClick={testSpeech} className="mt-2">
                <Volume2 className="h-4 w-4 mr-2" />
                Tester la synthèse vocale
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Aide à l'accessibilité</h3>
            <p className="text-sm text-muted-foreground">
              Si vous rencontrez des difficultés à utiliser l'application, contactez notre équipe de support pour
              obtenir de l'aide.
            </p>
            <Button variant="outline" className="mt-2 w-full sm:w-auto">
              Contacter le support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
