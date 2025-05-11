"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressCharts } from "@/components/progress-charts"
import { AdvancedHealthCharts } from "@/components/advanced-health-charts"
import { CorrelationAnalysis } from "@/components/correlation-analysis"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Analyses</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Score de vitalité</h2>
            <span className="text-sm text-muted-foreground">Derniers 30 jours</span>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-3xl font-bold text-primary">
              78<span className="text-lg">/100</span>
            </div>
            <div className="text-sm text-secondary">+5 pts depuis le mois dernier</div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-secondary/10 p-2 rounded-lg text-center">
              <div className="text-sm font-medium">Humeur</div>
              <div className="text-lg font-semibold">82%</div>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg text-center">
              <div className="text-sm font-medium">Énergie</div>
              <div className="text-lg font-semibold">75%</div>
            </div>
            <div className="bg-accent/10 p-2 rounded-lg text-center">
              <div className="text-sm font-medium">Douleur</div>
              <div className="text-lg font-semibold">65%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">Graphiques</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
          <TabsTrigger value="correlations">Corrélations</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="mt-4">
          <ProgressCharts />
        </TabsContent>

        <TabsContent value="advanced" className="mt-4">
          <AdvancedHealthCharts />
        </TabsContent>

        <TabsContent value="correlations" className="mt-4">
          <CorrelationAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
