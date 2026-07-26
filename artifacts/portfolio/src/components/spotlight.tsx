import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Code2, GraduationCap, Mail, X, ArrowRight, FileDown, Sparkles, Loader2, Briefcase } from "lucide-react";

const CV_URL = `${import.meta.env.BASE_URL}cv-nicola-rischia.pdf`;

interface AiTopic {
  match: string[];
  answer: string;
}

const AI_TOPICS: AiTopic[] = [
  {
    match: ["competenz", "skill", "tecnolog", "linguaggi", "stack", "sa fare", "sai fare"],
    answer: "Nicola lavora con HTML5, CSS3, JavaScript, React, Angular e Bootstrap per il frontend; Node.js, PHP, Python, MongoDB e MySQL per il backend. Conosce anche Java (Swing UI), C, Git, Figma, Wix, Cisco Packet Tracer, Jotform e Airtable.",
  },
  {
    match: ["progett", "portfolio", "lavori", "realizzat", "repository", "github"],
    answer: "Tutti i progetti di Nicola sono disponibili su GitHub: github.com/nicolarischia",
  },
  {
    match: ["formazione", "studi", "diploma", "scuola", "istituto", "educazione"],
    answer: "Nicola sta conseguendo il Diploma di Perito Informatico presso l'Istituto Tecnico Tecnologico \"Allievi - San Gallo\" di Terni, con specializzazione in programmazione, reti informatiche e architetture di sistemi digitali. Previsto 2025.",
  },
  {
    match: ["stage", "esperienza", "lavoro", "lavorativ", "azienda", "digital web", "vittoria assicurazion"],
    answer: "Nicola ha svolto due stage nel 2024–2025: uno presso Digital Web Lab (sviluppo web e app mobile per clienti e aziende) e uno presso l'agenzia Vittoria Assicurazioni di Avigliano Umbro (digitalizzazione documenti e assistenza clienti).",
  },
  {
    match: ["contatt", "email", "mail", "whatsapp", "chiam", "raggiung", "assum"],
    answer: "Puoi contattare Nicola via email a nicolarischia1@gmail.com o su WhatsApp. Trovi anche i suoi profili GitHub e LinkedIn nella sezione Contatti.",
  },
  {
    match: ["cv", "curriculum", "resume"],
    answer: "Puoi scaricare il CV di Nicola in formato PDF direttamente da questa ricerca cercando \"Scarica il CV\", oppure dai pulsanti nella sezione Contatti.",
  },
  {
    match: ["chi è", "chi sei", "presenta", "chi è nicola"],
    answer: "Nicola Rischia è uno sviluppatore web italiano specializzato nella creazione di applicazioni moderne, performanti e accessibili, con una forte curiosità per le nuove tecnologie.",
  },
];

const AI_FALLBACK =
  "Posso parlarti delle competenze, dei progetti, della formazione e dei contatti di Nicola. Prova a chiedermi, ad esempio, \"che progetti ha fatto?\" oppure \"come lo contatto?\".";

function simulateAiAnswer(question: string): string {
  const q = question.toLowerCase();
  const topic = AI_TOPICS.find(t => t.match.some(keyword => q.includes(keyword)));
  return topic?.answer ?? AI_FALLBACK;
}

function downloadCV() {
  const link = document.createElement("a");
  link.href = CV_URL;
  link.download = "CV-Nicola-Rischia.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface SearchResult {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  action: () => void;
  icon: React.ReactNode;
  keywords: string;
}

