"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Pill, Clock, AlertTriangle } from "lucide-react"

type MedicationTemplate = {
  id: number
  name: string
  dosage: string
  form: string
  activeIngredient: string
  manufacturer: string
  description: string
  frequency: string
  instructions: string
  warnings: string[]
}

export function MedicationTemplateForm({ template }: { template: MedicationTemplate }) {
  const router = useRouter()
  const [medication, setMedication] = useState({
    name: template.name,
    dosage: template.dosage,
    form: template.form,
    activeIngredient: template.activeIngredient,
    manufacturer: template.manufacturer,
    description: template.description,
    frequency: template.frequency,
    instructions: template.instructions,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMedication((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setMedication((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the medication data
    console.log("Saving medication:", medication)

    // Navigate back to medications list
    router.push("/medications")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Pill className="h-5 w-5" />
        </div>
        <p className="text-sm text-muted-foreground">Créer un nouveau médicament basé sur {template.name}</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du médicament</Label>
            <Input id="name" name="name" value={medication.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activeIngredient">Principe actif</Label>
            <Input
              id="activeIngredient"
              name="activeIngredient"
              value={medication.activeIngredient}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" name="dosage" value={medication.dosage} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form">Forme</Label>
            <Select
              name="form"
              defaultValue={medication.form}
              onValueChange={(value) => handleSelectChange("form", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une forme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Comprimé">Comprimé</SelectItem>
                <SelectItem value="Gélule">Gélule</SelectItem>
                <SelectItem value="Sirop">Sirop</SelectItem>
                <SelectItem value="Injection">Injection</SelectItem>
                <SelectItem value="Pommade">Pommade</SelectItem>
                <SelectItem value="Patch">Patch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={medication.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="frequency">Fréquence de prise</Label>
          </div>
          <Select
            name="frequency"
            defaultValue={medication.frequency}
            onValueChange={(value) => handleSelectChange("frequency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une fréquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1x par jour">1x par jour</SelectItem>
              <SelectItem value="2x par jour">2x par jour</SelectItem>
              <SelectItem value="3x par jour">3x par jour</SelectItem>
              <SelectItem value="4x par jour">4x par jour</SelectItem>
              <SelectItem value="Si besoin">Si besoin</SelectItem>
              <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            id="instructions"
            name="instructions"
            value={medication.instructions}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="p-4 border rounded-lg bg-accent/5 border-accent/30">
          <div className="flex items-center gap-2 mb-2 text-accent">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">Avertissements</span>
          </div>
          <ul className="text-sm space-y-2 pl-6 list-disc">
            {template.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Ajouter ce médicament</Button>
      </div>
    </form>
  )
}
