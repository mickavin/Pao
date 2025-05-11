"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Clock,
  User,
  AlertTriangle,
  Pill,
  Activity,
  BarChart2,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Info,
} from "lucide-react"
import type { AccessRequest } from "@/lib/access-control-types"

interface AccessRequestModalProps {
  request: AccessRequest
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
}

export function AccessRequestModal({ request, open, onOpenChange, onClose }: AccessRequestModalProps) {
  const [accessDuration, setAccessDuration] = useState(30) // 30 minutes par défaut
  const [dataAccess, setDataAccess] = useState({
    medications: true,
    symptoms: true,
    analytics: true,
    reports: false,
    personalInfo: false,
  })

  const handleToggleAccess = (key: keyof typeof dataAccess) => {
    setDataAccess((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleApprove = () => {
    // Dans une application réelle, nous enverrions cette réponse à l'API
    console.log("Accès approuvé", {
      requestId: request.id,
      duration: accessDuration,
      dataAccess,
    })

    // Afficher une notification de confirmation
    alert(`Accès accordé à ${request.requesterName} pour ${accessDuration} minutes`)
    onOpenChange(false)
    onClose()
  }

  const handleDeny = (report = false) => {
    // Dans une application réelle, nous enverrions cette réponse à l'API
    console.log("Accès refusé", {
      requestId: request.id,
      reported: report,
    })

    if (report) {
      alert(`Demande d'accès signalée et refusée`)
    } else {
      alert(`Demande d'accès refusée`)
    }

    onOpenChange(false)
    onClose()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
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

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return `${hours} heure${hours > 1 ? "s" : ""}${remainingMinutes > 0 ? ` ${remainingMinutes} min` : ""}`
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Demande d'accès à vos données</DialogTitle>
          <DialogDescription>
            Examinez cette demande d'accès et définissez les permissions que vous souhaitez accorder.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={request.requesterAvatar || "/placeholder.svg"} alt={request.requesterName} />
              <AvatarFallback>{getInitials(request.requesterName)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">{request.requesterName}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{getTypeLabel()}</Badge>
                <span className="text-sm text-muted-foreground">{request.requesterOrganization}</span>
              </div>
              <p className="text-sm mt-1">{request.reason}</p>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Demande vérifiée</AlertTitle>
            <AlertDescription>
              Cette demande provient d'une source vérifiée. L'identité du demandeur a été confirmée.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="permissions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            <TabsContent value="permissions" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Durée d'accès</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      Durée
                    </Label>
                    <span className="font-medium">{formatDuration(accessDuration)}</span>
                  </div>
                  <Slider
                    value={[accessDuration]}
                    min={15}
                    max={240}
                    step={15}
                    onValueChange={(value) => setAccessDuration(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>15 min</span>
                    <span>1h</span>
                    <span>2h</span>
                    <span>4h</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Données accessibles</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="medications" className="flex items-center gap-2 cursor-pointer">
                      <Pill className="h-4 w-4 text-primary" />
                      <span>Médicaments et traitements</span>
                    </Label>
                    <Switch
                      id="medications"
                      checked={dataAccess.medications}
                      onCheckedChange={() => handleToggleAccess("medications")}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="symptoms" className="flex items-center gap-2 cursor-pointer">
                      <Activity className="h-4 w-4 text-accent" />
                      <span>Symptômes et effets secondaires</span>
                    </Label>
                    <Switch
                      id="symptoms"
                      checked={dataAccess.symptoms}
                      onCheckedChange={() => handleToggleAccess("symptoms")}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="analytics" className="flex items-center gap-2 cursor-pointer">
                      <BarChart2 className="h-4 w-4 text-secondary" />
                      <span>Analyses et graphiques</span>
                    </Label>
                    <Switch
                      id="analytics"
                      checked={dataAccess.analytics}
                      onCheckedChange={() => handleToggleAccess("analytics")}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="reports" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Rapports médicaux</span>
                    </Label>
                    <Switch
                      id="reports"
                      checked={dataAccess.reports}
                      onCheckedChange={() => handleToggleAccess("reports")}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="personalInfo" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Informations personnelles</span>
                    </Label>
                    <Switch
                      id="personalInfo"
                      checked={dataAccess.personalInfo}
                      onCheckedChange={() => handleToggleAccess("personalInfo")}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Informations sur la demande</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date de la demande:</span>
                    <span>{new Date(request.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Adresse IP:</span>
                    <span>{request.ipAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Localisation:</span>
                    <span>{request.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Appareil:</span>
                    <span>{request.device}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Raison de la demande</h4>
                <p className="text-sm border rounded-md p-3 bg-muted/20">{request.reason}</p>
              </div>

              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Signaler un abus</AlertTitle>
                <AlertDescription>
                  Si cette demande vous semble suspecte, vous pouvez la signaler et la refuser.
                  <Button variant="destructive" size="sm" className="mt-2 w-full" onClick={() => handleDeny(true)}>
                    Signaler et refuser
                  </Button>
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => handleDeny()}>
            <ThumbsDown className="h-4 w-4 mr-2" />
            Refuser
          </Button>
          <Button className="flex-1 sm:flex-none" onClick={handleApprove}>
            <ThumbsUp className="h-4 w-4 mr-2" />
            Approuver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
