import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MedicationScanForm } from "@/components/medication-scan-form"
import { ArrowLeft, Camera } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AddMedicationPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/medications">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Ajouter un médicament</h1>
      </header>

      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Camera className="h-4 w-4" />
        <AlertTitle>Scan obligatoire</AlertTitle>
        <AlertDescription>
          Pour des raisons de sécurité, l'ajout de médicaments nécessite de scanner le QR code présent sur l'emballage.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-6">
          <MedicationScanForm scanOnly={true} />
        </CardContent>
      </Card>
    </div>
  )
}