const ALL_RESULTS: SearchResult[] = [
  // ── Sezioni ──────────────────────────────────────────────────────────────
  {
    id: "sec-home", category: "Sezioni", title: "Home",
    subtitle: "Vai all'inizio della pagina",
    action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "home inizio top hero",
  },
  {
    id: "sec-skills", category: "Sezioni", title: "Competenze Tecniche",
    subtitle: "Frontend, Backend, Strumenti",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "competenze skills tecnologie strumenti",
  },
  {
    id: "sec-projects", category: "Sezioni", title: "Progetti",
    subtitle: "Portfolio di lavori su GitHub",
    action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "progetti projects portfolio lavori",
  },
  {
    id: "sec-experience", category: "Sezioni", title: "Formazione & Esperienza",
    subtitle: "Diploma e stage aziendali",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "formazione esperienza education diploma studio stage",
  },
  {
    id: "sec-contact", category: "Sezioni", title: "Contatti",
    subtitle: "Email, WhatsApp e social",
    action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "contatti contact email whatsapp",
  },

  // ── Competenze ────────────────────────────────────────────────────────────
  {
    id: "sk-html", category: "Competenze", title: "HTML5", subtitle: "Markup Frontend",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "html html5 frontend markup",
  },
  {
    id: "sk-css", category: "Competenze", title: "CSS3", subtitle: "Stili Frontend",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "css css3 stili frontend",
  },
  {
    id: "sk-js", category: "Competenze", title: "JavaScript", subtitle: "Linguaggio Web",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "javascript js frontend linguaggio",
  },
  {
    id: "sk-react", category: "Competenze", title: "React", subtitle: "Libreria Frontend",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "react frontend javascript",
  },
  {
    id: "sk-angular", category: "Competenze", title: "Angular", subtitle: "Framework Frontend",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "angular framework frontend typescript",
  },
  {
    id: "sk-bootstrap", category: "Competenze", title: "Bootstrap", subtitle: "Framework CSS",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "bootstrap css framework ui",
  },
  {
    id: "sk-nodejs", category: "Competenze", title: "Node.js", subtitle: "Backend JavaScript",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "node nodejs backend server",
  },
  {
    id: "sk-php", category: "Competenze", title: "PHP", subtitle: "Backend Web",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "php backend server web",
  },
  {
    id: "sk-python", category: "Competenze", title: "Python", subtitle: "Linguaggio di programmazione",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "python programmazione",
  },
  {
    id: "sk-mongodb", category: "Competenze", title: "MongoDB", subtitle: "Database NoSQL",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "mongodb database nosql",
  },
  {
    id: "sk-mysql", category: "Competenze", title: "MySQL", subtitle: "Database Relazionale",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "mysql database sql relazionale",
  },
  {
    id: "sk-java", category: "Competenze", title: "Java (Swing UI)", subtitle: "Programmazione OOP",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "java swing ui oop programmazione",
  },
  {
    id: "sk-c", category: "Competenze", title: "C", subtitle: "Programmazione di sistema",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "c programmazione sistema",
  },
  {
    id: "sk-git", category: "Competenze", title: "Git", subtitle: "Controllo versione",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "git versione controllo",
  },
  {
    id: "sk-figma", category: "Competenze", title: "Figma", subtitle: "Design & Prototipazione",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "figma design ui ux prototipazione",
  },
  {
    id: "sk-wix", category: "Competenze", title: "Wix", subtitle: "Creazione siti web",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "wix sito web cms",
  },
  {
    id: "sk-cisco", category: "Competenze", title: "Cisco Packet Tracer", subtitle: "Simulazione reti",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "cisco packet tracer reti network simulazione",
  },
  {
    id: "sk-jotform", category: "Competenze", title: "Jotform", subtitle: "Creazione moduli",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "jotform form moduli",
  },
  {
    id: "sk-airtable", category: "Competenze", title: "Airtable", subtitle: "Database visuale",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "airtable database tabelle foglio",
  },

  // ── Progetti ──────────────────────────────────────────────────────────────
  {
    id: "pr-github", category: "Progetti", title: "Vedi tutti i repository",
    subtitle: "github.com/nicolarischia",
    action: () => window.open("https://github.com/nicolarischia?tab=repositories", "_blank"),
    icon: <ArrowRight className="h-4 w-4" />, keywords: "progetti repository github codice lavori portfolio",
  },

  // ── Formazione ────────────────────────────────────────────────────────────
  {
    id: "ed-diploma", category: "Formazione", title: "Diploma di Perito Informatico",
    subtitle: "ITT Allievi - San Gallo, Terni · Previsto 2025",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <GraduationCap className="h-4 w-4" />, keywords: "diploma perito informatico terni scuola istituto allievi san gallo formazione",
  },

  // ── Esperienza ────────────────────────────────────────────────────────────
  {
    id: "ex-dwl", category: "Esperienza", title: "Stage — Digital Web Lab",
    subtitle: "Avigliano Umbro · 2024–2025",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Briefcase className="h-4 w-4" />, keywords: "stage digital web lab avigliano umbro sviluppo app mobile sito lavoro esperienza",
  },
  {
    id: "ex-vittoria", category: "Esperienza", title: "Stage — Vittoria Assicurazioni",
    subtitle: "Agenzia Avorio & Febbraro · 2024–2025",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Briefcase className="h-4 w-4" />, keywords: "stage vittoria assicurazioni avorio febbraro avigliano umbro digitalizzazione documenti lavoro esperienza",
  },

  // ── Contatti ──────────────────────────────────────────────────────────────
  {
    id: "ct-email", category: "Contatti", title: "Invia un'email",
    subtitle: "nicolarischia1@gmail.com",
    action: () => { window.location.href = "mailto:nicolarischia1@gmail.com"; },
    icon: <Mail className="h-4 w-4" />, keywords: "email contatto scrivi gmail",
  },
  {
    id: "ct-whatsapp", category: "Contatti", title: "WhatsApp",
    subtitle: "+39 366 407 9323",
    action: () => window.open("https://wa.me/3664079323", "_blank"),
    icon: <Mail className="h-4 w-4" />, keywords: "whatsapp messaggio chat contatto",
  },
  {
    id: "ct-github", category: "Contatti", title: "GitHub",
    subtitle: "github.com/nicolarischia",
    action: () => window.open("https://github.com/nicolarischia", "_blank"),
    icon: <ArrowRight className="h-4 w-4" />, keywords: "github repository codice profilo",
  },
  {
    id: "ct-linkedin", category: "Contatti", title: "LinkedIn",
    subtitle: "linkedin.com/in/nicolarischia",
    action: () => window.open("https://linkedin.com/in/nicolarischia", "_blank"),
    icon: <ArrowRight className="h-4 w-4" />, keywords: "linkedin profilo lavoro",
  },
  {
    id: "ct-cv", category: "Contatti", title: "Scarica il CV",
    subtitle: "Curriculum in formato PDF",
    action: downloadCV,
    icon: <FileDown className="h-4 w-4" />, keywords: "cv curriculum vitae pdf scarica download resume",
  },
];

