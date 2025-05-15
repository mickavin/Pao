import { MedicationTemplateForm } from "@/components/medication-template-form"

// In a real app, this would fetch from an API or database
const getMedicationTemplate = async (id: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data for demonstration
  const templates = {
    "1": {
      id: 1,
      name: "Levothyrox",
      dosage: "100µg",
      form: "Comprimé",
      activeIngredient: "Lévothyroxine sodique",
      manufacturer: "Merck",
      description: "Hormone thyroïdienne de synthèse utilisée pour traiter l'hypothyroïdie.",
      frequency: "1x par jour",
      instructions: "À prendre le matin à jeun, 30 minutes avant le petit-déjeuner.",
      warnings: [
        "Ne pas modifier la posologie sans avis médical.",
        "Informer votre médecin en cas de symptômes cardiaques.",
        "Interactions possibles avec d'autres médicaments.",
      ],
    },
    "2": {
      id: 2,
      name: "Doliprane",
      dosage: "1000mg",
      form: "Comprimé",
      activeIngredient: "Paracétamol",
      manufacturer: "Sanofi",
      description: "Analgésique et antipyrétique utilisé pour soulager la douleur et réduire la fièvre.",
      frequency: "3x par jour",
      instructions: "À prendre pendant ou après les repas. Ne pas dépasser 3g par jour.",
      warnings: [
        "Ne pas dépasser la dose prescrite.",
        "Risque de toxicité hépatique en cas de surdosage.",
        "Éviter l'alcool pendant le traitement.",
      ],
    },
    "3": {
      id: 3,
      name: "Ventoline",
      dosage: "100µg/dose",
      form: "Aérosol",
      activeIngredient: "Salbutamol",
      manufacturer: "GlaxoSmithKline",
      description: "Bronchodilatateur utilisé pour traiter l'asthme et d'autres affections respiratoires.",
      frequency: "Si besoin",
      instructions: "1 à 2 inhalations en cas de crise. Ne pas dépasser 8 inhalations par jour.",
      warnings: [
        "Consulter un médecin si les symptômes ne s'améliorent pas.",
        "Peut provoquer des tremblements et une accélération du rythme cardiaque.",
        "Informer votre médecin si vous utilisez fréquemment ce médicament.",
      ],
    },
  }

  return templates[id as keyof typeof templates] || templates["1"]
}

export default async function AddMedicationFromTemplatePage({ params }: { params: { id: string } }) {
  const template = await getMedicationTemplate(params.id)

  return (
    <div className="container max-w-3xl py-6">
      <h1 className="text-2xl font-bold mb-6">Ajouter un médicament</h1>
      <MedicationTemplateForm template={template} />
    </div>
  )
}
