import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { AnimatedBackground } from "@/components/animated-background";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground" id="home">
      <AnimatedBackground />
      <Navigation />
      <div className="relative z-10 flex flex-col gap-12">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </div>
  );
}
