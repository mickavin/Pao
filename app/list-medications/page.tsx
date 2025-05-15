"use client"

import { useState, useRef, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Scan, Plus, BookOpen } from "lucide-react"
import Link from "next/link"
import { MedicationInfiniteList } from "@/components/medication-infinite-list"
import { MedicationFilters, type FilterOptions } from "@/components/medication-filters"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { MedicationSearchResults } from "@/components/medication-search-results-all"
import supabase from "@/utils/supabase/client"
import * as ZXingBrowser from '@zxing/browser'
import * as ZXingLibrary from '@zxing/library'
import Scanqr from "@/components/ScanQR"
import { Card, CardContent } from "@/components/ui/card"
import { MedicationScanForm } from "@/components/medication-scan-form"
import { ArrowLeft, Camera } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// const QRCodeScanner = ({setData}: {setData: (data: string) => void}) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const controlsRef = useRef<ZXingBrowser.IScannerControls | null>(null);

//   useEffect(() => {
//     const generateCodeReader = async () => {
//       const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
//       const codeReaderMatrix = new ZXingBrowser.BrowserDatamatrixCodeReader();
//       const codeReaderQr = new ZXingBrowser.BrowserQRCodeReader();
//       const codeReaderBarcode = new ZXingLibrary.BrowserBarcodeReader();
//       try {
//         if (videoRef.current && videoInputDevices.length > 0) {
//         const controls = await Promise.all([
//           codeReaderMatrix.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current!, (result, error, controls) => {
//             if (!controlsRef?.current) {
//               controlsRef.current = controls;
//             }
//             if (result) {
//               setData(result.getText());
//               controls.stop();
//           }
//         }),
//         codeReaderQr.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current!, (result, error, controls) => {
//           if (!controlsRef?.current) {
//             controlsRef.current = controls;
//           }
//           if (result) {
//             setData(result.getText());
//             controls.stop();
//           }
//         }),
//         codeReaderBarcode.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current!, (result, error) => {
//           if (result) {
//             setData(result.getText());
//             controlsRef?.current?.stop();
//           }
//         })
//         ])
//       }
//     } catch (err) {
//         console.error('Erreur lors du démarrage du scanner', err);
//       }
//     };

//     generateCodeReader();

//     return () => {
//       controlsRef.current?.stop();
//     };
//   }, []);

//   return (
//     <>
//       <video ref={videoRef} style={{ width: '100%' }} />
//     </>
//   );
// };


const QRCodeScanner = ({setData}: {setData: (data: string) => void}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<ZXingBrowser.IScannerControls | null>(null);

  useEffect(() => {
    const generateCodeReader = async () => {
      const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
      const codeReaderMatrix = new ZXingBrowser.BrowserDatamatrixCodeReader();
      const codeReaderQr = new ZXingBrowser.BrowserQRCodeReader();
      const codeReaderBarcode = new ZXingLibrary.BrowserBarcodeReader();
      try {
        if (videoRef.current && videoInputDevices.length > 0) {
        const controls = await Promise.all([
          codeReaderMatrix.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current!, (result, error, controls) => {
            if (!controlsRef?.current) {
              controlsRef.current = controls;
            }
            if (result) {
              setData(result.getText());
              controls.stop();
          }
        }),
        codeReaderQr.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current!, (result, error, controls) => {
          if (!controlsRef?.current) {
            controlsRef.current = controls;
          }
          if (result) {
            setData(result.getText());
            controls.stop();
          }
        }),
        codeReaderBarcode.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current!, (result, error) => {
          if (result) {
            setData(result.getText());
            controlsRef?.current?.stop();
          }
        })
        ])
      }
    } catch (err) {
        console.error('Erreur lors du démarrage du scanner', err);
      }
    };

    generateCodeReader();

    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  return (
    <>
      <video ref={videoRef} style={{ width: '100%' }} />
    </>
  );
};

export default function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("search")
  const [cameraActive, setCameraActive] = useState(false)
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
  const [data, setData] = useState('');
  const [medication, setMedication] = useState('');

  const fetchMedication = async (cip: string) => {
    try {
    let { data, error } = await supabase
    .from('medication')
    .select('CIP, FULL_CIP')
    .eq('FULL_CIP', cip);

      if (error) {
        console.error('Erreur lors de la récupération des médicaments', error);
        return null;
      }

      return data?.[0] || null;
    } catch (err) {
      console.error('Erreur lors de la connexion à la base de données', err);
      return null;
    }
  }

  useEffect(() => {
    if (data) {
      fetchMedication(data).then((medication) => {
        setMedication(medication ? medication.toString() : '');
        if (medication) {
          console.log('Médicament trouvé:', medication);
        } else {
          console.log('Aucun médicament trouvé pour le CIP:', data);
        }
      });
    }
  }, [data]);

  // Gestion des filtres
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
      <motion.header
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-xl font-bold">Fiches de médicaments</h1>
        <div className="flex gap-2">
          <Link href="/medications">
            <Button size="sm" variant="outline" className="rounded-full">
              <BookOpen className="h-4 w-4 mr-1 hidden md:flex" />
              Mes médicaments
            </Button>
          </Link>
        </div>
      </motion.header>

      <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        <TabsContent value="search" className="mt-4 space-y-4">
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
              initialMedications={[]}
              states={states}
              types={types}
              searchTerm={searchTerm}
              filters={activeFilters}
            />
          </motion.div>
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

                <Card className="p-6">
                  <CardContent>
                    <MedicationScanForm scanOnly={true} />
                  </CardContent>
                </Card>
              </>
          </motion.div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
