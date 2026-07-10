import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

const GITHUB_REPOS = "https://github.com/nicolarischia?tab=repositories";

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Progetti</h2>
          <div className="w-12 h-1 bg-primary mb-5 sm:mb-6" />
          <p className="text-foreground/80 text-base sm:text-lg max-w-2xl bg-black/20 p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-white/5">
            Tutti i miei progetti sono disponibili direttamente su GitHub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-start"
        >
          <a
            href={GITHUB_REPOS}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-5 bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl hover:border-secondary/60 hover:shadow-[0_0_40px_rgba(234,88,12,0.2)] transition-all duration-300 text-left"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-secondary/40 group-hover:bg-secondary/10 transition-all duration-300">
              <Github className="h-6 w-6 text-white/70 group-hover:text-secondary transition-colors duration-300" />
            </span>
            <div>
              <div className="text-base sm:text-lg font-semibold text-white group-hover:text-secondary transition-colors duration-300">
                Vedi tutti i repository
              </div>
              <div className="text-sm text-white/50 font-mono">
                github.com/nicolarischia
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
