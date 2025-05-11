"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, BarChart, LineChart } from "@/components/ui/chart"
import { useState } from "react"
import { useAccessibility } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

// Données simulées pour les graphiques
const medicationData = [
  { date: "01/04", adherence: 100, levothyrox: 1, doliprane: 2 },
  { date: "02/04", adherence: 100, levothyrox: 1, doliprane: 0 },
  { date: "03/04", adherence: 100, levothyrox: 1, doliprane: 1 },
  { date: "04/04", adherence: 67, levothyrox: 0, doliprane: 1 },
  { date: "05/04", adherence: 100, levothyrox: 1, doliprane: 0 },
  { date: "06/04", adherence: 100, levothyrox: 1, doliprane: 2 },
  { date: "07/04", adherence: 100, levothyrox: 1, doliprane: 0 },
  { date: "08/04", adherence: 67, levothyrox: 0, doliprane: 1 },
  { date: "09/04", adherence: 100, levothyrox: 1, doliprane: 0 },
  { date: "10/04", adherence: 100, levothyrox: 1, doliprane: 0 },
  { date: "11/04", adherence: 100, levothyrox: 1, doliprane: 1 },
  { date: "12/04", adherence: 100, levothyrox: 1, doliprane: 0 },
  { date: "13/04", adherence: 100, levothyrox: 1, doliprane: 0 },
  { date: "14/04", adherence: 67, levothyrox: 0, doliprane: 2 },
]

const symptomData = [
  { date: "01/04", energy: 3, pain: 2, mood: 4, sleep: 7 },
  { date: "02/04", energy: 3, pain: 2, mood: 4, sleep: 7.5 },
  { date: "03/04", energy: 4, pain: 1, mood: 4, sleep: 8 },
  { date: "04/04", energy: 2, pain: 3, mood: 3, sleep: 6 },
  { date: "05/04", energy: 3, pain: 2, mood: 3, sleep: 7 },
  { date: "06/04", energy: 3, pain: 2, mood: 4, sleep: 7.5 },
  { date: "07/04", energy: 4, pain: 1, mood: 4, sleep: 8 },
  { date: "08/04", energy: 2, pain: 4, mood: 2, sleep: 5.5 },
  { date: "09/04", energy: 3, pain: 3, mood: 3, sleep: 6.5 },
  { date: "10/04", energy: 3, pain: 2, mood: 3, sleep: 7 },
  { date: "11/04", energy: 2, pain: 3, mood: 2, sleep: 6 },
  { date: "12/04", energy: 3, pain: 2, mood: 3, sleep: 7 },
  { date: "13/04", energy: 4, pain: 1, mood: 4, sleep: 8 },
  { date: "14/04", energy: 2, pain: 3, mood: 3, sleep: 6 },
]

const comparisonData = [
  { period: "Avant", energy: 2.5, pain: 3.2, mood: 2.8, sleep: 6.2 },
  { period: "Pendant", energy: 3.2, pain: 2.1, mood: 3.5, sleep: 7.3 },
]

