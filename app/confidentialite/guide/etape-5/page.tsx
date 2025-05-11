"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Lock,
  Users,
  Eye,
  FileText,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { PrivacyGuideStep } from "@/components/privacy/privacy-guide-step"

export default function PrivacyGuideStep5Page() {
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
        <span className="text-sm text-primary font-medium">5/6 étapes</span>
      </div>

      <div className="space-y-2">
        <Progress value={83.3} className="h-2" />
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
              <Eye className="h-5 w-5 text-primary" />
              Étape 5: Surveiller les accès à vos données
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Apprenez à suivre et à contrôler qui accède à vos données de santé et à détecter toute activité suspecte.
            </p>

            <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/security-dashboard-overview.png"
                alt="Surveillance des accès aux données"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Journal d'accès</h4>
                <p className="text-xs text-muted-foreground">
                  Pao enregistre automatiquement tous les accès à vos données. Voici comment consulter et comprendre
                  ces journaux:
                </p>

                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Eye className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-sm">Dr. Martin</h5>
                            <p className="text-xs text-muted-foreground">A consulté votre dossier médical</p>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Consultation
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Aujourd'hui, 14:30
                          <span className="mx-1">•</span>
                          <span>Paris, France</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-sm">Tentative de connexion</h5>
                            <p className="text-xs text-muted-foreground">
                              Tentative de connexion depuis un nouvel appareil (bloquée)
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-destructive/10 text-destructive border-destructive/20"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            Alerte
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Hier, 22:10
                          <span className="mx-1">•</span>
                          <span>Localisation inconnue</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Comment interpréter le journal d'accès</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                        1
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Qui a accédé</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Identifie la personne ou l'organisation qui a consulté vos données.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                        2
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Type d'accès</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Indique s'il s'agit d'une consultation, modification, export ou alerte.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                        3
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Date et heure</h5>
                        <p className="text-xs text-muted-foreground mt-1">Moment précis où l'accès a eu lieu.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                        4
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Localisation</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Lieu approximatif d'où l'accès a été effectué.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Que faire en cas d'activité suspecte</h4>

                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      1
                    </div>
                    <span>
                      <strong>Vérifiez l'activité</strong>: Assurez-vous que vous ne reconnaissez pas l'accès (peut-être
                      avez-vous oublié une consultation médicale récente).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      2
                    </div>
                    <span>
                      <strong>Changez votre mot de passe</strong>: Si vous suspectez un accès non autorisé, modifiez
                      immédiatement votre mot de passe.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      3
                    </div>
                    <span>
                      <strong>Révoquez les accès</strong>: Supprimez tous les partages que vous n'avez pas explicitement
                      autorisés.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      4
                    </div>
                    <span>
                      <strong>Contactez le support</strong>: Signalez l'activité suspecte à notre équipe de sécurité.
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
                Consultez votre journal d'accès au moins une fois par mois pour vous assurer que seules les personnes
                autorisées accèdent à vos données. C'est une bonne habitude de sécurité!
              </p>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <Link href="/confidentialite/guide/etape-4">
              <Button variant="outline">Précédent</Button>
            </Link>
            <Link href="/confidentialite/guide/etape-6">
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
            active={false}
            completed={true}
          />

          <PrivacyGuideStep
            number={5}
            title="Surveiller les accès"
            description="Suivre qui accède à vos données"
            icon={Eye}
            active={true}
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
              <h2 className="font-semibold">Progression: 83%</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Vous avez presque terminé! Plus qu'une étape pour obtenir votre badge et vos points de récompense!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
