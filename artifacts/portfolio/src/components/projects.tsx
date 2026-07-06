import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Data Management Platform",
    description: "A complete web application for data and user management, featuring authentication, a dynamic dashboard, and RESTful APIs.",
    stack: ["React", "Node.js", "MongoDB", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/nicolarischia/ProgettoSport-Natili-Rischia-Tiberi",
    live: "",
  },
  {
    title: "Gioielleria Avorio",
    description: "A modern, responsive showcase site for a jewelry store, with custom graphics, contact forms, and social integration.",
    stack: ["Wix"],
    github: "",
    live: "https://info2211238.wixsite.com/gioielleriaavorio",
  },
  {
    title: "Showcase Interface",
    description: "A modern, responsive frontend showcase interface demonstrating clean layout and UI principles.",
    stack: ["React", "JavaScript", "CSS3", "Bootstrap"],
    github: "https://github.com/Garlics07/Progetto1_Gilardi_Rischia",
    live: "",
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
          <div className="w-12 h-1 bg-primary mb-6" />
          <p className="text-foreground/80 text-lg max-w-2xl bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5">
            A collection of projects showcasing my skills in frontend and backend development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)] transition-all duration-300 flex flex-col h-full"
            >
              <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-xs font-mono px-2 py-1 bg-white/5 text-white/90 border border-white/10 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                {project.github && (
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-white/20 hover:border-secondary hover:text-secondary hover:bg-secondary/10" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-white/20 hover:border-secondary hover:text-secondary hover:bg-secondary/10" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Visit Site
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
