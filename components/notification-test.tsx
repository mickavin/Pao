"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, AlertTriangle, Info } from "lucide-react"
import notificationService from "@/lib/notification-service"

export function NotificationTest() {
  if (typeof window === "undefined") return null
  const [permissionStatus, setPermissionStatus] = useState<"default" | "granted" | "denied">("default")
  const [isSupported, setIsSupported] = useState(false)
  const [showCard, setShowCard] = useState(true)

  useEffect(() => {
    // Vérifier si les notifications sont supportées
    const supported = notificationService.isSupported()
    setIsSupported(supported)

    if (supported) {
      // Obtenir l'état actuel de la permission
      const status = notificationService.getPermissionStatus()
      setPermissionStatus(status)
    }
  }, [])

  const requestPermission = async () => {
    const permission = await notificationService.requestPermission()
    setPermissionStatus(permission)
  }

  const sendTestNotification = () => {
    if (typeof window === "undefined") return
    notificationService.sendNotification("Rappel de médicament", {
      body: "Il est temps de prendre votre Doliprane 1000mg",
      icon: "/icons/pill-icon.png",
      data: { medicationId: 123, action: "take-medication" },
    })
  }

  const scheduleTestNotification = () => {
    if (typeof window === "undefined") return
    // Programmer une notification pour 10 secondes plus tard
    const scheduledTime = new Date(Date.now() + 10 * 1000)

    notificationService.scheduleNotification({
      title: "Notification programmée",
      body: "Cette notification a été programmée il y a 10 secondes",
      icon: "/icons/pill-icon.png",
      scheduledTime,
      active: true,
    })

    // Afficher un message de confirmation
    alert("Une notification sera envoyée dans 10 secondes")
  }

  if (!showCard) {
    return null
  }

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Notifications non supportées</AlertTitle>
        <AlertDescription>
          Votre navigateur ne supporte pas les notifications push. Veuillez utiliser un navigateur moderne pour
          bénéficier de cette fonctionnalité.
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowCard(false)}>
            Fermer
          </Button>
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
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowCard(false)}>
            Fermer
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (permissionStatus === "default") {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Activer les notifications</h3>
              <p className="text-sm text-muted-foreground">
                Pour recevoir des rappels de médicaments, vous devez autoriser les notifications.
              </p>
              <Button onClick={requestPermission} size="sm" className="mt-2">
                Autoriser les notifications
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowCard(false)}>
              Plus tard
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Notifications activées</h3>
            <p className="text-sm text-muted-foreground">
              Vous recevrez des notifications pour vos rappels de médicaments.
            </p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={sendTestNotification}>
                Tester maintenant
              </Button>
              <Button size="sm" variant="outline" onClick={scheduleTestNotification}>
                Programmer un test
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowCard(false)}>
            Fermer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
