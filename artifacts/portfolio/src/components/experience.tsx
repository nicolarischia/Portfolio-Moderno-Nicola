import { motion } from "framer-motion";

const timeline = [
  {
    year: "Previsto 2025",
    title: "Diploma di Perito Informatico",
    institution: "Istituto Tecnico Tecnologico 'Allievi - San Gallo', Terni",
    description: "Specializzazione in programmazione, reti informatiche e architetture di sistemi digitali.",
  },
  {
    year: "2023 — 2024",
    title: "React Avanzato e Architetture Frontend",
    institution: "Studio autonomo",
    description: "Approfondimento dei paradigmi moderni di React, gestione dello stato e architetture frontend scalabili.",
  },
  {
    year: "2023",
    title: "Algoritmi e Strutture Dati in JavaScript",
    institution: "freeCodeCamp",
    description: "Algoritmi fondamentali, strutture dati e metodologie di problem solving in JavaScript.",
  },
  {
    year: "In corso",
    title: "Laboratori di Reti e Sistemi",
    institution: "Esperienza pratica",
    description: "Configurazione e simulazione hands-on con Cisco Packet Tracer.",
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/5"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Formazione & Esperienza</h2>
          <div className="w-12 h-1 bg-secondary mb-6" />
        </motion.div>

        <div className="relative border-l border-white/20 ml-4 md:ml-0 bg-black/10 backdrop-blur-sm p-8 rounded-3xl border border-white/5">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 pl-8 md:pl-12 relative group"
            >
              <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-black border-2 border-secondary group-hover:scale-150 group-hover:bg-secondary group-hover:shadow-[0_0_10px_rgba(234,88,12,0.8)] transition-all duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <span className="text-sm font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                  {item.year}
                </span>
              </div>
              
              <h4 className="text-md font-medium text-foreground/80 mb-3">{item.institution}</h4>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
