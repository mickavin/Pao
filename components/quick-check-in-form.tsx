"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Smile, Meh, Frown } from "lucide-react"

export function QuickCheckInForm() {
  const [medications, setMedications] = useState([
    { id: 1, name: "Levothyrox 100µg", taken: false },
    { id: 2, name: "Doliprane 1000mg", taken: false },
    { id: 3, name: "Ventoline", taken: false },
  ])

  const [mood, setMood] = useState<string | null>(null)

  const toggleMedication = (id: number) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Dans une application réelle, nous enverrions ces données à une API
    console.log({ medications, mood })
    // Redirection ou message de confirmation
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Avez-vous pris vos médicaments aujourd'hui?</h3>
        <div className="space-y-3">
          {medications.map((med) => (
            <div key={med.id} className="flex items-center space-x-2">
              <Checkbox id={`med-${med.id}`} checked={med.taken} onCheckedChange={() => toggleMedication(med.id)} />
              <Label htmlFor={`med-${med.id}`} className="flex-1">
                {med.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Comment vous sentez-vous aujourd'hui?</h3>
        <RadioGroup value={mood || ""} onValueChange={setMood} className="flex justify-between">
          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="good" id="mood-good" className="sr-only" />
            <Label
              htmlFor="mood-good"
              className={`p-3 rounded-full ${mood === "good" ? "bg-secondary/20" : "bg-muted"}`}
            >
              <Smile className={`h-8 w-8 ${mood === "good" ? "text-secondary" : "text-muted-foreground"}`} />
            </Label>
            <span className="text-sm">Bien</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="neutral" id="mood-neutral" className="sr-only" />
            <Label
              htmlFor="mood-neutral"
              className={`p-3 rounded-full ${mood === "neutral" ? "bg-primary/20" : "bg-muted"}`}
            >
              <Meh className={`h-8 w-8 ${mood === "neutral" ? "text-primary" : "text-muted-foreground"}`} />
            </Label>
            <span className="text-sm">Moyen</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="bad" id="mood-bad" className="sr-only" />
            <Label htmlFor="mood-bad" className={`p-3 rounded-full ${mood === "bad" ? "bg-accent/20" : "bg-muted"}`}>
              <Frown className={`h-8 w-8 ${mood === "bad" ? "text-accent" : "text-muted-foreground"}`} />
            </Label>
            <span className="text-sm">Pas bien</span>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        Enregistrer
      </Button>
    </form>
  )
}
