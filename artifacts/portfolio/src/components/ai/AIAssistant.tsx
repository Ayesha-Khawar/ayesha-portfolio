import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Wifi, WifiOff } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTIONS = [
  'Who is Ayesha?',
  'Tell me about HARBOR',
  'What are her skills?',
  'Experience & internships',
  'Certifications',
];

/* ── Stream from /api/chat (proxied to the api-server) ───────── */
async function streamChat(
  messages: { role: string; content: string }[],
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void,
  signal: AbortSignal
) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!res.ok || !res.body) {
    onError(`Server error ${res.status}`);
    return;
  }

  const reader = res.body.getReader();
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
      if (!trimmed) continue;
      try {
        const json = JSON.parse(trimmed);
        if (json.error) { onError(json.error); return; }
        if (json.content) onChunk(json.content);
        if (json.done) { onDone(); return; }
      } catch {
        // skip malformed lines
      }
    }
  }
  onDone();
}

/* ── Component ────────────────────────────────────────────────── */
export function AIAssistant() {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm Ayesha's AI assistant, powered by Llama 3. Ask me anything about her background, projects, skills, or experience! 😊",
    },
  ]);
  const [input, setInput]       = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [online, setOnline]     = useState(true);
  const abortRef                = useRef<AbortController | null>(null);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: trimmed };
    const asstId = `a-${Date.now() + 1}`;
    const asstMsg: Message = { id: asstId, role: 'assistant', content: '' };

    setMessages(prev => [...prev, userMsg, asstMsg]);
    setInput('');
    setIsTyping(true);

    // Build conversation history (last 10 turns max)
    const history = [...messages, userMsg]
      .filter(m => m.content)
      .slice(-10)
      .map(m => ({ role: m.role, content: m.content }));

    try {
      await streamChat(
        history,
        (chunk) => {
          setIsTyping(false);
          setMessages(prev =>
            prev.map(m => m.id === asstId ? { ...m, content: m.content + chunk } : m)
          );
        },
        () => { setIsTyping(false); setOnline(true); },
        (errMsg) => {
          setIsTyping(false);
          setOnline(false);
          setMessages(prev =>
            prev.map(m =>
              m.id === asstId
                ? { ...m, content: "Sorry, I couldn't reach the AI right now. Please email Ayesha directly at ayeshakhawar577@gmail.com!" }
                : m
            )
          );
          console.error('Chat error:', errMsg);
        },
        abortRef.current.signal
      );
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      setIsTyping(false);
      setOnline(false);
      setMessages(prev =>
        prev.map(m =>
          m.id === asstId
            ? { ...m, content: "Connection failed. Please try again or reach out to Ayesha directly!" }
            : m
        )
      );
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[90] rounded-full flex items-center justify-center text-white group interactive shadow-lg ${isOpen ? 'opacity-0 pointer-events-none' : ''}`}
        style={{
          width: 52, height: 52,
          background: 'linear-gradient(135deg, hsl(320 48% 40%), hsl(345 35% 50%))',
          boxShadow: '0 0 22px rgba(160,55,110,0.5), 0 4px 16px rgba(0,0,0,0.4)',
        }}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-5 h-5" />
        {/* Tooltip */}
        <span
          className="absolute right-14 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{ background: 'rgba(15,5,14,0.92)', border: '1px solid rgba(180,100,140,0.2)', color: 'rgba(255,255,255,0.85)' }}
        >
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
              background: 'rgba(10, 3, 14, 0.97)',
              border: '1px solid rgba(180,100,140,0.2)',
              borderRadius: 20,
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
              style={{ borderColor: 'rgba(180,100,140,0.15)', background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 52%))' }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">Ayesha's AI</p>
                  <p className="text-[10px] mt-0.5 flex items-center gap-1"
                    style={{ color: online ? 'hsl(140 60% 55%)' : 'hsl(0 60% 55%)' }}>
                    {online
                      ? <><Wifi className="w-2.5 h-2.5" /> Llama 3 · Live</>
                      : <><WifiOff className="w-2.5 h-2.5" /> Offline</>}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setIsOpen(false); abortRef.current?.abort(); }}
                className="p-1.5 rounded-lg transition-colors interactive"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(180,100,140,0.2) transparent' }}
            >
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
                      style={{ background: 'linear-gradient(135deg, hsl(320 48% 38%), hsl(345 35% 48%))' }}
                    >
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
                      <span className="inline-flex gap-1 py-0.5">
                        {[0, 1, 2].map(i => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Thinking dots while waiting for first chunk */}
              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
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
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions — shown only at start */}
            {messages.length <= 2 && (
              <div
                className="px-4 pb-2 flex gap-1.5 overflow-x-auto flex-shrink-0"
                style={{ scrollbarWidth: 'none' }}
              >
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    disabled={isTyping}
                    className="px-3 py-1.5 text-xs rounded-full flex-shrink-0 transition-all interactive disabled:opacity-40"
                    style={{
                      background: 'rgba(160,55,110,0.12)',
                      border: '1px solid rgba(160,55,110,0.28)',
                      color: 'hsl(320 48% 72%)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); handleSend(input); }}
              className="p-3 flex gap-2 border-t flex-shrink-0"
              style={{ borderColor: 'rgba(180,100,140,0.12)' }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about Ayesha…"
                disabled={isTyping}
                className="flex-1 text-sm px-4 py-2.5 rounded-full text-white placeholder:text-white/25 focus:outline-none transition-colors disabled:opacity-50"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={e => ((e.currentTarget as HTMLElement).style.borderColor = 'hsl(320 48% 42% / 0.6)')}
                onBlur={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all interactive disabled:opacity-30 shrink-0"
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
