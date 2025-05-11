"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Shield, Lock, Users, Eye, FileText, Award, CheckCircle2, Info } from "lucide-react"
import { PrivacyGuideStep } from "@/components/privacy/privacy-guide-step"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PrivacyGuideStep3Page() {
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
        <span className="text-sm text-primary font-medium">3/6 étapes</span>
      </div>

      <div className="space-y-2">
        <Progress value={50} className="h-2" />
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
              <FileText className="h-5 w-5 text-primary" />
              Étape 3: Gérer vos consentements
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Contrôlez précisément comment vos données peuvent être utilisées en gérant vos consentements pour
              différentes finalités.
            </p>

            <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/privacy-control-panel.png"
                alt="Interface de gestion des consentements"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Consentements essentiels</h4>
                <p className="text-xs text-muted-foreground">
                  Ces consentements sont nécessaires au fonctionnement de l'application.
                </p>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg bg-muted/10">
                  <Label htmlFor="essential-service" className="flex flex-col space-y-1 cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Fonctionnement du service</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-xs">
                              Nécessaire pour le fonctionnement de base de l'application, comme l'enregistrement de vos
                              médicaments et rappels.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-normal text-xs text-muted-foreground">
                      Traitement nécessaire à la fourniture du service
                    </span>
                  </Label>
                  <Switch id="essential-service" defaultChecked={true} disabled />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg bg-muted/10">
                  <Label htmlFor="security" className="flex flex-col space-y-1 cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Sécurité</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-xs">
                              Nécessaire pour protéger votre compte contre les accès non autorisés et les fraudes.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-normal text-xs text-muted-foreground">
                      Protection contre les accès non autorisés
                    </span>
                  </Label>
                  <Switch id="security" defaultChecked={true} disabled />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Consentements optionnels</h4>
                <p className="text-xs text-muted-foreground">
                  Ces consentements sont facultatifs et peuvent être modifiés à tout moment.
                </p>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="analytics" className="flex flex-col space-y-1 cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Analyse d'utilisation</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-xs">
                              Nous collectons des données anonymisées sur votre utilisation de l'application pour
                              améliorer nos services.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-normal text-xs text-muted-foreground">Amélioration de l'application</span>
                  </Label>
                  <Switch id="analytics" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="research" className="flex flex-col space-y-1 cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Recherche médicale</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-xs">
                              Vos données anonymisées peuvent être utilisées pour la recherche médicale et
                              l'amélioration des traitements.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-normal text-xs text-muted-foreground">Contribution à la science</span>
                  </Label>
                  <Switch id="research" defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="marketing" className="flex flex-col space-y-1 cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Communications marketing</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-xs">
                              Recevoir des informations sur les nouveautés, fonctionnalités et offres spéciales de
                              Pao.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-normal text-xs text-muted-foreground">Newsletters et offres</span>
                  </Label>
                  <Switch id="marketing" defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <Label htmlFor="ai-features" className="flex flex-col space-y-1 cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Fonctionnalités IA</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-xs">
                              Utilisation de l'intelligence artificielle pour personnaliser votre expérience et vous
                              fournir des recommandations adaptées.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-normal text-xs text-muted-foreground">Personnalisation intelligente</span>
                  </Label>
                  <Switch id="ai-features" defaultChecked={true} />
                </div>
              </div>
            </div>

            <div className="bg-muted/20 p-3 rounded-lg border border-muted">
              <h4 className="font-medium text-sm flex items-center gap-1.5">
                <Info className="h-4 w-4 text-primary" />
                Pourquoi c'est important
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Gérer vos consentements vous donne un contrôle précis sur l'utilisation de vos données. Vous pouvez
                modifier ces paramètres à tout moment dans les réglages de confidentialité.
              </p>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <Link href="/confidentialite/guide/etape-2">
              <Button variant="outline">Précédent</Button>
            </Link>
            <Link href="/confidentialite/guide/etape-4">
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
            active={false}
            completed={true}
          />

          <PrivacyGuideStep
            number={3}
            title="Gérer les consentements"
            description="Contrôler l'utilisation de vos données"
            icon={FileText}
            active={true}
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
              <h2 className="font-semibold">Progression: 50%</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Vous avez complété la moitié du guide! Continuez pour obtenir votre badge et vos points de récompense!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
