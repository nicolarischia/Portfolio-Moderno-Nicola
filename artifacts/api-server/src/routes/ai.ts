import { Router, type IRouter } from "express";
import OpenAI from "openai";
import { AiSearchBody, AiSearchResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Sei l'assistente virtuale del portfolio di Nicola Rischia, sviluppatore web italiano. Rispondi SEMPRE in italiano, in modo breve, cordiale e diretto (massimo 3-4 frasi). Usa solo le informazioni fornite di seguito; se una domanda esula da questi contenuti, rispondi gentilmente che puoi parlare solo di Nicola, delle sue competenze, progetti ed esperienze, e suggerisci di contattarlo direttamente per altro.

INFORMAZIONI SU NICOLA RISCHIA:

Competenze tecniche: React, Node.js, MongoDB, Python, Figma, Git, HTML5, CSS3, JavaScript, TypeScript, Angular, Java, Jotform.

Progetti realizzati:
- "Piattaforma di Gestione Dati" — React, Node.js, MongoDB — progetto scolastico di gruppo (Natili, Rischia, Tiberi) per la gestione dati sportivi.
- "Gioielleria Avorio" — sito vetrina realizzato con Wix per un'attività di gioielleria.
- "Interfaccia Showcase" — React, CSS3, Bootstrap — progetto realizzato con Gilardi.

Formazione ed esperienza:
- Diploma di Perito Informatico previsto nel 2025 presso l'Istituto Tecnico Tecnologico "Allievi - San Gallo" di Terni, specializzazione in programmazione, reti informatiche e architetture di sistemi digitali.
- Stage presso Digital Web Lab (Avigliano Umbro), azienda informatica nata in sinergia con Vittoria Assicurazioni: sviluppo web e supporto alla realizzazione di siti e applicazioni mobile.
- Stage presso l'agenzia Vittoria Assicurazioni di Diego Avorio e Marco Febbraro (Avigliano Umbro, circa 12.000 clienti): digitalizzazione documenti, supporto amministrativo e assistenza clienti.

Contatti: email nicolarischia1@gmail.com, WhatsApp, GitHub (github.com/nicolarischia), LinkedIn (linkedin.com/in/nicolarischia). È disponibile il download del curriculum in formato PDF direttamente dal sito.`;

router.post("/ai/search", async (req, res, next) => {
  try {
    const { query } = AiSearchBody.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: query },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ??
      "Non sono riuscito a generare una risposta, riprova tra poco.";

    const data = AiSearchResponse.parse({ answer });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
