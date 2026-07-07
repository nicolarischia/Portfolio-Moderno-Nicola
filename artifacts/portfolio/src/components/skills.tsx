import { motion } from "framer-motion";

const categories = [
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Angular", "Bootstrap"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "PHP", "Python", "MongoDB", "MySQL"]
  },
  {
    title: "Programmazione",
    skills: ["Java (Swing UI)", "C"]
  },
  {
    title: "Strumenti",
    skills: ["Git", "Figma", "Wix", "Cisco Packet Tracer", "Jotform", "Airtable"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 relative">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/5 -z-10" />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 p-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Competenze Tecniche</h2>
            <div className="w-12 h-1 bg-secondary mb-6" />
            <p className="text-foreground/80 text-lg">
              Un toolkit completo che spazia tra interfacce frontend, architetture backend e concetti fondamentali di programmazione.
            </p>
          </motion.div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-12 p-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-foreground/90">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill}
                      className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all shadow-sm"
                    >
                      {skill}
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
