export type RequesterType = "doctor" | "pharmacist" | "caregiver" | "family" | "other"

export interface AccessRequest {
  id: string
  requesterName: string
  requesterType: RequesterType
  requesterOrganization: string
  requesterAvatar?: string
  reason: string
  timestamp: number
  ipAddress: string
  location: string
  device: string
  urgent: boolean
  dataRequested: string[]
}

export interface ActiveSession {
  id: string
  requesterName: string
  requesterType: RequesterType
  requesterOrganization: string
  requesterAvatar?: string
  startedAt: number
  expiresAt: number
  durationMinutes: number
  accessGranted: string[]
  lastActivity?: number
}

export interface AccessLog {
  id: string
  requesterName: string
  requesterType: RequesterType
  requesterOrganization: string
  timestamp: number
  action: "granted" | "denied" | "revoked" | "expired" | "viewed"
  dataAccessed?: string[]
  ipAddress?: string
  duration?: number
}
