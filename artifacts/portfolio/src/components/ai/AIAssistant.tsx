import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Wifi, WifiOff } from 'lucide-react';
import { knowledgeBase } from '@/data/knowledge-base';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTIONS = [
  'Who is Ayesha?',
  'HARBOR project',
  'Technical skills',
  'Experience',
  'Certifications',
];

/* ── Build system prompt from real knowledge base ─────────────── */
const SYSTEM_PROMPT = `You are Ayesha Khawar's personal AI assistant embedded in her portfolio website. Answer questions about her in a warm, professional, and concise way. Use first-person references to Ayesha (e.g. "Ayesha has…", "She specialised in…"). Keep answers short — 2-4 sentences max. Never fabricate information.

Here is everything you know about Ayesha:

PERSONAL
Name: ${knowledgeBase.about.name}
Title: ${knowledgeBase.about.title}
Location: Pakistan

EDUCATION
University: ${knowledgeBase.about.university}
Degree: BS Computer Science
Period: ${knowledgeBase.about.period}
CGPA: ${knowledgeBase.about.cgpa}
Distinction: Gold Medalist — Topper of the Batch

EXPERIENCE
${knowledgeBase.experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

PROJECTS
${knowledgeBase.projects.map(p => `- ${p.fullName}: ${p.description}\n  Tech: ${p.tech.join(', ')}`).join('\n\n')}

SKILLS
Programming: ${knowledgeBase.skills.programming.join(', ')}
Frontend: ${knowledgeBase.skills.frontend.join(', ')}
Backend: ${knowledgeBase.skills.backend.join(', ')}
AI/LLM: ${knowledgeBase.skills.ai.join(', ')}
ML: ${knowledgeBase.skills.ml.join(', ')}
Databases: ${knowledgeBase.skills.databases.join(', ')}
Tools: ${knowledgeBase.skills.tools.join(', ')}

CERTIFICATIONS
${knowledgeBase.certifications.map(c => `- ${c.title} (${c.issuer})`).join('\n')}

ACHIEVEMENTS
${knowledgeBase.achievements.join('\n')}

CONTACT
Email: ${knowledgeBase.contact.email}
GitHub: ${knowledgeBase.contact.github}
LinkedIn: ${knowledgeBase.contact.linkedin}

If someone asks something outside this knowledge, politely say you don't have that info and invite them to email Ayesha directly at ${knowledgeBase.contact.email}.`;

/* ── Groq streaming fetch ─────────────────────────────────────── */
async function streamGroq(
  messages: { role: string; content: string }[],
  onChunk: (text: string) => void,
  signal: AbortSignal
): Promise<void> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string;
  if (!apiKey) throw new Error('GROQ_API_KEY not configured');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.65,
      stream: true,
    }),
    signal,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error ${response.status}: ${err}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.replace(/^data:\s*/, '').trim();
      if (!trimmed || trimmed === '[DONE]') continue;
      try {
        const json = JSON.parse(trimmed);
        const chunk = json.choices?.[0]?.delta?.content;
        if (chunk) onChunk(chunk);
      } catch {
        // skip malformed chunks
      }
    }
  }
}

/* ── Component ────────────────────────────────────────────────── */
export function AIAssistant() {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm Ayesha's AI assistant, powered by Llama 3. Ask me anything about her background, projects, skills, or experience.",
    },
  ]);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [isOnline, setIsOnline]   = useState(true);
  const abortRef                  = useRef<AbortController | null>(null);
  const messagesEndRef            = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Abort any in-progress request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    const history = messages
      .filter(m => m.content)
      .map(m => ({ role: m.role, content: m.content }));
    history.push({ role: 'user', content: text.trim() });

    try {
      await streamGroq(
        history,
        (chunk) => {
          setIsTyping(false);
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m
            )
          );
        },
        abortRef.current.signal
      );
      setIsOnline(true);
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      console.error('Groq error:', err);
      setIsOnline(false);
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: `Sorry, I couldn't reach the AI right now. Feel free to email Ayesha at ${knowledgeBase.contact.email}!` }
            : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[90] w-13 h-13 rounded-full flex items-center justify-center text-white group interactive shadow-lg ${isOpen ? 'opacity-0 pointer-events-none' : ''}`}
        style={{
          width: 52, height: 52,
          background: 'linear-gradient(135deg, hsl(320 48% 40%), hsl(345 35% 50%))',
          boxShadow: '0 0 22px rgba(160,55,110,0.5), 0 4px 16px rgba(0,0,0,0.4)',
        }}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-5 h-5" />
        {/* Tooltip */}
        <span className="absolute right-14 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{ background: 'rgba(15,5,14,0.9)', border: '1px solid rgba(180,100,140,0.2)', color: 'rgba(255,255,255,0.85)' }}>
          Ask AI
        </span>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: 'hsl(320 48% 42%)' }} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-6 right-6 z-[100] flex flex-col overflow-hidden shadow-2xl"
            style={{
              width: 'min(360px, calc(100vw - 24px))',
              height: 'min(520px, calc(100vh - 80px))',
              background: 'rgba(10, 3, 14, 0.96)',
              border: '1px solid rgba(180,100,140,0.18)',
              borderRadius: 20,
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'rgba(180,100,140,0.15)', background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 52%))' }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">Ayesha's AI</p>
                  <p className="text-[10px] mt-0.5 flex items-center gap-1"
                    style={{ color: isOnline ? 'hsl(140 60% 55%)' : 'hsl(0 60% 55%)' }}>
                    {isOnline ? <Wifi className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
                    {isOnline ? 'Llama 3 · Live' : 'Offline'}
                  </p>
                </div>
              </div>
              <button onClick={() => { setIsOpen(false); abortRef.current?.abort(); }}
                className="p-1.5 rounded-lg transition-colors interactive"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(180,100,140,0.2) transparent' }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, hsl(320 48% 38%), hsl(345 35% 48%))' }}>
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, hsl(320 48% 36%), hsl(345 35% 46%))',
                            color: '#fff',
                            borderBottomRightRadius: 4,
                          }
                        : {
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.88)',
                            borderBottomLeftRadius: 4,
                          }
                    }
                  >
                    {msg.content || (
                      /* skeleton while streaming hasn't started yet */
                      <span className="inline-flex gap-1">
                        {[0, 1, 2].map(i => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator (before first chunk) */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1"
                    style={{ background: 'linear-gradient(135deg, hsl(320 48% 38%), hsl(345 35% 48%))' }}>
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="px-3.5 py-3 rounded-2xl rounded-bl-sm flex gap-1.5"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto"
                style={{ scrollbarWidth: 'none' }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => handleSend(s)}
                    disabled={isTyping}
                    className="px-3 py-1.5 text-xs rounded-full flex-shrink-0 transition-all interactive disabled:opacity-40"
                    style={{
                      background: 'rgba(160,55,110,0.12)',
                      border: '1px solid rgba(160,55,110,0.25)',
                      color: 'hsl(320 48% 72%)',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); handleSend(input); }}
              className="p-3 flex gap-2 border-t"
              style={{ borderColor: 'rgba(180,100,140,0.12)' }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything…"
                disabled={isTyping}
                className="flex-1 text-sm px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all interactive disabled:opacity-35 shrink-0"
                style={{ background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 52%))' }}
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
