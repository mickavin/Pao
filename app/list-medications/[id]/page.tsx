// Cette fonction est nécessaire pour l'export statique
export async function generateStaticParams() {
  // Remplacez cette liste par vos propres IDs de médicaments
  // Par exemple, récupérez ces IDs depuis une API ou une base de données
  const ids = ['1', '2', '3'];

  return ids.map((id) => ({
    id,
  }));
}

// Composant principal de la page, sans 'use client'
export default function MedicationDetailPage({ params }: { params: { id: string } }) {
  // Données statiques ou récupérées côté serveur
  const medication = {
    id: params.id,
    name: `Médicament ${params.id}`,
    dosage: "500mg",
    frequency: "1 fois par jour"
  };

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Détails du médicament</h1>
        {/* Bouton de retour ou autres éléments interactifs peuvent être déplacés dans un composant client */}
      </div>
      <div className="p-4 border rounded-md space-y-2">
        <h2 className="text-lg font-medium">{medication.name}</h2>
        <p className="text-sm text-muted-foreground">Dosage: {medication.dosage}</p>
        <p className="text-sm text-muted-foreground">Fréquence: {medication.frequency}</p>
      </div>
    </div>
  );
} 