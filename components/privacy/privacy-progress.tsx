"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Users, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export function PrivacyProgress() {
  const categories = [
    {
      name: "Sécurité",
      icon: Shield,
      score: 90,
      color: "bg-green-500",
    },
    {
      name: "Contrôle d'accès",
      icon: Lock,
      score: 75,
      color: "bg-yellow-500",
    },
    {
      name: "Partage",
      icon: Users,
      score: 100,
      color: "bg-green-500",
    },
    {
      name: "Transparence",
      icon: Eye,
      score: 80,
      color: "bg-green-500",
    },
  ]

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-4 p-4">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center">
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
                <div className={cn("h-full rounded-full", category.color)} style={{ width: `${category.score}%` }} />
              </div>
              <div className="flex items-center gap-1.5">
                <category.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{category.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{category.score}/100</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-muted/10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Niveau de protection</h3>
              <p className="text-xs text-muted-foreground">Votre niveau actuel de protection des données</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm">
                B+
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
