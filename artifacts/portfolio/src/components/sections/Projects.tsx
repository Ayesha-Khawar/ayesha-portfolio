import { motion } from 'framer-motion';
import { ExternalLink, Github, Cpu, MessageSquare } from 'lucide-react';

const projects = [
  {
    title: "HARBOR",
    fullTitle: "Health Analytics, Rescue Backup & Operations Routing",
    category: "Full Stack + AI · Final Year Project",
    description: "A full-stack healthcare platform with modular REST APIs, type-safe validation, and role-based architecture. Features an MCP-based multi-agent AI system with Gemini & Groq LLM integration and event-driven orchestration for AI-powered healthcare decision support.",
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Neon", "Drizzle ORM", "JWT", "Gemini", "Groq", "Google Places", "MCP"],
    github: "https://github.com/Ayesha-Khawar",
    accent: "hsl(320 48% 42%)",
    accentLight: "hsl(320 48% 68%)",
    Icon: Cpu,
  },
  {
    title: "RAG Chatbot",
    fullTitle: "Chatbot using RAG with LangChain & Ollama",
    category: "AI / Machine Learning",
    description: "A Retrieval-Augmented Generation chatbot using LangChain and Ollama embeddings for context-aware responses. Implements vector search with ChromaDB and an LLM pipeline for embedding, retrieval, and generation via a Python backend.",
    tech: ["Python", "LangChain", "Ollama", "ChromaDB", "FAISS", "Embeddings", "RAG Pipeline"],
    github: "https://github.com/Ayesha-Khawar",
    accent: "hsl(275 30% 52%)",
    accentLight: "hsl(275 30% 72%)",
    Icon: MessageSquare,
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className="glass-panel rounded-2xl p-5 md:p-7 flex flex-col h-full group transition-all duration-300 relative overflow-hidden"
      style={{ borderColor: 'rgba(200,130,170,0.1)' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${project.accent}55`;
        el.style.boxShadow   = `0 0 32px ${project.accent}1a`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(200,130,170,0.1)';
        el.style.boxShadow   = 'none';
      }}
    >
      {/* Subtle gradient bloom on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${project.accent}10, transparent 60%)` }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}44` }}>
            <project.Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: project.accentLight }} />
          </div>
          <div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: project.accentLight }}>
              {project.category}
            </span>
            <h3 className="text-lg md:text-2xl font-display font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>
        <a href={project.github} target="_blank" rel="noreferrer"
          className="p-2 rounded-lg transition-colors flex-shrink-0 interactive"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}
          onClick={e => e.stopPropagation()}
          onMouseEnter={e => (e.currentTarget.style.color = project.accentLight)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          <Github size={16} />
        </a>
      </div>

      {/* Subtitle */}
      <p className="text-xs mb-2 italic" style={{ color: `${project.accentLight}aa` }}>
        {project.fullTitle}
      </p>

      {/* Description */}
      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-5 flex-grow">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span key={tech}
            className="px-2 py-0.5 text-[10px] md:text-xs rounded-md transition-colors"
            style={{ background: `${project.accent}14`, border: `1px solid ${project.accent}30`, color: 'rgba(255,255,255,0.65)' }}>
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ background: 'hsl(320 48% 42%)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-15"
        style={{ background: 'hsl(275 30% 52%)' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-3">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
            Intelligent systems and robust applications built from the ground up.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
