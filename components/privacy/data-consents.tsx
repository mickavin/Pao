"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Activity, BarChart, FileText, MessageSquare, Share2, Smartphone, Sparkles, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DataConsents() {
  const [consents, setConsents] = useState({
    analytics: true,
    research: false,
    marketing: false,
    thirdParty: false,
    location: true,
    notifications: true,
    aiFeatures: true,
  })

  const handleConsentChange = (key: keyof typeof consents) => {
    setConsents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Vos consentements</h3>
        <Button variant="outline" size="sm">
          Tout gérer
        </Button>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Activity className="h-4 w-4" />
              </div>
              <Label htmlFor="analytics" className="flex flex-col space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Analyse d'utilisation</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          Nous collectons des données anonymisées sur votre utilisation de l'application pour améliorer
                          nos services. Aucune donnée personnelle n'est partagée.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Amélioration de l'application</span>
              </Label>
            </div>
            <Switch
              id="analytics"
              checked={consents.analytics}
              onCheckedChange={() => handleConsentChange("analytics")}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <BarChart className="h-4 w-4" />
              </div>
              <Label htmlFor="research" className="flex flex-col space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Recherche médicale</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          Vos données anonymisées peuvent être utilisées pour la recherche médicale et l'amélioration
                          des traitements. Aucune information permettant de vous identifier n'est partagée.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Contribution à la science</span>
              </Label>
            </div>
            <Switch id="research" checked={consents.research} onCheckedChange={() => handleConsentChange("research")} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <Label htmlFor="marketing" className="flex flex-col space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Communications marketing</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          Recevoir des informations sur les nouveautés, fonctionnalités et offres spéciales de Pao.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Newsletters et offres</span>
              </Label>
            </div>
            <Switch
              id="marketing"
              checked={consents.marketing}
              onCheckedChange={() => handleConsentChange("marketing")}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Share2 className="h-4 w-4" />
              </div>
              <Label htmlFor="thirdParty" className="flex flex-col space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Partenaires tiers</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          Partage de données avec des partenaires sélectionnés pour vous proposer des services
                          complémentaires.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Services complémentaires</span>
              </Label>
            </div>
            <Switch
              id="thirdParty"
              checked={consents.thirdParty}
              onCheckedChange={() => handleConsentChange("thirdParty")}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Smartphone className="h-4 w-4" />
              </div>
              <Label htmlFor="location" className="flex flex-col space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Localisation</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          Utilisation de votre localisation pour vous proposer des pharmacies et services de santé à
                          proximité.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Services à proximité</span>
              </Label>
            </div>
            <Switch id="location" checked={consents.location} onCheckedChange={() => handleConsentChange("location")} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <Label htmlFor="notifications" className="flex flex-col space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Notifications</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          Recevoir des rappels et notifications concernant vos médicaments et rendez-vous.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Rappels et alertes</span>
              </Label>
            </div>
            <Switch
              id="notifications"
              checked={consents.notifications}
              onCheckedChange={() => handleConsentChange("notifications")}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <Label htmlFor="aiFeatures" className="flex flex-col space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Fonctionnalités IA</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          Utilisation de l'intelligence artificielle pour personnaliser votre expérience et vous fournir
                          des recommandations adaptées.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Personnalisation intelligente</span>
              </Label>
            </div>
            <Switch
              id="aiFeatures"
              checked={consents.aiFeatures}
              onCheckedChange={() => handleConsentChange("aiFeatures")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">5/7</span>
          </div>
          <span className="text-sm text-muted-foreground">Consentements actifs</span>
        </div>
        <Button size="sm" variant="outline">
          Mettre à jour
        </Button>
      </div>
    </div>
  )
}
