import { motion } from "framer-motion";
import { FileDown, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CV_URL = `${import.meta.env.BASE_URL}cv-nicola-rischia.pdf`;

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="p-5 sm:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Costruiamo qualcosa insieme.
              </h2>
              <div className="w-12 h-1 bg-primary mb-5 sm:mb-6" />
              <p className="text-base sm:text-lg text-foreground/80 mb-8 sm:mb-10 max-w-2xl">
                Sono aperto a nuove opportunità. Che tu abbia una domanda,
                un'idea di progetto, ti rispondo al più presto!
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-medium h-12 sm:h-14 px-6 sm:px-8 shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transition-all"
                  asChild
                >
                  <a href="mailto:nicolarischia1@gmail.com">
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Scrivimi
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-medium h-12 sm:h-14 px-6 sm:px-8 border-white/20 hover:border-secondary hover:text-secondary hover:bg-secondary/10 transition-colors"
                  asChild
                >
                  <a
                    href="https://wa.me/3664079323"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />{" "}
                    WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-medium h-12 sm:h-14 px-6 sm:px-8 border-white/20 hover:border-primary hover:text-primary hover:bg-primary/10 transition-colors"
                  asChild
                >
                  <a href={CV_URL} download="CV-Nicola-Rischia.pdf">
                    <FileDown className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Scarica
                    CV
                  </a>
                </Button>
              </div>

              <div className="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  © {new Date().getFullYear()} Nicola Rischia. Tutti i diritti
                  riservati.
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <a
                    href="https://github.com/nicolarischia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-primary/10"
                  >
                    <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/nicolarischia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-primary/10"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
