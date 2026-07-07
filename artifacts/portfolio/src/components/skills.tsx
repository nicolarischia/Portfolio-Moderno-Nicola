import { motion } from "framer-motion";
import {
  siHtml5, siCss, siJavascript, siReact, siAngular, siBootstrap,
  siNodedotjs, siPhp, siPython, siMongodb, siMysql, siOpenjdk,
  siC, siGit, siFigma, siWix, siCisco, siAirtable
} from "simple-icons";

interface SimpleIcon {
  path: string;
  hex: string;
}

function TechIcon({ icon, color }: { icon: SimpleIcon; color?: string }) {
  const fill = color ?? `#${icon.hex}`;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill={fill}
      className="shrink-0"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}

function DotIcon({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full shrink-0"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const categories: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5",      icon: <TechIcon icon={siHtml5} /> },
      { name: "CSS3",       icon: <TechIcon icon={siCss} color="#1572B6" /> },
      { name: "JavaScript", icon: <TechIcon icon={siJavascript} /> },
      { name: "React",      icon: <TechIcon icon={siReact} /> },
      { name: "Angular",    icon: <TechIcon icon={siAngular} color="#DD0031" /> },
      { name: "Bootstrap",  icon: <TechIcon icon={siBootstrap} /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js",  icon: <TechIcon icon={siNodedotjs} /> },
      { name: "PHP",      icon: <TechIcon icon={siPhp} /> },
      { name: "Python",   icon: <TechIcon icon={siPython} /> },
      { name: "MongoDB",  icon: <TechIcon icon={siMongodb} /> },
      { name: "MySQL",    icon: <TechIcon icon={siMysql} /> },
    ],
  },
  {
    title: "Programmazione",
    skills: [
      { name: "Java (Swing UI)", icon: <TechIcon icon={siOpenjdk} color="#ED8B00" /> },
      { name: "C",               icon: <TechIcon icon={siC} /> },
    ],
  },
  {
    title: "Strumenti",
    skills: [
      { name: "Git",                 icon: <TechIcon icon={siGit} /> },
      { name: "Figma",               icon: <TechIcon icon={siFigma} /> },
      { name: "Wix",                 icon: <TechIcon icon={siWix} /> },
      { name: "Cisco Packet Tracer", icon: <TechIcon icon={siCisco} /> },
      { name: "Jotform",             icon: <DotIcon color="#FF6100" /> },
      { name: "Airtable",            icon: <TechIcon icon={siAirtable} /> },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 relative">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/5 -z-10" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 p-5 sm:p-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Competenze Tecniche</h2>
            <div className="w-12 h-1 bg-secondary mb-5 sm:mb-6" />
            <p className="text-foreground/80 text-base sm:text-lg">
              Un toolkit completo che spazia tra interfacce frontend, architetture backend e concetti fondamentali di programmazione.
            </p>
          </motion.div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-12 p-5 sm:p-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-foreground/90">{category.title}</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/40 border border-white/10 rounded-lg text-xs sm:text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all shadow-sm"
                    >
                      {skill.icon}
                      {skill.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
