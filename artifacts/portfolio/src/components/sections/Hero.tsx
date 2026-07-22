import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

/* ── WebGL detection ─────────────────────────────────────────── */
function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
}

/* ── CSS-only fallback ───────────────────────────────────────── */
function AmbientFallback() {
  return (
    <div className="absolute inset-0" style={{ background: '#0a030d' }}>
      <div className="absolute rounded-full" style={{ width:'60vw', height:'60vw', top:'-15vw', left:'-10vw',
        background:'radial-gradient(circle, rgba(160,50,100,0.18) 0%, transparent 70%)',
        filter:'blur(60px)', animation:'blobFloat1 18s ease-in-out infinite' }} />
      <div className="absolute rounded-full" style={{ width:'50vw', height:'50vw', bottom:'-10vw', right:'-10vw',
        background:'radial-gradient(circle, rgba(180,80,130,0.14) 0%, transparent 70%)',
        filter:'blur(60px)', animation:'blobFloat2 22s ease-in-out infinite' }} />
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: (Math.random()*2+2)+'px', height: (Math.random()*2+2)+'px',
          left: Math.random()*100+'%', top: Math.random()*100+'%',
          background: i%3===0 ? 'rgba(180,80,130,0.7)' : i%3===1 ? 'rgba(150,100,190,0.7)' : 'rgba(200,150,80,0.5)',
          animation: `particleFloat ${4+Math.random()*6}s ${Math.random()*4}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── Three.js particle field ─────────────────────────────────── */
function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef  = useRef<THREE.LineSegments>(null);
  const nodeCount = 80;

  const nodes = useMemo(() => {
    const p = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      p[i*3]   = (Math.random()-0.5)*16;
      p[i*3+1] = (Math.random()-0.5)*16;
      p[i*3+2] = (Math.random()-0.5)*10;
    }
    return p;
  }, []);

  const edges = useMemo(() => {
    const pos:number[] = [], col:number[] = [];
    const c1 = new THREE.Color('#9b3578'), c2 = new THREE.Color('#8a6fbb');
    for (let i = 0; i < nodeCount; i++) for (let j = i+1; j < nodeCount; j++) {
      const dx=nodes[i*3]-nodes[j*3], dy=nodes[i*3+1]-nodes[j*3+1], dz=nodes[i*3+2]-nodes[j*3+2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 3.8) {
        pos.push(nodes[i*3],nodes[i*3+1],nodes[i*3+2],nodes[j*3],nodes[j*3+1],nodes[j*3+2]);
        const m = c1.clone().lerp(c2, Math.random());
        col.push(m.r,m.g,m.b,m.r,m.g,m.b);
      }
    }
    return { positions: new Float32Array(pos), colors: new Float32Array(col) };
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = (state.pointer.x * Math.PI) / 14;
    const my = (state.pointer.y * Math.PI) / 14;
    [pointsRef, linesRef].forEach(ref => {
      if (!ref.current) return;
      ref.current.rotation.y += (mx - ref.current.rotation.y) * 0.03 + t * 0.0025;
      ref.current.rotation.x += (-my - ref.current.rotation.x) * 0.03;
    });
  });

  return (
    <group>
      <Points ref={pointsRef} positions={nodes}>
        <PointMaterial transparent color="#d4a0c0" size={0.055} sizeAttenuation depthWrite={false} />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute args={[edges.positions, 3]} attach="attributes-position" />
          <bufferAttribute args={[edges.colors, 3]}    attach="attributes-color" />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.14} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/* ── Typewriter name component ───────────────────────────────── */
function TypewriterName({ text, onDone }: { text: string; onDone: () => void }) {
  const [chars, setChars] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const start = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setChars(c => {
          const next = c + 1;
          if (next >= text.length && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return Math.min(next, text.length);
        });
      }, 55);
    }, 300);
    return () => {
      clearTimeout(start);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line

  // Call onDone after render when typing is complete, not inside setState
  useEffect(() => {
    if (chars >= text.length && chars > 0) onDone();
  }, [chars, text.length]); // eslint-disable-line

  const displayed = text.slice(0, chars);
  const done      = chars >= text.length;

  return (
    <h1
      className="font-display font-extrabold tracking-tight leading-none select-none"
      style={{
        fontSize: 'clamp(2.8rem, 8vw, 7rem)',
        background: 'linear-gradient(135deg, #f0dce8 0%, #e0a8c4 40%, #c478a2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.02em',
      }}
    >
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ WebkitTextFillColor: 'hsl(320 48% 65%)', display: 'inline-block', marginLeft: '2px' }}
        >
          |
        </motion.span>
      )}
    </h1>
  );
}

/* ── Rotating role titles ────────────────────────────────────── */
const TITLES = ['Software Engineer', 'Full Stack Developer', 'AI Engineer'];

/* ── Hero ────────────────────────────────────────────────────── */
export function Hero() {
  const [titleIndex, setTitleIndex]       = useState(0);
  const [signatureDone, setSignatureDone] = useState(false);
  const [webglAvailable]                  = useState(() =>
    typeof window !== 'undefined' && isWebGLAvailable()
  );

  useEffect(() => {
    if (!signatureDone) return;
    const id = setInterval(() => setTitleIndex(p => (p + 1) % TITLES.length), 3000);
    return () => clearInterval(id);
  }, [signatureDone]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0" style={{ background: '#0a030d' }}>
        {webglAvailable ? (
          <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
            <fog attach="fog" args={['#0a030d', 10, 30]} />
            <NeuralNetwork />
          </Canvas>
        ) : (
          <AmbientFallback />
        )}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(8,2,12,0.78) 100%)' }} />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">

        {/* ── Name ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3"
        >
          <TypewriterName text="Ayesha Khawar" onDone={() => setSignatureDone(true)} />
        </motion.div>

        {/* ── Rest of hero ─────────────────────────────────────── */}
        <AnimatePresence>
          {signatureDone && (
            <motion.div
              className="flex flex-col items-center gap-4 md:gap-5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-px origin-left"
                style={{ background: 'linear-gradient(90deg, hsl(320 48% 55%), hsl(345 35% 60%), transparent)' }}
              />

              {/* Rotating title */}
              <div className="h-8 md:h-9 overflow-hidden flex items-center gap-2">
                <span className="text-base md:text-lg font-mono" style={{ color: 'hsl(320 48% 60%)' }}>&gt;</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-base md:text-lg font-display font-medium"
                    style={{ color: 'rgba(255,255,255,0.82)' }}
                  >
                    {TITLES[titleIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-0.5 h-5 rounded-full"
                  style={{ background: 'hsl(345 35% 60%)' }}
                />
              </div>

              {/* Description */}
              <p className="max-w-lg text-xs md:text-sm leading-relaxed px-2"
                style={{ color: 'rgba(255,255,255,0.50)' }}>
                Building intelligent, AI-powered applications — from LLM systems and RAG pipelines
                to full-stack web platforms and scalable backend APIs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5 mt-1">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white interactive transition-all hover:scale-105 hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 52%))',
                    boxShadow: '0 0 22px rgba(160,55,110,0.4)',
                  }}
                >
                  View Projects
                </button>
                <a
                  href="/Ayesha_Khawar_Resume.pdf"
                  download="Ayesha_Khawar_Resume.pdf"
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white interactive transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(200,130,170,0.25)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  Download Résumé
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      {signatureDone && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, hsl(320 48% 55%), transparent)' }}
          />
        </motion.div>
      )}
    </section>
  );
}
