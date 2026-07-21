import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';

const certifications = [
  { title: "Machine Learning Specialization", issuer: "Coursera / DeepLearning.AI", initials: "ML" },
  { title: "LangChain for LLM Application Development", issuer: "DeepLearning.AI", initials: "LC" },
  { title: "Prompt Engineering for Developers", issuer: "OpenAI / DeepLearning.AI", initials: "PE" },
  { title: "React Developer", issuer: "Meta / Coursera", initials: "RC" },
  { title: "Full Stack Web Development", issuer: "MERN Stack", initials: "FS" },
  { title: "Python for Data Science", issuer: "IBM / Coursera", initials: "PY" },
  { title: "SQL for Data Analysis", issuer: "Mode Analytics", initials: "SQL" },
  { title: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", initials: "JS" },
  { title: "Git & GitHub Fundamentals", issuer: "GitHub", initials: "GIT" },
  { title: "Cloud Computing Fundamentals", issuer: "AWS/Google", initials: "CC" }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Professional <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning is part of the job. Here are some of the professional certifications I've earned to stay at the cutting edge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-panel p-6 rounded-2xl group hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 interactive"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center font-display font-bold text-lg text-white group-hover:scale-110 transition-transform">
                  {cert.initials}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white/90 leading-tight mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <Award className="w-3.5 h-3.5" />
                    {cert.issuer}
                  </div>
                  
                  <div className="inline-flex items-center gap-1 text-xs font-medium text-primary/80 group-hover:text-primary transition-colors cursor-pointer">
                    View Credential <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