export function AdvancedHealthCharts() {
  const [timeRange, setTimeRange] = useState("14days")
  const [medicationFilter, setMedicationFilter] = useState("all")
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 jours</SelectItem>
            <SelectItem value="14days">14 jours</SelectItem>
            <SelectItem value="30days">30 jours</SelectItem>
            <SelectItem value="90days">3 mois</SelectItem>
          </SelectContent>
        </Select>

        <Select value={medicationFilter} onValueChange={setMedicationFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Médicament" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les médicaments</SelectItem>
            <SelectItem value="levothyrox">Levothyrox</SelectItem>
            <SelectItem value="doliprane">Doliprane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
          <h3 className="font-semibold mb-3">Prise de médicaments</h3>
          <div className="chart-container">
            <div className={cn("h-64", simplifiedLayout && "h-80")}>
              <BarChart
                data={medicationData}
                index="date"
                categories={["levothyrox", "doliprane"]}
                colors={["primary", "secondary"]}
                valueFormatter={(value) => `${value} prise(s)`}
                showLegend={true}
                showGridLines={false}
                startEndOnly={false}
                minValue={0}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
          <h3 className="font-semibold mb-3">Évolution des symptômes</h3>
          <div className="chart-container">
            <div className={cn("h-64", simplifiedLayout && "h-80")}>
              <LineChart
                data={symptomData}
                index="date"
                categories={["energy", "pain", "mood"]}
                colors={["primary", "accent", "secondary"]}
                valueFormatter={(value) => `${value}`}
                showLegend={true}
                showGridLines={false}
                startEndOnly={false}
                minValue={0}
                maxValue={5}
                connectNulls={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
          <h3 className="font-semibold mb-3">Comparaison avant/après traitement</h3>
          <Tabs defaultValue="energy" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="energy">Énergie</TabsTrigger>
              <TabsTrigger value="pain">Douleur</TabsTrigger>
              <TabsTrigger value="mood">Humeur</TabsTrigger>
              <TabsTrigger value="sleep">Sommeil</TabsTrigger>
            </TabsList>

            <TabsContent value="energy" className="mt-2">
              <div className="chart-container">
                <div className={cn("h-64", simplifiedLayout && "h-80")}>
                  <BarChart
                    data={comparisonData}
                    index="period"
                    categories={["energy"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value}/5`}
                    showLegend={false}
                    showGridLines={false}
                    minValue={0}
                    maxValue={5}
                  />
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">
                Votre niveau d'énergie a augmenté de 28% depuis le début du traitement
              </p>
            </TabsContent>

            <TabsContent value="pain" className="mt-2">
              <div className="chart-container">
                <div className={cn("h-64", simplifiedLayout && "h-80")}>
                  <BarChart
                    data={comparisonData}
                    index="period"
                    categories={["pain"]}
                    colors={["accent"]}
                    valueFormatter={(value) => `${value}/5`}
                    showLegend={false}
                    showGridLines={false}
                    minValue={0}
                    maxValue={5}
                  />
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">
                Votre niveau de douleur a diminué de 34% depuis le début du traitement
              </p>
            </TabsContent>

            <TabsContent value="mood" className="mt-2">
              <div className="chart-container">
                <div className={cn("h-64", simplifiedLayout && "h-80")}>
                  <BarChart
                    data={comparisonData}
                    index="period"
                    categories={["mood"]}
                    colors={["secondary"]}
                    valueFormatter={(value) => `${value}/5`}
                    showLegend={false}
                    showGridLines={false}
                    minValue={0}
                    maxValue={5}
                  />
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">
                Votre humeur s'est améliorée de 25% depuis le début du traitement
              </p>
            </TabsContent>

            <TabsContent value="sleep" className="mt-2">
              <div className="chart-container">
                <div className={cn("h-64", simplifiedLayout && "h-80")}>
                  <BarChart
                    data={comparisonData}
                    index="period"
                    categories={["sleep"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value}h`}
                    showLegend={false}
                    showGridLines={false}
                    minValue={0}
                    maxValue={10}
                  />
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">
                Votre durée de sommeil a augmenté de 18% depuis le début du traitement
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
          <h3 className="font-semibold mb-3">Benchmark anonymisé</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Comparaison de vos résultats avec d'autres patients ayant des traitements similaires
          </p>
          <div className="chart-container">
            <div className={cn("h-64", simplifiedLayout && "h-80")}>
              <AreaChart
                data={[
                  { category: "Adhérence", vous: 92, moyenne: 78 },
                  { category: "Énergie", vous: 75, moyenne: 65 },
                  { category: "Douleur", vous: 35, moyenne: 45 },
                  { category: "Humeur", vous: 82, moyenne: 70 },
                  { category: "Sommeil", vous: 80, moyenne: 72 },
                ]}
                index="category"
                categories={["vous", "moyenne"]}
                colors={["primary", "muted"]}
                valueFormatter={(value) => `${value}%`}
                showLegend={true}
                showGridLines={false}
                startEndOnly={false}
                showGradient={true}
                minValue={0}
                maxValue={100}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
