"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Shield, Lock, Users, Eye, FileText, Award, CheckCircle2 } from "lucide-react"
import { PrivacyGuideStep } from "@/components/privacy/privacy-guide-step"
import { PandaMascot } from "@/components/ui/panda-mascot"

export default function PrivacyGuidePage() {
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

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Protégez vos données de santé</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Suivez ce guide étape par étape pour comprendre et configurer la confidentialité de vos données.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Votre progression</h2>
        <span className="text-sm text-primary font-medium">1/6 étapes</span>
      </div>

      <div className="space-y-2">
        <Progress value={16.6} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Débutant</span>
          <span>Intermédiaire</span>
          <span>Expert</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-6 right-4 transform rotate-6">
          <PandaMascot expression="happy" size="small" />
        </div>
        <Card className="border-primary/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-primary/10 p-4 border-b border-primary/20">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Étape 1: Comprendre la confidentialité des données de santé
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Avant de configurer vos paramètres, il est important de comprendre pourquoi la protection de vos données
                de santé est essentielle.
              </p>

              <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src="/protected-health-data.png"
                  alt="Illustration de la confidentialité des données de santé"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Vos données sont sensibles</h4>
                    <p className="text-xs text-muted-foreground">
                      Les informations sur votre santé sont parmi les données les plus personnelles et sensibles. Elles
                      méritent une protection spéciale.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Contrôle d'accès</h4>
                    <p className="text-xs text-muted-foreground">
                      Vous avez le droit de décider qui peut accéder à vos informations médicales et dans quelle mesure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Transparence</h4>
                    <p className="text-xs text-muted-foreground">
                      Vous devez toujours savoir qui a consulté vos données et quand. C'est pourquoi nous enregistrons
                      chaque accès.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Cadre légal</h4>
                    <p className="text-xs text-muted-foreground">
                      Le RGPD et d'autres lois protègent vos données de santé. Pao respecte ces réglementations pour
                      garantir vos droits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 p-3 rounded-lg border border-muted">
                <h4 className="font-medium text-sm flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-primary" />
                  Le saviez-vous?
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Selon une étude récente, 78% des utilisateurs d'applications de santé ne vérifient jamais qui a accès
                  à leurs données. En suivant ce guide, vous ferez partie des 22% qui prennent le contrôle de leur vie
                  privée numérique!
                </p>
              </div>
            </div>
            <div className="border-t p-4 flex justify-between">
              <Button variant="outline" disabled>
                Précédent
              </Button>
              <Link href="/confidentialite/guide/etape-2">
                <Button className="gap-1">
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

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
            active={true}
            completed={false}
          />

          <PrivacyGuideStep
            number={2}
            title="Configurer vos paramètres"
            description="Personnaliser vos préférences de confidentialité"
            icon={Lock}
            active={false}
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
              <h2 className="font-semibold">Récompense à la clé!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Terminez ce guide pour obtenir le badge "Gardien de la Confidentialité" et 50 points de récompense!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
