"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Shield, Lock, Users, Eye, FileText, Award, CheckCircle2, Share2 } from "lucide-react"
import { PrivacyGuideStep } from "@/components/privacy/privacy-guide-step"

export default function PrivacyGuideStep4Page() {
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
        <span className="text-sm text-primary font-medium">4/6 étapes</span>
      </div>

      <div className="space-y-2">
        <Progress value={66.6} className="h-2" />
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
              <Users className="h-5 w-5 text-primary" />
              Étape 4: Partage sécurisé de vos données
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Apprenez à partager vos données de santé en toute sécurité avec les professionnels de santé, votre famille
              ou vos aidants.
            </p>

            <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/placeholder.svg?key=cazcw"
                alt="Partage sécurisé de données de santé"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Types de partage</h4>

                <div className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Professionnels de santé</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partagez vos données avec vos médecins, pharmaciens et autres professionnels de santé pour un
                        meilleur suivi.
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Recommandé
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Famille et aidants</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Permettez à vos proches de vous aider à suivre votre traitement en leur donnant un accès limité.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Share2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Partage temporaire</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Créez un lien de partage à durée limitée pour un accès ponctuel à vos données.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Niveaux d'accès</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
                        <Eye className="h-4 w-4" />
                      </div>
                      <h5 className="font-medium text-sm">Accès complet</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Accès à toutes vos données de santé et historique
                      </p>
                      <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">Pour médecins</Badge>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
                        <Eye className="h-4 w-4" />
                      </div>
                      <h5 className="font-medium text-sm">Accès limité</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Accès à certaines données spécifiques uniquement
                      </p>
                      <Badge className="mt-2 bg-secondary/10 text-secondary border-secondary/20">Pour famille</Badge>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
                        <FileText className="h-4 w-4" />
                      </div>
                      <h5 className="font-medium text-sm">Export PDF</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partage d'un rapport en format PDF uniquement
                      </p>
                      <Badge className="mt-2 bg-muted text-muted-foreground">Pour tous</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Comment partager en toute sécurité</h4>

                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      1
                    </div>
                    <span>
                      <strong>Vérifiez l'identité</strong>: Assurez-vous de partager vos données uniquement avec des
                      personnes de confiance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      2
                    </div>
                    <span>
                      <strong>Limitez l'accès</strong>: Accordez uniquement le niveau d'accès nécessaire, pas plus.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      3
                    </div>
                    <span>
                      <strong>Définissez une durée</strong>: Pour les partages temporaires, fixez une date d'expiration.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      4
                    </div>
                    <span>
                      <strong>Vérifiez régulièrement</strong>: Passez en revue les accès partagés et révoquez ceux qui
                      ne sont plus nécessaires.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-muted/20 p-3 rounded-lg border border-muted">
              <h4 className="font-medium text-sm flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                Conseil de sécurité
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Activez les alertes d'accès pour être notifié chaque fois qu'une personne consulte vos données. Cela
                vous permet de détecter rapidement tout accès non autorisé.
              </p>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <Link href="/confidentialite/guide/etape-3">
              <Button variant="outline">Précédent</Button>
            </Link>
            <Link href="/confidentialite/guide/etape-5">
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
            active={false}
            completed={true}
          />

          <PrivacyGuideStep
            number={4}
            title="Partage sécurisé"
            description="Partager vos données en toute sécurité"
            icon={Users}
            active={true}
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
              <h2 className="font-semibold">Progression: 67%</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Vous avez complété 4 étapes sur 6. Plus que 2 étapes pour obtenir votre badge et vos points de
                récompense!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
