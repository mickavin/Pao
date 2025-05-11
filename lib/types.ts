// Types for the Pao application

export interface Medication {
  id: number
  name: string
  activeIngredient?: string
  dosage: string
  form: string
  description?: string
  frequency?: string
  remainingDays?: number
  instructions?: string
  warnings?: string[]
  manufacturer?: string
  imageUrl?: string
  isTemplate?: boolean
}

export interface MedicationReminder {
  id: string
  medicationId: number
  time: string
  days: number[] // 0 = Sunday, 1 = Monday, etc.
  active: boolean
  message?: string
}

export interface HealthMetric {
  id: number
  name: string
  value: number
  unit: string
  date: Date
  type: "blood-pressure" | "heart-rate" | "temperature" | "weight" | "glucose" | "other"
}

export interface CheckIn {
  id: number
  date: Date
  medications: {
    id: number
    taken: boolean
    time: string
    notes?: string
  }[]
  symptoms?: {
    id: number
    severity: number
    notes?: string
  }[]
  notes?: string
}

export interface UserProfile {
  id: string
  name: string
  email?: string
  dateOfBirth?: Date
  gender?: "male" | "female" | "other" | "prefer-not-to-say"
  allergies?: string[]
  conditions?: string[]
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
}
