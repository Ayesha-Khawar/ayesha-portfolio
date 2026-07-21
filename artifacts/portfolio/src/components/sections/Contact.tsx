import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Download } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-background/80 overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to Opportunities
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Let's Build <span className="text-gradient">Something</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you have a question, an opportunity, or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/10 max-w-2xl mx-auto shadow-2xl"
          >
            <a 
              href="mailto:ayesha.khawar@example.com"
              className="block text-2xl md:text-4xl font-display font-bold text-white hover:text-primary transition-colors interactive mb-8 break-all"
            >
              ayesha.khawar@example.com
            </a>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-secondary" />
                Pakistan
              </div>
              <div className="hidden sm:block text-white/20">•</div>
              <div className="flex gap-4">
                <a href="https://github.com/Ayesha-Khawar" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all interactive hover:text-primary hover:-translate-y-1">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/ayesha-khawar1" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all interactive hover:text-secondary hover:-translate-y-1">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold interactive hover:bg-white/90 transition-all flex items-center justify-center gap-2 mx-auto">
              <Download className="w-5 h-5" />
              Download Résumé
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
