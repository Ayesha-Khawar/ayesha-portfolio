import { motion } from 'framer-motion';

const experiences = [
  {
    company: "Texense",
    role: "Artificial Intelligence Developer Intern",
    period: "2024",
    description: "Developed and deployed AI-powered features using Large Language Models (LLMs). Built intelligent automation pipelines and worked on integrating AI capabilities into production software systems.",
    tags: ["Python", "LLMs", "AI Development"]
  },
  {
    company: "NYLP",
    role: "AI & Data Analysis Affairs Intern",
    period: "2024",
    description: "Conducted data analysis and applied AI techniques to derive meaningful insights. Worked with data pipelines, visualization tools, and machine learning models.",
    tags: ["Python", "Data Analysis", "Machine Learning"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-background/50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-8 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 md:translate-x-[-50%] z-10 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />

                {/* Content Side */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0" />

                {/* Card Side */}
                <div className="w-full md:w-1/2 pl-8 md:px-8">
                  <div className="glass-panel p-8 rounded-2xl hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/20 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    
                    <h4 className="text-lg text-primary mb-4 font-medium flex items-center gap-2">
                      <span className="w-6 h-px bg-primary/50" />
                      {exp.company}
                    </h4>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 text-xs rounded bg-white/5 text-white/80 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
