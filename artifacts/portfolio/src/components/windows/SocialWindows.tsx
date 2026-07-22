import { motion } from 'framer-motion';
import profilePic from '@assets/linkedin_profile_picture_1784645612005.jpeg';

export function GitHubWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className="w-full max-w-3xl mx-auto mt-16 mb-10 interactive cursor-pointer"
      onClick={() => window.open('https://github.com/Ayesha-Khawar', '_blank')}
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 hover:shadow-[0_0_40px_rgba(160,55,110,0.2)]"
        style={{
          background: 'rgba(13,17,23,0.92)',
          borderColor: 'rgba(48,54,61,0.8)',
          backdropFilter: 'blur(20px)',
        }}>

        {/* macOS Title Bar */}
        <div className="flex items-center px-4 py-3 border-b" style={{ background: '#161b22', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
            github.com/Ayesha-Khawar
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Real profile picture */}
            <div className="w-28 h-28 rounded-full mb-4 overflow-hidden border-2 shadow-lg"
              style={{ borderColor: 'rgba(160,55,110,0.4)' }}>
              <img src={profilePic} alt="Ayesha Khawar" className="w-full h-full object-cover object-top" />
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">Ayesha Khawar</h2>
            <p className="text-sm mb-3" style={{ color: '#8b949e' }}>Ayesha-Khawar</p>
            <p className="text-xs mb-4" style={{ color: '#c9d1d9' }}>
              AI Engineer | Full Stack Developer | Open Source Enthusiast
            </p>
            <a
              href="https://github.com/Ayesha-Khawar"
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-full py-1.5 rounded-md text-xs font-medium mb-4 transition-colors text-center block"
              style={{ background: '#21262d', border: '1px solid #30363d', color: '#c9d1d9' }}
            >
              View Profile
            </a>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">Pinned</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                { name: 'HARBOR', desc: 'Full Stack + AI healthcare platform · FYP', lang: 'TypeScript', langColor: '#3178c6', stars: 12 },
                { name: 'RAG-Chatbot', desc: 'RAG pipeline with LangChain & ChromaDB', lang: 'Python', langColor: '#3572A5', stars: 8 },
              ].map(repo => (
                <div key={repo.name} className="p-4 rounded-md flex flex-col"
                  style={{ border: '1px solid #30363d', background: '#0d1117' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8b949e' }} viewBox="0 0 16 16" fill="currentColor">
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1.5h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
                    </svg>
                    <span className="text-sm font-semibold" style={{ color: '#79c0ff' }}>{repo.name}</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs" style={{ border: '1px solid #30363d', color: '#8b949e' }}>Public</span>
                  </div>
                  <p className="text-xs flex-grow mb-3" style={{ color: '#8b949e' }}>{repo.desc}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: '#8b949e' }}>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: repo.langColor }} />
                      {repo.lang}
                    </span>
                    <span>⭐ {repo.stars}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="text-sm font-semibold text-white mb-2">Languages</div>
            <div className="w-full h-2 rounded-full overflow-hidden flex mb-2">
              <div className="h-full" style={{ width: '40%', background: '#3178c6' }} />
              <div className="h-full" style={{ width: '35%', background: '#3572A5' }} />
              <div className="h-full" style={{ width: '20%', background: '#f1e05a' }} />
              <div className="h-full" style={{ width: '5%', background: '#e34c26' }} />
            </div>
            <div className="flex flex-wrap gap-4 text-xs" style={{ color: '#8b949e' }}>
              {[['#3178c6','TypeScript 40%'],['#3572A5','Python 35%'],['#f1e05a','JavaScript 20%']].map(([c,l]) => (
                <span key={l} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />{l}
                </span>
              ))}
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
      className="w-full max-w-3xl mx-auto mb-16 interactive cursor-pointer"
      onClick={() => window.open('https://www.linkedin.com/in/ayesha-khawar1', '_blank')}
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,119,181,0.2)]"
        style={{
          background: 'rgba(27,31,35,0.92)',
          borderColor: 'rgba(48,54,61,0.8)',
          backdropFilter: 'blur(20px)',
        }}>

        {/* LinkedIn Title Bar */}
        <div className="flex items-center px-4 py-3" style={{ background: '#0077b5', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
          </div>
          <div className="flex-1 text-center text-xs font-medium text-white/80">
            linkedin.com/in/ayesha-khawar1
          </div>
        </div>

        {/* Cover image */}
        <div className="h-28 relative" style={{ background: 'linear-gradient(135deg, hsl(320 48% 28%), hsl(275 30% 35%))' }}>
          {/* Profile avatar — overlapping cover */}
          <div className="absolute -bottom-14 left-6 w-28 h-28 rounded-full border-4 overflow-hidden shadow-lg z-10"
            style={{ borderColor: '#1b1f23' }}>
            <img src={profilePic} alt="Ayesha Khawar" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 md:px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Ayesha Khawar</h2>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
                AI Engineer & Full Stack Developer | Python | React | LLMs | RAG
              </p>
              <div className="text-xs mt-1 flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Pakistan •&nbsp;
                <span style={{ color: '#70b5f9', fontWeight: 500 }}>500+ connections</span>
              </div>
            </div>
            <button className="mt-3 md:mt-0 px-5 py-1.5 rounded-full text-white text-sm font-medium"
              style={{ background: '#0a66c2' }}>
              Connect
            </button>
          </div>

          <div className="space-y-4">
            {/* Experience */}
            <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-semibold text-white mb-3">Experience</h3>
              <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {[
                  { role: 'Artificial Intelligence Developer Intern', co: 'Texense · Lahore', period: 'July 2025' },
                  { role: 'AI & Data Analysis Affairs Intern', co: 'NYLP', period: 'August 2025' },
                ].map(({ role, co, period }) => (
                  <div key={co} className="relative">
                    <div className="absolute -left-[1.35rem] top-1 w-2.5 h-2.5 rounded-full" style={{ background: '#0077b5' }} />
                    <p className="text-sm font-medium text-white">{role}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{co}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-semibold text-white mb-3">Education</h3>
              <p className="text-sm font-medium text-white">Bahauddin Zakariya University</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>BS Computer Science · Gold Medalist</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>2022 – 2026 · CGPA 3.88/4.00</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
