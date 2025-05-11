"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  CalendarIcon,
  Plus,
  UserRound,
  Stethoscope,
  Building,
  Users,
  MoreHorizontal,
  Trash2,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ContactType = "doctor" | "pharmacist" | "caregiver" | "family"
type AccessLevel = "full" | "limited" | "export"
type AccessDuration = "permanent" | "temporary"

interface Contact {
  id: string
  name: string
  email: string
  type: ContactType
  accessLevel: AccessLevel
  accessDuration: AccessDuration
  expiryDate?: Date
  lastAccess?: Date
}

export function AuthorizedContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Dr. Martin",
      email: "dr.martin@hopital.fr",
      type: "doctor",
      accessLevel: "full",
      accessDuration: "permanent",
      lastAccess: new Date(2025, 3, 10),
    },
    {
      id: "2",
      name: "Pharmacie Centrale",
      email: "contact@pharmaciecentrale.fr",
      type: "pharmacist",
      accessLevel: "limited",
      accessDuration: "temporary",
      expiryDate: new Date(2025, 6, 15),
      lastAccess: new Date(2025, 3, 5),
    },
    {
      id: "3",
      name: "Marie Dupont (Maman)",
      email: "marie.dupont@email.com",
      type: "family",
      accessLevel: "export",
      accessDuration: "permanent",
      lastAccess: new Date(2025, 2, 20),
    },
  ])

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    type: "doctor" as ContactType,
    accessLevel: "limited" as AccessLevel,
    accessDuration: "temporary" as AccessDuration,
    expiryDate: undefined as Date | undefined,
  })

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<string | null>(null)

  const handleAddContact = () => {
    const id = `contact_${Date.now()}`
    setContacts([
      ...contacts,
      {
        id,
        ...newContact,
      },
    ])
    setNewContact({
      name: "",
      email: "",
      type: "doctor",
      accessLevel: "limited",
      accessDuration: "temporary",
      expiryDate: undefined,
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteContact = () => {
    if (contactToDelete) {
      setContacts(contacts.filter((contact) => contact.id !== contactToDelete))
      setContactToDelete(null)
      setIsDeleteDialogOpen(false)
    }
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

  const getAccessLevelLabel = (level: AccessLevel) => {
    switch (level) {
      case "full":
        return "Accès complet"
      case "limited":
        return "Vue limitée"
      case "export":
        return "PDF uniquement"
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
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Contacts autorisés
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un contact autorisé</DialogTitle>
              <DialogDescription>
                Cette personne aura accès à vos données de santé selon les paramètres que vous définissez.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du contact</Label>
                <Input
                  id="name"
                  placeholder="Dr. Dupont"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="docteur@example.com"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Type de contact</Label>
                <RadioGroup
                  value={newContact.type}
                  onValueChange={(value: ContactType) => setNewContact({ ...newContact, type: value })}
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="doctor" id="doctor" />
                    <Label htmlFor="doctor" className="flex items-center gap-1 cursor-pointer">
                      <Stethoscope className="h-4 w-4" />
                      Médecin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="pharmacist" id="pharmacist" />
                    <Label htmlFor="pharmacist" className="flex items-center gap-1 cursor-pointer">
                      <Building className="h-4 w-4" />
                      Pharmacien
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="caregiver" id="caregiver" />
                    <Label htmlFor="caregiver" className="flex items-center gap-1 cursor-pointer">
                      <UserRound className="h-4 w-4" />
                      Soignant
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="family" id="family" />
                    <Label htmlFor="family" className="flex items-center gap-1 cursor-pointer">
                      <Users className="h-4 w-4" />
                      Famille
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Niveau d'accès</Label>
                <Select
                  value={newContact.accessLevel}
                  onValueChange={(value: AccessLevel) => setNewContact({ ...newContact, accessLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau d'accès" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Accès complet (toutes les données)</SelectItem>
                    <SelectItem value="limited">Vue limitée (médicaments et symptômes)</SelectItem>
                    <SelectItem value="export">PDF uniquement (rapports exportés)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Durée d'accès</Label>
                <RadioGroup
                  value={newContact.accessDuration}
                  onValueChange={(value: AccessDuration) => setNewContact({ ...newContact, accessDuration: value })}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="permanent" id="permanent" />
                    <Label htmlFor="permanent">Permanent (jusqu'à révocation)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="temporary" id="temporary" />
                    <Label htmlFor="temporary">Temporaire (date d'expiration)</Label>
                  </div>
                </RadioGroup>
              </div>

              {newContact.accessDuration === "temporary" && (
                <div className="space-y-2">
                  <Label>Date d'expiration</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newContact.expiryDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newContact.expiryDate ? (
                          format(newContact.expiryDate, "PPP", { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newContact.expiryDate}
                        onSelect={(date) => setNewContact({ ...newContact, expiryDate: date })}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddContact} disabled={!newContact.name || !newContact.email}>
                Ajouter le contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-lg mb-1">Aucun contact autorisé</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Vous n'avez pas encore autorisé de contacts à accéder à vos données de santé.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un contact
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">{getTypeIcon(contact.type)}</div>
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(contact.type)}
                          </Badge>
                          {getAccessLevelBadge(contact.accessLevel)}
                          {contact.accessDuration === "temporary" && contact.expiryDate && (
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Expire le {format(contact.expiryDate, "dd/MM/yyyy")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="end">
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setContactToDelete(contact.id)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Révoquer l'accès
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {contact.lastAccess && (
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Dernier accès: {format(contact.lastAccess, "dd/MM/yyyy à HH:mm")}
                    </div>
                  )}
                </div>

                <div className="border-t px-4 py-3 bg-muted/20 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">Statut:</span> <span className="text-secondary">Actif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Accès actif</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Révoquer l'accès</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir révoquer l'accès de ce contact à vos données de santé ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-3 border rounded-md bg-destructive/5 border-destructive/20 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-medium text-destructive">Attention</h4>
                <p className="text-sm text-muted-foreground">
                  Ce contact ne pourra plus accéder à vos données de santé après révocation. Vous pourrez toujours
                  l'ajouter à nouveau ultérieurement.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteContact}>
              Révoquer l'accès
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
