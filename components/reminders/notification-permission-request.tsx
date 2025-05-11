"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Settings, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLocalStorage } from "@/components/hooks/use-local-storage"
import notificationService from "@/lib/notification-service"
import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/theme-provider"

interface NotificationPermissionRequestProps {
  onComplete?: (granted: boolean) => void
  className?: string
}

export function NotificationPermissionRequest({ onComplete, className }: NotificationPermissionRequestProps) {
  if (typeof window === "undefined") return null
  const [hasAsked, setHasAsked] = useLocalStorage("pao-notification-permission-asked", false)
  const [permissionStatus, setPermissionStatus] = useState<"default" | "granted" | "denied">("default")
  const [isSupported, setIsSupported] = useState(false)
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  useEffect(() => {
    // Check if notifications are supported
    const supported = notificationService.isSupported()
    setIsSupported(supported)

    if (supported) {
      // Get current permission status
      const status = notificationService.getPermissionStatus()
      setPermissionStatus(status)
    }
  }, [])

  const requestPermission = async () => {
    setHasAsked(true)
    const permission = await notificationService.requestPermission()
    setPermissionStatus(permission)

    if (onComplete) {
      onComplete(permission === "granted")
    }
  }

  const openSettings = () => {
    // This is a placeholder - in a real app, we would try to open device settings
    // This is not universally supported across browsers/platforms
    alert(
      "Pour activer les notifications, veuillez ouvrir les paramètres de votre navigateur ou appareil et autoriser les notifications pour cette application.",
    )
  }

  if (!isSupported) {
    return (
      <Card className={cn("border-accent/30 bg-accent/5", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-accent" />
            Notifications non supportées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            Votre navigateur ou appareil ne supporte pas les notifications. Certaines fonctionnalités de rappel ne
            seront pas disponibles.
          </CardDescription>
        </CardContent>
      </Card>
    )
  }

  if (permissionStatus === "granted") {
    return (
      <Card className={cn("border-success/30 bg-success/5", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Notifications activées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            Vous recevrez des rappels pour vos médicaments aux horaires programmés.
          </CardDescription>
        </CardContent>
      </Card>
    )
  }

  if (permissionStatus === "denied") {
    return (
      <Card className={cn("border-destructive/30 bg-destructive/5", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Notifications bloquées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            Pour recevoir vos rappels de médicaments, veuillez activer les notifications dans les paramètres de votre
            navigateur ou appareil.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button onClick={openSettings} variant="outline" className="w-full" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Ouvrir les paramètres
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Activer les rappels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">
          Pour recevoir des rappels de médicaments, Pao a besoin de votre autorisation pour envoyer des
          notifications.
        </CardDescription>
        <Alert variant="outline" className="bg-primary/5 border-primary/20 mb-4">
          <AlertTitle className="text-sm font-medium">Pourquoi c'est important</AlertTitle>
          <AlertDescription className="text-xs">
            Les notifications vous aideront à ne jamais oublier de prendre vos médicaments, même lorsque l'application
            est fermée.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button
          onClick={requestPermission}
          className={cn("w-full bg-primary hover:bg-primary/90", simplifiedLayout && "text-base py-6")}
        >
          <Bell className="h-4 w-4 mr-2" />
          Autoriser les notifications
        </Button>
      </CardFooter>
    </Card>
  )
}
