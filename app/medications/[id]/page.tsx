'use client'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Pill, Clock, AlertTriangle, FileText, Share2, Calendar } from "lucide-react"
import Link from "next/link"
import {MedicationSideEffects} from "@/components/medication-side-effects"
import {MedicationInteractions} from "@/components/medication-interactions"
export default function MedicationDetailPage({ params }: { params: { id: string } }) {

  const [data, setData] = useState(null)
  
  useEffect(() => {
    const fetchMedication = async () => {
      const response = await fetch(`/api/template`, {
        method: 'POST',
        body: JSON.stringify({
          id: params.id,
        }),
      })
      const data = await response.json()
      console.log(data)
      setData(data.output_parsed?.medication || null)
    }

    fetchMedication()
  }, [])

  const medication = {
    id: 12,
    name: "Doliprane",
    dosage: "1000mg",
    form: "Comprimé",
    activeIngredient: "Paracétamol",
    manufacturer: "Sanofi",
    description: "Médicament contre la douleur et la fièvre (antalgique et antipyrétique).",
    frequency: "3x par jour",
    remainingDays: 12,
    instructions: "À prendre pendant ou en dehors des repas avec un grand verre d'eau.",
    warnings: ["Ne pas dépasser 3g par jour", "Éviter l'alcool pendant le traitement"],
  }

  if (!data) {
    return (
      <div className="container px-4 py-6">
        <h1 className="text-xl font-bold">Chargement...</h1>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/medications">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">{data.name}</h1>
      </header>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Pill className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline">{data.dosage}</Badge>
                <Badge variant="outline">{data.form}</Badge>
              </div>
              <h2 className="text-lg font-semibold">{data.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{data.principe_actif}</p>
              <p className="text-sm mb-3">{data.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{data.utilisation}</span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{medication.remainingDays} jours restants</span>
                </div> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className="flex justify-between">
        <Link href={`/medications/edit/${params.id}`}>
          <Button variant="outline">Modifier</Button>
        </Link>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </Button>
      </div> */}

      <Tabs defaultValue="instructions" className="w-full">
        <TabsList className={data.other_interactions.length > 0 ? "grid w-full grid-cols-3" : "grid w-full grid-cols-2"}>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="side-effects">Effets secondaires</TabsTrigger>
          {data.other_interactions.length > 0 && <TabsTrigger value="interactions">Interactions</TabsTrigger>}
        </TabsList>

        <TabsContent value="instructions" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Instructions
              </h3>
              <p className="text-sm">{data.usage}</p>
            </CardContent>
          </Card>

          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-accent">
                <AlertTriangle className="h-4 w-4" />
                Avertissements
              </h3>
              <ul className="text-sm space-y-2">
                {data.contre_indic.map((warning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>{warning.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="side-effects" className="mt-4">
          <MedicationSideEffects
          sideEffects={data.secondary_effects} 
          comments={data.feedback}
          />
        </TabsContent>

        <TabsContent value="interactions" className="mt-4">
          <MedicationInteractions interactions={data.other_interactions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
