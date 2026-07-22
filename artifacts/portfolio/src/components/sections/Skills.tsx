import { motion } from 'framer-motion';
import { useState } from 'react';

const skillCategories = [
  { id: 'all',      label: 'All',       color: 'text-white',                      border: 'border-white/20',              bg: '' },
  { id: 'ai',       label: 'AI & ML',   color: 'text-[hsl(320_48%_68%)]',         border: 'border-[hsl(320_48%_42%)/30%]', bg: '' },
  { id: 'backend',  label: 'Backend',   color: 'text-[hsl(275_30%_68%)]',         border: 'border-[hsl(275_30%_60%)/30%]', bg: '' },
  { id: 'frontend', label: 'Frontend',  color: 'text-[hsl(345_35%_68%)]',         border: 'border-[hsl(345_35%_58%)/30%]', bg: '' },
  { id: 'db',       label: 'Databases', color: 'text-[hsl(38_58%_62%)]',          border: 'border-[hsl(38_58%_52%)/30%]',  bg: '' },
];

const allSkills = [
  { name: 'Python',          category: 'ai',       icon: '🐍' },
  { name: 'LangChain',       category: 'ai',       icon: '🦜' },
  { name: 'RAG Systems',     category: 'ai',       icon: '🧠' },
  { name: 'LLM Integration', category: 'ai',       icon: '✨' },
  { name: 'Embeddings',      category: 'ai',       icon: '🔍' },
  { name: 'Prompt Eng.',     category: 'ai',       icon: '🤖' },
  { name: 'Scikit-learn',    category: 'ai',       icon: '📊' },
  { name: 'Pandas / NumPy',  category: 'ai',       icon: '📈' },
  { name: 'Node.js',         category: 'backend',  icon: '🟢' },
  { name: 'Express.js',      category: 'backend',  icon: '🚂' },
  { name: 'REST APIs',       category: 'backend',  icon: '🔌' },
  { name: 'FastAPI',         category: 'backend',  icon: '⚡' },
  { name: 'Flask',           category: 'backend',  icon: '🌶️' },
  { name: 'React',           category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript',      category: 'frontend', icon: '📘' },
  { name: 'JavaScript',      category: 'frontend', icon: '💛' },
  { name: 'Tailwind CSS',    category: 'frontend', icon: '🌊' },
  { name: 'HTML5 / CSS3',    category: 'frontend', icon: '🕸️' },
  { name: 'PostgreSQL',      category: 'db',       icon: '🐘' },
  { name: 'ChromaDB',        category: 'db',       icon: '🗄️' },
  { name: 'Drizzle ORM',     category: 'db',       icon: '🌧️' },
  { name: 'FAISS',           category: 'db',       icon: '🔎' },
  { name: 'SQL',             category: 'db',       icon: '💾' },
];

// Category accent colours (used inline so Tailwind JIT doesn't purge)
const accentByCategory: Record<string, string> = {
  ai:       'hsl(320 48% 42%)',
  backend:  'hsl(275 30% 50%)',
  frontend: 'hsl(345 35% 50%)',
  db:       'hsl(38  58% 44%)',
};
const textByCategory: Record<string, string> = {
  ai:       'hsl(320 48% 72%)',
  backend:  'hsl(275 30% 72%)',
  frontend: 'hsl(345 35% 72%)',
  db:       'hsl(38  58% 68%)',
};

export function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSkills = allSkills.filter(s =>
    activeFilter === 'all' ? true : s.category === activeFilter
  );

  return (
    <section id="skills" className="py-16 md:py-24 relative bg-background/30">
      <div className="container mx-auto px-4 md:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-3 md:mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">Technologies I build with every day</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {skillCategories.map((cat) => {
            const active = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className="px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all interactive"
                style={
                  active
                    ? {
                        background: cat.id === 'all'
                          ? 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 50%))'
                          : accentByCategory[cat.id] ?? 'hsl(320 48% 42%)',
                        color: '#fff',
                        boxShadow: `0 0 14px ${accentByCategory[cat.id] ?? 'rgba(160,55,110,0.5)'}55`,
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.55)',
                      }
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skill chips */}
        <motion.div
          layout
          className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto"
        >
          {filteredSkills.map((skill) => {
            const accent = accentByCategory[skill.category] ?? 'hsl(320 48% 42%)';
            const textC  = textByCategory[skill.category]  ?? '#e0c8d8';

            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -3, scale: 1.04 }}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl interactive cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${accent}40`,
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${accent}44`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}88`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`;
                }}
              >
                <span className="text-base md:text-lg leading-none">{skill.icon}</span>
                <span className="text-xs md:text-sm font-medium" style={{ color: textC }}>
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
