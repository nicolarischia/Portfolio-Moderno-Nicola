import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const navItems = [
  { name: "Home", href: "#" },
  { name: "Competenze", href: "#skills" },
  { name: "Progetti", href: "#projects" },
  { name: "Formazione", href: "#experience" },
  { name: "Contatti", href: "#contact" }
];

interface NavigationProps {
  onSearchOpen: () => void;
}

export function Navigation({ onSearchOpen }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("Home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

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
          if (rect.top <= window.innerHeight / 3) {
            currentSection = section.name;
          }
        }
      }
      if (window.scrollY < 100) {
        currentSection = "Home";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 px-2 py-2 max-w-[95vw]"
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
              onClick={(e) => {
                const targetId = item.href === "#" ? "home" : item.href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  e.preventDefault();
                  targetElement.scrollIntoView({ behavior: "smooth" });
                } else if (item.href === "#") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`relative px-2.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors z-10 block whitespace-nowrap shrink-0 ${
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

        <div className="w-px h-5 bg-white/15 mx-1 shrink-0" />

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
  );
}
