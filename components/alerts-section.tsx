import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Info } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "interaction",
    title: "Interaction médicamenteuse",
    description: "Doliprane et Ibuprofène peuvent interagir. Espacez les prises de 4h minimum.",
    severity: "medium",
  },
  {
    id: 2,
    type: "sideEffect",
    title: "Effet secondaire possible",
    description: "Levothyrox peut causer de la fatigue pendant les premières semaines.",
    severity: "low",
  },
]

export function AlertsSection() {
  if (alerts.length === 0) return null

  return (
    <Card className="border-accent/30 bg-accent/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-accent" />
          <h3 className="font-semibold">Alertes et informations</h3>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${
                alert.severity === "high"
                  ? "border-destructive/30 bg-destructive/5"
                  : alert.severity === "medium"
                    ? "border-accent/30 bg-accent/5"
                    : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`mt-0.5 ${
                    alert.severity === "high"
                      ? "text-destructive"
                      : alert.severity === "medium"
                        ? "text-accent"
                        : "text-primary"
                  }`}
                >
                  {alert.type === "interaction" ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
