import { motion } from 'framer-motion';

const experiences = [
  {
    company: "Texense",
    location: "Lahore",
    role: "Artificial Intelligence Developer Intern",
    period: "July 2025",
    description: "Developed AI/ML solutions including classification and prediction models, multimodal RAG chatbots, and document processing applications. Worked with SQL for query optimization and gained exposure to .NET and Entity Framework.",
    tags: ["Python", "LLMs", "RAG", "SQL", "ML Models"],
    accent: "hsl(320 48% 42%)",
    accentText: "hsl(320 48% 68%)",
  },
  {
    company: "NYLP",
    location: "",
    role: "AI & Data Analysis Affairs Intern",
    period: "August 2025",
    description: "Engineered machine learning workflows involving statistical modeling, data preprocessing, and AI-driven analytics for intelligent systems. Strengthened model evaluation, documentation, and problem-solving skills.",
    tags: ["Python", "Data Analysis", "ML Pipelines", "Statistical Modeling"],
    accent: "hsl(345 35% 50%)",
    accentText: "hsl(345 35% 70%)",
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 relative bg-background/50">
      <div className="container mx-auto px-4 md:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-3">
            Professional <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, hsl(320 48% 42% / 0.4), transparent)', transform: 'translateX(-50%)' }} />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className={`relative flex md:flex-row gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full border-2 z-10"
                  style={{
                    background: 'hsl(var(--background))',
                    borderColor: exp.accent,
                    transform: 'translateX(-50%)',
                    boxShadow: `0 0 8px ${exp.accent}`,
                  }} />

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-1/2" />

                {/* Card */}
                <div className="w-full md:w-1/2 pl-10 md:px-6">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-panel p-5 md:p-7 rounded-2xl transition-all duration-300 group"
                    style={{ borderColor: 'rgba(200,130,170,0.1)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${exp.accent}55`;
                      el.style.boxShadow = `0 0 24px ${exp.accent}22`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(200,130,170,0.1)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <h3 className="text-sm md:text-base font-display font-bold text-white leading-snug flex-1">
                        {exp.role}
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                        style={{ background: `${exp.accent}22`, color: exp.accentText, border: `1px solid ${exp.accent}40` }}>
                        {exp.period}
                      </span>
                    </div>

                    {/* Company */}
                    <p className="text-sm font-medium mb-3 flex items-center gap-1.5" style={{ color: exp.accentText }}>
                      <span className="w-4 h-px" style={{ background: exp.accent }} />
                      {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                    </p>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
