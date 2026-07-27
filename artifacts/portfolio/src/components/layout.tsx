import { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { AnimatedBackground } from "./animated-background";
import { Spotlight } from "./spotlight";

export function Layout({ children }: { children: React.ReactNode }) {
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
      {children}
    </div>
  );
}
