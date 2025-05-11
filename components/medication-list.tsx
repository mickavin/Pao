import { AccessibleMedicationCard } from "@/components/a11y/accessible-medication-card"

const medications = [
  {
    id: 1,
    name: "Doliprane",
    dosage: "1000mg",
    frequency: "3x par jour",
    remainingDays: 12,
    hasWarning: false,
  },
  {
    id: 2,
    name: "Levothyrox",
    dosage: "75µg",
    frequency: "1x par jour",
    remainingDays: 5,
    hasWarning: true,
    warningMessage: "Renouvellement nécessaire",
  },
  {
    id: 3,
    name: "Ventoline",
    dosage: "100µg",
    frequency: "Si besoin",
    remainingDays: 30,
    hasWarning: false,
  },
]

export function MedicationList() {
  return (
    <div className="space-y-3">
      {medications.map((med) => (
        <AccessibleMedicationCard key={med.id} medication={med} />
      ))}
    </div>
  )
}
