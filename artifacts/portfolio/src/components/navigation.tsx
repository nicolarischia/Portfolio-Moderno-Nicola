import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Hash, ArrowRight } from "lucide-react";

const CV_URL = `${import.meta.env.BASE_URL}cv-nicola-rischia.pdf`;
const GITHUB_REPOS = "https://github.com/nicolarischia?tab=repositories";

const navItems = [
  { name: "Home",       href: "/",           external: false },
  { name: "Competenze", href: "/competenze",  external: false },
  { name: "Progetti",   href: "/progetti",    external: false },
  { name: "Formazione", href: "/formazione",  external: false },
  { name: "Servizi",    href: "/servizi",     external: false },
  { name: "Contatti",   href: "/contatti",    external: false },
];

interface NavResult {
  id: string;
  title: string;
  subtitle: string;
  keywords: string;
  route?: string;
  url?: string;
  download?: boolean;
}

const NAV_RESULTS: NavResult[] = [
  { id: "home",       title: "Home",                   subtitle: "Pagina iniziale",               route: "/",           keywords: "home inizio hero" },
  { id: "comp",       title: "Competenze",              subtitle: "Frontend, Backend, AI",         route: "/competenze", keywords: "competenze skills tecnologie react angular node python figma" },
  { id: "form",       title: "Formazione & Esperienza", subtitle: "Diploma e stage aziendali",    route: "/formazione", keywords: "formazione esperienza diploma stage digital web vittoria assicurazioni" },
  { id: "serv",       title: "Servizi",                 subtitle: "I servizi offerti",             route: "/servizi",    keywords: "servizi offerta cosa fai" },
  { id: "cont",       title: "Contatti",                subtitle: "Email, WhatsApp e social",     route: "/contatti",   keywords: "contatti email whatsapp github linkedin" },
  { id: "progetti",   title: "Progetti",                  subtitle: "Repository e lavori",           route: "/progetti",  keywords: "progetti lavori portfolio" },
  { id: "github",     title: "GitHub — tutti i repository", subtitle: "github.com/nicolarischia",  url: GITHUB_REPOS,   keywords: "github repository codice" },
  { id: "email",      title: "Invia un'email",          subtitle: "nicolarischia1@gmail.com",     url: "mailto:nicolarischia1@gmail.com", keywords: "email contatto scrivi gmail" },
  { id: "whatsapp",   title: "WhatsApp",                subtitle: "+39 366 407 9323",             url: "https://wa.me/3664079323", keywords: "whatsapp messaggio chat" },
  { id: "linkedin",   title: "LinkedIn",                subtitle: "linkedin.com/in/nicolarischia", url: "https://linkedin.com/in/nicolarischia", keywords: "linkedin profilo lavoro" },
  { id: "cv",         title: "Scarica il CV",           subtitle: "Curriculum in formato PDF",    download: true,      keywords: "cv curriculum vitae pdf scarica download resume" },
  { id: "react",      title: "React",                   subtitle: "Competenza Frontend",           route: "/competenze", keywords: "react javascript frontend" },
  { id: "nodejs",     title: "Node.js",                 subtitle: "Competenza Backend",            route: "/competenze", keywords: "nodejs backend server" },
  { id: "python",     title: "Python",                  subtitle: "Competenza Backend",            route: "/competenze", keywords: "python programmazione" },
  { id: "mongodb",    title: "MongoDB",                 subtitle: "Competenza Backend",            route: "/competenze", keywords: "mongodb database nosql" },
  { id: "php",        title: "PHP",                     subtitle: "Competenza Backend",            route: "/competenze", keywords: "php backend" },
  { id: "mysql",      title: "MySQL",                   subtitle: "Competenza Backend",            route: "/competenze", keywords: "mysql database sql" },
  { id: "phpmyadmin", title: "phpMyAdmin",              subtitle: "Gestione Database",             route: "/competenze", keywords: "phpmyadmin database" },
  { id: "angular",    title: "Angular",                 subtitle: "Competenza Frontend",           route: "/competenze", keywords: "angular framework frontend" },
  { id: "chatgpt",    title: "ChatGPT",                 subtitle: "AI & Machine Learning",         route: "/competenze", keywords: "chatgpt openai ai intelligenza artificiale" },
  { id: "claude",     title: "Claude",                  subtitle: "AI & Machine Learning",         route: "/competenze", keywords: "claude anthropic ai" },
  { id: "gemini",     title: "Gemini",                  subtitle: "AI & Machine Learning",         route: "/competenze", keywords: "gemini google ai" },
  { id: "ml",         title: "Machine Learning",        subtitle: "AI & Machine Learning",         route: "/competenze", keywords: "machine learning ml ai" },
  { id: "figma",      title: "Figma",                   subtitle: "Design & Prototipazione",       route: "/competenze", keywords: "figma design ui ux" },
  { id: "git",        title: "Git",                     subtitle: "Controllo versione",            route: "/competenze", keywords: "git versione controllo" },
  { id: "lovable",    title: "Lovable.dev",             subtitle: "Strumenti & Piattaforme",       route: "/competenze", keywords: "lovable dev piattaforma ai sviluppo" },
  { id: "bolt",       title: "Bolt.new",                subtitle: "Strumenti & Piattaforme",       route: "/competenze", keywords: "bolt new piattaforma ai" },
  { id: "base44",     title: "Base44.com",              subtitle: "Strumenti & Piattaforme",       route: "/competenze", keywords: "base44 piattaforma ai" },
  { id: "cpp",        title: "C++",                     subtitle: "Programmazione",                route: "/competenze", keywords: "c++ cpp programmazione oop" },
  { id: "csharp",     title: "C#",                      subtitle: "Programmazione .NET",           route: "/competenze", keywords: "c# csharp dotnet programmazione" },
  { id: "diploma",    title: "Diploma Perito Informatico", subtitle: "ITT Allievi - San Gallo, Terni", route: "/formazione", keywords: "diploma perito informatico terni scuola" },
  { id: "dwl",        title: "Stage — Digital Web Lab", subtitle: "Avigliano Umbro · 2024–2025",  route: "/formazione", keywords: "stage digital web lab sviluppo" },
  { id: "vittoria",   title: "Stage — Vittoria Assicurazioni", subtitle: "2024–2025",             route: "/formazione", keywords: "stage vittoria assicurazioni agenzia" },
];

