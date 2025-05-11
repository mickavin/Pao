// Service de notification pour gérer les notifications push
export type NotificationPermission = "default" | "granted" | "denied"

export type NotificationSchedule = {
  id: string
  title: string
  body: string
  icon?: string
  data?: Record<string, any>
  scheduledTime: Date
  repeat?: "daily" | "weekly" | "monthly" | "none"
  medicationId?: number
  active: boolean
}

class NotificationService {
  private static instance: NotificationService
  private notifications: NotificationSchedule[] = []
  private timers: Record<string, NodeJS.Timeout> = {}

  private constructor() {
    // Initialisation du service
    this.loadScheduledNotifications()
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  // Vérifier si les notifications sont supportées
  public isSupported(): boolean {
    return "Notification" in window
  }

  // Demander la permission pour les notifications
  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      console.warn("Les notifications ne sont pas supportées par ce navigateur")
      return "denied"
    }

    try {
      const permission = await Notification.requestPermission()
      return permission
    } catch (error) {
      console.error("Erreur lors de la demande de permission:", error)
      return "denied"
    }
  }

  // Obtenir l'état actuel de la permission
  public getPermissionStatus(): NotificationPermission {
    if (!this.isSupported()) {
      return "denied"
    }
    return Notification.permission
  }

  // Programmer une notification
  public scheduleNotification(notification: Omit<NotificationSchedule, "id">): string {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newNotification: NotificationSchedule = {
      ...notification,
      id,
    }

    this.notifications.push(newNotification)
    this.saveScheduledNotifications()
    this.scheduleTimer(newNotification)

    return id
  }

  // Programmer des notifications pour un médicament
  public scheduleMedicationReminders(
    medicationId: number,
    medicationName: string,
    times: string[],
    repeat: "daily" | "weekly" | "monthly" | "none" = "daily",
  ): string[] {
    const notificationIds: string[] = []

    times.forEach((time) => {
      const [hours, minutes] = time.split(":").map(Number)
      const scheduledTime = new Date()
      scheduledTime.setHours(hours, minutes, 0, 0)

      // Si l'heure est déjà passée aujourd'hui, programmer pour demain
      if (scheduledTime < new Date()) {
        scheduledTime.setDate(scheduledTime.getDate() + 1)
      }

      const id = this.scheduleNotification({
        title: "Rappel de médicament",
        body: `Il est temps de prendre votre ${medicationName}`,
        icon: "/icons/pill-icon.png",
        data: { medicationId, action: "take-medication" },
        scheduledTime,
        repeat,
        medicationId,
        active: true,
      })

      notificationIds.push(id)
    })

    return notificationIds
  }

  // Annuler une notification programmée
  public cancelNotification(id: string): boolean {
    const index = this.notifications.findIndex((n) => n.id === id)
    if (index === -1) {
      return false
    }

    // Annuler le timer
    if (this.timers[id]) {
      clearTimeout(this.timers[id])
      delete this.timers[id]
    }

    // Supprimer la notification
    this.notifications.splice(index, 1)
    this.saveScheduledNotifications()

    return true
  }

  // Annuler toutes les notifications pour un médicament
  public cancelMedicationNotifications(medicationId: number): void {
    const notificationsToRemove = this.notifications.filter((n) => n.medicationId === medicationId)
    notificationsToRemove.forEach((n) => this.cancelNotification(n.id))
  }

  // Mettre à jour une notification
  public updateNotification(id: string, updates: Partial<NotificationSchedule>): boolean {
    const notification = this.notifications.find((n) => n.id === id)
    if (!notification) {
      return false
    }

    // Mettre à jour la notification
    Object.assign(notification, updates)
    this.saveScheduledNotifications()

    // Reprogrammer le timer si nécessaire
    if (updates.scheduledTime || updates.active !== undefined) {
      if (this.timers[id]) {
        clearTimeout(this.timers[id])
        delete this.timers[id]
      }

      if (notification.active) {
        this.scheduleTimer(notification)
      }
    }

    return true
  }

  // Obtenir toutes les notifications programmées
  public getScheduledNotifications(): NotificationSchedule[] {
    return [...this.notifications]
  }

  // Obtenir les notifications pour un médicament spécifique
  public getMedicationNotifications(medicationId: number): NotificationSchedule[] {
    return this.notifications.filter((n) => n.medicationId === medicationId)
  }

  // Envoyer une notification immédiatement
  public async sendNotification(title: string, options: NotificationOptions = {}): Promise<boolean> {
    if (!this.isSupported() || Notification.permission !== "granted") {
      console.warn("Les notifications ne sont pas autorisées")
      return false
    }

    try {
      const notification = new Notification(title, options)

      // Ajouter des gestionnaires d'événements
      notification.onclick = () => {
        window.focus()
        notification.close()

        // Traiter les données personnalisées
        if (options.data) {
          this.handleNotificationClick(options.data)
        }
      }

      return true
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification:", error)
      return false
    }
  }

  // Méthodes privées
  private scheduleTimer(notification: NotificationSchedule): void {
    if (!notification.active) {
      return
    }

    const now = new Date()
    const scheduledTime = new Date(notification.scheduledTime)
    let delay = scheduledTime.getTime() - now.getTime()

    // Si le délai est négatif (heure déjà passée), reprogrammer pour le jour suivant
    if (delay < 0) {
      if (notification.repeat === "daily") {
        scheduledTime.setDate(scheduledTime.getDate() + 1)
        delay = scheduledTime.getTime() - now.getTime()
      } else if (notification.repeat === "weekly") {
        scheduledTime.setDate(scheduledTime.getDate() + 7)
        delay = scheduledTime.getTime() - now.getTime()
      } else if (notification.repeat === "monthly") {
        scheduledTime.setMonth(scheduledTime.getMonth() + 1)
        delay = scheduledTime.getTime() - now.getTime()
      } else {
        // Si pas de répétition et déjà passé, ne pas programmer
        return
      }
    }

    // Programmer le timer
    this.timers[notification.id] = setTimeout(() => {
      this.sendNotification(notification.title, {
        body: notification.body,
        icon: notification.icon,
        data: notification.data,
      })

      // Reprogrammer si nécessaire
      if (notification.repeat === "daily") {
        const nextTime = new Date(scheduledTime)
        nextTime.setDate(nextTime.getDate() + 1)
        notification.scheduledTime = nextTime
        this.scheduleTimer(notification)
      } else if (notification.repeat === "weekly") {
        const nextTime = new Date(scheduledTime)
        nextTime.setDate(nextTime.getDate() + 7)
        notification.scheduledTime = nextTime
        this.scheduleTimer(notification)
      } else if (notification.repeat === "monthly") {
        const nextTime = new Date(scheduledTime)
        nextTime.setMonth(nextTime.getMonth() + 1)
        notification.scheduledTime = nextTime
        this.scheduleTimer(notification)
      } else {
        // Si pas de répétition, marquer comme inactive
        notification.active = false
        this.saveScheduledNotifications()
      }
    }, delay)
  }

  private handleNotificationClick(data: any): void {
    // Traiter les actions spécifiques
    if (data.action === "take-medication" && data.medicationId) {
      // Rediriger vers la page de prise de médicament
      window.location.href = `/checkin/quick?medicationId=${data.medicationId}`
    }
  }

  private saveScheduledNotifications(): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("scheduledNotifications", JSON.stringify(this.notifications))
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des notifications:", error)
    }
  }

  private loadScheduledNotifications(): void {
    if (typeof window === "undefined") return
    try {
      const saved = localStorage.getItem("scheduledNotifications")
      if (saved) {
        this.notifications = JSON.parse(saved).map((n: any) => ({
          ...n,
          scheduledTime: new Date(n.scheduledTime),
        }))

        // Reprogrammer les timers pour les notifications actives
        this.notifications.forEach((notification) => {
          if (notification.active) {
            this.scheduleTimer(notification)
          }
        })
      }
    } catch (error) {
      console.error("Erreur lors du chargement des notifications:", error)
      this.notifications = []
    }
  }
}

export default NotificationService.getInstance()
