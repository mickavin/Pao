"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Copy, FileText, Share2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface ShareReportDialogProps {
  reportType: string
  trigger?: React.ReactNode
}

export function ShareReportDialog({ reportType, trigger }: ShareReportDialogProps) {
  const [open, setOpen] = useState(false)
  const [accessType, setAccessType] = useState<"link" | "email">("link")
  const [email, setEmail] = useState("")
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours par défaut
  )
  const [accessLevel, setAccessLevel] = useState("view")
  const [generatedLink, setGeneratedLink] = useState("")

  const handleGenerate = () => {
    // Dans une application réelle, nous générerions un lien sécurisé ici
    const secureToken = Math.random().toString(36).substring(2, 15)
    const link = `https://pao.health/share/${secureToken}`
    setGeneratedLink(link)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink)
    alert("Lien copié dans le presse-papiers")
  }

  const handleShare = () => {
    if (accessType === "email" && email) {
      // Dans une application réelle, nous enverrions un email ici
      alert(`Rapport partagé par email avec ${email}`)
      setOpen(false)
    } else if (accessType === "link" && generatedLink) {
      handleCopyLink()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Partager un rapport sécurisé</DialogTitle>
          <DialogDescription>
            Créez un lien sécurisé pour partager votre {reportType.toLowerCase()} avec un professionnel de santé ou un
            proche.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center p-3 bg-primary/5 border border-primary/20 rounded-md">
            <FileText className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">{reportType}</span>
          </div>

          <div className="space-y-2">
            <Label>Méthode de partage</Label>
            <RadioGroup
              value={accessType}
              onValueChange={(value: "link" | "email") => setAccessType(value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="link" id="link" />
                <Label htmlFor="link">Générer un lien sécurisé</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Envoyer par email</Label>
              </div>
            </RadioGroup>
          </div>

          {accessType === "email" && (
            <div className="space-y-2">
              <Label htmlFor="email-address">Adresse email du destinataire</Label>
              <Input
                id="email-address"
                type="email"
                placeholder="docteur@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Niveau d'accès</Label>
            <Select value={accessLevel} onValueChange={setAccessLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau d'accès" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">Consultation uniquement</SelectItem>
                <SelectItem value="download">Téléchargement autorisé</SelectItem>
                <SelectItem value="print">Impression autorisée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date d'expiration</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {accessType === "link" && (
            <div className="space-y-2">
              {!generatedLink ? (
                <Button onClick={handleGenerate} className="w-full">
                  Générer un lien sécurisé
                </Button>
              ) : (
                <div className="space-y-2">
                  <Label>Lien sécurisé</Label>
                  <div className="flex">
                    <Input value={generatedLink} readOnly className="rounded-r-none" />
                    <Button variant="secondary" className="rounded-l-none" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ce lien expire le {expiryDate ? format(expiryDate, "PPP", { locale: fr }) : "jamais"}.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleShare}
            disabled={(accessType === "email" && !email) || (accessType === "link" && !generatedLink)}
          >
            Partager
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
