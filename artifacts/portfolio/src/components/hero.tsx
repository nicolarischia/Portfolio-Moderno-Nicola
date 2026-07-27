import { motion } from "framer-motion";
import { ArrowRight, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const CV_URL = `${import.meta.env.BASE_URL}cv-nicola-rischia.pdf`;

export function Hero() {
  const [, navigate] = useLocation();

  return (
    <section id="home" className="min-h-[100dvh] flex flex-col justify-center relative pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium text-xs sm:text-sm mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
            <span>Nicola Rischia — Web Developer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 sm:mb-8 drop-shadow-lg">
            Costruisco esperienze <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">
              digitali
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mb-8 sm:mb-10 leading-relaxed bg-black/30 p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-white/5">
            Sono uno sviluppatore web con sede in Italia, specializzato nella creazione di applicazioni moderne, performanti e accessibili. Amo sperimentare nuove tecnologie e portare idee creative online.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="rounded-full font-medium shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transition-all text-sm sm:text-base px-5 sm:px-6"
              onClick={() => navigate("/competenze")}
            >
              Scopri le Competenze <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-medium text-sm sm:text-base px-5 sm:px-6 border-white/20 hover:border-secondary hover:text-secondary hover:bg-secondary/10 transition-colors" asChild>
              <a href={CV_URL} download="CV-Nicola-Rischia.pdf">
                Scarica CV <FileDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="flex items-center gap-1 sm:gap-2">
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
