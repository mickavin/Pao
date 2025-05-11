"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Shield, Lock, Users, Eye, FileText, Award, CheckCircle2, Bell } from "lucide-react"
import { PrivacyGuideStep } from "@/components/privacy/privacy-guide-step"

export default function PrivacyGuideStep2Page() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/confidentialite">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Guide de confidentialité</h1>
      </header>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Votre progression</h2>
        <span className="text-sm text-primary font-medium">2/6 étapes</span>
      </div>

      <div className="space-y-2">
        <Progress value={33.3} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Débutant</span>
          <span>Intermédiaire</span>
          <span>Expert</span>
        </div>
      </div>

      <Card className="border-primary/20 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-primary/10 p-4 border-b border-primary/20">
            <h3 className="font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Étape 2: Configurer vos paramètres de confidentialité
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Personnalisez vos paramètres de confidentialité pour définir comment vos données sont protégées et
              utilisées dans l'application.
            </p>

            <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/privacy-settings-panel.png"
                alt="Configuration des paramètres de confidentialité"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Paramètres de base</h4>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="privacy-mode" className="flex flex-col space-y-1 cursor-pointer">
                    <span className="font-medium">Mode de confidentialité renforcée</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Masque automatiquement les informations sensibles sur l'écran
                    </span>
                  </Label>
                  <Switch id="privacy-mode" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="biometric" className="flex flex-col space-y-1 cursor-pointer">
                    <span className="font-medium">Authentification biométrique</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Utiliser votre empreinte digitale ou reconnaissance faciale
                    </span>
                  </Label>
                  <Switch id="biometric" defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="auto-lock" className="flex flex-col space-y-1 cursor-pointer">
                    <span className="font-medium">Verrouillage automatique</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Verrouille l'application après 5 minutes d'inactivité
                    </span>
                  </Label>
                  <Switch id="auto-lock" defaultChecked={true} />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Notifications et alertes</h4>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="access-alerts" className="flex flex-col space-y-1 cursor-pointer">
                    <span className="font-medium">Alertes d'accès</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Recevoir une notification quand quelqu'un accède à vos données
                    </span>
                  </Label>
                  <Switch id="access-alerts" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="login-alerts" className="flex flex-col space-y-1 cursor-pointer">
                    <span className="font-medium">Alertes de connexion</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Être notifié des connexions depuis de nouveaux appareils
                    </span>
                  </Label>
                  <Switch id="login-alerts" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="privacy-updates" className="flex flex-col space-y-1 cursor-pointer">
                    <span className="font-medium">Mises à jour de confidentialité</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Être informé des changements dans la politique de confidentialité
                    </span>
                  </Label>
                  <Switch id="privacy-updates" defaultChecked={false} />
                </div>
              </div>
            </div>

            <div className="bg-muted/20 p-3 rounded-lg border border-muted">
              <h4 className="font-medium text-sm flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-primary" />
                Conseil de sécurité
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Activez l'authentification biométrique pour un équilibre parfait entre sécurité et facilité
                d'utilisation. C'est plus sûr qu'un mot de passe et plus pratique au quotidien!
              </p>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <Link href="/confidentialite/guide">
              <Button variant="outline">Précédent</Button>
            </Link>
            <Link href="/confidentialite/guide/etape-3">
              <Button className="gap-1">
                Suivant
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Aperçu des étapes
        </h2>

        <div className="space-y-3">
          <PrivacyGuideStep
            number={1}
            title="Comprendre la confidentialité"
            description="Les bases de la protection des données de santé"
            icon={Shield}
            active={false}
            completed={true}
          />

          <PrivacyGuideStep
            number={2}
            title="Configurer vos paramètres"
            description="Personnaliser vos préférences de confidentialité"
            icon={Lock}
            active={true}
            completed={false}
          />

          <PrivacyGuideStep
            number={3}
            title="Gérer les consentements"
            description="Contrôler l'utilisation de vos données"
            icon={FileText}
            active={false}
            completed={false}
          />

          <PrivacyGuideStep
            number={4}
            title="Partage sécurisé"
            description="Partager vos données en toute sécurité"
            icon={Users}
            active={false}
            completed={false}
          />

          <PrivacyGuideStep
            number={5}
            title="Surveiller les accès"
            description="Suivre qui accède à vos données"
            icon={Eye}
            active={false}
            completed={false}
          />

          <PrivacyGuideStep
            number={6}
            title="Bonnes pratiques"
            description="Conseils pour une sécurité optimale"
            icon={Award}
            active={false}
            completed={false}
          />
        </div>
      </div>

      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-accent/10 text-accent mt-0.5">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Progression: 33%</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Vous avez complété 2 étapes sur 6. Continuez pour obtenir votre badge et vos points de récompense!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
