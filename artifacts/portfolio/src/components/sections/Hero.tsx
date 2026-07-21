import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Detect WebGL support before attempting to create a Canvas
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// CSS-only fallback for environments without WebGL
function NeuralNetworkFallback() {
  return (
    <div className="absolute inset-0" style={{ background: '#050510' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(6,182,212,0.12) 0%, transparent 50%),
                          radial-gradient(circle at 50% 80%, rgba(37,99,235,0.1) 0%, transparent 50%)`,
      }} />
      {/* Animated grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        animation: 'gridMove 20s linear infinite',
      }} />
      <style>{`
        @keyframes gridMove { from { backgroundPosition: 0 0; } to { backgroundPosition: 60px 60px; } }
        @keyframes floatDot { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; } 50% { transform: translateY(-20px) scale(1.2); opacity: 1; } }
      `}</style>
      {/* Floating dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          background: i % 2 === 0 ? 'rgba(124,58,237,0.7)' : 'rgba(6,182,212,0.7)',
          boxShadow: i % 2 === 0 ? '0 0 8px rgba(124,58,237,0.8)' : '0 0 8px rgba(6,182,212,0.8)',
          animation: `floatDot ${3 + Math.random() * 4}s ${Math.random() * 3}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Setup nodes
  const nodeCount = 100;
  const nodes = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  }, []);

  // Setup edges
  const edges = useMemo(() => {
    const positions = [];
    const colors = [];
    const color1 = new THREE.Color('#7c3aed'); // Purple
    const color2 = new THREE.Color('#06b6d4'); // Cyan

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i * 3] - nodes[j * 3];
        const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
        const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        if (dist < 3.5) {
          positions.push(
            nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2],
            nodes[j * 3], nodes[j * 3 + 1], nodes[j * 3 + 2]
          );
          
          const mixColor = color1.clone().lerp(color2, Math.random());
          colors.push(
            mixColor.r, mixColor.g, mixColor.b,
            mixColor.r, mixColor.g, mixColor.b
          );
        }
      }
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, [nodes]);

  // Animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.05;
      linesRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
      
      // Parallax with mouse
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      linesRef.current.rotation.y += (mouseX - linesRef.current.rotation.y) * 0.05;
      linesRef.current.rotation.x += (-mouseY - linesRef.current.rotation.x) * 0.05;
      if(pointsRef.current) {
        pointsRef.current.rotation.y += (mouseX - pointsRef.current.rotation.y) * 0.05;
        pointsRef.current.rotation.x += (-mouseY - pointsRef.current.rotation.x) * 0.05;
      }
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={nodes}>
        <PointMaterial 
          transparent 
          color="#e2e8f0" 
          size={0.05} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edges.positions.length / 3}
            array={edges.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={edges.colors.length / 3}
            array={edges.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

const titles = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Engineer"
];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [webglAvailable] = useState(() => {
    // Check once at component init time — avoids creating Canvas when WebGL isn't supported
    if (typeof window === 'undefined') return false;
    return isWebGLAvailable();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-background">
        {webglAvailable ? (
          <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
            <fog attach="fog" args={['#050510', 10, 25]} />
            <NeuralNetwork />
          </Canvas>
        ) : (
          <NeuralNetworkFallback />
        )}
      </div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-4 text-gradient">
            Ayesha Khawar
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-8 md:h-12 mb-6"
        >
          <p className="text-xl md:text-3xl text-foreground/90 font-medium font-display tracking-wide flex items-center gap-2">
            <span className="text-primary">&gt;</span>
            <motion.span
              key={titleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {titles[titleIndex]}
            </motion.span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block w-3 h-8 bg-secondary ml-1"
            />
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-base md:text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          Software Engineer specializing in AI-powered applications, Full Stack Development, 
          LLM systems, Retrieval-Augmented Generation (RAG), REST APIs, scalable backend architectures, 
          and modern web technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full bg-primary text-white font-medium interactive glow-primary hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)]"
          >
            View Projects
          </button>
          <a 
            href="#contact" 
            className="px-8 py-4 rounded-full glass text-white font-medium interactive hover:bg-white/10 transition-all"
          >
            Download Résumé
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
