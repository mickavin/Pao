"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Clock, User, X } from "lucide-react"
import { AccessRequestModal } from "@/components/access-control/access-request-modal"
import type { AccessRequest } from "@/lib/access-control-types"

interface AccessRequestNotificationProps {
  request: AccessRequest
  onClose: () => void
}

export function AccessRequestNotification({ request, onClose }: AccessRequestNotificationProps) {
  const [showModal, setShowModal] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState(60) // 60 secondes avant expiration automatique

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimeout(() => setIsVisible(false), 1000)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Attendre la fin de l'animation
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getTypeIcon = () => {
    switch (request.requesterType) {
      case "doctor":
        return <User className="h-4 w-4" />
      case "pharmacist":
        return <User className="h-4 w-4" />
      case "caregiver":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getTypeLabel = () => {
    switch (request.requesterType) {
      case "doctor":
        return "Médecin"
      case "pharmacist":
        return "Pharmacien"
      case "caregiver":
        return "Soignant"
      case "family":
        return "Famille"
      default:
        return "Professionnel"
    }
  }

  if (!isVisible) return null

  return (
    <>
      <Card
        className={`fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50 shadow-lg border-primary/20 bg-card transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={request.requesterAvatar || "/placeholder.svg"} alt={request.requesterName} />
                <AvatarFallback>{getInitials(request.requesterName)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
                {getTypeIcon()}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium flex items-center gap-1">
                    Demande d'accès
                    <Badge variant="outline" className="ml-1 text-xs">
                      {getTypeLabel()}
                    </Badge>
                  </h3>
                  <p className="text-sm">
                    <span className="font-medium">{request.requesterName}</span> demande à accéder à vos données de
                    santé.
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Demande sécurisée</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3" />
                <span>Expire dans {timeLeft}s</span>
              </div>

              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1" onClick={handleClose}>
                  Ignorer
                </Button>
                <Button size="sm" className="flex-1" onClick={() => setShowModal(true)}>
                  Examiner
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AccessRequestModal request={request} open={showModal} onOpenChange={setShowModal} onClose={handleClose} />
    </>
  )
}
