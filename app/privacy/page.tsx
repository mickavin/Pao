"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Users, Clock, FileText, Eye, Lock } from "lucide-react"
import Link from "next/link"
import { AuthorizedContacts } from "@/components/privacy/authorized-contacts"
import { AccessLogs } from "@/components/privacy/access-logs"
import { PrivacySettings } from "@/components/privacy/privacy-settings"

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Accès aux données et confidentialité</h1>
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
                Pao anonymise vos données par défaut. Vous êtes uniquement identifié par un ID sécurisé interne. Vous
                contrôlez entièrement qui peut accéder à vos informations de santé.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Journal d'accès</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Paramètres</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-4 space-y-4">
          <AuthorizedContacts />
        </TabsContent>

        <TabsContent value="logs" className="mt-4 space-y-4">
          <AccessLogs />
        </TabsContent>

        <TabsContent value="settings" className="mt-4 space-y-4">
          <PrivacySettings />
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Partager un rapport sécurisé
        </h2>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Générez un lien sécurisé à usage unique pour partager un rapport avec un professionnel de santé sans créer
              d'accès permanent.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">Rapport complet</h3>
                  <p className="text-xs text-muted-foreground">Toutes les données de santé et médicaments</p>
                </div>
                <Button variant="outline" size="sm">
                  Générer un lien
                </Button>
              </div>

              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">Rapport de médicaments</h3>
                  <p className="text-xs text-muted-foreground">Liste des médicaments et adhérence uniquement</p>
                </div>
                <Button variant="outline" size="sm">
                  Générer un lien
                </Button>
              </div>

              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">Rapport de symptômes</h3>
                  <p className="text-xs text-muted-foreground">Évolution des symptômes et effets secondaires</p>
                </div>
                <Button variant="outline" size="sm">
                  Générer un lien
                </Button>
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
                Tous les accès à vos données sont enregistrés et visibles dans le journal d'accès. Vous pouvez révoquer
                n'importe quel accès à tout moment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
