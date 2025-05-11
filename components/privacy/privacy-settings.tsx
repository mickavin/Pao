"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Shield, Lock, AlertTriangle, Info, Download, Trash2, RefreshCw } from "lucide-react"

export function PrivacySettings() {
  const [settings, setSettings] = useState({
    anonymizeData: true,
    notifyOnAccess: true,
    requireConfirmation: true,
    twoFactorAuth: false,
    autoRevokeAccess: false,
    dataRetention: true,
  })

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")

  const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
    setSettings({ ...settings, [setting]: value })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Paramètres de confidentialité
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="anonymize-data" className="flex flex-col space-y-1">
                <span className="font-medium">Anonymisation des données</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Vos données sont anonymisées par défaut
                </span>
              </Label>
              <Switch
                id="anonymize-data"
                checked={settings.anonymizeData}
                onCheckedChange={(checked) => handleSettingChange("anonymizeData", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="notify-access" className="flex flex-col space-y-1">
                <span className="font-medium">Notification d'accès</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Recevoir une notification lorsqu'un contact accède à vos données
                </span>
              </Label>
              <Switch
                id="notify-access"
                checked={settings.notifyOnAccess}
                onCheckedChange={(checked) => handleSettingChange("notifyOnAccess", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="require-confirmation" className="flex flex-col space-y-1">
                <span className="font-medium">Confirmation d'accès</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Exiger votre confirmation pour chaque nouvel accès
                </span>
              </Label>
              <Switch
                id="require-confirmation"
                checked={settings.requireConfirmation}
                onCheckedChange={(checked) => handleSettingChange("requireConfirmation", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                <span className="font-medium">Authentification à deux facteurs</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Ajouter une couche de sécurité supplémentaire
                </span>
              </Label>
              <Switch
                id="two-factor"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-revoke" className="flex flex-col space-y-1">
                <span className="font-medium">Révocation automatique</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Révoquer automatiquement les accès après 6 mois d'inactivité
                </span>
              </Label>
              <Switch
                id="auto-revoke"
                checked={settings.autoRevokeAccess}
                onCheckedChange={(checked) => handleSettingChange("autoRevokeAccess", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="data-retention" className="flex flex-col space-y-1">
                <span className="font-medium">Conservation des données</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Conserver l'historique de vos données de santé
                </span>
              </Label>
              <Switch
                id="data-retention"
                checked={settings.dataRetention}
                onCheckedChange={(checked) => handleSettingChange("dataRetention", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Sécurité et exportation
          </h3>

          <div className="space-y-4">
            <div className="p-3 border rounded-lg flex items-center justify-between">
              <div>
                <h4 className="font-medium">Exporter toutes mes données</h4>
                <p className="text-sm text-muted-foreground">Télécharger une copie complète de vos données de santé</p>
              </div>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
            </div>

            <div className="p-3 border rounded-lg flex items-center justify-between">
              <div>
                <h4 className="font-medium">Révoquer tous les accès</h4>
                <p className="text-sm text-muted-foreground">Supprimer tous les accès à vos données de santé</p>
              </div>
              <Button variant="outline" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Révoquer
              </Button>
            </div>

            <div className="p-3 border border-destructive/20 bg-destructive/5 rounded-lg flex items-center justify-between">
              <div>
                <h4 className="font-medium text-destructive">Supprimer toutes mes données</h4>
                <p className="text-sm text-muted-foreground">Supprimer définitivement toutes vos données de santé</p>
              </div>
              <Button
                variant="destructive"
                className="flex items-center gap-1"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Conformité RGPD</AlertTitle>
        <AlertDescription>
          Pao est conforme au Règlement Général sur la Protection des Données (RGPD). Vous avez le droit d'accéder,
          de modifier et de supprimer vos données à tout moment.
        </AlertDescription>
      </Alert>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer toutes vos données</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Toutes vos données de santé, médicaments et historique seront
              définitivement supprimés.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-3 border rounded-md bg-destructive/5 border-destructive/20 flex items-start gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-medium text-destructive">Attention</h4>
                <p className="text-sm text-muted-foreground">
                  Cette action ne peut pas être annulée. Vos données ne pourront pas être récupérées.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delete-confirmation">
                Tapez "SUPPRIMER" pour confirmer la suppression de toutes vos données
              </Label>
              <Input
                id="delete-confirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="SUPPRIMER"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              disabled={deleteConfirmation !== "SUPPRIMER"}
              onClick={() => {
                // Dans une application réelle, nous supprimerions les données ici
                alert("Toutes vos données ont été supprimées")
                setShowDeleteDialog(false)
              }}
            >
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
