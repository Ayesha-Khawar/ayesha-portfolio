import { CustomCursor } from '@/components/layout/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer, ScrollProgress } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Achievements } from '@/components/sections/Achievements';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { GitHubWindow, LinkedInWindow } from '@/components/windows/SocialWindows';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { useEffect } from 'react';

export default function Portfolio() {
  // Force dark mode on body
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <AmbientBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Certifications />
        
        {/* Social Windows section */}
        <section className="py-24 relative overflow-hidden bg-background/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Find Me <span className="text-gradient">Online</span>
              </h2>
            </div>
            <GitHubWindow />
            <LinkedInWindow />
          </div>
        </section>
        
        <Contact />
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
}
