"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2, AlertTriangle, Info, Bell } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import notificationService from "@/lib/notification-service"
import { useAccessibility } from "@/components/theme-provider"
import { ResponsiveGrid } from "@/components/responsive-container"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  activeIngredient: z.string().optional(),
  dosage: z.string().min(1, {
    message: "Le dosage est requis.",
  }),
  form: z.string().min(1, {
    message: "La forme est requise.",
  }),
  frequency: z.string().min(1, {
    message: "La fréquence est requise.",
  }),
  frequencyUnit: z.string().min(1, {
    message: "L'unité de fréquence est requise.",
  }),
  startDate: z.date({
    required_error: "La date de début est requise.",
  }),
  endDate: z.date().optional(),
  quantity: z.string().min(1, {
    message: "La quantité est requise.",
  }),
  instructions: z.string().optional(),
  isTemporary: z.boolean().default(false),
  enableNotifications: z.boolean().default(true),
})

export function MedicationIntakeForm() {
  const [reminders, setReminders] = useState<string[]>(["08:00"])
  const [showInteractions, setShowInteractions] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [notificationPermission, setNotificationPermission] = useState<"default" | "granted" | "denied">("default")
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      activeIngredient: "",
      dosage: "",
      form: "",
      frequency: "1",
      frequencyUnit: "day",
      quantity: "",
      instructions: "",
      isTemporary: false,
      enableNotifications: true,
    },
  })

  // Vérifier l'état des permissions de notification
  useState(() => {
    if (notificationService.isSupported()) {
      setNotificationPermission(notificationService.getPermissionStatus())
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    // Programmer les notifications si activées
    if (values.enableNotifications && notificationPermission === "granted") {
      notificationService.scheduleMedicationReminders(
        Math.floor(Math.random() * 1000), // ID temporaire pour la démo
        values.name,
        reminders,
        "daily",
      )
    }

    // Dans une application réelle, nous enverrions ces données à une API
    // et redirigerions vers la page de détail du médicament
  }

  const addReminder = () => {
    setReminders([...reminders, ""])
  }

  const updateReminder = (index: number, value: string) => {
    const newReminders = [...reminders]
    newReminders[index] = value
    setReminders(newReminders)
  }

  const removeReminder = (index: number) => {
    const newReminders = [...reminders]
    newReminders.splice(index, 1)
    setReminders(newReminders)
  }

  // Simuler une vérification d'interactions médicamenteuses
  const checkInteractions = () => {
    const medicationName = form.getValues("name")
    if (medicationName.toLowerCase().includes("doliprane") || medicationName.toLowerCase().includes("paracétamol")) {
      setShowInteractions(true)
    }
  }

  const requestNotificationPermission = async () => {
    const permission = await notificationService.requestPermission()
    setNotificationPermission(permission)
  }

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="basic">Informations</TabsTrigger>
        <TabsTrigger value="advanced">Options avancées</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <TabsContent value="basic" className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du médicament</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Doliprane"
                      {...field}
                      onBlur={(e) => {
                        field.onBlur()
                        checkInteractions()
                      }}
                      className={cn(simplifiedLayout && "h-12 text-base")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showInteractions && (
              <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Interaction potentielle détectée</AlertTitle>
                <AlertDescription>
                  Ce médicament peut interagir avec Levothyrox que vous prenez déjà. Consultez votre médecin.
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="activeIngredient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principe actif (optionnel)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Paracétamol"
                      {...field}
                      className={cn(simplifiedLayout && "h-12 text-base")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ResponsiveGrid columns={2}>
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 1000mg" {...field} className={cn(simplifiedLayout && "h-12 text-base")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="form"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn(simplifiedLayout && "h-12 text-base")}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tablet">Comprimé</SelectItem>
                        <SelectItem value="capsule">Gélule</SelectItem>
                        <SelectItem value="liquid">Liquide</SelectItem>
                        <SelectItem value="injection">Injection</SelectItem>
                        <SelectItem value="inhaler">Inhalateur</SelectItem>
                        <SelectItem value="cream">Crème</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ResponsiveGrid>

            <ResponsiveGrid columns={2}>
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fréquence</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} className={cn(simplifiedLayout && "h-12 text-base")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequencyUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unité</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn(simplifiedLayout && "h-12 text-base")}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="day">Par jour</SelectItem>
                        <SelectItem value="week">Par semaine</SelectItem>
                        <SelectItem value="month">Par mois</SelectItem>
                        <SelectItem value="asNeeded">Si besoin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ResponsiveGrid>

            <FormField
              control={form.control}
              name="isTemporary"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Traitement temporaire</FormLabel>
                    <FormDescription>Activez cette option pour un traitement de courte durée</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <ResponsiveGrid columns={2}>
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de début</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                              simplifiedLayout && "h-12 text-base",
                            )}
                          >
                            {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de fin (optionnelle)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                              simplifiedLayout && "h-12 text-base",
                            )}
                          >
                            {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => {
                            const startDate = form.getValues("startDate")
                            return startDate ? date < startDate : false
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ResponsiveGrid>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité totale</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="ex: 30"
                      {...field}
                      className={cn(simplifiedLayout && "h-12 text-base")}
                    />
                  </FormControl>
                  <FormDescription>Nombre total de comprimés, gélules, etc.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enableNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      Activer les notifications
                    </FormLabel>
                    <FormDescription>Recevoir des rappels pour prendre ce médicament</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("enableNotifications") && (
              <>
                {notificationPermission !== "granted" && (
                  <Alert className="bg-accent/10 border-accent/20">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Autorisation requise</AlertTitle>
                    <AlertDescription>
                      Vous devez autoriser les notifications pour recevoir des rappels.
                      <Button onClick={requestNotificationPermission} variant="outline" size="sm" className="mt-2">
                        Autoriser les notifications
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label>Horaires de rappel</Label>
                  <div className="space-y-2 mt-2">
                    {reminders.map((reminder, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={reminder}
                          onChange={(e) => updateReminder(index, e.target.value)}
                          className={cn("flex-1", simplifiedLayout && "h-12 text-base")}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeReminder(index)}
                          disabled={reminders.length === 1}
                          className={cn(simplifiedLayout && "h-12 w-12")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addReminder} className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un rappel
                    </Button>
                  </div>
                </div>
              </>
            )}

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions spéciales (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Prendre avec de la nourriture"
                      className={cn("resize-none", simplifiedLayout && "text-base min-h-[100px]")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert className="bg-primary/10 border-primary/20">
              <Info className="h-4 w-4" />
              <AlertTitle>Conseil</AlertTitle>
              <AlertDescription>
                Vous pouvez importer une photo de votre ordonnance pour faciliter la saisie.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <Button type="submit" className={cn("w-full", simplifiedLayout && "h-12 text-base font-medium")}>
            Enregistrer
          </Button>
        </form>
      </Form>
    </Tabs>
  )
}
