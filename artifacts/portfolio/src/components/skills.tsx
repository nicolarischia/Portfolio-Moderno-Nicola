import { motion } from "framer-motion";
import {
  siHtml5, siCss, siJavascript, siReact, siAngular, siBootstrap,
  siNodedotjs, siPhp, siPython, siMongodb, siMysql, siOpenjdk,
  siC, siCplusplus, siDotnet, siPhpmyadmin, siScikitlearn,
  siGit, siFigma, siWix, siCisco, siAirtable,
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

function LetterIcon({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-3.5 h-3.5 rounded text-[7px] font-bold shrink-0 leading-none"
      style={{ color, border: `1px solid ${color}55`, backgroundColor: `${color}18` }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}

function FaviconIcon({
  src,
  fallbackColor,
}: {
  src: string;
  fallbackColor: string;
}) {
  return (
    <span
      className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm shrink-0 overflow-hidden"
      style={{ backgroundColor: fallbackColor }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        width="14"
        height="14"
        className="w-full h-full object-contain"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}

const brandIcon = (name: string) =>
  `${import.meta.env.BASE_URL}img/brand/${name}.png`;

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
      { name: "Node.js",    icon: <TechIcon icon={siNodedotjs} /> },
      { name: "PHP",        icon: <TechIcon icon={siPhp} /> },
      { name: "Python",     icon: <TechIcon icon={siPython} /> },
      { name: "MongoDB",    icon: <TechIcon icon={siMongodb} /> },
      { name: "MySQL",      icon: <TechIcon icon={siMysql} /> },
      { name: "phpMyAdmin", icon: <TechIcon icon={siPhpmyadmin} /> },
    ],
  },
  {
    title: "Programmazione",
    skills: [
      { name: "Java (Swing UI)", icon: <TechIcon icon={siOpenjdk} color="#ED8B00" /> },
      { name: "C",               icon: <TechIcon icon={siC} /> },
      { name: "C++",             icon: <TechIcon icon={siCplusplus} color="#00599C" /> },
      { name: "C#",              icon: <TechIcon icon={siDotnet} color="#512BD4" /> },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "ChatGPT",          icon: <FaviconIcon src={brandIcon("chatgpt")} fallbackColor="#74AA9C" /> },
      { name: "Claude",           icon: <FaviconIcon src={brandIcon("claude")} fallbackColor="#D97757" /> },
      { name: "Gemini",           icon: <FaviconIcon src={brandIcon("gemini")} fallbackColor="#4285F4" /> },
      { name: "Machine Learning", icon: <TechIcon icon={siScikitlearn} /> },
    ],
  },
  {
    title: "Strumenti & Piattaforme",
    skills: [
      { name: "Git",                 icon: <TechIcon icon={siGit} /> },
      { name: "Figma",               icon: <TechIcon icon={siFigma} /> },
      { name: "Wix",                 icon: <TechIcon icon={siWix} /> },
      { name: "Cisco Packet Tracer", icon: <TechIcon icon={siCisco} /> },
      { name: "Jotform",             icon: <LetterIcon text="Jf"  color="#FF6100" /> },
      { name: "Airtable",            icon: <TechIcon icon={siAirtable} /> },
      { name: "Lovable.dev",         icon: <FaviconIcon src={brandIcon("lovable")} fallbackColor="#E879F9" /> },
      { name: "Bolt.new",            icon: <FaviconIcon src={brandIcon("bolt")} fallbackColor="#F59E0B" /> },
      { name: "Base44.com",          icon: <FaviconIcon src={brandIcon("base44")} fallbackColor="#3B82F6" /> },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Competenze Tecniche</h2>
              <div className="w-12 h-1 bg-secondary mb-5 sm:mb-6" />
              <p className="text-foreground/80 text-base sm:text-lg max-w-2xl">
                Un toolkit completo che spazia tra interfacce frontend, architetture backend, concetti fondamentali di programmazione e strumenti AI.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground/90 border-b border-white/10 pb-2">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs sm:text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all shadow-sm"
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
      </div>
    </section>
  );
}