interface NavigationProps {
  onSearchOpen: () => void;
}

export function Navigation({ onSearchOpen }: NavigationProps) {
  const [location, navigate] = useLocation();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (item: typeof navItems[0]) => {
    if (item.external) return false;
    if (item.href === "/") return location === "/" || location === "";
    return location === item.href || location.startsWith(item.href + "/");
  };

  const results = useMemo<NavResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return NAV_RESULTS.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.subtitle.toLowerCase().includes(q) ||
      r.keywords.toLowerCase().includes(q)
    ).slice(0, 7);
  }, [query]);

  const openSearch = () => {
    setSearchMode(true);
    setQuery("");
    setSelectedIdx(0);
    setTimeout(() => searchInputRef.current?.focus(), 120);
  };

  const closeSearch = () => {
    setSearchMode(false);
    setQuery("");
    setSelectedIdx(0);
  };

  const executeResult = (r: NavResult) => {
    if (r.download) {
      const a = document.createElement("a");
      a.href = CV_URL;
      a.download = "CV-Nicola-Rischia.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (r.url) {
      if (r.url.startsWith("mailto:")) {
        window.location.href = r.url;
      } else {
        window.open(r.url, "_blank", "noopener noreferrer");
      }
    } else if (r.route) {
      navigate(r.route);
    }
    closeSearch();
  };

  const handleClick = (item: typeof navItems[0]) => {
    if (item.external) {
      window.open(item.href, "_blank", "noopener noreferrer");
    } else {
      navigate(item.href);
    }
    setMenuOpen(false);
  };

  // Keyboard navigation for search
  useEffect(() => {
    if (!searchMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeSearch(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, results.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
      else if (e.key === "Enter" && results[selectedIdx]) { executeResult(results[selectedIdx]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchMode, results, selectedIdx]);

  // Reset selected index when results change
  useEffect(() => { setSelectedIdx(0); }, [query]);

  // Close search on outside click
  useEffect(() => {
    if (!searchMode) return;
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById("nav-pill");
      const drop = dropdownRef.current;
      if (nav && !nav.contains(e.target as Node) && drop && !drop.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchMode]);

  return (
    <>
      {/* ── Desktop / tablet pill nav ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden sm:flex flex-col items-center fixed top-6 left-1/2 -translate-x-1/2 z-50"
        style={{ maxWidth: "95vw" }}
      >
        {/* Pill — fixed width, never resizes */}
        <div
          id="nav-pill"
          className="relative bg-black/80 backdrop-blur-lg border border-white/10 p-1.5 rounded-full shadow-2xl shadow-primary/10 overflow-hidden"
        >
          {/* ── NAV ITEMS — always in DOM to hold the width ── */}
          <div
            className={`flex items-center gap-0.5 sm:gap-1 transition-opacity duration-200 ${
              searchMode ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {navItems.map((item) => {
              const active = isActive(item);
              const hovered = hoveredSection === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredSection(item.name)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={(e) => { e.preventDefault(); handleClick(item); }}
                  className={`relative px-3 md:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors z-10 block whitespace-nowrap shrink-0 ${
                    active ? "text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="relative z-20">{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {!active && hovered && (
                    <motion.div
                      layoutId="hover-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            <div className="w-px h-5 bg-white/15 mx-0.5 shrink-0" />

            <button
              onClick={openSearch}
              title="Cerca (⌘K)"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full text-white/60 hover:text-primary hover:bg-primary/10 transition-all text-xs sm:text-sm shrink-0 group"
            >
              <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Cerca</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono ml-1">⌘K</kbd>
            </button>
          </div>

          {/* ── SEARCH — absolutely overlaid, same bounding box ── */}
          <AnimatePresence>
            {searchMode && (
              <motion.div
                key="search"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center gap-2 px-3"
              >
                <Search className="h-4 w-4 text-primary shrink-0" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Cerca nel portfolio..."
                  className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-white/40 outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-white/40 hover:text-white/80 transition-colors p-1 shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={closeSearch}
                  className="px-2.5 py-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all text-xs font-mono shrink-0"
                >
                  esc
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Results dropdown ── */}
        <AnimatePresence>
          {searchMode && results.length > 0 && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="mt-2 w-80 bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
            >
              {results.map((r, i) => {
                const isSelected = selectedIdx === i;
                return (
                  <button
                    key={r.id}
                    onClick={() => executeResult(r)}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isSelected ? "bg-primary/15" : "hover:bg-white/5"
                    }`}
                  >
                    <span className={`shrink-0 ${isSelected ? "text-primary" : "text-white/40"}`}>
                      {r.route ? <Hash className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${isSelected ? "text-primary" : "text-white/90"}`}>
                        {r.title}
                      </div>
                      <div className="text-xs text-white/40 truncate">{r.subtitle}</div>
                    </div>
                    {isSelected && <ArrowRight className="h-3.5 w-3.5 text-primary/60 shrink-0" />}
                  </button>
                );
              })}
              <div className="px-4 py-2 border-t border-white/10 flex items-center gap-3 text-[10px] text-white/30 font-mono">
                <span>↑↓ naviga</span>
                <span>↵ seleziona</span>
                <span>esc chiudi</span>
              </div>
            </motion.div>
          )}

          {searchMode && query.trim() && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="mt-2 w-72 bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl px-4 py-4 text-center text-sm text-white/40"
            >
              Nessun risultato per "{query}"
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile pill nav ── */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sm:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto"
      >
        <div className="bg-black/80 backdrop-blur-lg border border-white/10 px-2 py-1.5 rounded-full flex items-center gap-1 shadow-2xl shadow-primary/10">
          <span className="px-3 py-1.5 rounded-full bg-primary text-black text-xs font-semibold whitespace-nowrap">
            {navItems.find(isActive)?.name ?? "Home"}
          </span>

          <button
            onClick={openSearch}
            className="p-2 rounded-full text-white/60 hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="Cerca"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* ── Mobile search overlay ── */}
      <AnimatePresence>
        {searchMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center pt-16 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full bg-black/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <Search className="h-4 w-4 text-primary shrink-0" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Cerca nel portfolio..."
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-white/40 outline-none"
                />
                <button onClick={closeSearch} className="text-white/40 hover:text-white p-1">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {results.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => executeResult(r)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                    i === selectedIdx ? "bg-primary/15" : "hover:bg-white/5"
                  }`}
                >
                  <span className="text-white/40 shrink-0">
                    {r.route ? <Hash className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white/90 truncate">{r.title}</div>
                    <div className="text-xs text-white/40 truncate">{r.subtitle}</div>
                  </div>
                </button>
              ))}
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-white/40">
                  Nessun risultato per "{query}"
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && !searchMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sm:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="sm:hidden fixed top-16 left-1/2 -translate-x-1/2 z-50 w-52 bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
            >
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors text-left ${
                      active
                        ? "bg-primary/20 text-primary border-l-2 border-primary"
                        : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
