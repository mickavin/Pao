import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingDown, TrendingUp, Info, ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const correlations = [
  {
    id: 1,
    type: "medication",
    title: "Levothyrox et fatigue",
    description: "Votre niveau d'énergie a diminué de 30% les jours où vous n'avez pas pris votre Levothyrox.",
    severity: "high",
    trend: "negative",
    confidence: 85,
    validated: null,
    source: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6571270/",
  },
  {
    id: 2,
    type: "symptom",
    title: "Douleur et sommeil",
    description: "Les jours où votre douleur est supérieure à 3/5, votre sommeil diminue en moyenne de 2 heures.",
    severity: "medium",
    trend: "negative",
    confidence: 78,
    validated: true,
    source: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4046588/",
  },
  {
    id: 3,
    type: "dosage",
    title: "Doliprane et douleur",
    description:
      "La réduction de la dose de Doliprane le 22/04 a été suivie d'une augmentation de la douleur 2 jours plus tard.",
    severity: "medium",
    trend: "negative",
    confidence: 72,
    validated: false,
    source: null,
  },
  {
    id: 4,
    type: "lifestyle",
    title: "Sommeil et humeur",
    description: "Les jours où vous dormez plus de 8 heures, votre humeur s'améliore de 25% en moyenne.",
    severity: "low",
    trend: "positive",
    confidence: 68,
    validated: true,
    source: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6361823/",
  },
]

export function CorrelationAnalysis() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Corrélations détectées</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Notre système d'analyse a identifié ces corrélations potentielles entre vos médicaments, symptômes et
            habitudes. Ces informations sont à titre indicatif et ne remplacent pas l'avis médical.
          </p>

          <div className="space-y-4">
            {correlations.map((correlation) => (
              <div
                key={correlation.id}
                className={`p-4 rounded-lg border ${
                  correlation.severity === "high"
                    ? "border-destructive/30 bg-destructive/5"
                    : correlation.severity === "medium"
                      ? "border-accent/30 bg-accent/5"
                      : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 ${
                      correlation.severity === "high"
                        ? "text-destructive"
                        : correlation.severity === "medium"
                          ? "text-accent"
                          : "text-primary"
                    }`}
                  >
                    {correlation.severity === "high" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : correlation.trend === "negative" ? (
                      <TrendingDown className="h-5 w-5" />
                    ) : (
                      <TrendingUp className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{correlation.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          correlation.confidence > 80
                            ? "border-secondary/50 text-secondary"
                            : correlation.confidence > 70
                              ? "border-primary/50 text-primary"
                              : "border-muted-foreground/50 text-muted-foreground"
                        }`}
                      >
                        Confiance: {correlation.confidence}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{correlation.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs mr-2">
                          {correlation.type === "medication"
                            ? "Médicament"
                            : correlation.type === "symptom"
                              ? "Symptôme"
                              : correlation.type === "dosage"
                                ? "Dosage"
                                : "Mode de vie"}
                        </Badge>

                        {correlation.type === "medication" && (
                          <span className="flex items-center">
                            Oubli de médicament <ArrowRight className="h-3 w-3 mx-1" /> Impact sur symptômes
                          </span>
                        )}

                        {correlation.type === "symptom" && (
                          <span className="flex items-center">
                            Évolution de symptôme <ArrowRight className="h-3 w-3 mx-1" /> Impact sur bien-être
                          </span>
                        )}

                        {correlation.type === "dosage" && (
                          <span className="flex items-center">
                            Changement de dosage <ArrowRight className="h-3 w-3 mx-1" /> Impact sur symptômes
                          </span>
                        )}

                        {correlation.type === "lifestyle" && (
                          <span className="flex items-center">
                            Habitude quotidienne <ArrowRight className="h-3 w-3 mx-1" /> Impact sur bien-être
                          </span>
                        )}
                      </div>

                      {correlation.validated === null ? (
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 px-2">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span className="text-xs">Confirmer</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 px-2">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            <span className="text-xs">Rejeter</span>
                          </Button>
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className={`text-xs ${correlation.validated ? "border-secondary/50 text-secondary" : "border-destructive/50 text-destructive"}`}
                        >
                          {correlation.validated ? "Confirmé par vous" : "Rejeté par vous"}
                        </Badge>
                      )}
                    </div>

                    {correlation.source && (
                      <div className="mt-2 text-xs text-primary">
                        <a href={correlation.source} target="_blank" rel="noopener noreferrer" className="underline">
                          Voir l'étude scientifique associée
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">À propos des corrélations</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Les corrélations identifiées sont basées sur l'analyse de vos données de santé et de médicaments. Une
            corrélation n'implique pas nécessairement une relation de cause à effet.
          </p>
          <p className="text-sm text-muted-foreground">
            Consultez votre médecin ou pharmacien avant de modifier votre traitement sur la base de ces informations.
          </p>
          <div className="mt-3 p-3 bg-primary/5 rounded-lg">
            <h4 className="text-sm font-medium">Validation des corrélations</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Votre retour sur les corrélations détectées nous aide à améliorer la précision de nos analyses. Merci de
              confirmer ou rejeter les corrélations proposées.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
