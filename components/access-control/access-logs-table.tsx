"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Clock, AlertTriangle, Search, Filter } from "lucide-react"
import type { AccessLog } from "@/lib/access-control-types"

interface AccessLogsTableProps {
  logs: AccessLog[]
}

export function AccessLogsTable({ logs }: AccessLogsTableProps) {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "granted":
        return <ThumbsUp className="h-4 w-4 text-secondary" />
      case "denied":
        return <ThumbsDown className="h-4 w-4 text-destructive" />
      case "revoked":
        return <AlertTriangle className="h-4 w-4 text-accent" />
      case "expired":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "viewed":
        return <Clock className="h-4 w-4 text-primary" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActionLabel = (action: string) => {
    switch (action) {
      case "granted":
        return "Accès accordé"
      case "denied":
        return "Accès refusé"
      case "revoked":
        return "Accès révoqué"
      case "expired":
        return "Accès expiré"
      case "viewed":
        return "Données consultées"
      default:
        return action
    }
  }

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case "granted":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "denied":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "revoked":
        return "bg-accent/10 text-accent border-accent/20"
      case "expired":
        return "bg-muted text-muted-foreground"
      case "viewed":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return ""
    }
  }

  const filteredLogs = logs
    .filter((log) => {
      if (filter === "all") return true
      return log.action === filter
    })
    .filter((log) => {
      if (!searchQuery) return true
      return (
        log.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.requesterOrganization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  if (logs.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <Clock className="h-10 w-10 text-primary mx-auto mb-2" />
          <h3 className="font-medium">Aucun historique d'accès</h3>
          <p className="text-sm text-muted-foreground">
            L'historique des accès à vos données apparaîtra ici lorsque des professionnels de santé y accéderont.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher dans l'historique..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les actions</SelectItem>
              <SelectItem value="granted">Accès accordés</SelectItem>
              <SelectItem value="denied">Accès refusés</SelectItem>
              <SelectItem value="revoked">Accès révoqués</SelectItem>
              <SelectItem value="expired">Accès expirés</SelectItem>
              <SelectItem value="viewed">Données consultées</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-center">
              <Search className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium">Aucun résultat</h3>
              <p className="text-sm text-muted-foreground">
                Aucun historique d'accès ne correspond à vos critères de recherche.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&query=${log.requesterType}`}
                      alt={log.requesterName}
                    />
                    <AvatarFallback>{getInitials(log.requesterName)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{log.requesterName}</h3>
                        <p className="text-sm text-muted-foreground">{log.requesterOrganization}</p>
                      </div>
                      <Badge variant="outline" className={`flex items-center gap-1 ${getActionBadgeClass(log.action)}`}>
                        {getActionIcon(log.action)}
                        {getActionLabel(log.action)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                      {log.ipAddress && (
                        <>
                          <span className="mx-1">•</span>
                          <span>IP: {log.ipAddress}</span>
                        </>
                      )}
                      {log.duration && (
                        <>
                          <span className="mx-1">•</span>
                          <span>Durée: {log.duration} min</span>
                        </>
                      )}
                    </div>

                    {log.dataAccessed && log.dataAccessed.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Données accédées:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {log.dataAccessed.map((data) => (
                            <Badge key={data} variant="outline" className="text-xs">
                              {data}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
