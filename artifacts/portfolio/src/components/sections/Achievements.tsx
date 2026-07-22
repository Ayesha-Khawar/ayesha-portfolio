import { motion } from 'framer-motion';
import { Trophy, Star, Sparkles } from 'lucide-react';

export function Achievements() {
  return (
    <section id="achievements" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,149,58,0.12), transparent 70%)' }} />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-2xl mx-auto relative group"
        >
          {/* Glow ring */}
          <div className="absolute -inset-0.5 rounded-3xl blur-md opacity-25 group-hover:opacity-50 transition duration-700"
            style={{ background: 'linear-gradient(135deg, #f6d670, #c9953a, #f6d670)', animation: 'ambientPulse 4s ease-in-out infinite' }} />

          <div className="relative glass-panel p-7 md:p-12 rounded-3xl flex flex-col items-center text-center overflow-hidden"
            style={{ borderColor: 'rgba(201,149,58,0.3)' }}>

            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/4 to-transparent -translate-x-[200%]"
              style={{ animation: 'ribbonFlow 4s 1.5s ease-in-out infinite' }} />

            {/* Trophy */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="relative mb-5 md:mb-7"
            >
              <div className="absolute inset-0 blur-xl rounded-full opacity-50"
                style={{ background: 'rgba(251,191,36,0.5)' }} />
              <Trophy className="relative z-10 text-amber-400 w-14 h-14 md:w-20 md:h-20"
                style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.8))' }} />
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-200 animate-pulse" />
            </motion.div>

            <span className="uppercase tracking-[0.3em] text-xs font-semibold mb-3"
              style={{ color: 'rgba(251,191,36,0.7)' }}>
              Academic Excellence
            </span>

            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-1">
              Topper of the Batch
            </h2>
            <p className="text-base md:text-lg mb-5 md:mb-7" style={{ color: 'rgba(251,191,36,0.6)' }}>
              2022 – 2026
            </p>

            {/* CGPA block */}
            <div className="px-6 py-4 rounded-2xl w-full mb-5 md:mb-7"
              style={{ background: 'rgba(120,60,0,0.2)', border: '1px solid rgba(201,149,58,0.25)' }}>
              <span className="text-xs uppercase tracking-widest block mb-1" style={{ color: 'rgba(251,191,36,0.55)' }}>
                Final CGPA
              </span>
              <div className="text-4xl md:text-5xl font-display font-bold"
                style={{ background: 'linear-gradient(to bottom, #fff, #fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                3.88 <span className="text-xl md:text-2xl" style={{ color: 'rgba(251,191,36,0.5)' }}>/ 4.00</span>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-display text-white/85 mb-3">
              Bahauddin Zakariya University
            </h3>
            <p className="text-xs md:text-sm text-white/55 max-w-sm leading-relaxed mb-5">
              Graduated with the highest academic honors in BS Computer Science. Gold Medal pending conferment.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
              style={{ background: 'rgba(201,149,58,0.12)', border: '1px solid rgba(201,149,58,0.3)', color: '#fcd34d' }}>
              <Star className="w-3.5 h-3.5" />
              Gold Medal (Pending)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
