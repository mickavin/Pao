"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, History, Bell, Eye } from "lucide-react"
import Link from "next/link"
import { PendingAccessRequests } from "@/components/access-control/pending-access-requests"
import { ActiveAccessSessions } from "@/components/access-control/active-access-sessions"
import type { AccessRequest, ActiveSession, AccessLog } from "@/lib/access-control-types"
import { AccessLogsTable } from "@/components/access-control/access-logs-table"
import { AccessRequestNotification } from "@/components/access-control/access-request-notification"

// Données de démonstration
const mockPendingRequests: AccessRequest[] = [
  {
    id: "req1",
    requesterName: "Dr. Martin",
    requesterType: "doctor",
    requesterOrganization: "Hôpital Saint-Louis",
    requesterAvatar: "/compassionate-doctor-consultation.png",
    reason: "Consultation de suivi pour ajustement de traitement Levothyrox",
    timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
    ipAddress: "192.168.1.1",
    location: "Paris, France",
    device: "Desktop - Chrome",
    urgent: false,
    dataRequested: ["medications", "symptoms", "analytics"],
  },
  {
    id: "req2",
    requesterName: "Pharmacie Centrale",
    requesterType: "pharmacist",
    requesterOrganization: "Pharmacie Centrale",
    requesterAvatar: "/friendly-neighborhood-pharmacist.png",
    reason: "Vérification des interactions médicamenteuses pour nouvelle prescription",
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    ipAddress: "192.168.2.1",
    location: "Lyon, France",
    device: "Tablet - Safari",
    urgent: true,
    dataRequested: ["medications"],
  },
]

const mockActiveSessions: ActiveSession[] = [
  {
    id: "session1",
    requesterName: "Dr. Petit",
    requesterType: "doctor",
    requesterOrganization: "Cabinet Médical",
    requesterAvatar: "/confident-female-doctor.png",
    startedAt: Date.now() - 1000 * 60 * 10, // Started 10 minutes ago
    expiresAt: Date.now() + 1000 * 60 * 20, // Expires in 20 minutes
    durationMinutes: 30,
    accessGranted: ["medications", "symptoms", "analytics"],
    lastActivity: Date.now() - 1000 * 60 * 2, // Last activity 2 minutes ago
  },
  {
    id: "session2",
    requesterName: "Infirmière Dubois",
    requesterType: "caregiver",
    requesterOrganization: "Service de soins à domicile",
    requesterAvatar: "/compassionate-caregiver.png",
    startedAt: Date.now() - 1000 * 60 * 5, // Started 5 minutes ago
    expiresAt: Date.now() + 1000 * 60 * 2, // Expires in 2 minutes
    durationMinutes: 15,
    accessGranted: ["medications"],
    lastActivity: Date.now() - 1000 * 30, // Last activity 30 seconds ago
  },
]

const mockAccessLogs: AccessLog[] = [
  {
    id: "log1",
    requesterName: "Dr. Martin",
    requesterType: "doctor",
    requesterOrganization: "Hôpital Saint-Louis",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    action: "granted",
    dataAccessed: ["medications", "symptoms"],
    ipAddress: "192.168.1.1",
    duration: 30,
  },
  {
    id: "log2",
    requesterName: "Pharmacie Centrale",
    requesterType: "pharmacist",
    requesterOrganization: "Pharmacie Centrale",
    timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    action: "denied",
    ipAddress: "192.168.2.1",
  },
  {
    id: "log3",
    requesterName: "Dr. Petit",
    requesterType: "doctor",
    requesterOrganization: "Cabinet Médical",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    action: "expired",
    dataAccessed: ["medications", "symptoms", "analytics"],
    ipAddress: "192.168.3.1",
    duration: 60,
  },
  {
    id: "log4",
    requesterName: "Infirmière Dubois",
    requesterType: "caregiver",
    requesterOrganization: "Service de soins à domicile",
    timestamp: Date.now() - 1000 * 60 * 60 * 36, // 1.5 days ago
    action: "revoked",
    dataAccessed: ["medications"],
    ipAddress: "192.168.4.1",
    duration: 15,
  },
]

