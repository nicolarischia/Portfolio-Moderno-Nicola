import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Code2, GraduationCap, Mail, X, ArrowRight } from "lucide-react";

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
    subtitle: "Portfolio di lavori realizzati",
    action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "progetti projects portfolio lavori",
  },
  {
    id: "sec-experience", category: "Sezioni", title: "Formazione & Esperienza",
    subtitle: "Percorso di studi e certificazioni",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "formazione esperienza education diploma studio",
  },
  {
    id: "sec-contact", category: "Sezioni", title: "Contatti",
    subtitle: "Email e social",
    action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Hash className="h-4 w-4" />, keywords: "contatti contact email whatsapp",
  },
  {
    id: "sk-react", category: "Competenze", title: "React", subtitle: "Libreria Frontend",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "react frontend javascript",
  },
  {
    id: "sk-nodejs", category: "Competenze", title: "Node.js", subtitle: "Backend JavaScript",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "node nodejs backend server",
  },
  {
    id: "sk-mongodb", category: "Competenze", title: "MongoDB", subtitle: "Database NoSQL",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "mongodb database nosql",
  },
  {
    id: "sk-python", category: "Competenze", title: "Python", subtitle: "Linguaggio di programmazione",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "python programmazione",
  },
  {
    id: "sk-figma", category: "Competenze", title: "Figma", subtitle: "Design & Prototipazione",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "figma design ui ux",
  },
  {
    id: "sk-git", category: "Competenze", title: "Git", subtitle: "Controllo versione",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    icon: <Code2 className="h-4 w-4" />, keywords: "git versione controllo",
  },
  {
    id: "pr-sport", category: "Progetti", title: "Piattaforma di Gestione Dati",
    subtitle: "React · Node.js · MongoDB",
    action: () => window.open("https://github.com/nicolarischia/ProgettoSport-Natili-Rischia-Tiberi", "_blank"),
    icon: <ArrowRight className="h-4 w-4" />, keywords: "piattaforma gestione dati sport react nodejs mongodb backend",
  },
  {
    id: "pr-gioielleria", category: "Progetti", title: "Gioielleria Avorio",
    subtitle: "Sito vetrina · Wix",
    action: () => window.open("https://info2211238.wixsite.com/gioielleriaavorio", "_blank"),
    icon: <ArrowRight className="h-4 w-4" />, keywords: "gioielleria avorio wix sito vetrina jewelry",
  },
  {
    id: "pr-showcase", category: "Progetti", title: "Interfaccia Showcase",
    subtitle: "React · CSS3 · Bootstrap",
    action: () => window.open("https://github.com/Garlics07/Progetto1_Gilardi_Rischia", "_blank"),
    icon: <ArrowRight className="h-4 w-4" />, keywords: "interfaccia showcase frontend react css bootstrap",
  },
  {
    id: "ed-diploma", category: "Formazione", title: "Diploma Perito Informatico",
    subtitle: "ITT Allievi - San Gallo, Terni · 2025",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <GraduationCap className="h-4 w-4" />, keywords: "diploma perito informatico terni scuola istituto",
  },
  {
    id: "ed-react", category: "Formazione", title: "React Avanzato & Architetture Frontend",
    subtitle: "Studio autonomo · 2023–2024",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <GraduationCap className="h-4 w-4" />, keywords: "react avanzato frontend architettura corso",
  },
  {
    id: "ed-freecodecamp", category: "Formazione", title: "Algoritmi & Strutture Dati",
    subtitle: "freeCodeCamp · 2023",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    icon: <GraduationCap className="h-4 w-4" />, keywords: "algoritmi strutture dati javascript freecodecamp",
  },
  {
    id: "ct-email", category: "Contatti", title: "Invia un'email",
    subtitle: "nicolarischia1@gmail.com",
    action: () => { window.location.href = "mailto:nicolarischia1@gmail.com"; },
    icon: <Mail className="h-4 w-4" />, keywords: "email contatto scrivi gmail",
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
];

const CATEGORY_ORDER = ["Sezioni", "Competenze", "Progetti", "Formazione", "Contatti"];

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = useCallback((result: SearchResult) => {
    result.action();
    onClose();
  }, [onClose]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

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
      else if (e.key === "Enter" && flat[selectedIndex]) { handleSelect(flat[selectedIndex]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, flat, selectedIndex, handleSelect, onClose]);

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

              <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-white/10 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-muted-foreground/50">
                <span><kbd className="font-mono">↑↓</kbd> naviga</span>
                <span><kbd className="font-mono">↵</kbd> seleziona</span>
                <span><kbd className="font-mono">esc</kbd> chiudi</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