const CATEGORY_ORDER = ["Sezioni", "Competenze", "Progetti", "Formazione", "Esperienza", "Contatti"];

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aiAnswer, setAiAnswer] = useState<{ question: string; answer: string } | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const aiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = query.trim() === ""
    ? ALL_RESULTS
    : ALL_RESULTS.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
        r.keywords.toLowerCase().includes(query.toLowerCase())
      );

  const grouped = CATEGORY_ORDER.reduce<Record<string, SearchResult[]>>((acc, cat) => {
    const items = filtered.filter(r => r.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const flat = Object.values(grouped).flat();
  const showAskAi = query.trim().length > 2;

  const handleSelect = useCallback((result: SearchResult) => {
    result.action();
    onClose();
  }, [onClose]);

  const handleAskAi = useCallback(() => {
    const question = query.trim();
    if (!question || isAiThinking) return;
    setIsAiThinking(true);
    aiTimeoutRef.current = setTimeout(() => {
      setAiAnswer({ question, answer: simulateAiAnswer(question) });
      setIsAiThinking(false);
    }, 600 + Math.random() * 500);
  }, [query, isAiThinking]);

  useEffect(() => { setSelectedIndex(0); setAiAnswer(null); }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
      setAiAnswer(null);
      setIsAiThinking(false);
      if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => () => {
    if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
  }, []);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, flat.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
      else if (e.key === "Enter" && e.shiftKey && showAskAi) { e.preventDefault(); handleAskAi(); }
      else if (e.key === "Enter" && flat[selectedIndex]) { handleSelect(flat[selectedIndex]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, flat, selectedIndex, handleSelect, onClose, showAskAi, handleAskAi]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-[6%] sm:top-[15%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl px-3 sm:px-4"
          >
            <div className="bg-[#0a0a0a] border border-white/15 rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 border-b border-white/10">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Cerca nel portfolio..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm sm:text-base"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-white/40 hover:text-white/80 transition-colors p-1">
                    <X className="h-4 w-4" />
                  </button>
                )}
                <kbd className="hidden sm:flex items-center px-2 py-1 bg-white/8 border border-white/10 rounded text-xs text-white/40 font-mono">esc</kbd>
              </div>

              <div ref={listRef} className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto py-1 sm:py-2 no-scrollbar">
                {showAskAi && (
                  <div className="px-3 sm:px-4 pb-2 sm:pb-3 pt-1">
                    {!aiAnswer || aiAnswer.question !== query.trim() ? (
                      <button
                        onClick={handleAskAi}
                        disabled={isAiThinking}
                        className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-secondary/10 hover:bg-secondary/15 transition-colors text-left disabled:opacity-70"
                      >
                        {isAiThinking ? (
                          <Loader2 className="h-4 w-4 shrink-0 text-secondary animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 shrink-0 text-secondary" />
                        )}
                        <span className="flex-1 min-w-0 text-xs sm:text-sm font-medium text-secondary truncate">
                          {isAiThinking ? "Sto pensando..." : `Chiedi all'IA: "${query.trim()}"`}
                        </span>
                        {!isAiThinking && <kbd className="hidden sm:inline font-mono text-[10px] text-secondary/60">⇧↵</kbd>}
                      </button>
                    ) : (
                      <div className="px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-secondary/30 bg-secondary/10">
                        <div className="flex items-center gap-2 mb-2 text-secondary">
                          <Sparkles className="h-3.5 w-3.5 shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Risposta AI</span>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{aiAnswer.answer}</p>
                      </div>
                    )}
                  </div>
                )}
                {flat.length === 0 ? (
                  <div className="px-4 py-8 sm:py-10 text-center text-muted-foreground text-sm">
                    Nessun risultato per "{query}"
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        {category}
                      </div>
                      {items.map((item) => {
                        const globalIdx = flat.indexOf(item);
                        const isSelected = selectedIndex === globalIdx;
                        return (
                          <button
                            key={item.id}
                            data-idx={globalIdx}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left transition-colors ${
                              isSelected ? "bg-primary/15 text-primary" : "text-foreground/80 hover:bg-white/5"
                            }`}
                          >
                            <span className={`shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className={`text-xs sm:text-sm font-medium truncate ${isSelected ? "text-primary" : ""}`}>
                                {item.title}
                              </div>
                              {item.subtitle && (
                                <div className="text-[11px] sm:text-xs text-muted-foreground truncate">
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                            {isSelected && <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary/60" />}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-white/10 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-muted-foreground/50 flex-wrap">
                <span><kbd className="font-mono">↑↓</kbd> naviga</span>
                <span><kbd className="font-mono">↵</kbd> seleziona</span>
                {showAskAi && <span><kbd className="font-mono">⇧↵</kbd> chiedi all'IA</span>}
                <span><kbd className="font-mono">esc</kbd> chiudi</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
