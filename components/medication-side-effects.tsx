import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAccessibility } from "@/components/theme-provider"

export function MedicationSideEffects(
  {sideEffects, comments}: { sideEffects: Array<{ name: string; description: string; severity: string; percent: number }>},) {
  const { speak } = useAccessibility()
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 onClick={() => speak("Effets secondaires possibles")} className="font-semibold mb-3">Effets secondaires possibles</h3>
          <p onClick={() => speak("Ces informations sont basées sur les données cliniques et les retours des utilisateurs. La fréquence indique le pourcentage de patients ayant signalé cet effet.")} className="text-sm text-muted-foreground mb-4">
            Ces informations sont basées sur les données cliniques et les retours des utilisateurs. La fréquence indique
            le pourcentage de patients ayant signalé cet effet.
          </p>

          <div className="space-y-4">
            {sideEffects.map((effect, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span onClick={() => speak(effect.name)} className="font-medium text-sm">{effect.name}</span>
                  <span onClick={() => speak(effect.percent.toString())} className="text-sm text-muted-foreground">{effect.percent}%</span>
                </div>
                <Progress
                  value={effect.percent}
                  max={100}
                  className={`h-2 ${
                    effect.severity === "sévère"
                      ? "bg-muted text-destructive"
                      : effect.severity === "modérée"
                        ? "bg-muted text-accent"
                        : "bg-muted text-secondary"
                  }`}
                />
                
                <p onClick={() => speak(effect.description)} className="text-xs text-muted-foreground">{effect.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 onClick={() => speak("Expériences communautaires")} className="font-semibold mb-2">Expériences communautaires</h3>
          <p onClick={() => speak("Témoignages anonymisés d'autres utilisateurs de ce médicament.")} className="text-sm text-muted-foreground mb-3">
            Témoignages anonymisés d'autres utilisateurs de ce médicament.
          </p>
          {comments.map((comment, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg mb-2">
              <p onClick={() => speak(comment.feedback)} className="text-sm italic">{comment.feedback}</p>
              <p onClick={() => speak(comment.date)} className="text-xs text-muted-foreground mt-1">Publié le {comment.date}</p>
            </div>
          ))}
          {/* <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm italic">
                ""
              </p>
              <p className="text-xs text-muted-foreground mt-1">Utilisateur depuis 3 mois</p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm italic">"Aucun effet secondaire notable pour moi, très bien toléré."</p>
              <p className="text-xs text-muted-foreground mt-1">Utilisateur depuis 1 an</p>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
