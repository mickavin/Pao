"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Stethoscope, Building, UserRound, Users, MoreHorizontal, Clock, PlusCircle, ShieldCheck } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type ContactType = "doctor" | "pharmacist" | "caregiver" | "family"
type AccessLevel = "full" | "limited" | "export"

interface Contact {
  id: string
  name: string
  type: ContactType
  accessLevel: AccessLevel
  lastAccess?: Date
  active: boolean
}

export function DataSharing() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Dr. Martin",
      type: "doctor",
      accessLevel: "full",
      lastAccess: new Date(2025, 3, 10),
      active: true,
    },
    {
      id: "2",
      name: "Pharmacie Centrale",
      type: "pharmacist",
      accessLevel: "limited",
      lastAccess: new Date(2025, 3, 5),
      active: true,
    },
    {
      id: "3",
      name: "Marie Dupont (Maman)",
      type: "family",
      accessLevel: "export",
      lastAccess: new Date(2025, 2, 20),
      active: false,
    },
  ])

  const toggleContactActive = (id: string) => {
    setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, active: !contact.active } : contact)))
  }

  const getTypeIcon = (type: ContactType) => {
    switch (type) {
      case "doctor":
        return <Stethoscope className="h-4 w-4" />
      case "pharmacist":
        return <Building className="h-4 w-4" />
      case "caregiver":
        return <UserRound className="h-4 w-4" />
      case "family":
        return <Users className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: ContactType) => {
    switch (type) {
      case "doctor":
        return "Médecin"
      case "pharmacist":
        return "Pharmacien"
      case "caregiver":
        return "Soignant"
      case "family":
        return "Famille"
    }
  }

  const getAccessLevelBadge = (level: AccessLevel) => {
    switch (level) {
      case "full":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Accès complet
          </Badge>
        )
      case "limited":
        return (
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
            Vue limitée
          </Badge>
        )
      case "export":
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            PDF uniquement
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Partage de données</h3>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Contacts autorisés</h4>
            </div>

            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{getTypeIcon(contact.type)}</div>
                    <div>
                      <h3 className="font-medium text-sm">{contact.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(contact.type)}
                        </Badge>
                        {getAccessLevelBadge(contact.accessLevel)}
                      </div>
                      {contact.lastAccess && (
                        <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Dernier accès: {contact.lastAccess.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={contact.active} onCheckedChange={() => toggleContactActive(contact.id)} />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40" align="end">
                        <div className="space-y-1">
                          <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                            Modifier
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                            Historique
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive text-sm">
                            Révoquer
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Partages temporaires</h4>
            </div>

            <div className="text-center py-4">
              <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">Aucun partage temporaire actif</p>
              <Button variant="outline" size="sm" className="mt-2">
                Créer un lien de partage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">2/3</span>
          </div>
          <span className="text-sm text-muted-foreground">Partages actifs</span>
        </div>
        <Button size="sm" variant="outline">
          Gérer tout
        </Button>
      </div>
    </div>
  )
}
