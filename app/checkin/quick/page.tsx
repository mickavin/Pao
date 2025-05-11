"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QuickCheckInForm } from "@/components/quick-check-in-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function QuickCheckInPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Check-in rapide</h1>
      </header>

      <Card>
        <CardContent className="p-6">
          <QuickCheckInForm />
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Besoin de faire un check-in plus détaillé?</p>
        <Link href="/checkin" className="text-primary font-medium">
          Accéder au check-in complet
        </Link>
      </div>
    </div>
  )
}
