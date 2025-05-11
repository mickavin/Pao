"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Shield, Lock, Users, Bell, Smartphone, Key, FileText, CheckCircle2 } from "lucide-react"

export default function ImprovePrivacyPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/confidentialite">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Améliorer votre confidentialité</h1>
      </header>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Score de confidentialité: 85/100</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Complétez ces actions recommandées pour renforcer la protection de vos données.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Actions prioritaires</h2>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            +15 points
          </Badge>
        </div>

        <Card className="border-primary/20">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Activer l'authentification à deux facteurs</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ajoutez une couche de sécurité supplémentaire à votre compte en exigeant une vérification par SMS ou
                    email lors de la connexion.
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      +5 points
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm">Activer</Button>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Vérifier les accès partagés</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Passez en revue les personnes qui ont accès à vos données et supprimez les accès inutiles.
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      +5 points
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Vérifier
              </Button>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Key className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Mettre à jour votre mot de passe</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Créez un mot de passe fort et unique que vous n'utilisez pas sur d'autres sites.
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      +5 points
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Modifier
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Actions complémentaires</h2>
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
            +10 points
          </Badge>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Activer les alertes de connexion</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recevez une notification lorsque quelqu'un se connecte à votre compte depuis un nouvel appareil.
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                      +3 points
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Activer
              </Button>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Vérifier les appareils connectés</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consultez la liste des appareils qui ont accès à votre compte et déconnectez ceux que vous ne
                    reconnaissez pas.
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                      +3 points
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Vérifier
              </Button>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Revoir vos consentements</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vérifiez et mettez à jour vos préférences concernant l'utilisation de vos données.
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                      +4 points
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Revoir
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Votre progression</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Sécurité du compte</h3>
                  <span className="text-sm text-primary font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Contrôle des accès</h3>
                  <span className="text-sm text-primary font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Gestion des consentements</h3>
                  <span className="text-sm text-primary font-medium">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Transparence</h3>
                  <span className="text-sm text-primary font-medium">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Compléter toutes les actions
        </Button>
      </div>
    </div>
  )
}
