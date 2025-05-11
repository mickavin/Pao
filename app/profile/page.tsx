"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LevelBadge } from "@/components/ui/level-badge"
import { RewardToken } from "@/components/ui/reward-token"
import { AchievementBadge } from "@/components/ui/achievement-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PandaMascot } from "@/components/ui/panda-mascot"
import Link from "next/link"
import { Award, ChevronRight, Settings, Shield, User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez votre profil et vos préférences</p>
        </div>
        <RewardToken count={125} size="md" />
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4 flex-col">
            <div className="flex flex-col items-start">
              <div className="flex flex-row mb-5">
                <div className="relative h-16 w-16 rounded-full bg-gradient-primary p-0.5">
                  <div className="absolute inset-0.5 rounded-full bg-background flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="flex flex-col justify-center ml-4">
                  <h2 className="text-xl font-semibold">Sophie Dupont</h2>
                  <p className="text-sm text-muted-foreground">sophie.dupont@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LevelBadge level={3} variant="primary" size="sm" />
                <span className="text-sm text-muted-foreground ml-2">Membre depuis 42 jours</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Réalisations</TabsTrigger>
          <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Réalisations récentes</h3>
            <Link href="/achievements" className="text-sm text-primary flex items-center">
              Voir tout <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <AchievementBadge icon="check" variant="primary" label="Premier pas" description="Premier check-in" />
            <AchievementBadge
              icon="medal"
              variant="primary"
              label="Série de 3 jours"
              description="3 jours consécutifs"
            />
            <AchievementBadge
              icon="medal"
              variant="secondary"
              label="Série de 7 jours"
              description="7 jours consécutifs"
            />
          </div>

          <div className="flex justify-center mt-6">
            <PandaMascot message="Tu as débloqué 3 réalisations sur 8. Continue comme ça !" size="md" mood="happy" />
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="mt-4 space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Feuilles disponibles</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilisez vos feuilles pour débloquer des fonctionnalités
                  </p>
                </div>
                <RewardToken count={125} size="lg" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center justify-between">
                  <span>Thèmes personnalisés</span>
                  <span className="text-xs text-muted-foreground">50 🍃</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-between">
                  <span>Rapports avancés</span>
                  <span className="text-xs text-muted-foreground">75 🍃</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-between">
                  <span>Mascotte personnalisée</span>
                  <span className="text-xs text-muted-foreground">100 🍃</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-between">
                  <span>Exportation des données</span>
                  <span className="text-xs text-muted-foreground">150 🍃</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4 space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Confidentialité des données</h3>
                  <p className="text-sm text-muted-foreground">Gérez vos paramètres de confidentialité et de partage</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Paramètres de confidentialité
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Contacts autorisés
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Gérer mon compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
