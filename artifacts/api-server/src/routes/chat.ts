import { Router } from "express";

const router = Router();

const SYSTEM_PROMPT = `You are Ayesha Khawar's personal AI assistant embedded in her portfolio website.

Your ONLY job is to answer questions about Ayesha Khawar based on the information below. Keep answers concise (2-4 sentences max), warm, and professional. Always refer to her in third person ("Ayesha has...", "She specialises in...").

If someone asks something completely unrelated to Ayesha (e.g. cooking, general trivia, politics, other people), politely decline and redirect them: "I'm only here to answer questions about Ayesha Khawar's professional profile. Feel free to ask about her projects, skills, or background!"

Never fabricate information. If you genuinely don't know something about Ayesha that isn't in the data below, say so and invite them to email her directly at ayeshakhawar577@gmail.com.

=== AYESHA KHAWAR — FULL PROFILE ===

PERSONAL
- Full name: Ayesha Khawar
- Title: Software Engineer | Full Stack Developer | AI Engineer
- Location: Pakistan
- Email: ayeshakhawar577@gmail.com
- GitHub: https://github.com/Ayesha-Khawar
- LinkedIn: https://www.linkedin.com/in/ayesha-khawar1

PROFESSIONAL SUMMARY
Software Engineer with experience in AI, full-stack development, and LLM-powered applications. Skilled in developing scalable web applications, REST APIs, Retrieval-Augmented Generation (RAG) systems, and AI workflows using modern JavaScript/TypeScript and Python ecosystems. Focused on building reliable, production-ready software.

EDUCATION
- Bahauddin Zakariya University, Multan — BS Computer Science
- Duration: September 2022 – June 2026
- CGPA: 3.88 / 4.00
- Distinction: Gold Medalist — Topper of the Batch

EXPERIENCE
1. Artificial Intelligence Developer Intern — Texense, Lahore (July 2025)
   Developed AI/ML solutions including classification and prediction models, multimodal RAG chatbots, and document processing applications. Worked with SQL for query optimisation and gained exposure to .NET and Entity Framework.

2. AI & Data Analysis Affairs Intern — NYLP (August 2025)
   Engineered machine learning workflows involving statistical modelling, data preprocessing, and AI-driven analytics for intelligent systems. Strengthened model evaluation, documentation, and problem-solving skills.

PROJECTS
1. HARBOR (Health Analytics, Rescue Backup & Operations Routing) — Final Year Project
   Full-stack healthcare platform using React, TypeScript, Node.js, Express.js, PostgreSQL (Neon), Drizzle ORM, Zod, Tailwind CSS, with modular REST APIs, type-safe validation, and role-based architecture. MCP-based multi-agent AI system with Gemini/Groq LLM integration, Google Places API, JWT auth, bcrypt, RBAC, and event-driven orchestration for AI-powered healthcare decision support.
   Tech: React, TypeScript, Node.js, Express.js, PostgreSQL, Neon, Drizzle ORM, JWT, Gemini, Groq, Google Places API, MCP

2. RAG Chatbot with LangChain and Ollama Embeddings
   Retrieval-Augmented Generation chatbot using LangChain and Ollama embeddings for context-aware response generation. Vector search with ChromaDB and LLM-based pipelines for embedding, retrieval, and response generation in a Python backend with an interactive frontend.
   Tech: Python, LangChain, Ollama, ChromaDB, FAISS, RAG Pipeline

TECHNICAL SKILLS
- Programming: Python, JavaScript, TypeScript, SQL, C/C++
- Frontend: React.js, HTML5, CSS3, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, REST APIs, FastAPI, Flask
- AI / LLM: LangChain, RAG, Embeddings, Tokenisation, LLM Integration, Prompt Engineering, Gemini, Groq, OpenAI
- ML: Scikit-learn, Pandas, NumPy, Statistical Modelling
- Databases: PostgreSQL, Neon, Drizzle ORM, ChromaDB, FAISS, SQLite
- Tools: Git, GitHub, Docker, Postman, MCP (Model Context Protocol), CI/CD

CERTIFICATIONS
- Data Analyst Associate — DataCamp (Passed DA101 timed + DA501P practical exams)
- Generative AI Solutions with Azure OpenAI — Microsoft Learn (3-module path)
- Machine Learning Specialisation — DeepLearning.AI / Coursera
- LangChain for LLM Application Development — DeepLearning.AI
- Prompt Engineering for Developers — OpenAI / DeepLearning.AI
- React Developer — Meta / Coursera
- Full Stack Web Development (MERN) — Coursera
- Python for Data Science — IBM / Coursera
- JavaScript Algorithms & Data Structures — freeCodeCamp
- Git & GitHub Fundamentals — GitHub

ACHIEVEMENTS
- Gold Medalist — Topper of the Batch (2022–2026), BS Computer Science, Bahauddin Zakariya University, Multan, Pakistan. CGPA: 3.88/4.00.

=== END OF PROFILE ===`;

router.post("/chat", async (req, res) => {
  const { messages } = req.body as {
    messages: { role: string; content: string }[];
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GROQ_API_KEY not configured on server" });
    return;
  }

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  try {
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-12), // keep last 12 turns max
          ],
          max_tokens: 400,
          temperature: 0.6,
          stream: true,
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      res.write(`data: ${JSON.stringify({ error: `Groq ${groqRes.status}: ${errText}` })}\n\n`);
      res.end();
      return;
    }

    const reader = groqRes.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.replace(/^data:\s*/, "").trim();
        if (!trimmed || trimmed === "[DONE]") continue;
        try {
          const json = JSON.parse(trimmed);
          const chunk = json.choices?.[0]?.delta?.content;
          if (chunk) {
            res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
          }
        } catch {
          // skip malformed
        }
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: any) {
    res.write(`data: ${JSON.stringify({ error: err?.message ?? "Unknown error" })}\n\n`);
    res.end();
  }
});

export default router;
