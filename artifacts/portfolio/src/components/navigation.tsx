import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

const GITHUB_REPOS = "https://github.com/nicolarischia?tab=repositories";

const navItems = [
  { name: "Home", href: "#", external: false },
  { name: "Competenze", href: "#skills", external: false },
  { name: "Progetti", href: GITHUB_REPOS, external: true },
  { name: "Formazione", href: "#experience", external: false },
  { name: "Contatti", href: "#contact", external: false },
];

interface NavigationProps {
  onSearchOpen: () => void;
}

export function Navigation({ onSearchOpen }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("Home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.href === "#" ? "home" : item.href.substring(1),
        name: item.name
      }));

      let currentSection = sections[0].name;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) currentSection = section.name;
        }
      }
      if (window.scrollY < 100) currentSection = "Home";
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (item: typeof navItems[0]) => {
    if (item.external) {
      window.open(item.href, "_blank", "noopener noreferrer");
      setMenuOpen(false);
      return;
    }
    const targetId = item.href === "#" ? "home" : item.href.substring(1);
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else if (item.href === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop / tablet pill nav (sm and above) ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden sm:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]"
      >
        <div className="bg-black/80 backdrop-blur-lg border border-white/10 p-1.5 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-2xl shadow-primary/10">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            const isHovered = hoveredSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredSection(item.name)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={(e) => { e.preventDefault(); scrollTo(item); }}
                className={`relative px-3 md:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors z-10 block whitespace-nowrap shrink-0 ${
                  isActive ? "text-black" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="relative z-20">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && isHovered && (
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
            onClick={onSearchOpen}
            title="Cerca (⌘K)"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full text-white/60 hover:text-primary hover:bg-primary/10 transition-all text-xs sm:text-sm shrink-0 group"
          >
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium">Cerca</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono ml-1">⌘K</kbd>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile pill nav (xs only) ── */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sm:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto"
      >
        <div className="bg-black/80 backdrop-blur-lg border border-white/10 px-2 py-1.5 rounded-full flex items-center gap-1 shadow-2xl shadow-primary/10">
          {/* Active section label */}
          <span className="px-3 py-1.5 rounded-full bg-primary text-black text-xs font-semibold whitespace-nowrap">
            {activeSection}
          </span>

          {/* Search icon */}
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-full text-white/60 hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="Cerca"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
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
                const isActive = activeSection === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollTo(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors text-left ${
                      isActive
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
