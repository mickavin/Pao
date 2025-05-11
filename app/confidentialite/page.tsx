"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Users, Clock, FileText, Eye, Lock, CheckCircle2 } from "lucide-react"
import { PrivacyProgress } from "@/components/privacy/privacy-progress"
import { DataConsents } from "@/components/privacy/data-consents"
import { DataSharing } from "@/components/privacy/data-sharing"

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Confidentialité des données</h1>
      </header>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Vos données sont protégées</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Pao protège vos données de santé avec les plus hauts standards de sécurité. Vous gardez le contrôle
                total sur qui peut accéder à vos informations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Votre score de confidentialité</h2>
        <span className="text-sm text-primary font-medium">85/100</span>
      </div>

      <PrivacyProgress />

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Actions recommandées</h2>
        <Link href="/confidentialite/ameliorer">
          <Button variant="ghost" size="sm" className="text-primary">
            Tout voir
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        <Card className="border-primary/20">
          <CardContent className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Activer l'authentification à deux facteurs</h3>
                <p className="text-xs text-muted-foreground">Renforce la sécurité de votre compte</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Activer
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Vérifier les accès partagés</h3>
                <p className="text-xs text-muted-foreground">3 personnes ont accès à vos données</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Vérifier
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="consents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="consents" className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Consentements</span>
          </TabsTrigger>
          <TabsTrigger value="sharing" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Partage</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Historique</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consents" className="mt-4 space-y-4">
          <DataConsents />
        </TabsContent>

        <TabsContent value="sharing" className="mt-4 space-y-4">
          <DataSharing />
        </TabsContent>

        <TabsContent value="history" className="mt-4 space-y-4">
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Dr. Martin</h3>
                        <p className="text-sm text-muted-foreground">A consulté votre dossier médical</p>
                      </div>
                      <span className="text-xs text-muted-foreground">Aujourd'hui, 14:30</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Mise à jour des préférences</h3>
                        <p className="text-sm text-muted-foreground">
                          Vous avez modifié vos paramètres de confidentialité
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">Hier, 10:15</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Pharmacie Centrale</h3>
                        <p className="text-sm text-muted-foreground">A consulté votre liste de médicaments</p>
                      </div>
                      <span className="text-xs text-muted-foreground">12 avril, 09:45</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/confidentialite/historique">
              <Button variant="outline" size="sm">
                Voir tout l'historique
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Documents de confidentialité
        </h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">Politique de confidentialité</h3>
                  <p className="text-xs text-muted-foreground">Dernière mise à jour: 15 mars 2025</p>
                </div>
                <Link href="/confidentialite/politique">
                  <Button variant="outline" size="sm">
                    Consulter
                  </Button>
                </Link>
              </div>

              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">Conditions d'utilisation</h3>
                  <p className="text-xs text-muted-foreground">Dernière mise à jour: 10 février 2025</p>
                </div>
                <Link href="/confidentialite/conditions">
                  <Button variant="outline" size="sm">
                    Consulter
                  </Button>
                </Link>
              </div>

              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">Demande de suppression</h3>
                  <p className="text-xs text-muted-foreground">Supprimer définitivement vos données</p>
                </div>
                <Link href="/confidentialite/suppression">
                  <Button variant="outline" size="sm">
                    Demander
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-accent/10 text-accent mt-0.5">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Transparence totale</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tous les accès à vos données sont enregistrés et visibles dans l'historique. Vous pouvez révoquer
                n'importe quel accès à tout moment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
