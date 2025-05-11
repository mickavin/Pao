"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Smile, Thermometer, Activity, Moon } from "lucide-react"
import { AreaChart, Title } from "@/components/ui/chart"
import { useAccessibility } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { EmojiStatus } from "@/components/ui/emoji-status"
import { ProgressIndicator } from "@/components/ui/progress-indicator"

const moodData = [
  { date: "Lun", value: 3 },
  { date: "Mar", value: 4 },
  { date: "Mer", value: 2 },
  { date: "Jeu", value: 5 },
  { date: "Ven", value: 3 },
  { date: "Sam", value: 4 },
  { date: "Dim", value: 4 },
]

const painData = [
  { date: "Lun", value: 2 },
  { date: "Mar", value: 3 },
  { date: "Mer", value: 4 },
  { date: "Jeu", value: 2 },
  { date: "Ven", value: 1 },
  { date: "Sam", value: 2 },
  { date: "Dim", value: 1 },
]

const fatigueData = [
  { date: "Lun", value: 3 },
  { date: "Mar", value: 4 },
  { date: "Mer", value: 5 },
  { date: "Jeu", value: 3 },
  { date: "Ven", value: 2 },
  { date: "Sam", value: 2 },
  { date: "Dim", value: 3 },
]

export function HealthIndicators() {
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <HealthCard
        title="Humeur"
        value={4}
        maxValue={5}
        icon={Smile}
        color="text-secondary"
        data={moodData}
        emojiType="mood"
        emojiValue="good"
        message="Tu te sens bien aujourd'hui !"
      />
      <HealthCard
        title="Douleur"
        value={1}
        maxValue={5}
        icon={Thermometer}
        color="text-accent"
        data={painData}
        inverted
        emojiType="pain"
        emojiValue="mild"
        message="Douleur légère, c'est encourageant"
      />
      <HealthCard
        title="Énergie"
        value={3}
        maxValue={5}
        icon={Activity}
        color="text-primary"
        data={fatigueData}
        emojiType="energy"
        emojiValue="neutral"
        message="Niveau d'énergie stable"
      />
      <HealthCard
        title="Sommeil"
        value={7}
        maxValue={10}
        icon={Moon}
        color="text-primary"
        unit="h"
        noChart
        emojiType="sleep"
        emojiValue="good"
        message="Bonne nuit de sommeil !"
      />
    </div>
  )
}

interface HealthCardProps {
  title: string
  value: number
  maxValue: number
  icon: React.ElementType
  color: string
  unit?: string
  data?: Array<{ date: string; value: number }>
  inverted?: boolean
  noChart?: boolean
  emojiType: "mood" | "pain" | "energy" | "sleep"
  emojiValue: string
  message: string
}

function HealthCard({
  title,
  value,
  maxValue,
  icon: Icon,
  color,
  unit = "",
  data = [],
  inverted = false,
  noChart = false,
  emojiType,
  emojiValue,
  message,
}: HealthCardProps) {
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  return (
    <Card className="overflow-hidden">
      <CardContent className={cn("p-4", simplifiedLayout && "p-5")}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${color.replace("text-", "bg-")}/10 ${color}`}>
              <Icon className={cn("h-4 w-4", simplifiedLayout && "h-5 w-5")} />
            </div>
            <h3 className={cn("font-medium", simplifiedLayout && "text-lg")}>{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("font-semibold text-lg", simplifiedLayout && "text-xl")}>
              {value}
              {unit}
            </span>
            <EmojiStatus type={emojiType as any} value={emojiValue as any} size={simplifiedLayout ? "md" : "sm"} />
          </div>
        </div>

        <div className="mb-3">
          <ProgressIndicator
            value={inverted ? maxValue - value : value}
            max={maxValue}
            color={color.replace("text-", "") as any}
            size="sm"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-3">{message}</p>

        {!noChart && data.length > 0 && (
          <div className="chart-container mt-4">
            <Card className="p-0 border-0 shadow-none">
              <Title className="sr-only">Évolution sur 7 jours</Title>
              <AreaChart
                className="h-20"
                data={data}
                index="date"
                categories={["value"]}
                colors={[color.replace("text-", "")]}
                valueFormatter={(value) => `${value}`}
                showXAxis={true}
                showYAxis={false}
                showLegend={false}
                showGridLines={false}
                startEndOnly={true}
                showGradient={true}
                autoMinValue={true}
                minValue={0}
                maxValue={maxValue}
              />
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
