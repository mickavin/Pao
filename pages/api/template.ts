'use server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import tempSchema from '@/utils/ai/template';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';

const openai = new OpenAI();


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const id = JSON.parse(req.body).id as string || null;
  if (id) {
    const content1 = await cheerio.fromURL(`https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${id}&typedoc=N`);
    const content2 = await cheerio.fromURL(`https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${id}&typedoc=R`);
    const content3 = await cheerio.fromURL(`https://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=${id}`);
    const text1 = content1('#textDocument')?.text();
    const text2 = content2('#textDocument')?.text();
    const text3 = content3('#contentPrincipal')?.text();
    const response = await openai.responses.parse({
      model: "gpt-4.1-nano",
      input: [
        {
          role: "system",
          content:
            "You are an expert at structured data extraction. You will be given unstructured text from a research paper and should convert it into the given structure. Si les informations ne sont pas présentes, cherche le dans des ressources de ton choix avec le spe id du médicament suivant " + id,
        },
        { role: "user", content: `${text1 ? text1 : ''} \n ${text2 ? text2 : ''} \n ${text3 ? text3 : ''}` },
      ],
      text: {
        format: zodTextFormat(tempSchema, "research_paper_extraction"),
      },
    });

    res.status(200).json(response);
  }
  else {
    res.status(200).json({ message: 'ID is required' });
  }
}

