import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export default function Servizi() {
  return (
    <main className="pt-20 sm:pt-24 min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="p-5 sm:p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 sm:mb-10"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Servizi</h2>
                <div className="w-12 h-1 bg-primary mb-6" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col items-center justify-center py-16 sm:py-24 text-center gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                    Contenuto in arrivo
                  </h3>
                  <p className="text-foreground/60 text-sm sm:text-base max-w-md">
                    Questa sezione verrà aggiornata a breve con i servizi offerti.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
