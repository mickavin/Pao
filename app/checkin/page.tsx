"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyCheckInForm } from "@/components/daily-check-in-form"
import { ProgressCharts } from "@/components/progress-charts"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckInPage() {
  return (
    <div className="container px-4 py-6 pb-20 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Suivi quotidien</h1>
      </header>

      <Tabs defaultValue="checkin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
          <TabsTrigger value="progress">Progrès</TabsTrigger>
        </TabsList>

        <TabsContent value="checkin" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <DailyCheckInForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
          <ProgressCharts />
        </TabsContent>
      </Tabs>
    </div>
  )
}
