import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Download, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-background/80 overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, hsl(320 48% 42%) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, hsl(345 35% 58%) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
              style={{ background: 'rgba(100,200,120,0.08)', borderColor: 'rgba(100,200,120,0.25)', color: '#6ecc8a' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open to Opportunities
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Let's Build <span className="text-gradient">Something</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you have a question, an opportunity, or just want to say hi — I'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-[2rem] max-w-2xl mx-auto shadow-2xl"
            style={{ borderColor: 'rgba(180,100,140,0.2)' }}
          >
            {/* Email */}
            <a
              href="mailto:ayeshakhawar577@gmail.com"
              className="block text-xl md:text-3xl font-display font-bold text-white hover:text-gradient transition-colors interactive mb-3 break-all"
            >
              ayeshakhawar577@gmail.com
            </a>

            {/* Phone */}
            <a
              href="tel:+923708337992"
              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-base"
            >
              <Phone className="w-4 h-4" style={{ color: 'hsl(345 35% 58%)' }} />
              +92 370 833 7992
            </a>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" style={{ color: 'hsl(345 35% 58%)' }} />
                Pakistan
              </div>
              <div className="hidden sm:block text-white/20">•</div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Ayesha-Khawar"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full transition-all interactive hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'hsl(320 48% 65%)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'white')}
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ayesha-khawar1"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full transition-all interactive hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'hsl(345 35% 65%)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'white')}
                >
                  <Linkedin size={22} />
                </a>
              </div>
            </div>

            {/* Real résumé download */}
            <a
              href="/Ayesha_Khawar_Resume.pdf"
              download="Ayesha_Khawar_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all interactive glow-primary text-white"
              style={{ background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 50%))' }}
            >
              <Download className="w-5 h-5" />
              Download Résumé
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
