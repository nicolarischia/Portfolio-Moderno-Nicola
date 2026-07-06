import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build together.</h2>
          <p className="text-lg text-muted-foreground mb-12">
            I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto rounded-full font-medium h-14 px-8" asChild>
              <a href="mailto:nicolarischia1@gmail.com">
                <Mail className="mr-2 h-5 w-5" /> Say Hello
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full font-medium h-14 px-8" asChild>
              <a href="https://wa.me/3664079323" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
              </a>
            </Button>
          </div>
          
          <div className="mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Nicola Rischia. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/nicolarischia" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/nicolarischia" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
