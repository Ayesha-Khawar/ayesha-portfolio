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

/* ── CSS-only fallback (no WebGL) ───────────────────────────── */
function AmbientFallback() {
  return (
    <div className="absolute inset-0" style={{ background: '#0a030d' }}>
      {/* large slow blobs */}
      <div className="absolute rounded-full"
        style={{ width:'60vw', height:'60vw', top:'-15vw', left:'-10vw',
          background:'radial-gradient(circle, rgba(160,50,100,0.18) 0%, transparent 70%)',
          filter:'blur(60px)', animation:'blobFloat1 18s ease-in-out infinite' }} />
      <div className="absolute rounded-full"
        style={{ width:'50vw', height:'50vw', bottom:'-10vw', right:'-10vw',
          background:'radial-gradient(circle, rgba(180,80,130,0.14) 0%, transparent 70%)',
          filter:'blur(60px)', animation:'blobFloat2 22s ease-in-out infinite' }} />
      {/* tiny floating dots */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: (Math.random()*3+2)+'px', height: (Math.random()*3+2)+'px',
          left: Math.random()*100+'%', top: Math.random()*100+'%',
          background: i%3===0 ? 'rgba(180,80,130,0.7)' : i%3===1 ? 'rgba(150,100,190,0.7)' : 'rgba(200,150,80,0.5)',
          boxShadow: '0 0 8px currentColor',
          animation: `particleFloat ${4+Math.random()*6}s ${Math.random()*4}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── Three.js neural-network (only when WebGL available) ──────── */
function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef  = useRef<THREE.LineSegments>(null);
  const nodeCount = 90;

  const nodes = useMemo(() => {
    const p = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      p[i*3]   = (Math.random()-0.5)*15;
      p[i*3+1] = (Math.random()-0.5)*15;
      p[i*3+2] = (Math.random()-0.5)*10;
    }
    return p;
  }, []);

  const edges = useMemo(() => {
    const pos:number[] = [], col:number[] = [];
    const c1 = new THREE.Color('#a03772'), c2 = new THREE.Color('#9b6fbb');
    for (let i = 0; i < nodeCount; i++) for (let j = i+1; j < nodeCount; j++) {
      const dx=nodes[i*3]-nodes[j*3], dy=nodes[i*3+1]-nodes[j*3+1], dz=nodes[i*3+2]-nodes[j*3+2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 3.5) {
        pos.push(nodes[i*3],nodes[i*3+1],nodes[i*3+2],nodes[j*3],nodes[j*3+1],nodes[j*3+2]);
        const m = c1.clone().lerp(c2, Math.random());
        col.push(m.r,m.g,m.b,m.r,m.g,m.b);
      }
    }
    return { positions: new Float32Array(pos), colors: new Float32Array(col) };
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = (state.pointer.x * Math.PI)/12;
    const my = (state.pointer.y * Math.PI)/12;
    [pointsRef, linesRef].forEach(ref => {
      if (!ref.current) return;
      ref.current.rotation.y += (mx - ref.current.rotation.y) * 0.04 + t*0.003;
      ref.current.rotation.x += (-my - ref.current.rotation.x) * 0.04 + Math.sin(t*0.08)*0.002;
    });
  });

  return (
    <group>
      <Points ref={pointsRef} positions={nodes}>
        <PointMaterial transparent color="#e2c8d8" size={0.06} sizeAttenuation depthWrite={false} />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={edges.positions.length/3} array={edges.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={edges.colors.length/3}    array={edges.colors}    itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/* ── Rotating role titles ────────────────────────────────────── */
const TITLES = ['Software Engineer', 'Full Stack Developer', 'AI Engineer'];

/* ── Hero ────────────────────────────────────────────────────── */
export function Hero() {
  const [titleIndex, setTitleIndex]         = useState(0);
  const [signatureDone, setSignatureDone]   = useState(false);
  const [webglAvailable]                    = useState(() => typeof window !== 'undefined' && isWebGLAvailable());

  useEffect(() => {
    // signature reveal is 2.2s; unlock rest of hero after that
    const t = setTimeout(() => setSignatureDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!signatureDone) return;
    const id = setInterval(() => setTitleIndex(p => (p+1) % TITLES.length), 3000);
    return () => clearInterval(id);
  }, [signatureDone]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* 3D / CSS background */}
      <div className="absolute inset-0 z-0" style={{ background: '#0a030d' }}>
        {webglAvailable ? (
          <Canvas camera={{ position: [0,0,12], fov: 60 }}>
            <fog attach="fog" args={['#0a030d', 10, 28]} />
            <NeuralNetwork />
          </Canvas>
        ) : (
          <AmbientFallback />
        )}
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,2,12,0.75) 100%)' }} />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">

        {/* ── Signature reveal ───────────────────────────────────── */}
        <div className="mb-2 overflow-visible">
          <h1
            className="signature-text select-none"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              animation: 'signatureReveal 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
              clipPath: 'inset(0 100% 0 0)',   /* start hidden; animation reveals left→right */
            }}
          >
            Ayesha Khawar
          </h1>
        </div>

        {/* ── Subtitle + rest fade in after signature ────────────── */}
        <AnimatePresence>
          {signatureDone && (
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {/* Rotating title */}
              <div className="h-9 md:h-11 overflow-hidden flex items-center gap-2">
                <span style={{ color: 'hsl(320 48% 65%)' }} className="text-xl md:text-2xl font-mono">&gt;</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45 }}
                    className="text-xl md:text-2xl font-display font-medium"
                    style={{ color: 'rgba(255,255,255,0.88)' }}
                  >
                    {TITLES[titleIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  animate={{ opacity: [1,0,1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-0.5 h-6 rounded-full"
                  style={{ background: 'hsl(345 35% 65%)' }}
                />
              </div>

              {/* Description */}
              <p className="max-w-xl text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Software Engineer specializing in AI-powered applications, Full Stack Development,
                LLM systems, Retrieval-Augmented Generation (RAG), REST APIs, and scalable backend architectures.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 rounded-full font-semibold text-white interactive transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, hsl(320 48% 42%), hsl(345 35% 52%))',
                    boxShadow: '0 0 24px rgba(160,55,110,0.45)',
                  }}
                >
                  View Projects
                </button>
                <a
                  href="/Ayesha_Khawar_Resume.pdf"
                  download="Ayesha_Khawar_Resume.pdf"
                  className="px-8 py-3.5 rounded-full font-semibold text-white interactive transition-all hover:scale-105"
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, hsl(320 48% 55%), transparent)' }}
          />
        </motion.div>
      )}
    </section>
  );
}
