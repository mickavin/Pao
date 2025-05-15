"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Upload, RefreshCw, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as ZXingBrowser from '@zxing/browser'
import * as ZXingLibrary from '@zxing/library'
import createClient from "@/utils/supabase/client"
import Scanqr from "@/components/ScanQR"
import { useRouter } from "next/navigation"
import { RewardAnimation } from "@/components/gamification/reward-animation"
import { useToast } from "@/components/ui/use-toast"
import supabase from "@/utils/supabase/client"
import { Confetti } from "@/components/ui/confetti"
import { AnimatedFeedback } from "@/components/ui/animated-feedback"

interface MedicationScanFormProps {
  scanOnly?: boolean
}


export function MedicationScanForm({ scanOnly = false }: MedicationScanFormProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [data, setData] = useState({getData: null, readData: null, statedData: null});
  const [medication, setMedication] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [achievementUnlocked, setAchievementUnlocked] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "warning" | null; message: string }>({
    type: null,
    message: "",
  })
  const router = useRouter()
  const { toast } = useToast()
  const addMedication = async () => {
    try {
      const { data: user_medications, error: error_user_medications } = await supabase.from('user_medications').insert({
        // id: (user?.id ? user.id : 'null') + "-" + medication?.CIS,
        id: "null" +  "-" + medication?.CIS,
        cip: data?.getData?.[0]?.ID,
        cip13: data?.getData?.[0]?.full_CIP,
      spe_id: data?.getData?.[0]?.CIP,
      user_id: null,//(user?.id ? user.id : 'null')
      serial: data?.readData?.serial,
      lot: data?.readData?.lot,
      expiry: data?.readData?.expiry,
      gtin: data?.readData?.gtin,
    })
    if (error_user_medications) {
        setFeedback({
          type: "error",
          message: "Médicament déjà ajouté",
        })
      return
    }
    setFeedback({
      type: "success",
      message: "Médicament ajouté",
    })
    setShowConfetti(true)
    router.refresh()
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Médicament déjà ajouté",
      })
    }
  }

  useEffect(() => {
    console.log(data);
    if (data?.statedData?.[0]) {
      setMedication(data?.statedData[0]);
    }
  }, [data]);

  const startScan = () => {
    setIsScanning(true)
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
    <>
    <div className="space-y-6">
      {showConfetti && <Confetti count={80} active={showConfetti} onComplete={() => setShowConfetti(false)} />}
      {showCelebration && (
        <RewardAnimation points={25} message={`Votre médicament ajouté vous rapporte des points !`} position="center" />
      )}
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-2">Scanner un médicament</h2>
        <p className="text-sm text-muted-foreground">
          Scannez le QR code sur la boîte de médicament pour l'identifier et l'ajouter à votre liste de médicaments
        </p>
      </div>

      {!hasScanned ? (
        <>
          <Card
            className={`items-center justify-center border-2 border-dashed ${isScanning ? "aspect-video border-primary animate-pulse relative flex" : "border-border overflow-hidden"}`}
          >
              <div className={isScanning ? "text-center" : "hidden"}>
                <RefreshCw className="h-10 w-10 text-primary animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium">Scan en cours...</p>
              </div>

              <div className={isScanning ? "hidden" : "text-center"}>
                <Scanqr setData={setData} startScan={startScan}/>
              </div>
          </Card>

          <div>

            {/* <Button
              type="button"
              variant={isScanning ? "secondary" : "default"}
              className="w-full flex items-center justify-center gap-2"
              onClick={startScan}
              disabled={isScanning}
            >
              <Camera className="h-4 w-4" />
              <span>{isScanning ? "Scanning..." : "Scanner"}</span>
            </Button> */}
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
            <p className="text-xs text-muted-foreground">{medication?.typed_medication?.[0]?.SUBSTANCE} {medication?.typed_medication?.[0]?.SUBSTANCE ? "- " : ""} {medication?.VOIE_ADMINISTRATION}</p>
          </div>

          <p className="text-sm text-center">Nous avons détecté ce médicament. Est-ce correct ?</p>

          {!showButton ? <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="w-full" onClick={resetScan}>
              Rescanner
            </Button>

            <Button type="button" className="w-full" onClick={() => {
              setShowButton(true)
            }}>
              Confirmer
            </Button>
          </div>
          : 
          <>  
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="w-full" onClick={resetScan}>
              Rescanner
            </Button>
            <Button className="w-full" onClick={() => {
              router.push(`/medications/${medication?.CIS}`)
            }}>
              Voir la fiche
            </Button>

          </div>
            <Button type="button" className="w-full" onClick={() => {
             addMedication()
            }}>
              Ajouter à ma liste
            </Button>
          </>
          }
        </div>
      )}
      </div>
       <AnimatedFeedback
        type={feedback.type}
        message={feedback.message}
        onComplete={() => setFeedback({ type: null, message: "" })}
        />

    </>
  )
}
