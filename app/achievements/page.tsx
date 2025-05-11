"use client"
import { useState } from "react"
import { AchievementCard } from "@/components/gamification/achievement-card"
import { RewardToken } from "@/components/ui/reward-token"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PandaMascot } from "@/components/ui/panda-mascot"
import { Confetti } from "@/components/ui/confetti"
// Sample achievements data
const achievements = [
  {
    id: "first-checkin",
    title: "Premier pas",
    description: "Effectuer votre premier check-in quotidien",
    icon: "check" as const,
    variant: "primary" as const,
    unlocked: true,
    rewardPoints: 10,
  },
  {
    id: "streak-3",
    title: "Série de 3 jours",
    description: "Compléter 3 jours consécutifs de check-in",
    icon: "medal" as const,
    variant: "primary" as const,
    unlocked: true,
    rewardPoints: 15,
  },
  {
    id: "streak-7",
    title: "Série de 7 jours",
    description: "Compléter 7 jours consécutifs de check-in",
    icon: "medal" as const,
    variant: "secondary" as const,
    unlocked: true,
    rewardPoints: 25,
  },
  {
    id: "streak-30",
    title: "Série de 30 jours",
    description: "Compléter 30 jours consécutifs de check-in",
    icon: "trophy" as const,
    variant: "accent" as const,
    progress: 16,
    maxProgress: 30,
    unlocked: false,
  },
  {
    id: "add-5-meds",
    title: "Pharmacien en herbe",
    description: "Ajouter 5 médicaments à votre suivi",
    icon: "star" as const,
    variant: "primary" as const,
    progress: 3,
    maxProgress: 5,
    unlocked: false,
  },
  {
    id: "perfect-adherence",
    title: "Adhérence parfaite",
    description: "Prendre tous vos médicaments pendant 7 jours",
    icon: "award" as const,
    variant: "success" as const,
    progress: 5,
    maxProgress: 7,
    unlocked: false,
  },
  {
    id: "feedback-hero",
    title: "Héros du feedback",
    description: "Fournir des retours détaillés sur 10 prises de médicaments",
    icon: "star" as const,
    variant: "secondary" as const,
    progress: 7,
    maxProgress: 10,
    unlocked: false,
  },
  {
    id: "health-tracker",
    title: "Suivi de santé",
    description: "Enregistrer vos symptômes pendant 14 jours",
    icon: "check" as const,
    variant: "primary" as const,
    progress: 9,
    maxProgress: 14,
    unlocked: false,
  },
]

export default function AchievementsPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Réalisations</h1>
          <p className="text-muted-foreground">Suivez vos progrès et débloquez des récompenses</p>
        </div>
        <RewardToken count={125} size="md" />
      </div>

      <div className="flex items-center justify-center">
        <PandaMascot
          message="Complète des réalisations pour gagner des feuilles et débloquer de nouvelles fonctionnalités !"
          size="lg"
          mood="excited"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="unlocked">Débloqués</TabsTrigger>
          <TabsTrigger value="locked">À débloquer</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClaim={(id) => {
                setShowConfetti(true)
                console.log(`Achievement claimed: ${id}`)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="unlocked" className="mt-4 space-y-4">
          {achievements
            .filter((a) => a.unlocked)
            .map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClaim={(id) => {
                  setShowConfetti(true)
                  console.log(`Achievement claimed: ${id}`)
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="locked" className="mt-4 space-y-4">
          {achievements
            .filter((a) => !a.unlocked)
            .map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClaim={(id) => {
                  setShowConfetti(true)
                  console.log(`Achievement claimed: ${id}`)
                }}
              />
            ))}
        </TabsContent>
      </Tabs>
      <Confetti active={showConfetti} count={80} onComplete={() => setShowConfetti(false)} />
    </div>
  )
}
