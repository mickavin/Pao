"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, AlertTriangle, Calendar, Clock, Pill, Settings } from "lucide-react"
import Link from "next/link"
import { NotificationTest } from "@/components/notification-test"

export default function NotificationsPage() {
  if (typeof window === "undefined") return null
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
        <Link href="/notifications/settings">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </header>

      <NotificationTest />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="reminders">Rappels</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Rappel de médicament</h3>
                  <p className="text-sm">Il est temps de prendre votre Levothyrox (100µg)</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Il y a 10 minutes</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Pris
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-destructive/10 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Alerte d'interaction</h3>
                  <p className="text-sm">
                    Interaction potentielle détectée entre Doliprane et Levothyrox. Consultez votre médecin.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Aujourd'hui, 14:30</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Vu
                </Button>
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
                  <h3 className="font-medium">Rappel de rendez-vous</h3>
                  <p className="text-sm">Rendez-vous avec Dr. Martin demain à 10:00</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Hier, 18:45</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Rappeler
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="mt-4 space-y-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Rappel de médicament</h3>
                  <p className="text-sm">Il est temps de prendre votre Levothyrox (100µg)</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Il y a 10 minutes</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Pris
                </Button>
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
                  <h3 className="font-medium">Rappel de rendez-vous</h3>
                  <p className="text-sm">Rendez-vous avec Dr. Martin demain à 10:00</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Hier, 18:45</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Rappeler
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4 space-y-4">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-destructive/10 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Alerte d'interaction</h3>
                  <p className="text-sm">
                    Interaction potentielle détectée entre Doliprane et Levothyrox. Consultez votre médecin.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Aujourd'hui, 14:30</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Vu
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Stock faible</h3>
                  <p className="text-sm">
                    Il ne vous reste que 3 jours de Levothyrox. Pensez à renouveler votre ordonnance.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Hier, 09:15</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Rappeler
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-muted-foreground p-4">
        <p>Vous pouvez personnaliser vos notifications dans les paramètres.</p>
        <Link href="/notifications/settings" className="text-primary font-medium">
          Gérer les notifications
        </Link>
      </div>
    </div>
  )
}
