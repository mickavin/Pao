import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera, Check, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Simuler une base de données de médicaments templates (même que dans la page template)
const medicationTemplates = {
  "doliprane-1000": {
    id: "doliprane-1000",
    name: "Doliprane",
    activeIngredient: "Paracétamol",
    dosage: "1000 mg",
    form: "Comprimé",
    imageUrl: "/doliprane-tablets.png",
  },
  "levothyrox-100": {
    id: "levothyrox-100",
    name: "Levothyrox",
    activeIngredient: "Lévothyroxine sodique",
    dosage: "100 µg",
    form: "Comprimé sécable",
    imageUrl: "/levothyrox-packaging.png",
  },
}

export default function ScanToAddPage({ params }: { params: { id: string } }) {
  const medication = medicationTemplates["levothyrox-100"]

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
        <Link href={`/medications/template/${medication.id}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Scanner pour ajouter</h1>
      </header>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 relative mb-2">
            <Image
              src={medication.imageUrl || "/placeholder.svg"}
              alt={medication.name}
              fill
              className="object-contain"
            />
          </div>
          <CardTitle>
            {medication.name} {medication.dosage}
          </CardTitle>
          <CardDescription>
            {medication.activeIngredient} - {medication.form}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <h3 className="font-medium mb-2">Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Pour ajouter ce médicament à votre traitement, scannez le QR code sur la boîte ou l'emballage.
            </p>
          </div>

          <div className="aspect-square relative border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center">
            <Camera className="h-16 w-16 text-primary/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="outline" size="lg" className="gap-2">
                <Camera className="h-5 w-5" />
                <span>Activer la caméra</span>
              </Button>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-md">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Pour des raisons de sécurité, l'ajout manuel de médicaments n'est pas autorisé. Veuillez scanner le QR
                code présent sur l'emballage pour confirmer l'authenticité du médicament.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <p className="text-xs text-center text-muted-foreground w-full">
            En cas de difficulté avec le scan, contactez votre pharmacien ou médecin.
          </p>

          {/* Ce bouton est uniquement pour la démo et simule un scan réussi */}
          <Link href="/medications" className="w-full">
            <Button variant="default" className="w-full flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Simuler un scan réussi</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
