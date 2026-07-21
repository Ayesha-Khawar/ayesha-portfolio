import { motion } from 'framer-motion';

export function GitHubWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className="w-full max-w-3xl mx-auto mt-24 mb-12 [perspective:1000px] interactive cursor-default"
      onClick={() => window.open('https://github.com/Ayesha-Khawar', '_blank')}
    >
      <div className="glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl hover:border-white/20 transition-colors group bg-[#0d1117]/80">
        
        {/* macOS Title Bar */}
        <div className="bg-[#161b22] px-4 py-3 flex items-center border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center text-xs text-white/50 font-medium">github.com/Ayesha-Khawar</div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 rounded-full mb-4 border border-white/10 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-3xl font-display font-bold text-white group-hover:scale-105 transition-transform shadow-lg">
              AK
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">Ayesha Khawar</h2>
            <p className="text-[#8b949e] text-lg mb-4">Ayesha-Khawar</p>
            <p className="text-sm text-[#c9d1d9] mb-4">
              AI Engineer | Full Stack Developer | Open Source Enthusiast
            </p>
            <button className="w-full py-1.5 rounded-md bg-[#21262d] border border-[#30363d] text-sm font-medium text-[#c9d1d9] hover:bg-[#30363d] transition-colors mb-4">
              Follow
            </button>
            <div className="flex gap-4 text-sm text-[#8b949e]">
              <span><strong className="text-white">120</strong> followers</span>
              <span><strong className="text-white">45</strong> following</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">Pinned</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Repo 1 */}
              <div className="p-4 rounded-md border border-[#30363d] bg-[#0d1117] flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#8b949e]" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1.5h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                  <span className="text-sm font-semibold text-[#58a6ff]">HARBOR</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium border border-[#30363d] text-[#8b949e] ml-auto">Public</span>
                </div>
                <p className="text-xs text-[#8b949e] mb-4 flex-grow">Full Stack + AI platform with Gemini/Groq</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3178c6]"></span>TypeScript</span>
                  <span className="flex items-center gap-1">⭐ 12</span>
                </div>
              </div>

              {/* Repo 2 */}
              <div className="p-4 rounded-md border border-[#30363d] bg-[#0d1117] flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#8b949e]" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1.5h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                  <span className="text-sm font-semibold text-[#58a6ff]">RAG-Chatbot</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium border border-[#30363d] text-[#8b949e] ml-auto">Public</span>
                </div>
                <p className="text-xs text-[#8b949e] mb-4 flex-grow">Production RAG pipeline with ChromaDB</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3572A5]"></span>Python</span>
                  <span className="flex items-center gap-1">⭐ 8</span>
                </div>
              </div>
            </div>

            {/* Languages Bar */}
            <div className="mb-2 text-sm text-white font-semibold">Languages</div>
            <div className="w-full h-2 rounded-full overflow-hidden flex mb-2">
              <div className="h-full bg-[#3178c6]" style={{ width: '40%' }}></div>
              <div className="h-full bg-[#3572A5]" style={{ width: '35%' }}></div>
              <div className="h-full bg-[#f1e05a]" style={{ width: '20%' }}></div>
              <div className="h-full bg-[#e34c26]" style={{ width: '5%' }}></div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-[#8b949e]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3178c6]"></span>TypeScript 40%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3572A5]"></span>Python 35%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f1e05a]"></span>JavaScript 20%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LinkedInWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
      className="w-full max-w-3xl mx-auto mb-24 [perspective:1000px] interactive cursor-default"
      onClick={() => window.open('https://www.linkedin.com/in/ayesha-khawar1', '_blank')}
    >
      <div className="glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl hover:border-white/20 transition-colors group bg-[#1b1f23]/90">
        
        {/* Title Bar */}
        <div className="bg-[#0077b5] px-4 py-3 flex items-center border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
          </div>
          <div className="flex-1 text-center text-xs text-white font-medium">linkedin.com/in/ayesha-khawar1</div>
        </div>

        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-primary/40 to-secondary/40 relative">
          <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-[#1b1f23] bg-[#0077b5] flex items-center justify-center text-3xl font-display font-bold text-white shadow-lg z-10 group-hover:scale-105 transition-transform">
            AK
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 px-6 md:px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Ayesha Khawar</h2>
              <p className="text-white/80 text-lg">AI Engineer & Full Stack Developer | Python | React | LLMs | RAG</p>
              <div className="text-white/50 text-sm mt-1 flex items-center gap-2">
                Pakistan • <span className="text-[#70b5f9] font-medium">500+ connections</span>
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-5 py-1.5 rounded-full bg-[#0a66c2] text-white font-medium hover:bg-[#004182] transition-colors text-sm">
              Connect
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-white/5 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Experience
              </h3>
              <div className="relative pl-6 border-l-2 border-white/10 space-y-4">
                <div className="relative">
                  <div className="absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full bg-[#0077b5]" />
                  <h4 className="font-semibold text-white">Artificial Intelligence Developer Intern</h4>
                  <p className="text-sm text-white/70">Texense</p>
                  <p className="text-xs text-white/50">2024</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full bg-white/20" />
                  <h4 className="font-semibold text-white">AI & Data Analysis Affairs Intern</h4>
                  <p className="text-sm text-white/70">NYLP</p>
                  <p className="text-xs text-white/50">2024</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/5 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>
                Education
              </h3>
              <div>
                <h4 className="font-semibold text-white">Bahauddin Zakariya University</h4>
                <p className="text-sm text-white/70">Bachelor of Science in Computer Science</p>
                <p className="text-xs text-white/50 mt-1">2022 - 2026 • 3.88 GPA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
