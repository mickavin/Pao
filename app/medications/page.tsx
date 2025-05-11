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


const QRCodeScanner = ({setData}: {setData: (data: string) => void}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<ZXingBrowser.IScannerControls | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
        setVideoDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          // Sélectionner par défaut la caméra arrière si disponible (souvent la dernière sur mobile)
          setSelectedDeviceId(videoInputDevices[videoInputDevices.length - 1].deviceId);
        } else {
          setErrorMessage("Aucune caméra détectée. Veuillez vérifier que votre appareil dispose d'une caméra.");
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des appareils vidéo', err);
        setErrorMessage("Erreur lors de l'accès aux caméras. Veuillez vérifier les permissions de votre navigateur. Détail: " + (err as any).message);
      }
    };
    
    getVideoDevices();
  }, [retryCount]); // Réessayer lorsque retryCount change

  useEffect(() => {
    if (!selectedDeviceId) return;
    const generateCodeReader = async () => {
      const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
      const codeReaderMatrix = new ZXingBrowser.BrowserDatamatrixCodeReader();
      const codeReaderQr = new ZXingBrowser.BrowserQRCodeReader();
      const codeReaderBarcode = new ZXingLibrary.BrowserBarcodeReader();
      try {
        if (videoRef.current && videoInputDevices.length > 0) {
          const constraints = {
            video: {
              deviceId: selectedDeviceId,
              focusMode: 'continuous',
              focusDistance: { ideal: 0.005 },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          };
          setErrorMessage(null); // Réinitialiser le message d'erreur
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          videoRef.current.srcObject = stream;
          await Promise.all([
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
          ]);
        }
      } catch (err) {
        console.error('Erreur lors du démarrage du scanner', err);
        setErrorMessage("Impossible d'accéder à la caméra. Veuillez vérifier les permissions ou essayer une autre caméra. Détail: " + (err as any).message);
      }
    };

    generateCodeReader();

    return () => {
      controlsRef.current?.stop();
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as any;
        if (stream && typeof stream.getTracks === 'function') {
          stream.getTracks().forEach((track: any) => track.stop());
        }
        videoRef.current.srcObject = null;
      }
    };
  }, [selectedDeviceId, retryCount]); // Ajout de retryCount comme dépendance

  return (
    <>
      <video ref={videoRef} style={{ width: '100%', overflow: 'hidden' }} />
      {errorMessage && (
        <div className="text-red-500 text-sm text-center mt-2 max-w-xs mx-auto">
          {errorMessage}
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={() => setRetryCount(count => count + 1)}
          >
            Réessayer
          </Button>
        </div>
      )}
      {videoDevices.length > 1 && (
        <div className="flex flex-col items-center justify-center mt-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-full shadow-md w-fit mx-auto">
          <span className="text-xs text-muted-foreground mb-1">Caméra</span>
          <div className="flex items-center gap-1">
            {videoDevices.map((device, index) => (
              <Button
                key={device.deviceId}
                variant={selectedDeviceId === device.deviceId ? 'default' : 'outline'}
                size="sm"
                className="rounded-full h-8 w-8"
                onClick={() => setSelectedDeviceId(device.deviceId)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};



export default function MedicationsPage() {
  const [userMedications, setUserMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState<any>([])
  const [data, setData] = useState('');
  const [medication, setMedication] = useState('');

  useEffect(() => {
    async function fetchMedications() {
      const supabase = createClient;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // const { data, error } = await supabase
        //   .from('user_medications')
        //   .select('*')
        //   .eq('user_id', user.id);
          
        // if (error) {
        //   console.error("Erreur lors de la récupération des médicaments:", error);
        // } else {
        //   setUserMedications(data || []);
        // }
      }
      setLoading(false);
    }
    
    fetchMedications();
  }, []);
  
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
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Rechercher un médicament..." className="pl-10" defaultValue="Doli" />
            </div>

            <MedicationSearchResults />
          </div>
        </TabsContent>

        <TabsContent value="scan" className="mt-4">
          <motion.div
            className="flex flex-col items-center justify-center min-h-[300px] text-center border-2 border-dashed border-muted rounded-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
       
              <>
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Scan className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Scanner un code QR</h3>
                <p className="text-muted-foreground mb-4">
                  Placez le QR code de votre médicament dans le cadre pour l'identifier
                </p>
                <>
                <Scanqr setData={setData} />
                {medication && (
                  <p>
                    ✅ QR Code détecté
                  </p>
                )}
              </>  
              </>
          </motion.div>
        </TabsContent>

        
        <TabsContent value="my-medications" className="mt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Mes Médicaments</h2>
            {loading ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : userMedications.length === 0 ? (
              <p className="text-muted-foreground">Aucun médicament enregistré.</p>
            ) : (
              <div className="grid gap-2">
                {userMedications.map((med) => (
                  <div key={med.id} className="p-3 border rounded-md">
                    <h3 className="font-medium">{med.name}</h3>
                    {med.dosage && <p className="text-sm text-muted-foreground">Dosage: {med.dosage}</p>}
                    {med.frequency && <p className="text-sm text-muted-foreground">Fréquence: {med.frequency}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
