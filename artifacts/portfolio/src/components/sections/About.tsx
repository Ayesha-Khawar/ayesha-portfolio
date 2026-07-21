import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Code2, BrainCircuit, GraduationCap } from 'lucide-react';

function Counter({ from = 0, to, duration = 2, decimals = 0, suffix = '' }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(from + (to - from) * easeProgress);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                A passionate Software and AI Engineer with a strong foundation in computer science. 
                I specialize in building intelligent, AI-powered applications that bridge the gap 
                between cutting-edge research and production-ready systems. My expertise spans LLM systems, 
                RAG pipelines, full-stack web development, and scalable backend architectures.
              </p>
              <p>
                Graduated as <strong className="text-white">Topper of the Batch</strong> (CGPA: 3.88/4.00) 
                from Bahauddin Zakariya University (2022–2026), I bring both academic excellence and 
                real-world engineering experience to every project.
              </p>
            </div>
            
            <div className="mt-10">
              <button className="px-6 py-3 rounded-full glass interactive hover:bg-primary/20 transition-all flex items-center gap-2 text-white">
                Download Résumé
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↓
                </motion.span>
              </button>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center group interactive hover:border-primary/50"
            >
              <GraduationCap className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-display font-bold text-white mb-2">
                <Counter to={3.88} decimals={2} />
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">CGPA</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center group interactive hover:border-secondary/50"
            >
              <BrainCircuit className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-display font-bold text-white mb-2">
                <Counter to={5} suffix="+" />
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">AI Projects</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center group interactive hover:border-accent/50"
            >
              <Code2 className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-display font-bold text-white mb-2">
                <Counter to={20} suffix="+" />
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Technologies</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center group interactive hover:border-chart-4/50"
            >
              <Award className="w-10 h-10 text-chart-4 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-display font-bold text-white mb-2">
                <Counter to={10} suffix="+" />
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Certifications</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
