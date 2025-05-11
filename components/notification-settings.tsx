"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Bell, Info } from "lucide-react"
import notificationService from "@/lib/notification-service"

export function NotificationSettings() {
  if (typeof window === "undefined") return null
  const [permissionStatus, setPermissionStatus] = useState<"default" | "granted" | "denied">("default")
  const [isSupported, setIsSupported] = useState(false)
  const [settings, setSettings] = useState({
    medicationReminders: true,
    missedDoses: true,
    refillReminders: true,
    appointmentReminders: true,
    healthTips: false,
    weeklyReports: true,
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    // Vérifier si les notifications sont supportées
    const supported = notificationService.isSupported()
    setIsSupported(supported)

    if (supported) {
      // Obtenir l'état actuel de la permission
      const status = notificationService.getPermissionStatus()
      setPermissionStatus(status)
    }

    // Charger les paramètres sauvegardés
    try {
      if (typeof window === "undefined") return
      const savedSettings = localStorage.getItem("notificationSettings")
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error("Erreur lors du chargement des paramètres:", error)
    }
  }, [])

  const requestPermission = async () => {
    const permission = await notificationService.requestPermission()
    setPermissionStatus(permission)
  }

  const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [setting]: value }
    setSettings(newSettings)

    // Sauvegarder les paramètres
    try {
      localStorage.setItem("notificationSettings", JSON.stringify(newSettings))
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres:", error)
    }
  }

  const sendTestNotification = () => {
    notificationService.sendNotification("Test de notification", {
      body: "Ceci est une notification de test pour vérifier que tout fonctionne correctement.",
      icon: "/icons/pill-icon.png",
    })
  }

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Notifications non supportées</AlertTitle>
        <AlertDescription>
          Votre navigateur ne supporte pas les notifications push. Veuillez utiliser un navigateur moderne pour
          bénéficier de cette fonctionnalité.
        </AlertDescription>
      </Alert>
    )
  }

  if (permissionStatus === "denied") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Notifications bloquées</AlertTitle>
        <AlertDescription>
          Les notifications sont bloquées pour ce site. Veuillez modifier les paramètres de votre navigateur pour
          autoriser les notifications.
        </AlertDescription>
      </Alert>
    )
  }

  if (permissionStatus === "default") {
    return (
      <div className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Autorisation requise</AlertTitle>
          <AlertDescription>
            Pour recevoir des rappels de médicaments, vous devez autoriser les notifications.
          </AlertDescription>
        </Alert>
        <Button onClick={requestPermission} className="w-full">
          <Bell className="h-4 w-4 mr-2" />
          Autoriser les notifications
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Bell className="h-4 w-4 text-primary" />
        <AlertTitle>Notifications activées</AlertTitle>
        <AlertDescription>
          Vous recevrez des notifications pour vos rappels de médicaments et autres alertes importantes.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="medication-reminders" className="flex-1">
            <span className="font-medium">Rappels de médicaments</span>
            <p className="text-sm text-muted-foreground">Recevoir des rappels pour prendre vos médicaments</p>
          </Label>
          <Switch
            id="medication-reminders"
            checked={settings.medicationReminders}
            onCheckedChange={(checked) => handleSettingChange("medicationReminders", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="missed-doses" className="flex-1">
            <span className="font-medium">Doses manquées</span>
            <p className="text-sm text-muted-foreground">Être notifié si vous oubliez de prendre un médicament</p>
          </Label>
          <Switch
            id="missed-doses"
            checked={settings.missedDoses}
            onCheckedChange={(checked) => handleSettingChange("missedDoses", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="refill-reminders" className="flex-1">
            <span className="font-medium">Rappels de renouvellement</span>
            <p className="text-sm text-muted-foreground">
              Être notifié lorsqu'il est temps de renouveler vos médicaments
            </p>
          </Label>
          <Switch
            id="refill-reminders"
            checked={settings.refillReminders}
            onCheckedChange={(checked) => handleSettingChange("refillReminders", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="appointment-reminders" className="flex-1">
            <span className="font-medium">Rappels de rendez-vous</span>
            <p className="text-sm text-muted-foreground">Recevoir des rappels pour vos rendez-vous médicaux</p>
          </Label>
          <Switch
            id="appointment-reminders"
            checked={settings.appointmentReminders}
            onCheckedChange={(checked) => handleSettingChange("appointmentReminders", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="health-tips" className="flex-1">
            <span className="font-medium">Conseils santé</span>
            <p className="text-sm text-muted-foreground">Recevoir des conseils et astuces pour votre santé</p>
          </Label>
          <Switch
            id="health-tips"
            checked={settings.healthTips}
            onCheckedChange={(checked) => handleSettingChange("healthTips", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="weekly-reports" className="flex-1">
            <span className="font-medium">Rapports hebdomadaires</span>
            <p className="text-sm text-muted-foreground">Recevoir un résumé hebdomadaire de votre suivi</p>
          </Label>
          <Switch
            id="weekly-reports"
            checked={settings.weeklyReports}
            onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
          />
        </div>
      </div>

      <Button onClick={sendTestNotification} variant="outline" className="w-full">
        Envoyer une notification de test
      </Button>
    </div>
  )
}
