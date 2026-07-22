import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: "Data Analyst Associate Certification",
    issuer: "DataCamp",
    initials: "DC",
    detail: "Passed DA101 (timed) + DA501P (practical) exams",
    accent: "hsl(320 48% 42%)",
  },
  {
    title: "Generative AI with Azure OpenAI",
    issuer: "Microsoft Learn",
    initials: "MS",
    detail: "3-module path: Azure OpenAI, prompt engineering & SDKs",
    accent: "hsl(345 35% 50%)",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    initials: "ML",
    accent: "hsl(275 30% 52%)",
  },
  {
    title: "LangChain for LLM Application Development",
    issuer: "DeepLearning.AI",
    initials: "LC",
    accent: "hsl(320 48% 42%)",
  },
  {
    title: "Prompt Engineering for Developers",
    issuer: "OpenAI / DeepLearning.AI",
    initials: "PE",
    accent: "hsl(345 35% 50%)",
  },
  {
    title: "React Developer",
    issuer: "Meta / Coursera",
    initials: "RC",
    accent: "hsl(275 30% 52%)",
  },
  {
    title: "Full Stack Web Development (MERN)",
    issuer: "Coursera",
    initials: "FS",
    accent: "hsl(38 58% 44%)",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    initials: "PY",
    accent: "hsl(320 48% 42%)",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    initials: "JS",
    accent: "hsl(345 35% 50%)",
  },
  {
    title: "Git & GitHub Fundamentals",
    issuer: "GitHub",
    initials: "GIT",
    accent: "hsl(275 30% 52%)",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 relative bg-background">
      <div className="container mx-auto px-4 md:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-3">
            Certifications <span className="text-gradient">&amp; Courses</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
            Continuous learning is part of the job — staying at the cutting edge of AI and software engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -3 }}
              className="glass-panel p-3.5 md:p-5 rounded-xl group interactive cursor-default flex flex-col gap-3 transition-all duration-300"
              style={{ borderColor: 'rgba(200,130,170,0.08)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${cert.accent}50`;
                el.style.boxShadow   = `0 0 18px ${cert.accent}20`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(200,130,170,0.08)';
                el.style.boxShadow   = 'none';
              }}
            >
              {/* Badge */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-display font-bold text-xs md:text-sm text-white flex-shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: `linear-gradient(135deg, ${cert.accent}55, ${cert.accent}22)`, border: `1px solid ${cert.accent}40` }}>
                {cert.initials}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-white/90 text-xs md:text-sm leading-snug mb-1 group-hover:text-white transition-colors">
                  {cert.title}
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  {cert.issuer}
                </p>
                {cert.detail && (
                  <p className="text-[10px] md:text-xs mt-1 leading-snug" style={{ color: `${cert.accent}` }}>
                    {cert.detail}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
