import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MedicationSideEffects(
  {sideEffects, comments}: { sideEffects: Array<{ name: string; description: string; severity: string; percent: number }>},) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Effets secondaires possibles</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ces informations sont basées sur les données cliniques et les retours des utilisateurs. La fréquence indique
            le pourcentage de patients ayant signalé cet effet.
          </p>

          <div className="space-y-4">
            {sideEffects.map((effect, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{effect.name}</span>
                  <span className="text-sm text-muted-foreground">{effect.percent}%</span>
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
                
                <p className="text-xs text-muted-foreground">{effect.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Expériences communautaires</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Témoignages anonymisés d'autres utilisateurs de ce médicament.
          </p>
          {comments.map((comment, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg mb-2">
              <p className="text-sm italic">{comment.feedback}</p>
              <p className="text-xs text-muted-foreground mt-1">Publié le {comment.date}</p>
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
