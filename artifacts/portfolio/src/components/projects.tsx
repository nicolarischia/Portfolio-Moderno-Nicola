import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Piattaforma di Gestione Dati",
    description: "Un'applicazione web completa per la gestione di dati e utenti, con autenticazione, dashboard dinamica e API RESTful.",
    stack: ["React", "Node.js", "MongoDB", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/nicolarischia/ProgettoSport-Natili-Rischia-Tiberi",
    live: "",
    image: "/img/progetto1.png",
  },
  {
    title: "Gioielleria Avorio",
    description: "Sito vetrina moderno e responsive per una gioielleria, con grafica personalizzata, moduli di contatto e integrazione social.",
    stack: ["Wix"],
    github: "",
    live: "https://info2211238.wixsite.com/gioielleriaavorio",
    image: "/img/progetto2.png",
  },
  {
    title: "Interfaccia Showcase",
    description: "Un'interfaccia frontend moderna e responsive che dimostra principi di layout pulito e UI curata.",
    stack: ["React", "JavaScript", "CSS3", "Bootstrap"],
    github: "https://github.com/Garlics07/Progetto1_Gilardi_Rischia",
    live: "",
    image: "/img/progetto3.png",
  }
];

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
            Una raccolta di progetti che mostrano le mie competenze nello sviluppo frontend e backend.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)] transition-all duration-300 flex flex-col"
            >
              {/* Project image */}
              <div className="relative overflow-hidden h-44 sm:h-48 bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-secondary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-5 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs font-mono px-2 py-1 bg-white/5 text-white/90 border border-white/10 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 pt-4 border-t border-white/10">
                  {project.github && (
                    <Button variant="outline" size="sm" className="rounded-full gap-1.5 sm:gap-2 border-white/20 hover:border-secondary hover:text-secondary hover:bg-secondary/10 text-xs sm:text-sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Codice
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button variant="outline" size="sm" className="rounded-full gap-1.5 sm:gap-2 border-white/20 hover:border-secondary hover:text-secondary hover:bg-secondary/10 text-xs sm:text-sm" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Visita
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
