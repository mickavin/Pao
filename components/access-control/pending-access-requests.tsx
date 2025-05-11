"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Shield, AlertTriangle } from "lucide-react"
import { AccessRequestModal } from "@/components/access-control/access-request-modal"
import type { AccessRequest } from "@/lib/access-control-types"

interface PendingAccessRequestsProps {
  requests: AccessRequest[]
  onRequestHandled: (requestId: string) => void
}

export function PendingAccessRequests({ requests, onRequestHandled }: PendingAccessRequestsProps) {
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleExamine = (request: AccessRequest) => {
    setSelectedRequest(request)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    if (selectedRequest) {
      onRequestHandled(selectedRequest.id)
    }
    setShowModal(false)
    setSelectedRequest(null)
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

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
          <h3 className="font-medium">Aucune demande en attente</h3>
          <p className="text-sm text-muted-foreground">
            Les demandes d'accès à vos données apparaîtront ici lorsqu'un professionnel de santé en fera la demande.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <Card key={request.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={request.requesterAvatar || "/placeholder.svg"} alt={request.requesterName} />
                <AvatarFallback>{getInitials(request.requesterName)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{request.requesterName}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(request.requesterType)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{request.requesterOrganization}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${request.urgent ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-primary/10 text-primary border-primary/20"}`}
                  >
                    {request.urgent ? (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
                      </>
                    ) : (
                      "En attente"
                    )}
                  </Badge>
                </div>

                <p className="text-sm mt-1 line-clamp-2">{request.reason}</p>

                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    Demandé le {new Date(request.timestamp).toLocaleDateString()} à{" "}
                    {new Date(request.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => onRequestHandled(request.id)}>
                    Ignorer
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => handleExamine(request)}>
                    Examiner
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {selectedRequest && (
        <AccessRequestModal
          request={selectedRequest}
          open={showModal}
          onOpenChange={setShowModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
