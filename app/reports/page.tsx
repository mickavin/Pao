"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2, FileText, Calendar, BarChart2 } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Rapports</h1>
      </header>

      <Tabs defaultValue="generated" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generated">Rapports générés</TabsTrigger>
          <TabsTrigger value="shared">Partagés</TabsTrigger>
        </TabsList>

        <TabsContent value="generated" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Rapport mensuel</h3>
                      <p className="text-sm text-muted-foreground">Avril 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      Généré le 01/04/2025
                    </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Complet</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Suivi hebdomadaire</h3>
                      <p className="text-sm text-muted-foreground">10-16 Avril 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      Généré le 16/04/2025
                    </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Résumé</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 p-2 rounded-full">
                  <BarChart2 className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Analyse de traitement</h3>
                      <p className="text-sm text-muted-foreground">Levothyrox - 3 mois</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      Généré le 15/03/2025
                    </div>
                    <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">Spécifique</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">Générer un nouveau rapport</Button>
        </TabsContent>

        <TabsContent value="shared" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Rapport mensuel</h3>
                      <p className="text-sm text-muted-foreground">Partagé avec Dr. Martin</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Révoquer
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      Partagé le 02/04/2025
                    </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Accès valide 30 jours
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 p-2 rounded-full">
                  <BarChart2 className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Analyse de traitement</h3>
                      <p className="text-sm text-muted-foreground">Partagé avec Pharmacie Centrale</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Révoquer
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      Partagé le 16/03/2025
                    </div>
                    <div className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">Expiré</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground p-4">
            <p>Les rapports partagés sont accessibles via un lien sécurisé.</p>
            <p>Vous pouvez révoquer l'accès à tout moment.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
