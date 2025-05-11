"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, AlertTriangle, Info, Download, Trash2 } from "lucide-react"

export default function DataDeletionPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/confidentialite">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Suppression des données</h1>
      </header>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-destructive/10 text-destructive mt-0.5">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-destructive">Attention: Action irréversible</h2>
              <p className="text-sm text-muted-foreground mt-1">
                La suppression de vos données est définitive et ne peut pas être annulée. Veuillez lire attentivement
                les informations ci-dessous.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Avant de supprimer vos données</h2>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Informations importantes</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Veuillez prendre connaissance des conséquences de la suppression de vos données:
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                  1
                </div>
                <span>
                  Toutes vos données personnelles, médicaments, historique et préférences seront définitivement
                  supprimés.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                  2
                </div>
                <span>Votre compte sera désactivé et vous ne pourrez plus vous connecter à l'application Pao.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                  3
                </div>
                <span>Les données partagées avec des professionnels de santé ne seront plus accessibles.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                  4
                </div>
                <span>Vos rappels de médicaments et notifications seront supprimés.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                  5
                </div>
                <span>
                  Conformément au RGPD, certaines données peuvent être conservées pour des obligations légales pendant
                  une durée limitée.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Exporter mes données avant suppression
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Confirmation de suppression</h2>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="confirm1" />
                <Label htmlFor="confirm1" className="text-sm">
                  Je comprends que cette action est irréversible et que toutes mes données seront supprimées.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="confirm2" />
                <Label htmlFor="confirm2" className="text-sm">
                  Je comprends que je perdrai l'accès à mon historique médical et à mes rappels de médicaments.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="confirm3" />
                <Label htmlFor="confirm3" className="text-sm">
                  Je confirme que je souhaite supprimer définitivement mon compte et mes données.
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delete-confirmation" className="text-sm font-medium">
                Tapez "SUPPRIMER MON COMPTE" pour confirmer
              </Label>
              <Input id="delete-confirmation" placeholder="SUPPRIMER MON COMPTE" />
            </div>

            <div className="pt-2">
              <Button variant="destructive" className="w-full gap-1">
                <Trash2 className="h-4 w-4" />
                Supprimer définitivement mon compte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          Annuler et revenir aux paramètres
        </Button>
      </div>
    </div>
  )
}
