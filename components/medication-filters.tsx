"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export interface FilterOptions {
  categories: string[]
  forms: string[]
  dosageRange: [number, number]
  withPrescription: boolean | null
}

interface MedicationFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
  onReset: () => void
  className?: string
  activeFiltersCount: number
}

// Données de démonstration pour les options de filtre
const CATEGORIES = [
  "Analgésique",
  "Anti-inflammatoire",
  "Antibiotique",
  "Antihistaminique",
  "Hormone",
  "Bronchodilatateur",
  "Antispasmodique",
]

const FORMS = [
  "Comprimé",
  "Gélule",
  "Comprimé sécable",
  "Sirop",
  "Aérosol",
  "Solution buvable",
  "Poudre",
  "Suppositoire",
]

export function MedicationFilters({ onFilterChange, onReset, className, activeFiltersCount }: MedicationFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedForms, setSelectedForms] = useState<string[]>([])
  const [dosageRange, setDosageRange] = useState<[number, number]>([0, 1000])
  const [withPrescription, setWithPrescription] = useState<boolean | null>(null)

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      forms: selectedForms,
      dosageRange,
      withPrescription,
    })
    setIsOpen(false)
  }

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedForms([])
    setDosageRange([0, 1000])
    setWithPrescription(null)
    onReset()
    setIsOpen(false)
  }

  // Gestion des catégories
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Gestion des formes
  const toggleForm = (form: string) => {
    setSelectedForms((prev) => (prev.includes(form) ? prev.filter((f) => f !== form) : [...prev, form]))
  }

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1 rounded-full transition-all",
              activeFiltersCount > 0 && "border-primary text-primary",
            )}
            onClick={() => setIsOpen(true)}
          >
            <span>Filtrer</span>
            {activeFiltersCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 border rounded-xl shadow-lg" align="end" sideOffset={8}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filtres avancés</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={resetFilters}>
                <X className="h-4 w-4" />
                <span className="sr-only">Réinitialiser les filtres</span>
              </Button>
            </div>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
            {/* Catégories */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Catégorie</h4>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Formes */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Forme</h4>
              <div className="flex flex-wrap gap-2">
                {FORMS.map((form) => (
                  <Badge
                    key={form}
                    variant={selectedForms.includes(form) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all",
                      selectedForms.includes(form) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                    onClick={() => toggleForm(form)}
                  >
                    {form}
                    {selectedForms.includes(form) && <Check className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Dosage */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Dosage</h4>
                <span className="text-xs text-muted-foreground">
                  {dosageRange[0]} - {dosageRange[1]} mg
                </span>
              </div>
              <Slider
                defaultValue={[0, 1000]}
                min={0}
                max={1000}
                step={50}
                value={[dosageRange[0], dosageRange[1]]}
                onValueChange={(value) => setDosageRange([value[0], value[1]])}
                className="py-4"
              />
            </div>

            {/* Prescription */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Prescription</h4>
              <div className="flex gap-2">
                <Badge
                  variant={withPrescription === true ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all",
                    withPrescription === true ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setWithPrescription(withPrescription === true ? null : true)}
                >
                  Avec ordonnance
                  {withPrescription === true && <Check className="ml-1 h-3 w-3" />}
                </Badge>
                <Badge
                  variant={withPrescription === false ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all",
                    withPrescription === false ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setWithPrescription(withPrescription === false ? null : false)}
                >
                  Sans ordonnance
                  {withPrescription === false && <Check className="ml-1 h-3 w-3" />}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex justify-between">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Réinitialiser
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Appliquer
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Affichage des filtres actifs */}
      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex flex-wrap gap-2 overflow-hidden"
          >
            {selectedCategories.map((category) => (
              <Badge key={`cat-${category}`} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                <span className="text-xs">{category}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 rounded-full"
                  onClick={() => {
                    setSelectedCategories((prev) => prev.filter((c) => c !== category))
                    onFilterChange({
                      categories: selectedCategories.filter((c) => c !== category),
                      forms: selectedForms,
                      dosageRange,
                      withPrescription,
                    })
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Supprimer {category}</span>
                </Button>
              </Badge>
            ))}

            {selectedForms.map((form) => (
              <Badge key={`form-${form}`} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                <span className="text-xs">{form}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 rounded-full"
                  onClick={() => {
                    setSelectedForms((prev) => prev.filter((f) => f !== form))
                    onFilterChange({
                      categories: selectedCategories,
                      forms: selectedForms.filter((f) => f !== form),
                      dosageRange,
                      withPrescription,
                    })
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Supprimer {form}</span>
                </Button>
              </Badge>
            ))}

            {(dosageRange[0] > 0 || dosageRange[1] < 1000) && (
              <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                <span className="text-xs">
                  Dosage: {dosageRange[0]}-{dosageRange[1]} mg
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 rounded-full"
                  onClick={() => {
                    setDosageRange([0, 1000])
                    onFilterChange({
                      categories: selectedCategories,
                      forms: selectedForms,
                      dosageRange: [0, 1000],
                      withPrescription,
                    })
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Réinitialiser le dosage</span>
                </Button>
              </Badge>
            )}

            {withPrescription !== null && (
              <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                <span className="text-xs">{withPrescription ? "Avec ordonnance" : "Sans ordonnance"}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 rounded-full"
                  onClick={() => {
                    setWithPrescription(null)
                    onFilterChange({
                      categories: selectedCategories,
                      forms: selectedForms,
                      dosageRange,
                      withPrescription: null,
                    })
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Supprimer le filtre d'ordonnance</span>
                </Button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
              onClick={resetFilters}
            >
              Tout effacer
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
