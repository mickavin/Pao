"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"
import { useLocalStorage } from "./hooks/use-local-storage"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}

export type ColorMode = "light" | "dark" | "system"
export type HighContrastMode = "none" | "high-contrast-dark" | "high-contrast-light"
export type TextSize = "default" | "large" | "x-large"
export type ReducedMotion = boolean
export type SimplifiedLayout = boolean

export interface AccessibilityPreferences {
  theme: ColorMode
  highContrast: HighContrastMode
  textSize: TextSize
  reducedMotion: ReducedMotion
  simplifiedLayout: SimplifiedLayout
  screenReader: boolean
  textToSpeech: boolean
}

export const defaultAccessibilityPreferences: AccessibilityPreferences = {
  theme: "system",
  highContrast: "none",
  textSize: "default",
  reducedMotion: false,
  simplifiedLayout: false,
  screenReader: false,
  textToSpeech: false,
}

export const AccessibilityContext = React.createContext<{
  preferences: AccessibilityPreferences
  setPreferences: (prefs: Partial<AccessibilityPreferences>) => void
  resetPreferences: () => void
  speak: (text: string) => void
  stopSpeaking: () => void
}>({
  preferences: defaultAccessibilityPreferences,
  setPreferences: () => {},
  resetPreferences: () => {},
  speak: () => {},
  stopSpeaking: () => {},
})

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Load saved preferences from localStorage
  if (typeof window === "undefined") return null
  const [preferences, setPreferencesState] = useLocalStorage<AccessibilityPreferences>(
    "pao-accessibility",
    defaultAccessibilityPreferences,
  )

  // Speech synthesis instance
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  // Initialize speech synthesis on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSynthesis(window.speechSynthesis)
    }
  }, [])

  // Update body classes when preferences change
  useEffect(() => {
    if (typeof document === "undefined") return

    // Apply text size
    document.documentElement.classList.remove("text-size-default", "text-size-large", "text-size-x-large")
    document.documentElement.classList.add(`text-size-${preferences.textSize}`)

    // Apply high contrast
    document.documentElement.classList.remove("high-contrast-dark", "high-contrast-light")
    if (preferences.highContrast !== "none") {
      document.documentElement.classList.add(preferences.highContrast)
    }

    // Apply reduced motion
    if (preferences.reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }

    // Apply simplified layout
    if (preferences.simplifiedLayout) {
      document.documentElement.classList.add("simplified-layout")
    } else {
      document.documentElement.classList.remove("simplified-layout")
    }
  }, [preferences])

  // Update preferences
  const setPreferences = React.useCallback(
    (newPrefs: Partial<AccessibilityPreferences>) => {
      setPreferencesState((prev) => ({ ...prev, ...newPrefs }))
    },
    [setPreferencesState],
  )

  // Reset to defaults
  const resetPreferences = React.useCallback(() => {
    setPreferencesState(defaultAccessibilityPreferences)
  }, [setPreferencesState])

  // Text-to-speech function
  const speak = React.useCallback(
    (text: string) => {
      if (preferences.textToSpeech && speechSynthesis) {
        // Cancel any ongoing speech
        speechSynthesis.cancel()

        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text)

        // Set language to French
        utterance.lang = "fr-FR"

        // Speak the text
        speechSynthesis.speak(utterance)
      }
    },
    [preferences.textToSpeech, speechSynthesis],
  )

  // Stop speaking
  const stopSpeaking = React.useCallback(() => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
    }
  }, [speechSynthesis])

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        setPreferences,
        resetPreferences,
        speak,
        stopSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

// Hook to use accessibility preferences
export function useAccessibility() {
  const context = React.useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
