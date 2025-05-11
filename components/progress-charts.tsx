"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, BarChart } from "@/components/ui/chart"
import { useAccessibility } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { ProgressIndicator } from "@/components/ui/progress-indicator"

const weeklyData = [
  { date: "10/04", mood: 3, pain: 4, energy: 2, adherence: 67 },
  { date: "11/04", mood: 2, pain: 3, energy: 2, adherence: 100 },
  { date: "12/04", mood: 3, pain: 2, energy: 3, adherence: 100 },
  { date: "13/04", mood: 4, pain: 2, energy: 4, adherence: 100 },
  { date: "14/04", mood: 3, pain: 3, energy: 3, adherence: 67 },
  { date: "15/04", mood: 4, pain: 1, energy: 4, adherence: 100 },
  { date: "16/04", mood: 4, pain: 1, energy: 4, adherence: 67 },
]

const monthlyData = [
  { date: "Sem 1", mood: 3, pain: 3, energy: 3, adherence: 85 },
  { date: "Sem 2", mood: 3, pain: 2, energy: 3, adherence: 90 },
  { date: "Sem 3", mood: 4, pain: 2, energy: 4, adherence: 95 },
  { date: "Sem 4", mood: 4, pain: 1, energy: 4, adherence: 90 },
]

export function ProgressCharts() {
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  // Calculate average adherence for the week
  const weeklyAdherence = Math.round(weeklyData.reduce((sum, day) => sum + day.adherence, 0) / weeklyData.length)

  // Calculate average adherence for the month
  const monthlyAdherence = Math.round(monthlyData.reduce((sum, week) => sum + week.adherence, 0) / monthlyData.length)

  return (
    <Tabs defaultValue="week" className="w-full">
      <TabsList className="grid w-full grid-cols-2 rounded-xl p-1">
        <TabsTrigger value="week" className="rounded-lg">
          Semaine
        </TabsTrigger>
        <TabsTrigger value="month" className="rounded-lg">
          Mois
        </TabsTrigger>
      </TabsList>

      <TabsContent value="week" className="mt-4 space-y-4 animate-fade-in">
        <Card className="overflow-hidden">
          <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
            <h3 className="font-medium text-lg mb-2">Ton parcours cette semaine</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tu progresses bien ! Ton humeur s'améliore et ta douleur diminue. Continue comme ça ! 💪
            </p>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Adhérence au traitement</span>
                <span className="text-sm font-semibold">{weeklyAdherence}%</span>
              </div>
              <ProgressIndicator value={weeklyAdherence} max={100} color="success" size="md" />
            </div>

            <div className="chart-container">
              <div className={cn("h-64", simplifiedLayout && "h-80")}>
                <AreaChart
                  data={weeklyData}
                  index="date"
                  categories={["mood", "pain", "energy"]}
                  colors={["secondary", "accent", "primary"]}
                  valueFormatter={(value) => `${value}`}
                  showLegend={true}
                  showGridLines={false}
                  startEndOnly={false}
                  showGradient={true}
                  autoMinValue={true}
                  minValue={0}
                  maxValue={5}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
            <h3 className="font-medium text-lg mb-2">Adhérence au traitement</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tu as pris tes médicaments régulièrement cette semaine. Chaque prise compte ! 🌟
            </p>
            <div className="chart-container">
              <div className={cn("h-64", simplifiedLayout && "h-80")}>
                <BarChart
                  data={weeklyData}
                  index="date"
                  categories={["adherence"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={false}
                  showGridLines={false}
                  startEndOnly={false}
                  minValue={0}
                  maxValue={100}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="month" className="mt-4 space-y-4 animate-fade-in">
        <Card className="overflow-hidden">
          <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
            <h3 className="font-medium text-lg mb-2">Ton parcours ce mois</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Quelle belle progression sur le mois ! Ta persévérance porte ses fruits. 🌱
            </p>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Adhérence au traitement</span>
                <span className="text-sm font-semibold">{monthlyAdherence}%</span>
              </div>
              <ProgressIndicator value={monthlyAdherence} max={100} color="success" size="md" />
            </div>

            <div className="chart-container">
              <div className={cn("h-64", simplifiedLayout && "h-80")}>
                <AreaChart
                  data={monthlyData}
                  index="date"
                  categories={["mood", "pain", "energy"]}
                  colors={["secondary", "accent", "primary"]}
                  valueFormatter={(value) => `${value}`}
                  showLegend={true}
                  showGridLines={false}
                  startEndOnly={false}
                  showGradient={true}
                  autoMinValue={true}
                  minValue={0}
                  maxValue={5}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
            <h3 className="font-medium text-lg mb-2">Adhérence au traitement</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ton adhérence est excellente ce mois-ci. Tu prends soin de toi ! 🎯
            </p>
            <div className="chart-container">
              <div className={cn("h-64", simplifiedLayout && "h-80")}>
                <BarChart
                  data={monthlyData}
                  index="date"
                  categories={["adherence"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={false}
                  showGridLines={false}
                  startEndOnly={false}
                  minValue={0}
                  maxValue={100}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
