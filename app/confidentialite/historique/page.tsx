"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, FileText, Eye, Download, Search, Filter, Calendar, Users, AlertTriangle } from "lucide-react"

export default function AccessHistoryPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/confidentialite">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Historique d'accès</h1>
      </header>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Journal complet des accès</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Consultez tous les accès à vos données de santé et les actions effectuées sur votre compte.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Rechercher dans l'historique..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filtrer par" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les accès</SelectItem>
              <SelectItem value="doctors">Médecins</SelectItem>
              <SelectItem value="pharmacists">Pharmaciens</SelectItem>
              <SelectItem value="family">Famille</SelectItem>
              <SelectItem value="system">Système</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="views">Consultations</TabsTrigger>
          <TabsTrigger value="changes">Modifications</TabsTrigger>
          <TabsTrigger value="shares">Partages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
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
                      <p className="text-sm text-muted-foreground">A consulté votre dossier médical complet</p>
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
                    <span>IP: 192.168.1.1</span>
                    <span className="mx-1">•</span>
                    <span>Paris, France</span>
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
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-secondary/10 text-secondary border-secondary/20"
                    >
                      <FileText className="h-3 w-3" />
                      Modification
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Hier, 10:15
                    <span className="mx-1">•</span>
                    <span>IP: 192.168.1.1</span>
                    <span className="mx-1">•</span>
                    <span>Votre appareil</span>
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
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Consultation
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    12 avril, 09:45
                    <span className="mx-1">•</span>
                    <span>IP: 192.168.2.1</span>
                    <span className="mx-1">•</span>
                    <span>Lyon, France</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Download className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Marie Dupont (Maman)</h3>
                      <p className="text-sm text-muted-foreground">A exporté votre rapport mensuel en PDF</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-accent/10 text-accent border-accent/20"
                    >
                      <Download className="h-3 w-3" />
                      Export
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    10 avril, 18:45
                    <span className="mx-1">•</span>
                    <span>IP: 192.168.3.1</span>
                    <span className="mx-1">•</span>
                    <span>Marseille, France</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Tentative de connexion</h3>
                      <p className="text-sm text-muted-foreground">
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
                    <Clock className="h-3 w-3" />5 avril, 22:10
                    <span className="mx-1">•</span>
                    <span>IP: 203.0.113.1</span>
                    <span className="mx-1">•</span>
                    <span>Localisation inconnue</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="views" className="mt-4 space-y-3">
          {/* Contenu similaire filtré pour les consultations */}
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
                      <p className="text-sm text-muted-foreground">A consulté votre dossier médical complet</p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Consultation
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Aujourd'hui, 14:30
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
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Consultation
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    12 avril, 09:45
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changes" className="mt-4 space-y-3">
          {/* Contenu similaire filtré pour les modifications */}
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
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-secondary/10 text-secondary border-secondary/20"
                    >
                      <FileText className="h-3 w-3" />
                      Modification
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Hier, 10:15
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shares" className="mt-4 space-y-3">
          {/* Contenu similaire filtré pour les partages */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Download className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Marie Dupont (Maman)</h3>
                      <p className="text-sm text-muted-foreground">A exporté votre rapport mensuel en PDF</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-accent/10 text-accent border-accent/20"
                    >
                      <Download className="h-3 w-3" />
                      Export
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    10 avril, 18:45
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Exporter l'historique
        </Button>
        <Button variant="outline" size="sm">
          Voir plus
        </Button>
      </div>
    </div>
  )
}
