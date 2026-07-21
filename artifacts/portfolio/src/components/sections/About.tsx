import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Award, Code2, BrainCircuit, GraduationCap, Download } from 'lucide-react';
import profilePic from '@assets/linkedin_profile_picture_1784645049028.jpeg';

function Counter({ from = 0, to, duration = 2, decimals = 0, suffix = '' }: {
  from?: number; to: number; duration?: number; decimals?: number; suffix?: string;
}) {
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
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(from + (to - from) * easeProgress);
        if (progress < 1) animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(320 48% 42%), transparent 70%)', transform: 'translateY(-50%)' }} />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* Profile Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Photo frame */}
            <div className="relative group">
              {/* Glowing ring */}
              <div className="absolute -inset-1 rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 58%), hsl(275 30% 60%))' }} />
              <div className="relative w-56 h-68 rounded-2xl overflow-hidden"
                style={{ width: '220px', height: '280px' }}>
                <img
                  src={profilePic}
                  alt="Ayesha Khawar"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(12,5,12,0.5) 100%)' }} />
              </div>
            </div>

            {/* Name tag */}
            <div className="text-center">
              <p className="font-display font-bold text-white text-xl">Ayesha Khawar</p>
              <p className="text-sm mt-1" style={{ color: 'hsl(345 35% 65%)' }}>AI & Software Engineer</p>
            </div>

            {/* Download button */}
            <a
              href="/Ayesha_Khawar_Resume.pdf"
              download="Ayesha_Khawar_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white interactive transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 52%))', boxShadow: '0 0 20px rgba(160,55,110,0.35)' }}
            >
              <Download className="w-4 h-4" />
              Download Résumé
            </a>
          </motion.div>

          {/* Bio text column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-1 flex flex-col justify-center"
          >
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                A passionate Software and AI Engineer with a strong foundation in computer science.
                I specialize in building <strong className="text-foreground">intelligent, AI-powered applications</strong> that
                bridge the gap between cutting-edge research and production-ready systems.
              </p>
              <p>
                My expertise spans LLM systems, RAG pipelines, full-stack web development, and scalable
                backend architectures — from TypeScript-powered APIs to Python ML pipelines.
              </p>
              <p>
                Graduated as <strong className="text-foreground">Gold Medalist & Topper of the Batch</strong> (CGPA: 3.88/4.00)
                from Bahauddin Zakariya University (2022–2026), I bring both academic excellence and
                real-world engineering experience to every project.
              </p>
            </div>
          </motion.div>

          {/* Stats column */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, to: 3.88, decimals: 2, suffix: '', label: 'CGPA', delay: 0.2 },
              { icon: BrainCircuit, to: 5, decimals: 0, suffix: '+', label: 'AI Projects', delay: 0.3 },
              { icon: Code2, to: 20, decimals: 0, suffix: '+', label: 'Technologies', delay: 0.4 },
              { icon: Award, to: 10, decimals: 0, suffix: '+', label: 'Certifications', delay: 0.5 },
            ].map(({ icon: Icon, to, decimals, suffix, label, delay }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay }}
                className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group interactive hover:-translate-y-1 transition-transform"
                style={{ borderColor: i % 2 === 0 ? 'rgba(160,55,110,0.2)' : 'rgba(200,100,130,0.2)' }}
              >
                <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform"
                  style={{ color: i % 2 === 0 ? 'hsl(320 48% 62%)' : 'hsl(345 35% 65%)' }} />
                <h3 className="text-3xl font-display font-bold text-white mb-1">
                  <Counter to={to} decimals={decimals} suffix={suffix} />
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
