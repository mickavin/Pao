import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, Plus } from "lucide-react"
import Link from "next/link"

// Simuler des résultats de recherche
const searchResults = [
  {
    id: "doliprane-1000",
    name: "Doliprane",
    activeIngredient: "Paracétamol",
    dosage: "1000 mg",
    form: "Comprimé",
  },
  {
    id: "doliprane-500",
    name: "Doliprane",
    activeIngredient: "Paracétamol",
    dosage: "500 mg",
    form: "Comprimé effervescent",
  },
  {
    id: "dolirhume",
    name: "Dolirhume",
    activeIngredient: "Paracétamol, Pseudoéphédrine",
    dosage: "500 mg / 30 mg",
    form: "Comprimé",
  },
]

export function MedicationSearchResults() {
  return (
    <div className="space-y-3">
      {searchResults.map((medication) => (
        <Card key={medication.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{medication.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {medication.dosage}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{medication.activeIngredient}</p>
                <p className="text-xs text-muted-foreground">{medication.form}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/medications/template/${medication.id}`}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/medications/scan-to-add/${medication.id}`}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
