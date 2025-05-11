"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Upload, RefreshCw, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as ZXingBrowser from '@zxing/browser'
import * as ZXingLibrary from '@zxing/library'
import { Confetti } from "@/components/ui/confetti"
import createClient from "@/utils/supabase/client"
interface MedicationScanFormProps {
  scanOnly?: boolean
}


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

export function MedicationScanForm({ scanOnly = false }: MedicationScanFormProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [data, setData] = useState('');
  const [medication, setMedication] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)


  const addMedication = async (data) => {
    const supabase = createClient;
    const { data: { user } } = await supabase.auth.getUser();
    supabase.from('medications').insert({
      id: (user?.id ? user.id : 'null') + "-" + medication?.CIS,
      cip: data.data[0].ID,
      cip13: data.data[0].full_CIP,
      spe_id: data.data[0].CIP,
      user_id: (user?.id ? user.id : 'null')
    })
  }

  useEffect(() => {
    console.log("Scanned data:", data)
    if (data) {
      // console.log("Scanned data:", data)
      fetch(`/api/medication?id=${data}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data)
          // Traitez les données récupérées ici
          if (data && data.data && data.data.length > 0) {
            setMedication(data.data[0])
            setHasScanned(true)
            addMedication(data)
            setShowConfetti(true)
          } else {
            setIsScanning(false)
            setHasScanned(false)
            console.log("No medication found")
          }
        })
        .catch((error) => {
          setIsScanning(false)
          setHasScanned(false)
          console.log("Error fetching data:", error)
        })
    }
  }, [data])
  const startScan = () => {
    setIsScanning(true)
    // Dans une application réelle, nous activerions la caméra ici

    // Simuler un scan après 2 secondes
    setTimeout(() => {
      setIsScanning(false)
      setHasScanned(true)
    }, 2000)
  }

  const resetScan = () => {
    setHasScanned(false)
    setIsScanning(false)
  }

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />}
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-2">Scanner un médicament</h2>
        <p className="text-sm text-muted-foreground">
          Scannez le QR code sur la boîte de médicament pour l'identifier et l'ajouter à votre traitement
        </p>
      </div>

      {!hasScanned ? (
        <>
          <Card
            className={`aspect-video items-center justify-center border-2 border-dashed ${isScanning ? "border-primary animate-pulse relative flex" : "border-border overflow-hidden"}`}
          >
            {isScanning ? (
              <div className="text-center">
                <RefreshCw className="h-10 w-10 text-primary animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium">Scan en cours...</p>
              </div>
            ) : (
              <div className="text-center">
                {/* <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Zone de scan</p> */}
                <QRCodeScanner setData={setData}/>
              </div>
            )}
          </Card>

          <div>

            <Button
              type="button"
              variant={isScanning ? "secondary" : "default"}
              className="w-full flex items-center justify-center gap-2"
              onClick={startScan}
              disabled={isScanning}
            >
              <Camera className="h-4 w-4" />
              <span>{isScanning ? "Scanning..." : "Scanner"}</span>
            </Button>
          </div>

          {scanOnly ? (
            <Alert variant="default" className="bg-muted border-muted-foreground/20">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Saisie manuelle désactivée</AlertTitle>
              <AlertDescription>
                Pour des raisons de sécurité, l'ajout manuel de médicaments n'est pas autorisé. Veuillez scanner le QR
                code présent sur l'emballage.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Vous pouvez également saisir le code CIP manuellement</p>
              <div className="flex mt-2">
                <Input placeholder="Code CIP (13 chiffres)" className="rounded-r-none" />
                <Button className="rounded-l-none">Rechercher</Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-medium">Médicament détecté !</h3>
            <p className="text-sm font-medium mt-1">{medication?.NOM_COMMERCIAL}</p>
            <p className="text-xs text-muted-foreground">{medication?.typed_medication?.[0]?.SUBSTANCE} - {medication?.VOIE_ADMINISTRATION}</p>
          </div>

          <p className="text-sm text-center">Nous avons détecté ce médicament. Est-ce correct ?</p>

          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="w-full" onClick={resetScan}>
              Rescanner
            </Button>

            <Button type="button" className="w-full" onClick={() => {}}>
              Confirmer
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
