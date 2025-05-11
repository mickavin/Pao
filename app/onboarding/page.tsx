"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PandaMascot } from "@/components/ui/panda-mascot"
import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Confetti } from "@/components/ui/confetti"
import { RewardAnimation } from "@/components/gamification/reward-animation"
import {
  Pill,
  Calendar,
  Bell,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
  Info,
  Shield,
  Heart,
  CheckCircle2,
  Sparkles,
  Leaf,
  Zap,
  ArrowRight,
  Smile,
  Clock,
  User,
  Mail,
  CalendarIcon,
} from "lucide-react"
import { useAccessibility } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from "@/components/hooks/use-local-storage"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

// Définition des types pour les données du formulaire
interface FormData {
  // name: string
  // email: string
  birthdate: string
  gender: string
  goals: {
    adherence: boolean
    symptoms: boolean
    sideEffects: boolean
    doctor: boolean
    habits: boolean
  }
  medications: Array<{
    name: string
    dosage: string
    frequency: string
  }>
  reminders: {
    morning: string
    noon: string
    evening: string
    notifications: boolean
    sound: boolean
    vibration: boolean
  }
}

export default function OnboardingPage() {
  if (typeof window === "undefined") return null
  const [step, setStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [formData, setFormData] = useState<FormData>({
    // name: "",
    // email: "",
    birthdate: "",
    gender: "",
    goals: {
      adherence: false,
      symptoms: false,
      sideEffects: false,
      doctor: false,
      habits: false,
    },
    medications: [{ name: "", dosage: "", frequency: "" }],
    reminders: {
      morning: "08:00",
      noon: "12:00",
      evening: "20:00",
      notifications: true,
      sound: true,
      vibration: true,
    },
  })
  const [progress, setProgress] = useState(0)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useLocalStorage("pao-onboarding-completed", false)
  const [showTips, setShowTips] = useState<boolean>(true)
  const [activeTip, setActiveTip] = useState<number>(0)
  const [showCelebration, setShowCelebration] = useState<boolean>(false)
  const [achievementUnlocked, setAchievementUnlocked] = useState<string | null>(null)

  const router = useRouter()
  const { preferences } = useAccessibility()
  const { simplifiedLayout, textSize } = preferences
  const { toast } = useToast()
  const contentRef = useRef<HTMLDivElement>(null)

  // Tips pour chaque étape
  const stepTips = [
    [
      "Bienvenue chez Pao ! Suivez les étapes pour configurer votre expérience personnalisée.",
      "Pao utilise la gamification pour rendre la gestion de vos médicaments plus agréable.",
      "Vous gagnerez des points et des badges en utilisant l'application régulièrement.",
    ],
    [
      // "Votre nom nous aide à personnaliser votre expérience.",
      // "Votre email est optionnel et sert uniquement à récupérer votre compte si nécessaire.",
      "Vos données sont sécurisées et ne sont jamais partagées sans votre consentement.",
    ],
    [
      "Sélectionnez les objectifs qui correspondent à vos besoins de santé.",
      "Plus vous êtes précis, plus nous pourrons personnaliser votre expérience.",
      "Vous pourrez modifier ces objectifs à tout moment dans les paramètres.",
    ],
    [
      "Commencez par ajouter vos médicaments les plus importants.",
      "Vous pourrez ajouter d'autres médicaments plus tard.",
      "La fréquence nous aide à configurer vos rappels de manière optimale.",
    ],
    [
      "Les rappels vous aideront à ne jamais oublier vos médicaments.",
      "Vous pouvez personnaliser les heures selon votre routine quotidienne.",
      "Les notifications peuvent être activées ou désactivées à tout moment.",
    ],
    [
      "Félicitations ! Vous êtes prêt à commencer votre parcours de santé.",
      "Vous avez gagné vos premiers points et badges.",
      "Explorez l'application pour découvrir toutes ses fonctionnalités.",
    ],
  ]

  // Calcul du progrès basé sur le remplissage du formulaire
  useEffect(() => {
    let completionScore = 0

    // Nom et email
    // if (formData.name) completionScore += 10
    // if (formData.email) completionScore += 10
    if (formData.birthdate) completionScore += 5
    if (formData.gender) completionScore += 5

    // Objectifs
    const goalCount = Object.values(formData.goals).filter(Boolean).length
    completionScore += goalCount * 5

    // Médicaments
    const hasMedication = formData.medications.some((med) => med.name && med.dosage && med.frequency)
    if (hasMedication) completionScore += 15

    // Rappels
    if (formData.reminders.notifications) completionScore += 5

    setProgress(Math.min(completionScore, 100))
  }, [formData])

  // Vérifier les réalisations à chaque étape
  useEffect(() => {
    // Vérifier si l'utilisateur a rempli complètement l'étape actuelle
    const checkAchievements = () => {
      if (step === 1) {
        if (!achievementUnlocked) {
          setAchievementUnlocked("Identité complète")
          setShowCelebration(true)
          toast({
            title: "Badge débloqué !",
            description: "Identité complète : Vous avez rempli vos informations personnelles.",
            duration: 3000,
          })
          setTimeout(() => setShowCelebration(false), 3000)
        }
      } else if (step === 2 && Object.values(formData.goals).filter(Boolean).length >= 3) {
        if (achievementUnlocked !== "Objectifs clairs") {
          setAchievementUnlocked("Objectifs clairs")
          setShowCelebration(true)
          toast({
            title: "Badge débloqué !",
            description: "Objectifs clairs : Vous avez défini au moins 3 objectifs de santé.",
            duration: 3000,
          })
          setTimeout(() => setShowCelebration(false), 3000)
        }
      } else if (step === 3 && formData.medications.some((med) => med.name && med.dosage && med.frequency)) {
        if (achievementUnlocked !== "Premier médicament") {
          setAchievementUnlocked("Premier médicament")
          setShowCelebration(true)
          toast({
            title: "Badge débloqué !",
            description: "Premier médicament : Vous avez ajouté votre premier médicament.",
            duration: 3000,
          })
          setTimeout(() => setShowCelebration(false), 3000)
        }
      }
    }

    checkAchievements()
  }, [step, formData, achievementUnlocked, toast])

  // Rotation des conseils
  useEffect(() => {
    if (showTips) {
      const interval = setInterval(() => {
        setActiveTip((prev) => (prev + 1) % stepTips[step].length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [showTips, step, stepTips])

  // Rediriger si l'onboarding est déjà complété
  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.push("/")
    }
  }, [hasCompletedOnboarding, router])

  // Faire défiler vers le haut lors du changement d'étape
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [step])

  // Gestionnaires d'événements pour les champs du formulaire
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGoalChange = (goal: keyof FormData["goals"], checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        [goal]: checked,
      },
    }))
  }

  const handleMedicationChange = (index: number, field: keyof FormData["medications"][0], value: string) => {
    const updatedMedications = [...formData.medications]
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      medications: updatedMedications,
    }))
  }

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", frequency: "" }],
    }))
  }

  const handleReminderChange = (field: keyof FormData["reminders"], value: any) => {
    setFormData((prev) => ({
      ...prev,
      reminders: {
        ...prev.reminders,
        [field]: value,
      },
    }))
  }

  // Navigation entre les étapes
  const handleNext = () => {
    if (step < steps.length - 1) {
      setDirection("right")
      setStep(step + 1)

      // Jouer un son de transition si activé
      if (formData.reminders.sound) {
        playTransitionSound()
      }
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setDirection("left")
      setStep(step - 1)
    }
  }

  // Fonction pour jouer un son de transition
  const playTransitionSound = () => {
    try {
      const audio = new Audio("/sounds/transition.mp3")
      audio.volume = 0.3
      audio.play()
    } catch (error) {
      console.error("Erreur lors de la lecture du son:", error)
    }
  }

  // Définition des étapes
  const steps = [
    {
      title: "Bienvenue chez Pao",
      description: "Grace à Pao, vous pourrez suivre vos médicaments, comprendre vos symptômes et célébrer vos progrès.",
      icon: <PandaMascot size="lg" mood="excited" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <h1
            className={cn(
              "mt-4 font-bold",
              textSize === "small" ? "text-xl" : textSize === "large" ? "text-3xl" : "text-2xl",
            )}
          >
            Bienvenue dans votre parcours de santé
          </h1>
          <p className="mt-2 text-muted-foreground">
            Pao vous aide à suivre vos médicaments, comprendre vos symptômes et célébrer vos progrès.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group"
            >
              <Card className="p-4 text-center h-full group-hover:border-primary/50 group-hover:shadow-md transition-all duration-200">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Pill className="mx-auto h-8 w-8 text-primary" />
                </motion.div>
                <p className="mt-2 font-medium">Suivi de médicaments</p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group"
            >
              <Card className="p-4 text-center h-full group-hover:border-secondary/50 group-hover:shadow-md transition-all duration-200">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Calendar className="mx-auto h-8 w-8 text-secondary" />
                </motion.div>
                <p className="mt-2 font-medium">Check-ins quotidiens</p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group"
            >
              <Card className="p-4 text-center h-full group-hover:border-accent/50 group-hover:shadow-md transition-all duration-200">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Bell className="mx-auto h-8 w-8 text-accent" />
                </motion.div>
                <p className="mt-2 font-medium">Rappels personnalisés</p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group"
            >
              <Card className="p-4 text-center h-full group-hover:border-primary/50 group-hover:shadow-md transition-all duration-200">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Award className="mx-auto h-8 w-8 text-primary" />
                </motion.div>
                <p className="mt-2 font-medium">Récompenses & progrès</p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 w-full"
          >
            <Card className="bg-primary/10 border-primary/30 p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium text-sm">Vos données sont protégées</h3>
                  <p className="text-xs text-muted-foreground">
                    Pao respecte votre vie privée et sécurise vos informations de santé
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6 flex justify-center"
          >
            <Button onClick={handleNext} size="lg" className="group">
              Commencer
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      ),
    },
    {
      title: "Vos informations",
      description: "Dites-nous en plus sur vous pour personnaliser votre expérience.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Votre nom
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nous utiliserons votre nom pour personnaliser l'application</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <Input
                id="name"
                placeholder="Prénom Nom"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={cn(
                  simplifiedLayout && "text-lg py-6",
                  "transition-all duration-200 focus:border-primary focus:ring-primary",
                )}
              />
            </motion.div>
          </div> */}

          {/* <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email
              <Badge variant="outline" className="ml-2 text-xs">
                Optionnel
              </Badge>
            </Label>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  simplifiedLayout && "text-lg py-6",
                  "transition-all duration-200 focus:border-primary focus:ring-primary",
                )}
              />
            </motion.div>
            <p className="text-xs text-muted-foreground">Utilisé uniquement pour la récupération de compte</p>
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="birthdate" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Date de naissance
            </Label>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <Input
                id="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={(e) => handleInputChange("birthdate", e.target.value)}
                className={cn(
                  simplifiedLayout && "text-lg py-6",
                  "transition-all duration-200 focus:border-primary focus:ring-primary",
                )}
              />
            </motion.div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Genre
            </Label>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger id="gender" className={cn(simplifiedLayout && "text-lg py-6")}>
                  <SelectValue placeholder="Sélectionnez votre genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Femme</SelectItem>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="non-binary">Non-binaire</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                  <SelectItem value="prefer-not-to-say">Je préfère ne pas préciser</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">Bonjour ! Nous sommes ravis de vous accueillir.</p>
              </div>
            </motion.div>
        </motion.div>
      ),
    },
    {
      title: "Vos objectifs de santé",
      description: "Définissez vos objectifs pour personnaliser votre parcours.",
      icon: <Target className="h-8 w-8 text-secondary" />,
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground">
            Quels sont vos principaux objectifs ? (Sélectionnez tout ce qui s'applique)
          </p>

          <div className="space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-primary/5"
            >
              <Checkbox
                id="goal-adherence"
                checked={formData.goals.adherence}
                onCheckedChange={(checked) => handleGoalChange("adherence", checked === true)}
              />
              <div>
                <Label htmlFor="goal-adherence" className="font-medium flex items-center">
                  <Pill className="h-4 w-4 mr-2 text-primary" />
                  Améliorer l'adhérence aux médicaments
                </Label>
                <p className="text-sm text-muted-foreground">Prendre mes médicaments régulièrement et à l'heure</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-secondary/5"
            >
              <Checkbox
                id="goal-symptoms"
                checked={formData.goals.symptoms}
                onCheckedChange={(checked) => handleGoalChange("symptoms", checked === true)}
              />
              <div>
                <Label htmlFor="goal-symptoms" className="font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2 text-secondary" />
                  Suivre mes symptômes
                </Label>
                <p className="text-sm text-muted-foreground">
                  Comprendre comment mes symptômes évoluent au fil du temps
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-accent/5"
            >
              <Checkbox
                id="goal-side-effects"
                checked={formData.goals.sideEffects}
                onCheckedChange={(checked) => handleGoalChange("sideEffects", checked === true)}
              />
              <div>
                <Label htmlFor="goal-side-effects" className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-accent" />
                  Surveiller les effets secondaires
                </Label>
                <p className="text-sm text-muted-foreground">
                  Identifier et suivre les effets secondaires des médicaments
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-primary/5"
            >
              <Checkbox
                id="goal-doctor"
                checked={formData.goals.doctor}
                onCheckedChange={(checked) => handleGoalChange("doctor", checked === true)}
              />
              <div>
                <Label htmlFor="goal-doctor" className="font-medium flex items-center">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  Partager avec mon médecin
                </Label>
                <p className="text-sm text-muted-foreground">Générer des rapports à partager lors des consultations</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-secondary/5"
            >
              <Checkbox
                id="goal-habits"
                checked={formData.goals.habits}
                onCheckedChange={(checked) => handleGoalChange("habits", checked === true)}
              />
              <div>
                <Label htmlFor="goal-habits" className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-secondary" />
                  Développer de bonnes habitudes
                </Label>
                <p className="text-sm text-muted-foreground">Créer une routine de santé régulière et positive</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <Card className="bg-secondary/10 border-secondary/30 p-4">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-secondary" />
                <p className="text-xs">
                  Ces objectifs nous aide à personnaliser votre expérience et à vous proposer des fonctionnalités
                  adaptées à vos besoins.
                </p>
              </div>
            </Card>
          </motion.div>

          {Object.values(formData.goals).filter(Boolean).length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <p className="text-sm font-medium">
                  Vous avez sélectionné {Object.values(formData.goals).filter(Boolean).length} objectif(s) !
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ),
    },
    {
      title: "Vos médicaments",
      description: "Ajoutez vos médicaments pour commencer le suivi.",
      icon: <Pill className="h-8 w-8 text-primary" />,
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground">
            Vous pourrez ajouter tous vos médicaments plus tard, mais commençons par les plus importants.
          </p>

          <div className="space-y-6">
            {formData.medications.map((medication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="space-y-4 p-4 border border-border rounded-lg hover:border-primary/30 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <Pill className="h-4 w-4 mr-2 text-primary" />
                    Médicament {index + 1}
                  </h3>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => {
                        const updatedMeds = [...formData.medications]
                        updatedMeds.splice(index, 1)
                        setFormData((prev) => ({ ...prev, medications: updatedMeds }))
                      }}
                    >
                      ✕
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`med-name-${index}`}>Nom du médicament</Label>
                  <Input
                    id={`med-name-${index}`}
                    placeholder="ex: Doliprane"
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                    className={cn(
                      simplifiedLayout && "text-lg py-6",
                      "transition-all duration-200 focus:border-primary focus:ring-primary",
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`med-dosage-${index}`}>Dosage</Label>
                  <Input
                    id={`med-dosage-${index}`}
                    placeholder="ex: 1000mg"
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                    className={cn(
                      simplifiedLayout && "text-lg py-6",
                      "transition-all duration-200 focus:border-primary focus:ring-primary",
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`med-frequency-${index}`}>Fréquence</Label>
                  <Select
                    value={medication.frequency}
                    onValueChange={(value) => handleMedicationChange(index, "frequency", value)}
                  >
                    <SelectTrigger id={`med-frequency-${index}`} className={cn(simplifiedLayout && "text-lg py-6")}>
                      <SelectValue placeholder="Sélectionnez la fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="twice-daily">Deux fois par jour</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                      <SelectItem value="as-needed">Si besoin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {medication.name && medication.dosage && medication.frequency && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-2 bg-primary/10 rounded-lg border border-primary/20 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <p className="text-xs">Médicament complet !</p>
                  </motion.div>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" className="w-full group" onClick={addMedication}>
                <Pill className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Ajouter un autre médicament
              </Button>
            </motion.div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-muted-foreground text-center">
              Vous pourrez ajouter, modifier ou supprimer des médicaments à tout moment
            </p>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Rappels",
      description: "Configurez vos rappels pour ne jamais oublier vos médicaments.",
      icon: <Bell className="h-8 w-8 text-accent" />,
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground">Nous pouvons vous envoyer des rappels pour prendre vos médicaments.</p>

          <div className="space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <Label htmlFor="reminder-morning" className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                Rappel du matin
              </Label>
              <Input
                id="reminder-morning"
                type="time"
                value={formData.reminders.morning}
                onChange={(e) => handleReminderChange("morning", e.target.value)}
                className="w-32"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <Label htmlFor="reminder-noon" className="flex items-center gap-2">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-secondary" />
                </div>
                Rappel du midi
              </Label>
              <Input
                id="reminder-noon"
                type="time"
                value={formData.reminders.noon}
                onChange={(e) => handleReminderChange("noon", e.target.value)}
                className="w-32"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <Label htmlFor="reminder-evening" className="flex items-center gap-2">
                <div className="bg-accent/10 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-accent" />
                </div>
                Rappel du soir
              </Label>
              <Input
                id="reminder-evening"
                type="time"
                value={formData.reminders.evening}
                onChange={(e) => handleReminderChange("evening", e.target.value)}
                className="w-32"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 space-y-3"
            >
              <div className="flex items-center space-x-2 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-primary/5">
                <Checkbox
                  id="reminder-notification"
                  checked={formData.reminders.notifications}
                  onCheckedChange={(checked) => handleReminderChange("notifications", checked === true)}
                />
                <Label htmlFor="reminder-notification" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-primary" />
                  Activer les notifications
                </Label>
              </div>

              <div className="flex items-center space-x-2 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-secondary/5">
                <Checkbox
                  id="reminder-sound"
                  checked={formData.reminders.sound}
                  onCheckedChange={(checked) => handleReminderChange("sound", checked === true)}
                />
                <Label htmlFor="reminder-sound" className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-secondary" />
                  Activer le son
                </Label>
              </div>

              <div className="flex items-center space-x-2 hover:translate-x-1 transition-transform duration-200 p-2 rounded-lg hover:bg-accent/5">
                <Checkbox
                  id="reminder-vibration"
                  checked={formData.reminders.vibration}
                  onCheckedChange={(checked) => handleReminderChange("vibration", checked === true)}
                />
                <Label htmlFor="reminder-vibration" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-accent" />
                  Activer la vibration
                </Label>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <Card className="bg-accent/10 border-accent/30 p-4">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-accent" />
                  <p className="text-xs">
                    Les rappels vous aideront à maintenir une bonne adhérence à votre traitement. Vous pourrez les
                    modifier à tout moment.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "C'est terminé !",
      description: "Vous êtes prêt à commencer votre parcours de santé.",
      icon: <Award className="h-8 w-8 text-primary" />,
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
            className="mb-6"
          >
            <PandaMascot
              size="lg"
              message="Félicitations ! Vous avez gagné 100 feuilles pour avoir complété votre profil !"
              mood="excited"
              animated={true}
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "mt-4 font-bold",
              textSize === "small" ? "text-xl" : textSize === "large" ? "text-3xl" : "text-2xl",
            )}
          >
            Votre parcours commence maintenant
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-muted-foreground"
          >
            Vous êtes prêt à commencer à suivre vos médicaments et à améliorer votre santé.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 10 }}
            className="mt-6 w-full max-w-xs"
          >
            <div className="transform transition-all duration-300 hover:scale-105">
              <Card className="bg-primary/10 border-primary/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium flex items-center">
                    <Leaf className="h-4 w-4 mr-2 text-primary" />
                    Récompense d'inscription
                  </span>
                  <span className="font-bold">+100 🍃</span>
                </div>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 400, damping: 10 }}
            className="mt-4 w-full max-w-xs"
          >
            <div className="transform transition-all duration-300 hover:scale-105">
              <Card className="bg-secondary/10 border-secondary/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium flex items-center">
                    <Award className="h-4 w-4 mr-2 text-secondary" />
                    Badge débloqué
                  </span>
                  <span className="font-bold">🏆 Premier pas</span>
                </div>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 space-y-2 w-full"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className={cn("w-full group", simplifiedLayout && "py-6 text-lg")}
                onClick={() => {
                  setShowConfetti(true)
                  setTimeout(() => setShowReward(true), 500)
                  setTimeout(() => {
                    setHasCompletedOnboarding(true)
                    router.push("/")
                  }, 3000)
                }}
              >
                <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Commencer mon parcours
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                className="w-full group"
                onClick={() => {
                  setHasCompletedOnboarding(true)
                  router.push("/medications/add")
                }}
              >
                <Pill className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Ajouter plus de médicaments
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      ),
    },
  ]

  return (
    <div className="container max-w-md py-8">
      {showConfetti && <Confetti count={80} onComplete={() => setShowConfetti(false)} />}
      {showReward && (
        <RewardAnimation points={100} message="Profil complété !" onComplete={() => setShowReward(false)} position="center" />
      )}
      {showCelebration && (
        <RewardAnimation points={25} message={`Badge débloqué : ${achievementUnlocked}`} position="center" />
      )}

      <Card className="overflow-hidden shadow-soft">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{steps[step].title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{steps[step].description}</p>
            </div>
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
            >
              {steps[step].icon}
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-6" ref={contentRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: direction === "right" ? 20 : -20,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: direction === "right" ? -20 : 20,
              }}
              transition={{ duration: 0.3 }}
            >
              {steps[step].content}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="border-t bg-muted/30 p-4 flex flex-col gap-4">
          {showTips && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-3 bg-primary/5 rounded-lg border border-primary/10 relative"
            >
              <div className="absolute right-2 top-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full"
                  onClick={() => setShowTips(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="flex items-start gap-2">
                <Smile className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium mb-1">Conseil</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTip}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-muted-foreground"
                    >
                      {stepTips[step][activeTip]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex justify-center mt-2 gap-1">
                {stepTips[step].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-300",
                      i === activeTip ? "bg-primary w-3" : "bg-primary/30",
                    )}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div className="w-full">
            <ProgressIndicator
              value={step + 1}
              max={steps.length}
              color="primary"
              size="sm"
              showValue
              label={`Étape ${step + 1}/${steps.length}`}
            />
          </div>

          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 0} className="gap-1 group">
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Retour
            </Button>

            <Button onClick={handleNext} disabled={step === steps.length - 1} className="gap-1 group">
              {step === steps.length - 2 ? "Terminer" : "Suivant"}
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
