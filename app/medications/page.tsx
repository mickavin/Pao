"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Scan, Plus, BookOpen } from "lucide-react"
import Link from "next/link"
import { MedicationSearchResults } from "@/components/medication-search-results"
import * as ZXingBrowser from '@zxing/browser'
import * as ZXingLibrary from '@zxing/library'
import createClient from "@/utils/supabase/client"
import { motion } from "framer-motion"
import Scanqr from "@/components/ScanQR"
import { Card, CardContent } from "@/components/ui/card"
import { MedicationScanForm } from "@/components/medication-scan-form"
import { ArrowLeft, Camera } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MedicationInfiniteList } from "@/components/medication-infinite-list-2"
import { FilterOptions, MedicationFilters } from "@/components/medication-filters"
import { useToast } from "@/components/ui/use-toast"


export default function MedicationsPage() {
  const [userMedications, setUserMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState<any>([])
  const [data, setData] = useState('');
  const [medication, setMedication] = useState('');
  const [searchTerm, setSearchTerm] = useState("")
  const [states, setStates] = useState<any>([])
  const [types, setTypes] = useState<any>([])
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    forms: [],
    dosageRange: [0, 1000],
    withPrescription: null,
  })
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const { toast } = useToast()
  
  useEffect(() => {
    async function fetchMedications() {
      const supabase = createClient;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: userMedications, error: error1 } = await supabase
          .from('user_medications')
          .select('*');

        if (error1) {
          console.error('Erreur user_medication:', error1);
          return;
        }
        const spe_ids = userMedications.map(row => row.spe_id);

        const { data: medications, error: error2 } = await supabase.from('stated_medication')
        .select('*, typed_medication:typed_medication (CIP, FORME_PHARMACEUTIQUE, SUBSTANCE, DOSAGE)', { count: 'exact' })
        .in('CIS', spe_ids);
        if (error2) {
          console.error('Erreur medications:', error2);
        } else {
          console.log('Médicaments en commun:', medications);
          setMedications(medications)
        }
          
        if (error2) {
          console.error("Erreur lors de la récupération des médicaments:", error2);
        } else {
          setUserMedications(medications || []);
        }
      }
      setLoading(false);
    }
    
    fetchMedications();
  }, []);

  useEffect(() => {
    console.log(data);
    if (data?.getData) {
      setMedication(data.getData[0]);
      // console.log(data.getData);
    }
  }, [data]);
  
  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters)

    // Calculer le nombre de filtres actifs
    let count = 0
    count += filters.categories.length
    count += filters.forms.length
    if (filters.dosageRange[0] > 0 || filters.dosageRange[1] < 1000) count++
    if (filters.withPrescription !== null) count++

    setActiveFiltersCount(count)

    // Notification de filtres appliqués
    if (count > 0) {
      toast({
        title: "Filtres appliqués",
        description: `${count} filtre${count > 1 ? "s" : ""} actif${count > 1 ? "s" : ""}`,
      })
    }
  }

  // Réinitialisation des filtres
  const handleResetFilters = () => {
    setActiveFilters({
      categories: [],
      forms: [],
      dosageRange: [0, 1000],
      withPrescription: null,
    })
    setActiveFiltersCount(0)

    toast({
      title: "Filtres réinitialisés",
      description: "Tous les filtres ont été supprimés",
    })
  }
  return (
    <div className="container px-4 py-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Médicaments</h1>
        <div className="flex gap-2">
          <Link href="/list-medications">
            <Button size="sm" variant="outline" className="rounded-full">
              <BookOpen className="h-4 w-4 mr-1 hidden md:flex" />
              Fiches
            </Button>
          </Link>
          <Link href="/medications/add">
            <Button size="sm" className="rounded-full">
              <Plus className="h-4 w-4 mr-1 hidden md:flex" />
              Ajouter
            </Button>
          </Link>
        </div>
      </header>
      <Tabs defaultValue="my-medications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {/* <TabsTrigger value="search" className="flex items-center md:gap-2">
            <Search className="h-4 w-4 invisible md:visible" />
            <span>Recherche</span>
            </TabsTrigger> */}
            <TabsTrigger value="my-medications" className="flex items-center md:gap-2">
              <BookOpen className="h-4 w-4 hidden md:flex" />
              <span>Mes Médicaments</span>
            </TabsTrigger>
          <TabsTrigger value="scan" className="flex items-center md:gap-2">
            <Scan className="h-4 w-4 hidden md:flex" />
            <span>Scanner</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="search" className="mt-4">
            
        </TabsContent>

        <TabsContent value="scan" className="mt-4">
          <motion.div>
       
              <>
              <Alert variant="default" className="bg-primary/10 border-primary/20 mb-4">
                  <Camera className="h-4 w-4" />
                  <AlertTitle>Scan obligatoire</AlertTitle>
                  <AlertDescription>
                    Pour des raisons de sécurité, l'ajout de médicaments nécessite de scanner le QR code présent sur l'emballage.
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardContent className="p-6">
                    <MedicationScanForm scanOnly={true} />
                  </CardContent>
                </Card>
              </>
          </motion.div>
        </TabsContent>

        
        <TabsContent value="my-medications" className="mt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Mes Médicaments</h2>
            {loading ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : medications.length === 0 ? (
              <p className="text-muted-foreground">Aucun médicament enregistré.</p>
            ) : (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >

                <div className="flex items-center justify-between">

                  <MedicationFilters
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                    activeFiltersCount={activeFiltersCount}
                  />
                </div>

                <MedicationInfiniteList
                  initialMedications={medications}
                  states={states}
                  types={types}
                  searchTerm={searchTerm}
                  filters={activeFilters}
                />
          </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
