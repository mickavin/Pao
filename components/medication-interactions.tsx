import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info } from "lucide-react"
import { useAccessibility } from "@/components/theme-provider"

export function MedicationInteractions({ interactions }: { interactions: Array<{ name: string; description: string; severity: string }> }) {
  const { speak } = useAccessibility()
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 onClick={() => speak("Interactions médicamenteuses")} className="font-semibold mb-3">Interactions médicamenteuses</h3>
          <p onClick={() => speak("Ces informations indiquent les interactions possibles avec d'autres médicaments ou substances. Consultez votre médecin ou pharmacien avant de combiner des traitements.")} className="text-sm text-muted-foreground mb-4">
            Ces informations indiquent les interactions possibles avec d'autres médicaments ou substances. Consultez
            votre médecin ou pharmacien avant de combiner des traitements.
          </p>

          <div className="space-y-3">
            {interactions.map((interaction, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  interaction.severity === "sévère"
                    ? "border-destructive/30 bg-destructive/5"
                    : interaction.severity === "modérée"
                      ? "border-accent/30 bg-accent/5"
                      : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`mt-0.5 ${
                      interaction.severity === "sévère"
                        ? "text-destructive"
                        : interaction.severity === "modérée"
                          ? "text-accent"
                          : "text-primary"
                    }`}
                  >
                    {interaction.severity === "sévère" && typeof window != 'undefined' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : typeof window != 'undefined' ? (
                      <Info className="h-4 w-4" />
                    ): null}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p onClick={() => speak(interaction.name)} className="font-medium text-sm">{interaction.name}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          interaction.severity === "sévère"
                            ? "border-destructive/50 text-destructive"
                            : interaction.severity === "modérée"
                              ? "border-accent/50 text-accent"
                              : "border-primary/50 text-primary"
                        }`}
                      >
                        {interaction.severity === "sévère"
                          ? "Sévère"
                          : interaction.severity === "modérée"
                            ? "Modérée"
                            : "Légère"}
                      </Badge>
                    </div>
                    <p onClick={() => speak(interaction.description)} className="text-sm text-muted-foreground">{interaction.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
