"use client"

import * as React from "react"
import { AccessibilityIcon, ChevronDown, EyeOff, Type, Volume2, Sparkles, Moon, Sun, Computer } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/components/theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function AccessibilityControls() {
  const { preferences, setPreferences, stopSpeaking } = useAccessibility()
  const { setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [menuFailed, setMenuFailed] = React.useState(false)
  const featureCount = Object.values(preferences).filter(Boolean).length - 1 // Subtract theme which is always set

  // Stop any speech when the menu closes
  React.useEffect(() => {
    if (!isOpen) {
      stopSpeaking()
    }
  }, [isOpen, stopSpeaking])

  // Fallback mechanism - if dropdown fails to open after a click, use dialog instead
  const handleButtonClick = () => {
    setDialogOpen(true)
  }

  // Monitor if dropdown fails to open
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleOpenChange = (open: boolean) => {
      if (open) {
        // Clear any existing timeout
        if (timeoutId) clearTimeout(timeoutId)

        // Set a timeout to check if the menu actually opened
        timeoutId = setTimeout(() => {
          // If we're still trying to open but it's not open, mark as failed
          if (!isOpen) {
            setMenuFailed(true)
          }
        }, 500)
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isOpen])

  // Shared accessibility options component
  const AccessibilityOptions = ({ inDialog = false }: { inDialog?: boolean }) => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium mb-2">Taille du texte</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`text-default-${inDialog ? "dialog" : "dropdown"}`}
                checked={preferences.textSize === "default"}
                onChange={() => setPreferences({ textSize: "default" })}
                className="min-h-4 min-w-4 m-0 h-4 w-4"
              />
              <label
                htmlFor={`text-default-${inDialog ? "dialog" : "dropdown"}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Type className="min-h-4 min-w-4 m-0 h-4 w-4" />
                <span>Standard</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`text-large-${inDialog ? "dialog" : "dropdown"}`}
                checked={preferences.textSize === "large"}
                onChange={() => setPreferences({ textSize: "large" })}
                className="min-h-4 min-w-4 m-0 h-4 w-4"
              />
              <label
                htmlFor={`text-large-${inDialog ? "dialog" : "dropdown"}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Type className="h-5 w-5" />
                <span className="text-lg">Grand</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`text-x-large-${inDialog ? "dialog" : "dropdown"}`}
                checked={preferences.textSize === "x-large"}
                onChange={() => setPreferences({ textSize: "x-large" })}
                className="min-h-4 min-w-4 m-0 h-4 w-4"
              />
              <label
                htmlFor={`text-x-large-${inDialog ? "dialog" : "dropdown"}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Type className="h-6 w-6" />
                <span className="text-xl">Très grand</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium mb-2">Thème</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`theme-light-${inDialog ? "dialog" : "dropdown"}`}
                checked={preferences.theme === "light"}
                onChange={() => {
                  setPreferences({ theme: "light" })
                  setTheme("light")
                }}
                className="min-h-4 min-w-4 m-0 h-4 w-4"
              />
              <label
                htmlFor={`theme-light-${inDialog ? "dialog" : "dropdown"}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Sun className="min-h-4 min-w-4 m-0 h-4 w-4" />
                <span>Clair</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`theme-dark-${inDialog ? "dialog" : "dropdown"}`}
                checked={preferences.theme === "dark"}
                onChange={() => {
                  setPreferences({ theme: "dark" })
                  setTheme("dark")
                }}
                className="min-h-4 min-w-4 m-0 h-4 w-4"
              />
              <label
                htmlFor={`theme-dark-${inDialog ? "dialog" : "dropdown"}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Moon className="min-h-4 min-w-4 m-0 h-4 w-4" />
                <span>Sombre</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`theme-system-${inDialog ? "dialog" : "dropdown"}`}
                checked={preferences.theme === "system"}
                onChange={() => {
                  setPreferences({ theme: "system" })
                  setTheme("system")
                }}
                className="min-h-4 min-w-4 m-0 h-4 w-4"
              />
              <label
                htmlFor={`theme-system-${inDialog ? "dialog" : "dropdown"}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Computer className="min-h-4 min-w-4 m-0 h-4 w-4" />
                <span>Système</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`contrast-${inDialog ? "dialog" : "dropdown"}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <EyeOff className="min-h-4 min-w-4 m-0 h-4 w-4" />
              <span>Contraste élevé</span>
            </label>
            <input
              type="checkbox"
              id={`contrast-${inDialog ? "dialog" : "dropdown"}`}
              checked={preferences.highContrast !== "none"}
              onChange={() =>
                setPreferences({
                  highContrast: preferences.highContrast === "none" ? "high-contrast-light" : "none",
                })
              }
              className="min-h-4 min-w-4 m-0 h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor={`simplified-${inDialog ? "dialog" : "dropdown"}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="min-h-4 min-w-4 m-0 h-4 w-4" />
              <span>Interface simplifiée</span>
            </label>
            <input
              type="checkbox"
              id={`simplified-${inDialog ? "dialog" : "dropdown"}`}
              checked={preferences.simplifiedLayout}
              onChange={() =>
                setPreferences({
                  simplifiedLayout: !preferences.simplifiedLayout,
                })
              }
              className="min-h-4 min-w-4 m-0 h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor={`speech-${inDialog ? "dialog" : "dropdown"}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="min-h-4 min-w-4 m-0 h-4 w-4" />
              <span>Synthèse vocale</span>
            </label>
            <input
              type="checkbox"
              id={`speech-${inDialog ? "dialog" : "dropdown"}`}
              checked={preferences.textToSpeech}
              onChange={() =>
                setPreferences({
                  textToSpeech: !preferences.textToSpeech,
                })
              }
              className="min-h-4 min-w-4 m-0 h-4 w-4"
            />
          </div>
        </div>

        {inDialog && (
          <div className="mt-4">
            <Link href="/accessibility">
              <Button className="w-full">Tous les paramètres d'accessibilité</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
      {/* Primary dropdown implementation - commented out to use dialog by default */}
      {/*
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-background shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleButtonClick}
            aria-label="Options d'accessibilité"
          >
            <AccessibilityIcon className="h-5 w-5" />
            {featureCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                variant="destructive"
              >
                {featureCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 rounded-xl p-4">
          <DropdownMenuLabel>Options d'accessibilité</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="py-2">
            <AccessibilityOptions inDialog={false} />
          </div>
          <DropdownMenuSeparator />
          <Link href="/accessibility" passHref legacyBehavior>
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <Sparkles className="mr-2 min-h-4 min-w-4 m-0 h-4 w-4" />
              Tous les paramètres
              <ChevronDown className="ml-auto min-h-4 min-w-4 m-0 h-4 w-4 -rotate-90" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      */}

      {/* Use dialog by default */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-background shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleButtonClick}
            aria-label="Options d'accessibilité"
          >
            <AccessibilityIcon className="h-5 w-5" />
            {featureCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                variant="destructive"
              >
                {featureCount}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Options d'accessibilité</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <AccessibilityOptions inDialog={true} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
