import { z } from 'zod';

export default z.object({
    medication:
    z.object({
    name: z.string().describe('Nom du médicament (ex: "Doliprane").'),
    dosage: z.string().describe('Dosage du médicament (ex: "1000mg").'),
    type: z.string().describe('Type de médicament (ex: "Antalgique").'),
    action: z.string().describe('Action du médicament (ex: "Soulage la douleur").'),
    usage: z.string().describe('Utilisation du médicament (ex: "Traitement symptomatique des douleurs d\'intensité légère à modérée et/ou des états fébriles.").'),
    form: z.string().describe('Forme du médicament (ex: "Comprimé").'),
    route: z.string().describe('Voie d\'administration du médicament (ex: "Orale").'),
    duration: z.string().describe('Durée d\'action du médicament (ex: "6 heures").'),
    frequency: z.string().describe('Fréquence d\'administration du médicament (ex: "Toutes les 6 heures").'),
    time: z.string().describe('Moment de prise du médicament (ex: "Après le repas").'),
    precautions: z.string().describe('Précautions d\'emploi du médicament (ex: "Ne pas prendre avec de l\'alcool").'),
    principe_actif: z.string().describe('Principe actif du médicament (ex: "Paracétamol").'),
    manufacturer: z.string().describe('Fabricant du médicament (ex: "Sanofi").'),
    url: z.string().describe('URL de la notice du médicament (ex: "https://www.vidal.fr/medicaments/doliprane-1000mg-comprime-1000mg-vidal.html").'),
    image: z.string().describe('URL de l\'image du médicament (ex: "https://www.vidal.fr/medicaments/doliprane-1000mg-comprime-1000mg-vidal.html").'),
    composition: z.string().describe('Composition du médicament (ex: "Paracétamol").'),
    description: z.string().describe('Description relativement détaillé du médicament (ex: "Le Doliprane est un médicament utilisé pour soulager la douleur et réduire la fièvre").'),
    side_effects: z.array(z.string()).describe('Liste des effets secondaires possibles (ex: "Nausées, vertiges").'),
    utilisation: z.string().describe('Utilisation du médicament (ex: "Prendre un comprimé toutes les 6 heures").'),
    recommandation: z.string().describe('Recommandation d\'utilisation (ex: "Ne pas dépasser 3g par jour").'),
    max_dosage: z.string().describe('Dosage maximum du médicament (ex: "3g par jour").'),
    interactions: z.array(z.string()).describe('Liste des médicaments avec lesquels il ne faut pas prendre ce médicament (ex: "Ne pas prendre avec de l\'alcool").'),
    other_interactions: z.array(z.object({
        name: z.string().describe('Nom de l\'autre médicaments.'),
        description: z.string().describe('Description relativement détaillé de l\'interaction (ex: "La consommation de ses deux médicaments peut causer des vertiges").'),
        recommandation: z.string().describe('Recommandation de l\'interaction (ex: "Évitez de prendre ces deux médicaments sur le même créneau").'),
        severity: z.enum(['légere', 'modérée', 'sévère']).describe('Sévérité de l\'interaction (ex: "modérée").'),
    })),
    contre_indic: z.array(z.object({
        name: z.string().describe('Intitulé de la contre indication.'),
        description: z.string().describe('Description relativement détaillé de la contre indication (ex: "Ne convient pas aux femmes enceintes").'),
        recommandation: z.string().describe('Recommandation de l\'interaction (ex: "Évitez de prendre ce médicament après consommation d\'alcool").'),
        severity: z.enum(['légere', 'modérée', 'sévère']).describe('Sévérité de la contre indication (ex: "modérée").'),
    })),
    minutesAgo: z.number(),
    secondary_effects: z.array(z.object({
        name: z.string().describe('Nom de l\'effet secondaire (ex: "Nausées").'),
        description: z.string().describe('Description relativement détaillé de l\'effet secondaire (ex: "Les nausées sont un effet secondaire courant du Doliprane").'),
        recommandation: z.string().describe('Recommandation de l\'effet secondaire (ex: "Si vous ressentez des nausées, consultez votre médecin").'),
        severity: z.enum(['légere', 'modérée', 'sévère']).describe('Sévérité de l\'effet secondaire (ex: "modérée").'),
        percent: z.number().describe('Pourcentage de chance d\'avoir cet effet secondaire (ex: "10%").'),
    })),
    feedback: z.array(z.object({
        feedback: z.string().describe('Retour d\'expérience utilisateur réelle ou mocké (ex: "J\'ai ressenti des nausées après avoir pris ce médicament").'),
        date: z.string().describe('Date du retour d\'expérience utilisateur (ex: "2023-10-01").'),
    }))
        
    })
})