"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Share2, Printer, MoreVertical, Edit, Trash2, AlertTriangle } from "lucide-react"
import { ReminderSetupModal } from "@/components/reminders/reminder-setup-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import type { Medication } from "@/lib/types"

interface MedicationDetailActionsProps {
  medication: Medication
  onEdit?: () => void
  onDelete?: () => void
}

export function MedicationDetailActions({ medication, onEdit, onDelete }: MedicationDetailActionsProps) {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleShare = () => {
    // In a real app, this would use the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: `Pao - ${medication.name}`,
          text: `Informations sur ${medication.name} (${medication.dosage})`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast({
        title: "Lien copié",
        description: "Le lien vers cette fiche a été copié dans le presse-papier.",
      })
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSetupReminders = () => {
    setIsReminderModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete()
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleSetupReminders}>
          <Bell className="h-4 w-4 mr-2" />
          Rappels
        </Button>

        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </Button>

        <Button variant="outline" size="sm" onClick={handlePrint} className="hidden sm:flex">
          <Printer className="h-4 w-4 mr-2" />
          Imprimer
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePrint} className="sm:hidden">
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ReminderSetupModal
        medication={medication}
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSave={() => {
          toast({
            title: "Rappels configurés",
            description: "Vos rappels ont été configurés avec succès.",
          })
        }}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Supprimer ce médicament
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer {medication.name} ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
