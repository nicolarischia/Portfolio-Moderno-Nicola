import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center relative pt-20 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium text-sm mb-6 shadow-[0_0_15px_rgba(var(--secondary),0.2)]">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Nicola Rischia — Web Developer
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8 drop-shadow-lg">
            Building digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">
              experiences
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 leading-relaxed bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-white/5">
            I'm a web developer based in Italy, focused on creating modern, performant, and accessible applications. I love experimenting with new technologies and bringing creative ideas online.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="rounded-full font-medium shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transition-all" asChild>
              <a href="#projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-secondary hover:bg-secondary/10 transition-colors" asChild>
                <a href="https://github.com/nicolarischia" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-secondary hover:bg-secondary/10 transition-colors" asChild>
                <a href="https://linkedin.com/in/nicolarischia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-secondary hover:bg-secondary/10 transition-colors" asChild>
                <a href="mailto:nicolarischia1@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
