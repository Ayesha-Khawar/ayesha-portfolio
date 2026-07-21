import { motion } from 'framer-motion';
import { useState } from 'react';

const skillCategories = [
  { id: 'all', label: 'All Skills' },
  { id: 'ai', label: 'AI & ML', color: 'text-purple-400', border: 'border-purple-400/30', bg: 'hover:bg-purple-400/10' },
  { id: 'backend', label: 'Backend', color: 'text-blue-400', border: 'border-blue-400/30', bg: 'hover:bg-blue-400/10' },
  { id: 'frontend', label: 'Frontend', color: 'text-cyan-400', border: 'border-cyan-400/30', bg: 'hover:bg-cyan-400/10' },
  { id: 'db', label: 'Databases', color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'hover:bg-emerald-400/10' },
];

const allSkills = [
  // AI/ML
  { name: 'Python', category: 'ai', icon: '🐍' },
  { name: 'LangChain', category: 'ai', icon: '🦜' },
  { name: 'RAG Systems', category: 'ai', icon: '🧠' },
  { name: 'Vector Search', category: 'ai', icon: '🔍' },
  { name: 'Gemini', category: 'ai', icon: '✨' },
  { name: 'OpenAI', category: 'ai', icon: '🤖' },
  { name: 'Scikit-learn', category: 'ai', icon: '📊' },
  { name: 'Pandas & NumPy', category: 'ai', icon: '📈' },

  // Backend
  { name: 'Node.js', category: 'backend', icon: '🟢' },
  { name: 'Express.js', category: 'backend', icon: '🚂' },
  { name: 'REST APIs', category: 'backend', icon: '🔌' },
  { name: 'FastAPI', category: 'backend', icon: '⚡' },
  { name: 'C/C++', category: 'backend', icon: '⚙️' },

  // Frontend
  { name: 'React', category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', icon: '📘' },
  { name: 'JavaScript', category: 'frontend', icon: '💛' },
  { name: 'Tailwind CSS', category: 'frontend', icon: '🌊' },
  { name: 'Framer Motion', category: 'frontend', icon: '🎬' },
  { name: 'HTML5/CSS3', category: 'frontend', icon: '🕸️' },

  // Databases
  { name: 'PostgreSQL', category: 'db', icon: '🐘' },
  { name: 'Neon DB', category: 'db', icon: '☁️' },
  { name: 'Drizzle ORM', category: 'db', icon: '🌧️' },
  { name: 'ChromaDB', category: 'db', icon: '🗄️' },
  { name: 'SQL', category: 'db', icon: '💾' },
];

export function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSkills = allSkills.filter(skill => 
    activeFilter === 'all' ? true : skill.category === activeFilter
  );

  return (
    <section id="skills" className="py-24 relative bg-background/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all interactive ${
                activeFilter === cat.id 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'glass text-muted-foreground hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry/Cloud Layout */}
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
        >
          {filteredSkills.map((skill, index) => {
            const categoryConfig = skillCategories.find(c => c.id === skill.category);
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                className={`flex items-center gap-3 px-6 py-4 glass-panel rounded-2xl interactive cursor-default group hover:-translate-y-2 transition-transform duration-300 border ${categoryConfig?.border || 'border-white/10'} ${categoryConfig?.bg || 'hover:bg-white/5'}`}
              >
                <span className="text-2xl filter drop-shadow-md">{skill.icon}</span>
                <span className={`font-semibold tracking-wide ${categoryConfig?.color || 'text-white'}`}>
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
