import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

const GITHUB_REPOS = "https://github.com/nicolarischia?tab=repositories";

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 p-5 sm:p-8">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex-1 min-w-0"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Progetti</h2>
              <div className="w-12 h-1 bg-primary mb-5 sm:mb-6" />
              <p className="text-foreground/80 text-base sm:text-lg">
                Tutti i miei lavori sono disponibili direttamente su GitHub.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="shrink-0"
            >
              <a
                href={GITHUB_REPOS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-black/40 border border-white/15 rounded-2xl hover:border-primary/50 hover:shadow-[0_0_30px_rgba(132,204,22,0.15)] transition-all duration-300"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                  <Github className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
                </span>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                    Vedi tutti i repository
                  </div>
                  <div className="text-xs text-white/50 font-mono">
                    github.com/nicolarischia
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 ml-1" />
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
