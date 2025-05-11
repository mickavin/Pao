"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccessibleReminder } from "@/components/a11y/accessible-reminder"
import { NotificationPermissionRequest } from "@/components/reminders/notification-permission-request"
import notificationService, { type NotificationSchedule } from "@/lib/notification-service"
import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/theme-provider"

interface UpcomingRemindersProps {
  limit?: number
  showPermissionRequest?: boolean
  className?: string
}

export function UpcomingReminders({ limit = 3, showPermissionRequest = true, className }: UpcomingRemindersProps) {
  const [reminders, setReminders] = useState<NotificationSchedule[]>([])
  const [permissionStatus, setPermissionStatus] = useState<"default" | "granted" | "denied">("default")
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  useEffect(() => {
    // Get current permission status
    if (notificationService.isSupported()) {
      setPermissionStatus(notificationService.getPermissionStatus())
    }

    // Load scheduled notifications
    loadReminders()

    // Set up interval to refresh reminders every minute
    const interval = setInterval(loadReminders, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadReminders = () => {
    const allReminders = notificationService.getScheduledNotifications()

    // Sort by scheduled time
    const sortedReminders = allReminders
      .filter((r) => r.active)
      .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime())

    // Take only the upcoming ones
    const now = new Date()
    const upcomingReminders = sortedReminders.filter((r) => new Date(r.scheduledTime) > now).slice(0, limit)

    setReminders(upcomingReminders)
  }

  const handleTaken = (id: string) => {
    // Mark as taken and reschedule for next occurrence
    notificationService.updateNotification(id, { active: false })

    // Reload reminders
    loadReminders()

    // In a real app, we would also update the medication adherence record
  }

  const handleSkipped = (id: string) => {
    // Mark as skipped and reschedule for next occurrence
    notificationService.updateNotification(id, { active: false })

    // Reload reminders
    loadReminders()

    // In a real app, we would also update the medication adherence record
  }

  // Format the reminder for the AccessibleReminder component
  const formatReminder = (reminder: NotificationSchedule) => {
    const time = new Date(reminder.scheduledTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

    return {
      id: reminder.id,
      time,
      medication: reminder.title,
      taken: null,
      upcoming: true,
    }
  }

  if (showPermissionRequest && permissionStatus !== "granted") {
    return <NotificationPermissionRequest onComplete={() => setPermissionStatus("granted")} className={className} />
  }

  if (reminders.length === 0) {
    return (
      <Card className={cn(className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Rappels à venir
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
            <p className="text-muted-foreground">Aucun rappel programmé</p>
            <Button variant="outline" size="sm" className="mt-4">
              Configurer des rappels
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Rappels à venir
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <AccessibleReminder
              key={reminder.id}
              reminder={formatReminder(reminder)}
              onTaken={() => handleTaken(reminder.id)}
              onSkipped={() => handleSkipped(reminder.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
