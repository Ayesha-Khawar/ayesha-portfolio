export const knowledgeBase = {
  about: {
    name: "Ayesha Khawar",
    title: "Software Engineer • Full Stack Developer • AI Engineer",
    description: "A passionate Software and AI Engineer specializing in building intelligent, AI-powered applications that bridge the gap between cutting-edge research and production-ready systems. Expertise spans LLM systems, RAG pipelines, full-stack web development, and scalable backend architectures.",
    education: "Graduated as Topper of the Batch (Gold Medalist) with a CGPA of 3.88/4.00 from Bahauddin Zakariya University, Multan (BS Computer Science, 2022–2026).",
    cgpa: "3.88 / 4.00",
    university: "Bahauddin Zakariya University, Multan",
    period: "2022–2026"
  },
  experience: [
    {
      company: "Texense",
      role: "Artificial Intelligence Developer Intern",
      period: "July 2025",
      location: "Lahore",
      description: "Developed AI/ML solutions including classification and prediction models, multimodal RAG chatbots, and document processing applications. Worked with SQL for query optimization and gained exposure to .NET and Entity Framework."
    },
    {
      company: "NYLP",
      role: "AI & Data Analysis Affairs Intern",
      period: "August 2025",
      description: "Engineered machine learning workflows involving statistical modeling, data preprocessing, and AI-driven analytics for intelligent systems. Strengthened model evaluation, documentation, and problem-solving skills."
    }
  ],
  projects: [
    {
      name: "HARBOR",
      fullName: "Harbor (Health Analytics, Rescue Backup & Operations Routing)",
      description: "Final Year Project. A full-stack healthcare platform using React, TypeScript, Node.js, Express.js, PostgreSQL (Neon), Drizzle ORM, Zod, and Tailwind CSS with modular REST APIs, type-safe validation, and role-based architecture. Features an MCP-based multi-agent AI system with Gemini Groq LLM integration, Google Places API, JWT authentication, bcrypt, RBAC, and event-driven orchestration for AI-powered healthcare decision support.",
      tech: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Neon", "Drizzle ORM", "JWT", "Gemini", "Groq", "Google Places", "MCP", "REST APIs", "Role-Based Auth", "Zod", "Tailwind CSS"]
    },
    {
      name: "RAG Chatbot",
      fullName: "Chatbot using RAG with LangChain and Ollama Embeddings",
      description: "A Retrieval-Augmented Generation (RAG) chatbot using LangChain and Ollama embeddings for context-aware response generation. Implemented vector search with ChromaDB and LLM-based pipelines for embedding, retrieval, and response generation in a Python backend with an interactive frontend.",
      tech: ["Python", "LangChain", "Ollama", "Embeddings", "Vector Search", "ChromaDB", "LLMs", "RAG Pipeline"]
    }
  ],
  skills: {
    programming: ["Python", "JavaScript", "TypeScript", "SQL", "C/C++"],
    frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST APIs", "FastAPI", "Flask"],
    ai: ["LangChain", "RAG", "Embeddings", "Tokenization", "LLM Integration", "Prompt Engineering", "Gemini", "Groq", "OpenAI"],
    ml: ["Scikit-learn", "Pandas", "NumPy", "Statistical Modeling"],
    databases: ["PostgreSQL", "Neon", "Drizzle ORM", "ChromaDB", "FAISS", "SQLite"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Docker", "MCP (Model Context Protocol)", "CI/CD"]
  },
  certifications: [
    { title: "Data Analyst Associate Certification", issuer: "DataCamp", detail: "Passed DA101 (timed) and DA501P (practical) — SQL, data analysis, data-driven decision making." },
    { title: "Develop Generative AI Solutions with Azure OpenAI", issuer: "Microsoft Learn", detail: "3-module learning path covering Azure OpenAI, generative AI models, prompt engineering, and Azure SDK development." },
    { title: "Machine Learning Specialization", issuer: "DeepLearning.AI / Coursera" },
    { title: "LangChain for LLM Application Development", issuer: "DeepLearning.AI" },
    { title: "Prompt Engineering for Developers", issuer: "OpenAI / DeepLearning.AI" },
    { title: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp" },
    { title: "Python for Data Science", issuer: "IBM / Coursera" },
    { title: "React Developer", issuer: "Meta / Coursera" },
    { title: "Git & GitHub Fundamentals", issuer: "GitHub" },
    { title: "Full Stack Web Development (MERN)", issuer: "Coursera" }
  ],
  achievements: [
    "Gold Medalist — Topper of the Batch (2022–2026) in BS Computer Science at Bahauddin Zakariya University, Multan, Pakistan, with a CGPA of 3.88/4.00."
  ],
  contact: {
    email: "ayeshakhawar577@gmail.com",
    phone: "+923708337992",
    github: "https://github.com/Ayesha-Khawar",
    linkedin: "https://www.linkedin.com/in/ayesha-khawar1"
  }
};

export function getAIResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return "Hi there! I'm Ayesha's AI Assistant. Ask me anything about her education, projects, internships, achievements, technical skills, certifications, or experience. 😊";
  }

  if (q.includes("about") || q.includes("who is") || q.includes("background") || q.includes("introduce")) {
    return knowledgeBase.about.description + " " + knowledgeBase.about.education;
  }

  if (q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("bzu") || q.includes("zakariya")) {
    return `Ayesha studied BS Computer Science at ${knowledgeBase.about.university} (${knowledgeBase.about.period}), graduating with a CGPA of ${knowledgeBase.about.cgpa} as the Topper of her Batch — earning the Gold Medal.`;
  }

  if (q.includes("cgpa") || q.includes("gpa") || q.includes("grade") || q.includes("topper") || q.includes("gold medal") || q.includes("achievement")) {
    return `Ayesha graduated as the Gold Medalist — Topper of her Batch — with a CGPA of ${knowledgeBase.about.cgpa} from ${knowledgeBase.about.university}.`;
  }

  if (q.includes("harbor") || q.includes("healthcare") || q.includes("final year") || q.includes("fyp")) {
    const p = knowledgeBase.projects[0];
    return `${p.fullName}: ${p.description} Tech stack: ${p.tech.join(", ")}.`;
  }

  if (q.includes("rag") || q.includes("chatbot") || q.includes("langchain") || q.includes("ollama") || q.includes("chroma")) {
    const p = knowledgeBase.projects[1];
    return `${p.fullName}: ${p.description} Tech stack: ${p.tech.join(", ")}.`;
  }

  if (q.includes("project")) {
    return "Ayesha has built two flagship projects: HARBOR (a full-stack AI-powered healthcare platform — her Final Year Project) and a RAG Chatbot using LangChain, ChromaDB, and Ollama. Ask me about either one!";
  }

  if (q.includes("texense")) {
    const e = knowledgeBase.experience[0];
    return `At ${e.company} (${e.role}, ${e.period}): ${e.description}`;
  }

  if (q.includes("nylp")) {
    const e = knowledgeBase.experience[1];
    return `At ${e.company} (${e.role}, ${e.period}): ${e.description}`;
  }

  if (q.includes("experience") || q.includes("intern") || q.includes("work")) {
    return "Ayesha has completed two internships: AI Developer Intern at Texense (Lahore, July 2025) — building AI/ML models and multimodal RAG chatbots; and AI & Data Analysis Affairs Intern at NYLP (August 2025) — engineering ML workflows and data analytics.";
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("know")) {
    return `Ayesha is proficient in: Programming (${knowledgeBase.skills.programming.join(", ")}), Frontend (${knowledgeBase.skills.frontend.join(", ")}), Backend (${knowledgeBase.skills.backend.join(", ")}), AI/LLM (${knowledgeBase.skills.ai.join(", ")}), ML (${knowledgeBase.skills.ml.join(", ")}), and Databases (${knowledgeBase.skills.databases.join(", ")}).`;
  }

  if (q.includes("python")) {
    return "Yes! Python is one of Ayesha's core languages — she uses it for AI/ML projects, LangChain pipelines, data analysis, Flask APIs, and scripting.";
  }

  if (q.includes("certif") || q.includes("course") || q.includes("datacamp") || q.includes("microsoft") || q.includes("azure")) {
    return "Ayesha's verified certifications include: DataCamp Data Analyst Associate (DA101 + DA501P practical exams), Microsoft Learn — Generative AI Solutions with Azure OpenAI, Machine Learning Specialization (DeepLearning.AI), LangChain for LLM Development, Prompt Engineering for Developers, and more.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("phone")) {
    return `You can reach Ayesha at ${knowledgeBase.contact.email} or call/WhatsApp ${knowledgeBase.contact.phone}. You can also connect on LinkedIn at ${knowledgeBase.contact.linkedin}.`;
  }

  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return "You can download Ayesha's résumé using the Download Résumé button in the Contact section or the About section. It's her most up-to-date CV.";
  }

  if (q.includes("mcp") || q.includes("model context")) {
    return "Ayesha has hands-on experience with MCP (Model Context Protocol) — used in the HARBOR project to build a multi-agent AI system for healthcare decision support.";
  }

  return `I don't have that specific information in my knowledge base. Feel free to reach out to Ayesha directly at ${knowledgeBase.contact.email} — she'd be happy to answer!`;
}
