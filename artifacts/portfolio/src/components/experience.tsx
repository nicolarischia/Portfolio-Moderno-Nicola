import { motion } from "framer-motion";

const education = [
  {
    year: "Previsto 2025",
    title: "Diploma di Perito Informatico",
    institution: "Istituto Tecnico Tecnologico 'Allievi - San Gallo', Terni",
    description: "Specializzazione in programmazione, reti informatiche e architetture di sistemi digitali.",
  },
];

const experiences = [
  {
    year: "2024 — 2025",
    title: "Stage — Digital Web Lab",
    institution: "Digital Web Lab · Avigliano Umbro",
    description: "Collaborazione nell'azienda informatica fondata in sinergia con Vittoria Assicurazioni. Attività di sviluppo web e supporto alla realizzazione di siti e applicazioni mobile per clienti e aziende.",
    link: "https://www.digitalweblab.it/",
    type: "work",
  },
  {
    year: "2024 — 2025",
    title: "Stage — Vittoria Assicurazioni",
    institution: "Agenzia Avorio & Febbraro · Avigliano Umbro",
    description: "Stage presso l'agenzia di Diego Avorio e Marco Febbraro, operativa dal 2010, con circa 12.000 clienti. Attività di digitalizzazione documenti cartacei, supporto ai processi amministrativi e assistenza clienti.",
    link: "https://www.agenzievittoria.com/aviglianoumbro/",
  },
];

type TimelineItem = (typeof education)[number] | (typeof experiences)[number];

function TimelineBlock({
  title,
  items,
}: {
  title: string;
  items: TimelineItem[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-5">{title}</h3>
      <div className="w-10 h-0.5 bg-primary mb-6" />

      <div className="relative border-l border-white/20">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="pl-5 sm:pl-8 relative group last:mb-0"
          >
            <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-black border-2 border-primary transition-all duration-300 group-hover:scale-150 group-hover:bg-primary group-hover:shadow-[0_0_10px] group-hover:shadow-primary/80" />

            <div className="flex flex-col gap-1.5 mb-2">
              <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </h4>
              <span className="text-xs sm:text-sm font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded self-start whitespace-nowrap">
                {item.year}
              </span>
            </div>

            <h5 className="text-sm font-medium text-foreground/70 mb-2">
              {"link" in item && item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors underline-offset-2 hover:underline"
                >
                  {item.institution}
                </a>
              ) : (
                item.institution
              )}
            </h5>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="p-5 sm:p-8">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-8 sm:mb-10"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Formazione & Esperienze</h2>
              <div className="w-12 h-1 bg-secondary" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              <TimelineBlock title="Formazione" items={education} />
              <TimelineBlock title="Esperienze" items={experiences} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
