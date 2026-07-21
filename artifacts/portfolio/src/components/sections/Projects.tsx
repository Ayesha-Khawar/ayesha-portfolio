import { motion } from 'framer-motion';
import { useTilt } from '@/hooks/use-interactions';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "HARBOR",
    category: "Full Stack + AI",
    description: "An intelligent full-stack platform that combines AI capabilities with a robust backend architecture. Features role-based authentication, AI-powered assistance using Gemini and Groq LLMs, location services via Google Places API, and Model Context Protocol (MCP) integration.",
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Neon", "Drizzle ORM", "JWT", "Gemini", "Groq", "Google Places", "MCP", "REST APIs", "Role-Based Auth"],
    color: "from-primary to-accent",
    link: "#",
    github: "#"
  },
  {
    title: "RAG Chatbot",
    category: "AI / Machine Learning",
    description: "A production-ready Retrieval-Augmented Generation (RAG) chatbot system. Uses vector embeddings and semantic search to retrieve relevant context before generating accurate, grounded responses using Large Language Models.",
    tech: ["Python", "LangChain", "Embeddings", "Vector Search", "ChromaDB", "LLMs", "RAG Pipeline"],
    color: "from-secondary to-primary",
    link: "#",
    github: "#"
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const { ref, style } = useTilt(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative [perspective:1000px] w-full"
    >
      <div 
        ref={ref}
        style={style}
        className="glass-panel rounded-3xl p-8 h-full flex flex-col border border-white/10 group transition-all duration-300 hover:border-white/20"
      >
        {/* Animated Gradient Border Effect */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 bg-gradient-to-r ${project.color} bg-clip-text text-transparent border border-white/10`}>
              {project.category}
            </span>
            <h3 className="text-3xl font-display font-bold text-white group-hover:text-glow transition-all">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-3">
            <a href={project.github} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors interactive">
              <Github size={20} />
            </a>
            <a href={project.link} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors interactive">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>

        <div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string, i: number) => (
              <span 
                key={i} 
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background/50 border border-white/5 text-white/70 group-hover:border-white/20 group-hover:text-white transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of intelligent systems and robust applications I've built.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
