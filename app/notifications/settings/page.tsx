"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, Clock, Calendar, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { NotificationSettings } from "@/components/notification-settings"

export default function NotificationSettingsPage() {
  if (typeof window === "undefined") return null
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Paramètres de notifications</h1>
      </header>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Notifications push</h2>
              <p className="text-sm text-muted-foreground">
                Configurez les notifications pour vos médicaments et rappels
              </p>
            </div>
          </div>

          <NotificationSettings />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-secondary/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="font-semibold">Horaires de rappels</h2>
              <p className="text-sm text-muted-foreground">
                Définissez les horaires par défaut pour les rappels de médicaments
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Matin</h3>
                <p className="text-sm text-muted-foreground">Premier rappel de la journée</p>
              </div>
              <div className="text-right">
                <span className="font-medium">08:00</span>
                <Button variant="ghost" size="sm" className="ml-2">
                  Modifier
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Midi</h3>
                <p className="text-sm text-muted-foreground">Rappel du milieu de journée</p>
              </div>
              <div className="text-right">
                <span className="font-medium">12:00</span>
                <Button variant="ghost" size="sm" className="ml-2">
                  Modifier
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Soir</h3>
                <p className="text-sm text-muted-foreground">Dernier rappel de la journée</p>
              </div>
              <div className="text-right">
                <span className="font-medium">20:00</span>
                <Button variant="ghost" size="sm" className="ml-2">
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-accent/10 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold">Rappels de rendez-vous</h2>
              <p className="text-sm text-muted-foreground">Configurez les rappels pour vos rendez-vous médicaux</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Premier rappel</h3>
                <p className="text-sm text-muted-foreground">Avant le rendez-vous</p>
              </div>
              <div className="text-right">
                <span className="font-medium">1 jour avant</span>
                <Button variant="ghost" size="sm" className="ml-2">
                  Modifier
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Rappel final</h3>
                <p className="text-sm text-muted-foreground">Juste avant le rendez-vous</p>
              </div>
              <div className="text-right">
                <span className="font-medium">1 heure avant</span>
                <Button variant="ghost" size="sm" className="ml-2">
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <SettingsIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Paramètres avancés</h2>
              <p className="text-sm text-muted-foreground">Options supplémentaires pour les notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Mode Ne pas déranger</h3>
                <p className="text-sm text-muted-foreground">Désactiver les notifications pendant certaines heures</p>
              </div>
              <Button variant="ghost" size="sm">
                Configurer
              </Button>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Notifications critiques</h3>
                <p className="text-sm text-muted-foreground">
                  Toujours afficher les notifications importantes même en mode Ne pas déranger
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Configurer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
