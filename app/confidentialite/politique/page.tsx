"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, FileText, Lock, Eye, Server, Clock } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/confidentialite">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Politique de confidentialité</h1>
      </header>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Dernière mise à jour: 15 mars 2025</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Introduction
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Pao s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous
                collectons, utilisons, divulguons, transférons et stockons vos informations. Veuillez prendre le temps
                de vous familiariser avec nos pratiques en matière de confidentialité.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                En utilisant l'application Pao, vous acceptez les pratiques décrites dans cette politique de
                confidentialité. Les informations personnelles que nous collectons sont utilisées pour améliorer nos
                services et votre expérience.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Collecte et utilisation des données
          </h2>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Données que nous collectons</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    1
                  </div>
                  <span>
                    <strong>Données personnelles</strong>: Nom, adresse e-mail, numéro de téléphone, date de naissance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    2
                  </div>
                  <span>
                    <strong>Données de santé</strong>: Médicaments, symptômes, effets secondaires, adhérence aux
                    traitements.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    3
                  </div>
                  <span>
                    <strong>Données d'utilisation</strong>: Interactions avec l'application, préférences, paramètres.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    4
                  </div>
                  <span>
                    <strong>Données techniques</strong>: Adresse IP, type d'appareil, version du système d'exploitation.
                  </span>
                </li>
              </ul>

              <h3 className="font-medium mt-4 mb-2">Comment nous utilisons vos données</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Fournir et améliorer nos services</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Personnaliser votre expérience</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Communiquer avec vous concernant votre traitement</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Analyser l'utilisation de l'application pour l'améliorer</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Assurer la sécurité de nos services</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Partage des données
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Nous ne vendons jamais vos informations personnelles. Nous partageons vos données uniquement dans les
                cas suivants:
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Avec les professionnels de santé que vous avez explicitement autorisés</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Avec les membres de votre famille ou aidants que vous avez désignés</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>
                    Avec nos prestataires de services qui nous aident à fournir nos services (sous contrat de
                    confidentialité)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Si la loi l'exige ou pour protéger nos droits légaux</span>
                </li>
              </ul>

              <p className="text-sm text-muted-foreground mt-3">
                Nous pouvons partager des données anonymisées et agrégées à des fins de recherche médicale et
                d'amélioration des traitements, uniquement si vous avez donné votre consentement.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Sécurité des données
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                La sécurité de vos données est notre priorité. Nous mettons en œuvre des mesures techniques et
                organisationnelles appropriées pour protéger vos informations personnelles contre la perte, le vol et
                l'accès non autorisé.
              </p>

              <h3 className="font-medium mt-4 mb-2">Nos mesures de sécurité incluent:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Chiffrement des données en transit et au repos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Authentification à deux facteurs (optionnelle)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Contrôles d'accès stricts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Audits de sécurité réguliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Formation de notre personnel à la sécurité des données</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Conservation des données
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et
                respecter nos obligations légales. Vous pouvez demander la suppression de vos données à tout moment.
              </p>

              <h3 className="font-medium mt-4 mb-2">Durée de conservation:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Données de compte: Tant que votre compte est actif</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Données de santé: Selon les exigences légales (généralement 10 ans)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Données d'utilisation: 24 mois maximum</span>
                </li>
              </ul>

              <p className="text-sm text-muted-foreground mt-3">
                Après la période de conservation, vos données sont soit supprimées, soit anonymisées de manière
                irréversible.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          Télécharger la version complète (PDF)
        </Button>
      </div>
    </div>
  )
}
