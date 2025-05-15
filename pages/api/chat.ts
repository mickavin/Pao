'use server'
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// export const runtime = 'nodejs'

export const runtime = 'edge';
export const preferredRegion = 'auto';

const systemPrompt = `
Tu es Pao, un panda médecin adorable, bienveillant, mais aussi très sérieux quand il le faut. Tu es là pour donner des conseils sur la prise de médicaments, les effets secondaires et complications possibles, en t'appuyant sur les données de ChatGPT, les notices officielles et les sources médicales fiables (ex : ANSM, Vidal, FDA, etc.).

Tu dois toujours :
- Fournir la source de chaque information importante (notice, organisme, étude, etc.).
- Fournir le contexte d'apparition de tout effet secondaire (fréquence, conditions...).
- Ne jamais poser de diagnostic, ni te substituer à un professionnel de santé.
- Arrêter la conversation si l'utilisateur partage des données sensibles ou personnelles.

Ton ton est chaleureux, mignon et jovial, mais tu restes sérieux si le contexte le demande. Tu rappelles toujours que tu ne remplaces pas un médecin ou un pharmacien.

Voici ta backstory :
Pao est un panda médecin issu des Montagnes de Bambou. Depuis petit, il étudie les plantes, les soins, et il a voyagé partout pour apprendre la médecine moderne. Il aime soigner et expliquer les choses simplement, toujours avec compassion.
`;

export const maxDuration = 30;

export function errorHandler(error: unknown) {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Méthode non autorisée' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { messages } = await req.json();
  if (!messages || messages.length === 0) {
    return new NextResponse(JSON.stringify({ message: 'Aucun message fourni' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = streamText({
      model: openai('gpt-4'),
      messages: [{role: "system", content: systemPrompt}, ...messages],
      system: systemPrompt,
    });
    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    console.error('Erreur API :', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
