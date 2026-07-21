import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-background/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-center md:text-left">
          <h3 className="font-display font-semibold text-xl text-gradient mb-2">Ayesha Khawar</h3>
          <p className="text-muted-foreground text-sm">
            Designed & Developed with purpose.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Built with React · TypeScript · Three.js · Framer Motion · Tailwind CSS
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4">
            <a href="https://github.com/Ayesha-Khawar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors interactive p-2 bg-white/5 rounded-full hover:bg-white/10 hover:shadow-[0_0_10px_rgba(124,58,237,0.3)]">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ayesha-khawar1" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors interactive p-2 bg-white/5 rounded-full hover:bg-white/10 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Linkedin size={20} />
            </a>
            <a href="mailto:ayesha.khawar@example.com" className="text-muted-foreground hover:text-white transition-colors interactive p-2 bg-white/5 rounded-full hover:bg-white/10 hover:shadow-[0_0_10px_rgba(124,58,237,0.3)]">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Helper component for tracking scroll progress
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const el = document.getElementById('scroll-progress');
    if (el) {
      scaleX.on('change', (v) => {
        el.style.transform = `scaleX(${v})`;
      });
    }
  }, [scaleX]);

  return null;
}
