"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Calendar, Clock, Volume2, Vibrate } from "lucide-react"
import { useAccessibility } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import notificationService from "@/lib/notification-service"
import type { Medication } from "@/lib/types"

interface ReminderSetupModalProps {
  medication?: Medication
  isOpen: boolean
  onClose: () => void
  onSave: (reminderSettings: ReminderSettings) => void
}

export interface ReminderSettings {
  enabled: boolean
  times: string[]
  frequency: "daily" | "weekly" | "specific-days" | "monthly"
  specificDays?: number[] // 0 = Sunday, 1 = Monday, etc.
  customMessage?: string
  sound: boolean
  vibration: boolean
  icon?: string
}

const defaultSettings: ReminderSettings = {
  enabled: true,
  times: ["08:00"],
  frequency: "daily",
  specificDays: [1, 2, 3, 4, 5, 6, 0], // All days by default
  customMessage: "",
  sound: true,
  vibration: true,
  icon: "/icons/pill-icon.png",
}

const daysOfWeek = [
  { value: 1, label: "Lun" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Mer" },
  { value: 4, label: "Jeu" },
  { value: 5, label: "Ven" },
  { value: 6, label: "Sam" },
  { value: 0, label: "Dim" },
]

export function ReminderSetupModal({ medication, isOpen, onClose, onSave }: ReminderSetupModalProps) {
  if (typeof window === "undefined") return null  
  const [settings, setSettings] = useState<ReminderSettings>(() => {
    // If we have a medication, try to load its saved reminder settings
    if (medication?.id) {
      try {
        const savedSettings = localStorage.getItem(`reminder_settings_${medication.id}`)
        if (savedSettings) {
          return JSON.parse(savedSettings)
        }
      } catch (error) {
        console.error("Error loading saved reminder settings:", error)
      }
    }
    return { ...defaultSettings }
  })

  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  const handleAddTime = () => {
    setSettings((prev) => ({
      ...prev,
      times: [...prev.times, ""],
    }))
  }

  const handleRemoveTime = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index),
    }))
  }

  const handleTimeChange = (index: number, value: string) => {
    setSettings((prev) => {
      const newTimes = [...prev.times]
      newTimes[index] = value
      return {
        ...prev,
        times: newTimes,
      }
    })
  }

  const handleDayToggle = (day: number) => {
    setSettings((prev) => {
      const specificDays = prev.specificDays || []
      return {
        ...prev,
        specificDays: specificDays.includes(day) ? specificDays.filter((d) => d !== day) : [...specificDays, day],
      }
    })
  }

  const handleSave = () => {
    if (typeof window === "undefined") return
    // Save to local storage if we have a medication
    if (medication?.id) {
      try {
        localStorage.setItem(`reminder_settings_${medication.id}`, JSON.stringify(settings))
      } catch (error) {
        console.error("Error saving reminder settings:", error)
      }
    }

    // Schedule notifications if enabled
    if (settings.enabled && notificationService.getPermissionStatus() === "granted") {
      const medicationName = medication?.name || "votre médicament"
      const customMessage = settings.customMessage || `Il est temps de prendre ${medicationName}`

      // Cancel any existing notifications for this medication
      if (medication?.id) {
        notificationService.cancelMedicationNotifications(medication.id)
      }

      // Schedule new notifications
      notificationService.scheduleMedicationReminders(
        medication?.id || Math.floor(Math.random() * 1000),
        medicationName,
        settings.times,
        settings.frequency === "weekly" ? "weekly" : settings.frequency === "monthly" ? "monthly" : "daily",
      )
    }

    onSave(settings)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn("max-w-md", simplifiedLayout && "p-6")}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Bell className="h-5 w-5 text-primary" />
            Configurer les rappels
          </DialogTitle>
          <DialogDescription>
            {medication ? `Configurez les rappels pour ${medication.name}` : "Configurez vos rappels de médicaments"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="reminder-enabled" className="flex-1 font-medium">
              Activer les rappels
            </Label>
            <Switch
              id="reminder-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enabled: checked }))}
            />
          </div>

          {settings.enabled && (
            <>
              <div className="space-y-4">
                <Label className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Horaires de rappel
                </Label>
                {settings.times.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className={cn("flex-1", simplifiedLayout && "h-12 text-base")}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveTime(index)}
                      disabled={settings.times.length === 1}
                      className="shrink-0"
                    >
                      <span className="sr-only">Supprimer</span>
                      <span aria-hidden>×</span>
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={handleAddTime} className="w-full mt-2">
                  Ajouter un horaire
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency" className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Fréquence
                </Label>
                <Select
                  value={settings.frequency}
                  onValueChange={(value: "daily" | "weekly" | "specific-days" | "monthly") =>
                    setSettings((prev) => ({ ...prev, frequency: value }))
                  }
                >
                  <SelectTrigger id="frequency" className={cn(simplifiedLayout && "h-12 text-base")}>
                    <SelectValue placeholder="Sélectionner la fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Tous les jours</SelectItem>
                    <SelectItem value="weekly">Toutes les semaines</SelectItem>
                    <SelectItem value="specific-days">Jours spécifiques</SelectItem>
                    <SelectItem value="monthly">Tous les mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {settings.frequency === "specific-days" && (
                <div className="space-y-2">
                  <Label className="font-medium">Jours de la semaine</Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <Button
                        key={day.value}
                        type="button"
                        variant={settings.specificDays?.includes(day.value) ? "default" : "outline"}
                        className="h-10 w-10 p-0 rounded-full"
                        onClick={() => handleDayToggle(day.value)}
                      >
                        {day.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="custom-message" className="font-medium">
                  Message personnalisé (optionnel)
                </Label>
                <Input
                  id="custom-message"
                  placeholder={`Il est temps de prendre ${medication?.name || "votre médicament"}`}
                  value={settings.customMessage}
                  onChange={(e) => setSettings((prev) => ({ ...prev, customMessage: e.target.value }))}
                  className={cn(simplifiedLayout && "h-12 text-base")}
                />
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="font-medium text-sm">Options de notification</h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-enabled" className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    Son
                  </Label>
                  <Switch
                    id="sound-enabled"
                    checked={settings.sound}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, sound: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="vibration-enabled" className="flex items-center gap-2">
                    <Vibrate className="h-4 w-4 text-muted-foreground" />
                    Vibration
                  </Label>
                  <Switch
                    id="vibration-enabled"
                    checked={settings.vibration}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, vibration: checked }))}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
