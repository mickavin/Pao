'use server'

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "ID du médicament manquant." });

  const notice_url = `https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${id}&typedoc=N`;
  const produit_url = `https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${id}&typedoc=R`;
  const info_url = `https://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=${id}`;

  try {
    
    const noticeResponse = await axios.get(notice_url).catch((err) => {
      console.error(`Error fetching notice: ${err.message}`);
      return { data: null };
    });
    const produitResponse = await axios.get(produit_url).catch((err) => {
      console.error(`Error fetching produit: ${err.message}`);
      return { data: null };
    });
    const infoResponse = await axios.get(info_url).catch((err) => {
      console.error(`Error fetching info: ${err.message}`);
      return { data: null };
    });

    const $notice = noticeResponse.data ? cheerio.load(noticeResponse.data, { decodeEntities: false }) : null;
    const $produit = produitResponse.data ? cheerio.load(produitResponse.data, { decodeEntities: false }) : null;
    const $info = infoResponse.data ? cheerio.load(infoResponse.data, { decodeEntities: false }) : null;

    const content: { type: string; text: string }[] = [];

    if ($notice) {
      $notice("h1, h2, h3, p").each((_, el) => {
        const tag = el.tagName;
        const text = $notice(el).text().trim();
        content.push({ type: tag.startsWith("h") ? "heading" : "paragraph", text });
      });
    }

    if ($produit) {
      $produit("h1, h2, h3, p").each((_, el) => {
        const tag = el.tagName;
        const text = $produit(el).text().trim();
        content.push({ type: tag.startsWith("h") ? "heading" : "paragraph", text });
      });
    }

    if ($info) {
      $info("h1, h2, h3, p").each((_, el) => {
        const tag = el.tagName;
        const text = $info(el).text().trim();
        content.push({ type: tag.startsWith("h") ? "heading" : "paragraph", text });
      });
    }

    const filePath = path.join(process.cwd(), "public", `notice-${id}.json`);
    const filePath_produit = path.join(process.cwd(), "public", `produit-${id}.json`);
    const filePath_info = path.join(process.cwd(), "public", `info-${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    fs.writeFileSync(filePath_produit, JSON.stringify(content, null, 2));
    fs.writeFileSync(filePath_info, JSON.stringify(content, null, 2));

    res.status(200).json({
      message: `✅ Données pour l’ID ${id} extraites avec succès.`,
      file: `/notice-${id}.json`,
      file_produit: `/produit-${id}.json`,
      file_info: `/info-${id}.json`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur pendant le scraping" });
  }
}
