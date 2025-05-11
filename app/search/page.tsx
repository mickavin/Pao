"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Scan, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MedicationSearchResults } from "@/components/medication-search-results"

export default function SearchPage() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Rechercher un médicament</h1>
      </header>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Recherche</span>
          </TabsTrigger>
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Scan className="h-4 w-4" />
            <span>Scanner</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Rechercher un médicament..." className="pl-10" defaultValue="Doli" />
            </div>

            <MedicationSearchResults />
          </div>
        </TabsContent>

        <TabsContent value="scan" className="mt-4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Scan className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Scanner un code-barres</h3>
              <p className="text-muted-foreground mb-4">
                Placez le code-barres de votre médicament dans le cadre pour l'identifier
              </p>
              <Button>Activer la caméra</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