export default function AccessControlPage() {
  const [pendingRequests, setPendingRequests] = useState<AccessRequest[]>(mockPendingRequests)
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>(mockActiveSessions)
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>(mockAccessLogs)
  const [showNotification, setShowNotification] = useState(false)
  const [currentNotification, setCurrentNotification] = useState<AccessRequest | null>(null)

  // Simuler une nouvelle demande d'accès après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      const newRequest: AccessRequest = {
        id: `req${Date.now()}`,
        requesterName: "Dr. Rousseau",
        requesterType: "doctor",
        requesterOrganization: "Clinique du Parc",
        requesterAvatar: "/thoughtful-doctor.png",
        reason: "Consultation d'urgence suite à vos symptômes récents",
        timestamp: Date.now(),
        ipAddress: "192.168.5.1",
        location: "Marseille, France",
        device: "Mobile - iOS",
        urgent: true,
        dataRequested: ["medications", "symptoms", "analytics", "reports"],
      }

      setPendingRequests((prev) => [...prev, newRequest])
      setCurrentNotification(newRequest)
      setShowNotification(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleRequestHandled = (requestId: string) => {
    setPendingRequests((prev) => prev.filter((req) => req.id !== requestId))

    // Ajouter un log pour cette action
    const request = pendingRequests.find((req) => req.id === requestId)
    if (request) {
      const newLog: AccessLog = {
        id: `log${Date.now()}`,
        requesterName: request.requesterName,
        requesterType: request.requesterType,
        requesterOrganization: request.requesterOrganization,
        timestamp: Date.now(),
        action: "denied",
        ipAddress: request.ipAddress,
      }
      setAccessLogs((prev) => [newLog, ...prev])
    }
  }

  const handleRevokeAccess = (sessionId: string) => {
    const session = activeSessions.find((s) => s.id === sessionId)
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId))

    // Ajouter un log pour cette action
    if (session) {
      const newLog: AccessLog = {
        id: `log${Date.now()}`,
        requesterName: session.requesterName,
        requesterType: session.requesterType,
        requesterOrganization: session.requesterOrganization,
        timestamp: Date.now(),
        action: "revoked",
        dataAccessed: session.accessGranted,
        ipAddress: "192.168.1.1", // Simulé
        duration: Math.floor((Date.now() - session.startedAt) / (1000 * 60)),
      }
      setAccessLogs((prev) => [newLog, ...prev])
    }
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    setCurrentNotification(null)
  }

  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Contrôle d'accès</h1>
      </header>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Contrôle d'accès juste-à-temps</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Par défaut, personne ne peut accéder à vos données. Vous recevez une notification en temps réel
                lorsqu'un professionnel de santé demande l'accès, et vous décidez qui peut voir quoi et pour combien de
                temps.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">En attente</span>
            {pendingRequests.length > 0 && (
              <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Sessions actives</span>
            {activeSessions.length > 0 && (
              <span className="ml-1 bg-secondary text-secondary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {activeSessions.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Historique</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Demandes d'accès en attente
            </h2>
          </div>

          <PendingAccessRequests requests={pendingRequests} onRequestHandled={handleRequestHandled} />
        </TabsContent>

        <TabsContent value="active" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Sessions d'accès actives
            </h2>
          </div>

          <ActiveAccessSessions sessions={activeSessions} onRevokeAccess={handleRevokeAccess} />
        </TabsContent>

        <TabsContent value="history" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Historique des accès
            </h2>
          </div>

          <AccessLogsTable logs={accessLogs} />
        </TabsContent>
      </Tabs>

      {showNotification && currentNotification && (
        <AccessRequestNotification request={currentNotification} onClose={handleCloseNotification} />
      )}
    </div>
  )
}
