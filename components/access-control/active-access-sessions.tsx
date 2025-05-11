"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Shield, Eye, AlertTriangle, Pill, Activity, BarChart2, FileText, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import type { ActiveSession } from "@/lib/access-control-types"

interface ActiveAccessSessionsProps {
  sessions: ActiveSession[]
  onRevokeAccess: (sessionId: string) => void
}

export function ActiveAccessSessions({ sessions, onRevokeAccess }: ActiveAccessSessionsProps) {
  const [selectedSession, setSelectedSession] = useState<ActiveSession | null>(null)
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)

  const handleRevoke = (session: ActiveSession) => {
    setSelectedSession(session)
    setShowRevokeDialog(true)
  }

  const confirmRevoke = () => {
    if (selectedSession) {
      onRevokeAccess(selectedSession.id)
    }
    setShowRevokeDialog(false)
    setSelectedSession(null)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
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

  const calculateTimeLeft = (session: ActiveSession) => {
    const now = new Date().getTime()
    const endTime = new Date(session.expiresAt).getTime()
    const timeLeft = Math.max(0, endTime - now)
    const minutesLeft = Math.floor(timeLeft / (1000 * 60))
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)

    return {
      minutesLeft,
      secondsLeft,
      percentLeft: (timeLeft / (session.durationMinutes * 60 * 1000)) * 100,
    }
  }

  const getAccessIcon = (accessType: string) => {
    switch (accessType) {
      case "medications":
        return <Pill className="h-3 w-3" />
      case "symptoms":
        return <Activity className="h-3 w-3" />
      case "analytics":
        return <BarChart2 className="h-3 w-3" />
      case "reports":
        return <FileText className="h-3 w-3" />
      case "personalInfo":
        return <User className="h-3 w-3" />
      default:
        return <Eye className="h-3 w-3" />
    }
  }

  const getAccessLabel = (accessType: string) => {
    switch (accessType) {
      case "medications":
        return "Médicaments"
      case "symptoms":
        return "Symptômes"
      case "analytics":
        return "Analyses"
      case "reports":
        return "Rapports"
      case "personalInfo":
        return "Infos personnelles"
      default:
        return accessType
    }
  }

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
          <h3 className="font-medium">Aucune session active</h3>
          <p className="text-sm text-muted-foreground">
            Les sessions d'accès actives à vos données apparaîtront ici lorsque vous aurez approuvé une demande d'accès.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const { minutesLeft, secondsLeft, percentLeft } = calculateTimeLeft(session)
        const isExpiringSoon = minutesLeft < 5

        return (
          <Card key={session.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={session.requesterAvatar || "/placeholder.svg"} alt={session.requesterName} />
                  <AvatarFallback>{getInitials(session.requesterName)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{session.requesterName}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(session.requesterType)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{session.requesterOrganization}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 ${isExpiringSoon ? "bg-accent/10 text-accent border-accent/20" : "bg-secondary/10 text-secondary border-secondary/20"}`}
                    >
                      <Eye className="h-3 w-3" />
                      {isExpiringSoon ? "Expire bientôt" : "Actif"}
                    </Badge>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Temps restant
                      </span>
                      <span className="font-medium">
                        {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <Progress value={percentLeft} className="h-1" />
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {session.accessGranted.map((access) => (
                      <Badge key={access} variant="outline" className="text-xs flex items-center gap-1">
                        {getAccessIcon(access)}
                        {getAccessLabel(access)}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-3">
                    <Button variant="destructive" size="sm" className="w-full" onClick={() => handleRevoke(session)}>
                      Révoquer l'accès
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      <Dialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Révoquer l'accès</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir révoquer l'accès de {selectedSession?.requesterName} à vos données de santé ? Cet
              accès sera immédiatement supprimé.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-3 border rounded-md bg-destructive/5 border-destructive/20 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-medium text-destructive">Attention</h4>
                <p className="text-sm text-muted-foreground">
                  Cette personne devra faire une nouvelle demande pour accéder à nouveau à vos données.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRevokeDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmRevoke}>
              Révoquer l'accès
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
