import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, AlertTriangle, Info, QrCode } from "lucide-react"
import Link from "next/link"
import { MedicationSideEffects } from "@/components/medication-side-effects"
import { MedicationInteractions } from "@/components/medication-interactions"
import Image from "next/image"

// Simuler une base de données de médicaments templates
const medicationTemplates = {
  "doliprane-1000": {
    id: "doliprane-1000",
    name: "Doliprane",
    activeIngredient: "Paracétamol",
    dosage: "1000 mg",
    form: "Comprimé",
    description: "Médicament contre la douleur et la fièvre",
    usage: "Traitement symptomatique des douleurs d'intensité légère à modérée et/ou des états fébriles.",
    sideEffects: [
      { name: "Réactions allergiques", severity: "high" },
      { name: "Troubles hépatiques", severity: "high" },
      { name: "Maux de tête", severity: "low" },
    ],
    interactions: [
      { name: "Warfarine", description: "Peut augmenter l'effet anticoagulant", severity: "high" },
      { name: "Alcool", description: "Augmente le risque de dommages au foie", severity: "high" },
    ],
    maxDailyDose: "3000 mg (3 comprimés)",
    pregnancy: "À utiliser avec précaution pendant la grossesse. Consultez votre médecin.",
    imageUrl: "/doliprane-tablets.png",
  },
  "levothyrox-100": {
    id: "levothyrox-100",
    name: "Levothyrox",
    activeIngredient: "Lévothyroxine sodique",
    dosage: "100 µg",
    form: "Comprimé sécable",
    description: "Hormone thyroïdienne de synthèse",
    usage:
      "Traitement des hypothyroïdies et des circonstances, associées ou non à une hypothyroïdie, où il est nécessaire de freiner la TSH.",
    sideEffects: [
      { name: "Palpitations", severity: "medium" },
      { name: "Insomnie", severity: "medium" },
      { name: "Maux de tête", severity: "low" },
      { name: "Diarrhée", severity: "low" },
    ],
    interactions: [
      { name: "Antidiabétiques", description: "Peut diminuer l'effet des antidiabétiques", severity: "medium" },
      { name: "Anticoagulants", description: "Peut augmenter l'effet des anticoagulants", severity: "high" },
      { name: "Paracétamol", description: "Interaction potentielle", severity: "medium" },
    ],
    maxDailyDose: "100 µg (1 comprimé)",
    pregnancy: "Peut être utilisé pendant la grossesse sous surveillance médicale.",
    imageUrl: "/levothyrox-packaging.png",
  },
}

export default function MedicationTemplatePage({ params }: { params: { id: string } }) {
  const medication = medicationTemplates[0]

  if (!medication) {
    return (
      <div className="container px-4 py-6 space-y-6">
        <header className="flex items-center gap-2">
          <Link href="/medications">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Médicament non trouvé</h1>
        </header>
        <Card>
          <CardContent className="pt-6">
            <p>Ce médicament n'existe pas dans notre base de données.</p>
            <Link href="/medications">
              <Button className="mt-4">Retour à la liste</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/medications">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Fiche médicament</h1>
      </header>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{medication.name}</CardTitle>
              <CardDescription className="text-base mt-1">
                {medication.activeIngredient} - {medication.dosage}
              </CardDescription>
              <Badge variant="outline" className="mt-2">
                {medication.form}
              </Badge>
            </div>
            <div className="w-16 h-16 relative">
              <Image
                src={medication.imageUrl || "/placeholder.svg"}
                alt={medication.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{medication.description}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Utilisation</h3>
            <p className="text-sm text-muted-foreground">{medication.usage}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-medium">Dose maximale</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span>{medication.maxDailyDose}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-medium">Grossesse</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Info className="h-4 w-4 mr-2 text-primary" />
                <span className="line-clamp-2">{medication.pregnancy}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Effets secondaires</h3>
            <MedicationSideEffects sideEffects={medication.sideEffects} />
          </div>

          <div>
            <h3 className="font-medium mb-2">Interactions médicamenteuses</h3>
            <MedicationInteractions interactions={medication.interactions} />
          </div>

          {medication.interactions.some((i) => i.name.toLowerCase() === "paracétamol") && (
            <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-destructive">Attention</h4>
                  <p className="text-sm text-muted-foreground">
                    Ce médicament peut interagir avec d'autres médicaments que vous prenez actuellement. Consultez votre
                    médecin ou pharmacien avant de l'utiliser.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Link href={`/medications/scan-to-add/${medication.id}`} className="w-full">
            <Button className="w-full flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span>Scanner pour ajouter à mon traitement</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
