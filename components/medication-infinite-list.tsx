"use client"

import { useEffect, useRef, useState } from "react"
import { Info, Loader2, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import type { FilterOptions } from "@/components/medication-filters"
import { debounce } from "lodash" // Assurez-vous d'avoir lodash installé
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { CardContent } from "@/components/ui/card"
import { Button } from "./ui/button"
// Types
interface Medication {
  cip: string
  name: string
  FORME_PHARMACEUTIQUE: string
  SUBSTANCE: string
  DOSAGE: string
  NOM_COMMERCIAL: string
  requiresPrescription: boolean
  CIS: string
  TITULAIRE: string
  VOIE_ADMINISTRATION: string
}

interface MedicationProps {
  count: number
  data: Medication[]
}

interface State {
  CIS: string
  NOM_COMMERCIAL: string
  FORME_PHARMACEUTIQUE: string
  TITULAIRE: string
  VOIE_ADMINISTRATION: string
  typed_medication: {
    CIP: string
    FORME_PHARMACEUTIQUE: string
    SUBSTANCE: string
    DOSAGE: string
  }
}

interface Type {
  CIP: string
  FORME_PHARMACEUTIQUE: string
  SUBSTANCE: string
  DOSAGE: string
}
interface MedicationInfiniteListProps {
  initialMedications?: State[]
  searchTerm?: string
  filters?: FilterOptions
  pageSize?: number
  className?: string
  states?: State[]
  types?: Type[]
}

export function MedicationInfiniteList({
  initialMedications = [],
  searchTerm = "",
  filters,
  pageSize = 15,
  className,
  states,
  types,
}: MedicationInfiniteListProps) {
  const [medications, setMedications] = useState<State[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState(searchTerm) // New state for search input
  const loaderRef = useRef<HTMLDivElement>(null)


  const getType = (typeCip: string) => {
    const type = types?.find((type: any) => type.CIP === typeCip)
    return type
  }

// Fonction simulant un appel API pour récupérer plus de médicaments
const fetchMoreMedications = async (
  page: number,
  pageSize: number,
  searchInput: string
): Promise<MedicationProps[]> => {
  const response = await fetch(`/api/medication?search=${encodeURIComponent(searchInput)}&page=${page}`);
  if (!response.ok) {
    setHasMore(false)
    if (response.status != 500) {
      // throw new Error('Erreur lors du chargement des médicaments');
    }
  }
  const data = await response.json();
  return data;
}

  const loadMore = debounce(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const newMedications = await fetchMoreMedications(page, pageSize, searchInput)

      if (newMedications.data.length === 0) {
        setHasMore(false)
      } else {
        setMedications((prev) => [...prev, ...newMedications.data])
        setCount(newMedications.count)
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      // setError("Erreur lors du chargement des médicaments. Veuillez réessayer.")
      // console.error("Erreur lors du chargement des médicaments:", err)
    } finally {
      setLoading(false)
    }
  }, 300) // Débounce de 300ms


  // Effet pour observer l'élément de chargement
  useEffect(() => {
    const currentLoaderRef = loaderRef.current

    if (!currentLoaderRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(currentLoaderRef)

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef)
      }
    }
  }, [hasMore, loading, page, searchInput, filters])

  // Effet pour recharger les médicaments quand le terme de recherche ou les filtres changent
  useEffect(() => {
    const data = initialMedications.filter(
      (med) =>
        (med.NOM_COMMERCIAL.toLowerCase().includes(searchInput.toLowerCase()) ||
          med.CIS.toLowerCase().includes(searchInput.toLowerCase()) 
        )
    )
    setMedications(data.slice(0, pageSize))
    setCount(data.length)
    setPage(1)
    setHasMore(true)
    setError(null)
  }, [searchInput, filters, initialMedications])

  // Animation variants pour les cartes de médicaments
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  }

  const getState = (stateCip: string) => {
    const state = states?.find((state: any) => state.CIS === stateCip)
    return state
  }


  return (
    <div className={cn("space-y-4", className)}>
      {/* Search bar */}

      <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un médicament..."
                className="pl-10 pr-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={() => setSearchInput("")}
                >
                  <span className="sr-only">Effacer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            {
              medications.length > 0 &&
              <p className="text-sm text-muted-foreground">{medications.length} {count > 0 ? `sur ${count}` : ''} résultat(s)</p>
            }

      {medications.length === 0 && !loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucun médicament trouvé</p>
        </div>
      ) : medications.length > 0 ? (
        <div className="space-y-3">
          {medications.map((medication, index) => (
            <motion.div
              key={`${medication.CIS}-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/medications/${medication.CIS}`}>
                <Card className="p-2 hover:shadow-md transition-shadow duration-200">
                  <div className="pl-2 pb-2 md:pl-4 md:pb-4">
                    <div>
                        <div className="flex justify-end m-1">
                          {medication.typed_medication?.[0]?.DOSAGE && (
                            <Badge variant="outline" className="text-xs truncate m-0">
                            {medication.typed_medication?.[0]?.DOSAGE?.length > 40 ? medication.typed_medication?.[0]?.DOSAGE?.slice(0, 40) + "..." : medication.typed_medication?.[0]?.DOSAGE}
                          </Badge>)}
                        </div>
                      <div className="">
                        <h3 className="font-medium text-md md:text-base">
                          {medication.NOM_COMMERCIAL?.split(",")[0]?.length > 100 ? medication.NOM_COMMERCIAL?.split(",")[0]?.slice(0, 100) + "..." : medication.NOM_COMMERCIAL?.split(",")[0]}
                        </h3>

                      </div>
                      {medication.typed_medication?.[0]?.SUBSTANCE && (
                        <p className="text-xs text-muted-foreground">{medication.typed_medication?.[0]?.SUBSTANCE || ""}</p>
                      )}
                      {medication.typed_medication?.[0]?.FORME_PHARMACEUTIQUE && (
                        <p className="text-xs text-muted-foreground">{medication.typed_medication?.[0]?.FORME_PHARMACEUTIQUE || ""}</p>
                      )}
                    </div>
                    {/* <div className="flex gap-2">
                      <Link href={`/medications/template/${medication.CIS}`}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div> */}
                  </div>

                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : medications.length === 0 && !loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucun médicament trouvé</p>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucun médicament trouvé</p>
        </div>
      )}

      {/* Loader et messages d'état */}
      <div ref={loaderRef} className="py-4 text-center">
        {(loading) && (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Chargement...</span>
          </div>
        )}

        {!hasMore && medications.length > 0 && (
          <p className="text-sm text-muted-foreground">Tous les médicaments ont été chargés</p>
        )}

        {error && (
          <div className="text-destructive text-sm">
            {error}
            <button onClick={() => loadMore()} className="ml-2 underline hover:text-destructive/80">
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
