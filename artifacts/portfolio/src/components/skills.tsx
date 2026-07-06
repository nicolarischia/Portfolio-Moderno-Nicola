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
    title: "Programming",
    skills: ["Java (Swing UI)", "C"]
  },
  {
    title: "Tools",
    skills: ["Git", "Figma", "Wix", "Cisco Packet Tracer", "Jotform", "Airtable"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
            <div className="w-12 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg">
              A comprehensive toolkit spanning frontend interfaces, backend architecture, and core programming concepts.
            </p>
          </motion.div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-12">
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
                      className="px-4 py-2 bg-card border border-border/50 rounded-lg text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
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
