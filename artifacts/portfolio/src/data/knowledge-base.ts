export const knowledgeBase = {
  about: {
    name: "Ayesha Khawar",
    title: "Software Engineer • Full Stack Developer • AI Engineer",
    description: "A passionate Software and AI Engineer specializing in building intelligent, AI-powered applications that bridge the gap between cutting-edge research and production-ready systems. Expertise spans LLM systems, RAG pipelines, full-stack web development, and scalable backend architectures.",
    education: "Graduated as Topper of the Batch with a CGPA of 3.88/4.00 from Bahauddin Zakariya University (2022–2026). The official Gold Medal is pending conferment.",
    cgpa: "3.88 / 4.00",
    university: "Bahauddin Zakariya University",
    period: "2022–2026"
  },
  experience: [
    {
      company: "Texense",
      role: "Artificial Intelligence Developer Intern",
      period: "2024",
      description: "Developed and deployed AI-powered features using Large Language Models (LLMs). Built intelligent automation pipelines and worked on integrating AI capabilities into production software systems."
    },
    {
      company: "NYLP",
      role: "AI & Data Analysis Affairs Intern",
      period: "2024",
      description: "Conducted data analysis and applied AI techniques to derive meaningful insights. Worked with data pipelines, visualization tools, and machine learning models."
    }
  ],
  projects: [
    {
      name: "HARBOR",
      description: "An intelligent full-stack platform that combines AI capabilities with a robust backend architecture. Features role-based authentication, AI-powered assistance using Gemini and Groq LLMs, location services via Google Places API, and Model Context Protocol (MCP) integration.",
      tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Neon", "Drizzle ORM", "JWT", "Gemini", "Groq", "Google Places", "MCP"]
    },
    {
      name: "RAG Chatbot",
      description: "A production-ready Retrieval-Augmented Generation (RAG) chatbot system. Uses vector embeddings and semantic search to retrieve relevant context before generating accurate, grounded responses using Large Language Models.",
      tech: ["Python", "LangChain", "Embeddings", "Vector Search", "ChromaDB", "LLMs", "RAG Pipeline"]
    }
  ],
  skills: {
    programming: ["Python", "JavaScript", "TypeScript", "C/C++", "SQL"],
    frontend: ["React", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST APIs", "FastAPI"],
    ai: ["LangChain", "RAG", "Embeddings", "Vector Search", "Gemini", "Groq", "OpenAI"],
    ml: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    databases: ["PostgreSQL", "Neon", "Drizzle ORM", "ChromaDB", "SQLite"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Docker", "Vercel", "Netlify", "GitHub Actions"]
  },
  certifications: [
    { title: "Machine Learning Specialization", issuer: "Coursera / DeepLearning.AI" },
    { title: "LangChain for LLM Application Development", issuer: "DeepLearning.AI" },
    { title: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp" },
    { title: "Python for Data Science", issuer: "IBM / Coursera" },
    { title: "React Developer", issuer: "Meta / Coursera" },
    { title: "SQL for Data Analysis", issuer: "Mode Analytics" },
    { title: "Prompt Engineering for Developers", issuer: "OpenAI / DeepLearning.AI" },
    { title: "Full Stack Web Development", issuer: "MERN Stack" },
    { title: "Git & GitHub Fundamentals", issuer: "GitHub" },
    { title: "Cloud Computing Fundamentals", issuer: "AWS/Google" }
  ],
  contact: {
    email: "ayesha.khawar@example.com",
    github: "https://github.com/Ayesha-Khawar",
    linkedin: "https://www.linkedin.com/in/ayesha-khawar1"
  }
};

export function getAIResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes("about") || q.includes("who is") || q.includes("background")) {
    return knowledgeBase.about.description;
  }
  
  if (q.includes("education") || q.includes("university") || q.includes("degree")) {
    return knowledgeBase.about.education;
  }
  
  if (q.includes("cgpa") || q.includes("gpa") || q.includes("grades") || q.includes("topper")) {
    return `Ayesha graduated as the Topper of her Batch with a CGPA of ${knowledgeBase.about.cgpa} from ${knowledgeBase.about.university}. The official Gold Medal is pending conferment.`;
  }
  
  if (q.includes("harbor")) {
    return knowledgeBase.projects[0].description + " Tech stack includes: " + knowledgeBase.projects[0].tech.join(", ") + ".";
  }
  
  if (q.includes("rag") || q.includes("chatbot")) {
    return knowledgeBase.projects[1].description + " Tech stack includes: " + knowledgeBase.projects[1].tech.join(", ") + ".";
  }
  
  if (q.includes("project")) {
    return "Ayesha has worked on several projects, most notably HARBOR (a full-stack AI platform) and a production-ready RAG Chatbot. Which one would you like to know more about?";
  }
  
  if (q.includes("texense")) {
    return knowledgeBase.experience[0].description;
  }
  
  if (q.includes("nylp")) {
    return knowledgeBase.experience[1].description;
  }
  
  if (q.includes("experience") || q.includes("intern") || q.includes("work")) {
    return "Ayesha has completed internships as an AI Developer Intern at Texense (2024) and an AI & Data Analysis Affairs Intern at NYLP (2024), focusing on LLMs, automation pipelines, and data analysis.";
  }
  
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
    return `Ayesha is proficient in Programming (${knowledgeBase.skills.programming.join(", ")}), Frontend (${knowledgeBase.skills.frontend.join(", ")}), Backend (${knowledgeBase.skills.backend.join(", ")}), and AI/ML (${knowledgeBase.skills.ai.join(", ")}, ${knowledgeBase.skills.ml.join(", ")}).`;
  }
  
  if (q.includes("certif")) {
    return "Ayesha has numerous certifications including Machine Learning Specialization, LangChain for LLM Application Development, and Prompt Engineering for Developers, among others.";
  }
  
  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
    return `You can reach Ayesha at ${knowledgeBase.contact.email} or connect on LinkedIn at ${knowledgeBase.contact.linkedin}.`;
  }
  
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return "Hi there! I'm Ayesha's AI Assistant. Ask me anything about her education, projects, internships, achievements, technical skills, certifications, or experience.";
  }
  
  return "I don't have that specific information. Feel free to reach out to Ayesha directly at ayesha.khawar@example.com or via LinkedIn!";
}
