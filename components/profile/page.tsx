import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, User, Settings, Bell, Shield, Share2, FileText, LogOut, Lock } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Profil</h1>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">Sophie Dupont</h2>
              <p className="text-muted-foreground">sophie.dupont@example.com</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  Compte Premium
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Depuis Janvier 2025
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Paramètres</h2>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <ProfileItem
                icon={User}
                title="Informations personnelles"
                description="Gérer vos informations de profil"
              />
              <ProfileItem
                icon={Bell}
                title="Notifications"
                description="Gérer vos préférences de notifications"
                action={<Switch defaultChecked />}
              />
              <Link href="/privacy">
                <ProfileItem
                  icon={Shield}
                  title="Confidentialité"
                  description="Gérer vos paramètres de confidentialité"
                />
              </Link>
              <Link href="/access-control">
                <ProfileItem icon={Lock} title="Contrôle d'accès" description="Gérer qui peut accéder à vos données" />
              </Link>
              <ProfileItem
                icon={Share2}
                title="Partage médical"
                description="Gérer les accès pour vos médecins"
                action={<Switch />}
              />
              <ProfileItem
                icon={FileText}
                title="Rapports médicaux"
                description="Accéder à vos rapports et historique"
              />
              <ProfileItem icon={Settings} title="Préférences" description="Langue, thème et autres paramètres" />
              <ProfileItem icon={LogOut} title="Déconnexion" description="Se déconnecter de l'application" danger />
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>Pao v1.0.2</p>
          <p className="mt-1">© 2025 Pao Health. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}

interface ProfileItemProps {
  icon: React.ElementType
  title: string
  description: string
  action?: React.ReactNode
  danger?: boolean
}

function ProfileItem({ icon: Icon, title, description, action, danger = false }: ProfileItemProps) {
  return (
    <div className={`flex items-center justify-between p-4 ${danger ? "text-destructive" : ""}`}>
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full ${danger ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
  )
}
