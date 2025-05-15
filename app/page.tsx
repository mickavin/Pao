"use client"

import { DailyReminders } from "@/components/daily-reminders"
import { HealthIndicators } from "@/components/health-indicators"
import { AdherenceStreak } from "@/components/adherence-streak"
import { ProgressCharts } from "@/components/progress-charts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Confetti } from "@/components/ui/confetti"
import createClient from "@/utils/supabase/client"

const streakData = [
  { date: "2023-04-10", completed: true },
  { date: "2023-04-11", completed: true },
  { date: "2023-04-12", completed: true },
  { date: "2023-04-13", completed: true },
  { date: "2023-04-14", completed: true },
  { date: "2023-04-15", completed: false },
  { date: "2023-04-16", completed: true, current: true },
]

// Sample daily quest
const dailyQuest = {
  id: "daily-checkin",
  title: "Check-in quotidien",
  description: "Enregistrez votre humeur et vos symptômes aujourd'hui",
  reward: 10,
  progress: 0,
  maxProgress: 1,
  completed: false,
  expires: "aujourd'hui à 23:59",
}

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [tokens, setTokens] = useState(125)
  const [medications, setMedications] = useState<any[]>([])

  const handleCompleteQuest = () => {
    setShowConfetti(true)
    setTokens((prev) => prev + dailyQuest.reward)
  }

  return (
    <div className="container py-6 space-y-6">
      {showConfetti && <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Bonjour 👋</h1>
          <p className="text-muted-foreground">Tu avances bien dans ton parcours de santé. Continue comme ça !</p>
        </div>
        <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
          <span className="text-green-800 font-medium">{tokens}</span>
          <span className="ml-1">🍃</span>
        </div>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-medium mb-2">Niveau 3</h2>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 h-full" style={{ width: "70%" }}></div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">350/500 XP pour le niveau 4</p>
        </CardContent>
      </Card>

      {/* Daily Quest */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-medium mb-2">Quête du jour</h2>
          <p className="text-sm">{dailyQuest.title}</p>
          <p className="text-xs text-muted-foreground">{dailyQuest.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">Expire {dailyQuest.expires}</span>
            <span className="text-sm font-medium">+{dailyQuest.reward} 🍃</span>
          </div>
          <Button
            className="w-full mt-3 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500"
            onClick={handleCompleteQuest}
          >
            Compléter
          </Button>
        </CardContent>
      </Card>

      {/* Streak Tracker */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-medium mb-2">Série actuelle: 5 jours</h2>
          <div className="flex justify-between">
            {streakData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    day.completed ? "bg-gradient-to-r from-green-400 to-blue-400 text-white" : "bg-slate-200"
                  }`}
                >
                  {day.completed ? "✓" : ""}
                </div>
                <span className="text-xs mt-1">{index + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DailyReminders />
      <HealthIndicators />
      <AdherenceStreak />
      <ProgressCharts />
    </div>
  )
}
