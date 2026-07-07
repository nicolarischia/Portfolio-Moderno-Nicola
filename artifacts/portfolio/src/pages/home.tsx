import { useState, useEffect } from "react";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { AnimatedBackground } from "@/components/animated-background";
import { Spotlight } from "@/components/spotlight";

export default function Home() {
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen text-foreground relative">
      <AnimatedBackground />
      <Navigation onSearchOpen={() => setSpotlightOpen(true)} />
      <Spotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}
