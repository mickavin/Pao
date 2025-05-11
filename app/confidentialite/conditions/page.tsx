"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Shield, Scale, Clock, Globe } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/confidentialite">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Conditions d'utilisation</h1>
      </header>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Dernière mise à jour: 10 février 2025</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Ces conditions régissent votre utilisation de l'application Pao. Veuillez les lire attentivement.
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
                Bienvenue sur Pao, une application de suivi de médicaments et de santé. En utilisant notre
                application, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas
                ces conditions, veuillez ne pas utiliser l'application.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Pao est conçu pour vous aider à suivre vos médicaments et votre santé, mais ne remplace pas les
                conseils médicaux professionnels. Consultez toujours un professionnel de santé qualifié pour des
                questions médicales.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Utilisation de l'application
          </h2>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Compte utilisateur</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Pour utiliser certaines fonctionnalités de l'application, vous devrez créer un compte. Vous êtes
                responsable de maintenir la confidentialité de vos informations de connexion et de toutes les activités
                qui se produisent sous votre compte.
              </p>

              <h3 className="font-medium mb-2">Utilisation acceptable</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Vous acceptez d'utiliser l'application uniquement à des fins légales et conformément à ces conditions.
                Vous ne devez pas:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>
                    Utiliser l'application d'une manière qui pourrait endommager, désactiver ou surcharger nos systèmes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Tenter d'accéder à des données qui ne vous appartiennent pas</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Utiliser l'application pour transmettre des virus ou autres codes malveillants</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                    •
                  </div>
                  <span>Violer les droits de propriété intellectuelle ou autres droits de tiers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Modifications et résiliation
          </h2>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Modifications des conditions</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet
                dès leur publication dans l'application. Votre utilisation continue de l'application après la
                publication des modifications constitue votre acceptation des nouvelles conditions.
              </p>

              <h3 className="font-medium mb-2">Résiliation</h3>
              <p className="text-sm text-muted-foreground">
                Nous nous réservons le droit de suspendre ou de résilier votre accès à l'application à tout moment, pour
                quelque raison que ce soit, sans préavis. Vous pouvez également résilier votre compte à tout moment en
                suivant les instructions dans l'application.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Dispositions générales
          </h2>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Loi applicable</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Ces conditions sont régies par les lois françaises. Tout litige relatif à ces conditions sera soumis à
                la compétence exclusive des tribunaux français.
              </p>

              <h3 className="font-medium mb-2">Intégralité de l'accord</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Ces conditions constituent l'intégralité de l'accord entre vous et Pao concernant l'utilisation de
                l'application et remplacent tous les accords antérieurs ou contemporains.
              </p>

              <h3 className="font-medium mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Si vous avez des questions concernant ces conditions, veuillez nous contacter à l'adresse suivante:
                contact@pao.fr
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
