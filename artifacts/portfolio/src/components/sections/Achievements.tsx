import { motion } from 'framer-motion';
import { Trophy, Star, Sparkles } from 'lucide-react';

export function Achievements() {
  return (
    <section id="achievements" className="py-32 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Cinematic Spotlight Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-400/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
      
      {/* Floating particles (CSS simplified) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50" />

      <div className="container relative z-10 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl mx-auto relative group"
        >
          {/* Outer glow layer */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-[2.5rem] blur-lg opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse" />
          
          <div className="relative glass-panel bg-black/60 backdrop-blur-2xl p-12 md:p-16 rounded-[2.5rem] border border-amber-500/30 flex flex-col items-center text-center overflow-hidden">
            
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] animate-[shimmer_3s_infinite]" />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-amber-400 blur-xl opacity-50 rounded-full" />
              <Trophy className="w-24 h-24 text-amber-400 relative z-10 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-amber-200 animate-pulse" />
            </motion.div>

            <span className="uppercase tracking-[0.3em] text-amber-400/80 font-semibold text-sm mb-4">
              Academic Excellence
            </span>

            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-2 filter drop-shadow-md">
              Topper of the Batch
            </h2>
            
            <p className="text-xl md:text-2xl text-amber-100/70 font-medium mb-8">
              2022 &ndash; 2026
            </p>

            <div className="flex flex-col items-center justify-center p-6 bg-amber-950/30 rounded-2xl border border-amber-500/20 w-full mb-8">
              <span className="text-sm text-amber-400/60 uppercase tracking-widest mb-1">Final CGPA</span>
              <div className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-200">
                3.88 <span className="text-3xl text-amber-400/50">/ 4.00</span>
              </div>
            </div>

            <h3 className="text-2xl font-display text-white/90 mb-4">
              Bahauddin Zakariya University
            </h3>

            <p className="text-white/60 max-w-lg leading-relaxed mb-8">
              Graduated as the Topper of the Batch with highest academic honors. 
              The official Gold Medal is pending conferment by the university.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium">
              <Star className="w-4 h-4" />
              Gold Medal (Pending)
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
