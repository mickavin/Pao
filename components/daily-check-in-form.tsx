"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Smile, Meh, Frown, ThermometerSnowflake, Activity, Moon, Check, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Confetti } from "@/components/ui/confetti"
import { RewardAnimation } from "@/components/gamification/reward-animation"
import { PandaMascot } from "@/components/ui/panda-mascot"
import { Combobox } from "./ui/combo-box"

export function DailyCheckInForm() {
  const [mood, setMood] = useState(3)
  const [pain, setPain] = useState(2)
  const [energy, setEnergy] = useState(3)
  const [sleep, setSleep] = useState(7)

  const [notes_additional, setNotesAdditional] = useState("")
  const [info_additional, setInfoAdditional] = useState("")

  const [sideEffects, setSideEffects] = useState<string[]>([])
  const [customSideEffect, setCustomSideEffect] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const [medications, setMedications] = useState([
    { id: 1, name: "Levothyrox 100µg", taken: false, time: "08:00" },
    { id: 2, name: "Doliprane 1000mg", taken: false, time: "08:00" },
    { id: 3, name: "Doliprane 1000mg", taken: false, time: "20:00" },
    { id: 4, name: "Ventoline", taken: false, time: "Si besoin" },
  ])

  const toggleMedication = (id: number) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med)))
  }

  const activateMedication = (id: number) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, taken: true } : med)))
  }

  const deactivateMedication = (id: number) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, taken: false } : med)))
  }

  const handleSideEffectChange = (effect: string) => {
    if (sideEffects.includes(effect)) {
      setSideEffects(sideEffects.filter((item) => item !== effect))
    } else {
      setSideEffects([...sideEffects, effect])
    }
  }

  const addCustomSideEffect = () => {
    if (sideEffects.includes(customSideEffect)) {
      setSideEffects(sideEffects.filter((item) => item !== customSideEffect))
    } else {
      if (customSideEffect.trim() !== "") {
        setSideEffects([...sideEffects, customSideEffect])
        setCustomSideEffect("")
      }
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setShowConfetti(true)
    setTimeout(() => {
      setShowReward(true)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti count={80} onComplete={() => setShowConfetti(false)} />}
      {showReward && <RewardAnimation points={15} onComplete={() => setShowReward(false)} />}

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-2 rounded-full bg-primary/10 p-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Check-in complété !</h2>
          <p className="mt-2 text-muted-foreground">Merci d'avoir pris le temps de faire votre check-in quotidien.</p>

          <div className="mt-6 flex items-center justify-center">
            <PandaMascot
              message="Bravo ! Tu as gagné 15 feuilles et maintenu ta série de 5 jours !"
              size="lg"
              mood="excited"
            />
          </div>

          <div className="mt-8 flex gap-4">
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Modifier
            </Button>
            <Button>Retour à l'accueil</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-between">
              <div className="streak-indicator mb-2">
                <Smile className="h-4 w-4" />
                <span>Série: 5 jours</span>
              </div>
              <h3 className="self-start font-semibold">Avez-vous pris vos médicaments aujourd'hui?</h3>
            </div>
            <div className="space-y-3" style={{ marginTop: "15px" }}>
              {medications.map((med) => (
                <Card key={med.id} className={`p-3 ${med.taken ? "bg-primary/5 border-primary/20" : ""}`}>
                  <div className="flex items-left justify-between md:flex-row flex-col mx-2 md:mx-0">
                    <div className="flex flex-col mb-2 md:mb-0">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-xs text-muted-foreground">{med.time}</div>
                    </div>
                    <div className="flex gap-2 justify-between">
                      <Button
                        variant={med.taken ? "default" : "outline"}
                        size="sm"
                        className={`${med.taken ? "" : "hover:bg-primary/30 border-primary/20 text-primary hover:text-primary"}`}
                        onClick={() => activateMedication(med.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Pris
                      </Button>
                      <Button
                        variant={"default"}
                        size="sm"
                        className={`${!med.taken ? "bg-destructive/70 hover:bg-destructive/70" : "hover:bg-destructive/30 bg-destructive/10 text-destructive border-destructive/20"}`}
                        onClick={() => deactivateMedication(med.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Oublié
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <hr className="my-3" />
          <h3 className="font-semibold">Avez-vous ressenti des effets secondaires?</h3>
          <div style={{ marginTop: "15px" }}>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {["Nausée", "Fatigue", "Maux de tête", "Vertiges", "Insomnie", "Douleurs musculaires"].map((effect) => (
                <div key={effect} className="flex items-center space-x-2">
                  <Checkbox
                    id={`effect-${effect}`}
                    checked={sideEffects.includes(effect)}
                    onCheckedChange={() => handleSideEffectChange(effect)}
                  />
                  <Label htmlFor={`effect-${effect}`}>{effect}</Label>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-2">
              <Combobox
                handleSideEffectChange={handleSideEffectChange}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customSideEffect}
                onChange={(e) => setCustomSideEffect(e.target.value)}
                placeholder="Effet secondaire personnalisé"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="button" onClick={addCustomSideEffect} variant="outline">
                Ajouter
              </Button>
            </div>
            {sideEffects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {sideEffects.map((effect) => (
                  <div
                    key={effect}
                    className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs flex items-center"
                  >
                    {effect}
                    <button onClick={() => handleSideEffectChange(effect)} className="ml-1 hover:text-accent/80">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr className="my-4" />

          <h3 className="font-semibold mb-2">Comment vous sentez-vous aujourd'hui ?</h3>

          <div style={{ marginTop: "15px" }}>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Smile className="h-4 w-4 text-secondary" />
                  Humeur
                </label>
                <div className="flex items-center gap-2">
                  {mood <= 2 && <Frown className="h-5 w-5 text-accent" />}
                  {mood > 2 && mood < 4 && <Meh className="h-5 w-5 text-secondary" />}
                  {mood >= 4 && <Smile className="h-5 w-5 text-primary" />}
                  <span className="text-sm font-medium">{mood}/5</span>
                </div>
              </div>
              <Slider defaultValue={[mood]} max={5} step={1} onValueChange={(value) => setMood(value[0])} />
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Énergie
                </label>
                <div className="flex items-center gap-2">
                  {energy <= 2 && <Frown className="h-5 w-5 text-accent" />}
                  {energy > 2 && energy < 4 && <Meh className="h-5 w-5 text-secondary" />}
                  {energy >= 4 && <Smile className="h-5 w-5 text-primary" />}
                  <span className="text-sm font-medium">{energy}/5</span>
                </div>
              </div>
              <Slider defaultValue={[energy]} max={5} step={1} onValueChange={(value) => setEnergy(value[0])} />
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ThermometerSnowflake className="h-4 w-4 text-accent" />
                  Douleur
                </label>
                <div className="flex items-center gap-2">
                  {pain <= 2 && <Smile className="h-5 w-5 text-primary" />}
                  {pain > 2 && pain < 4 && <Meh className="h-5 w-5 text-secondary" />}
                  {pain >= 4 && <Frown className="h-5 w-5 text-accent" />}
                  <span className="text-sm font-medium">{pain}/5</span>
                </div>
              </div>
              <Slider defaultValue={[pain]} max={5} step={1} onValueChange={(value) => setPain(value[0])} />
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Moon className="h-4 w-4 text-primary" />
                  Sommeil
                </label>
                <span className="text-sm font-medium">{sleep} heures</span>
              </div>
              <Slider
                defaultValue={[sleep]}
                min={0}
                max={12}
                step={0.5}
                onValueChange={(value) => setSleep(value[0])}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes supplémentaires</label>
            <Textarea
              placeholder="Décrivez votre observation personnelle sur votre ressenti actuel..."
              className="resize-none"
              rows={3}
              onChange={(e) => setNotesAdditional(e.target.value)}
              value={notes_additional}
            />
          </div>
          <hr className="my-4" />
          <h3 className="font-semibold mb-2">Avez-vous des informations complémentaires à communiquer ?</h3>
          <div className="space-y-2" style={{ marginTop: "15px" }}>
            <label className="text-sm font-medium">Informations complémentaires</label>
            <Textarea
              placeholder="Exemple: Prise à jeun, prise d'alcool..."
              className="resize-none"
              rows={3}
              onChange={(e) => setInfoAdditional(e.target.value)}
              value={info_additional}
            />
          </div>
          <Button className="w-full" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </>
      )}
    </div>
  )
}
