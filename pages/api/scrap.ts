import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Scrapes text content from a given URL.
 * @param url - The URL to scrape content from.
 * @returns The scraped text content as a string.
 */
async function scrapeTextContentFromUrl(url: string): Promise<string | null> {
  try {
    // Fetch the HTML content of the page
    const { data: html } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Extract the main content (adjust selectors as needed)
    const content = $('body').text(); // Example: Extract all text from the body

    // Clean up the text (remove excessive whitespace)
    const cleanedContent = content.replace(/\s+/g, ' ').trim();

    return cleanedContent || null;
  } catch (error) {
    console.error('Error scraping URL:', error);
    return null;
  }
}

const urlMap = {
  '1': 'https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=61266250&typedoc=N',
  '2': 'https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=61266250&typedoc=R',
  // Ajoute ici tes URL libres de droit
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const rawContent = await scrapeTextContentFromUrl('https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=61266250&typedoc=N');

    if (!rawContent) {
      return NextResponse.json({ error: 'Failed to scrape content.' }, { status: 500 });
    }

    // Définir ce que l'on veut extraire avec l'IA
    const { textStream } = streamText({
      model: openai('gpt-4'),
      prompt: `
You are a professional web content structurer.

Take the following scraped content from a healthcare page and:
- Extract a main headline.
- List 3 to 5 feature highlights (bullet points).
- Write a short value proposition paragraph (max 100 words).
- Write a professional Call-To-Action (CTA).

Format the output as clean JSON only.

Scraped content:
${rawContent}
      `,
    });

    // Streamer proprement la réponse JSON
    return new Response(textStream, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error generating page:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
