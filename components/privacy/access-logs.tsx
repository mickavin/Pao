"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  FileText,
  Eye,
  Download,
  Stethoscope,
  Building,
  UserRound,
  Users,
  AlertTriangle,
  Search,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Input } from "@/components/ui/input"

type ContactType = "doctor" | "pharmacist" | "caregiver" | "family" | "system"
type AccessType = "view" | "export" | "update" | "delete" | "share"

interface AccessLog {
  id: string
  contactName: string
  contactType: ContactType
  accessType: AccessType
  timestamp: Date
  details: string
  ipAddress?: string
}

export function AccessLogs() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const accessLogs: AccessLog[] = [
    {
      id: "log1",
      contactName: "Dr. Martin",
      contactType: "doctor",
      accessType: "view",
      timestamp: new Date(2025, 3, 15, 14, 30),
      details: "Consultation du dossier médical complet",
      ipAddress: "192.168.1.1",
    },
    {
      id: "log2",
      contactName: "Pharmacie Centrale",
      contactType: "pharmacist",
      accessType: "view",
      timestamp: new Date(2025, 3, 14, 10, 15),
      details: "Consultation de la liste des médicaments",
      ipAddress: "192.168.2.1",
    },
    {
      id: "log3",
      contactName: "Marie Dupont (Maman)",
      contactType: "family",
      accessType: "export",
      timestamp: new Date(2025, 3, 12, 18, 45),
      details: "Export du rapport mensuel en PDF",
      ipAddress: "192.168.3.1",
    },
    {
      id: "log4",
      contactName: "Système Pao",
      contactType: "system",
      accessType: "update",
      timestamp: new Date(2025, 3, 10, 9, 0),
      details: "Mise à jour automatique des données d'adhérence",
    },
    {
      id: "log5",
      contactName: "Dr. Martin",
      contactType: "doctor",
      accessType: "view",
      timestamp: new Date(2025, 3, 5, 11, 20),
      details: "Consultation des symptômes et effets secondaires",
      ipAddress: "192.168.1.1",
    },
    {
      id: "log6",
      contactName: "Vous-même",
      contactType: "system",
      accessType: "share",
      timestamp: new Date(2025, 3, 1, 16, 10),
      details: "Partage d'un rapport sécurisé avec Dr. Petit",
    },
  ]

  const getTypeIcon = (type: ContactType) => {
    switch (type) {
      case "doctor":
        return <Stethoscope className="h-4 w-4" />
      case "pharmacist":
        return <Building className="h-4 w-4" />
      case "caregiver":
        return <UserRound className="h-4 w-4" />
      case "family":
        return <Users className="h-4 w-4" />
      case "system":
        return <FileText className="h-4 w-4" />
    }
  }

  const getAccessTypeIcon = (type: AccessType) => {
    switch (type) {
      case "view":
        return <Eye className="h-4 w-4" />
      case "export":
        return <Download className="h-4 w-4" />
      case "update":
        return <FileText className="h-4 w-4" />
      case "delete":
        return <AlertTriangle className="h-4 w-4" />
      case "share":
        return <Users className="h-4 w-4" />
    }
  }

  const getAccessTypeLabel = (type: AccessType) => {
    switch (type) {
      case "view":
        return "Consultation"
      case "export":
        return "Export"
      case "update":
        return "Mise à jour"
      case "delete":
        return "Suppression"
      case "share":
        return "Partage"
    }
  }

  const filteredLogs = accessLogs
    .filter((log) => {
      if (filter === "all") return true
      if (filter === "doctors") return log.contactType === "doctor"
      if (filter === "pharmacists") return log.contactType === "pharmacist"
      if (filter === "family") return log.contactType === "family"
      if (filter === "system") return log.contactType === "system"
      return false
    })
    .filter((log) => {
      if (!searchQuery) return true
      return (
        log.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Journal d'accès
        </h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les accès</SelectItem>
            <SelectItem value="doctors">Médecins</SelectItem>
            <SelectItem value="pharmacists">Pharmaciens</SelectItem>
            <SelectItem value="family">Famille</SelectItem>
            <SelectItem value="system">Système</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher dans le journal..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="important">Importants</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {filteredLogs.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium text-lg mb-1">Aucun accès trouvé</h3>
                <p className="text-sm text-muted-foreground">Aucun accès ne correspond à vos critères de recherche.</p>
              </CardContent>
            </Card>
          ) : (
            filteredLogs.map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{getTypeIcon(log.contactType)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{log.contactName}</h3>
                          <p className="text-sm text-muted-foreground">{log.details}</p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getAccessTypeIcon(log.accessType)}
                          {getAccessTypeLabel(log.accessType)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(log.timestamp, "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                        {log.ipAddress && (
                          <>
                            <span className="mx-1">•</span>
                            <span>IP: {log.ipAddress}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-4 space-y-3">
          {filteredLogs
            .filter((log) => {
              const now = new Date()
              const diffTime = Math.abs(now.getTime() - log.timestamp.getTime())
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              return diffDays <= 7 // Accès des 7 derniers jours
            })
            .map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{getTypeIcon(log.contactType)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{log.contactName}</h3>
                          <p className="text-sm text-muted-foreground">{log.details}</p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getAccessTypeIcon(log.accessType)}
                          {getAccessTypeLabel(log.accessType)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(log.timestamp, "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                        {log.ipAddress && (
                          <>
                            <span className="mx-1">•</span>
                            <span>IP: {log.ipAddress}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="important" className="mt-4 space-y-3">
          {filteredLogs
            .filter((log) => log.accessType === "export" || log.accessType === "share" || log.accessType === "delete")
            .map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{getTypeIcon(log.contactType)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{log.contactName}</h3>
                          <p className="text-sm text-muted-foreground">{log.details}</p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getAccessTypeIcon(log.accessType)}
                          {getAccessTypeLabel(log.accessType)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(log.timestamp, "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                        {log.ipAddress && (
                          <>
                            <span className="mx-1">•</span>
                            <span>IP: {log.ipAddress}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
