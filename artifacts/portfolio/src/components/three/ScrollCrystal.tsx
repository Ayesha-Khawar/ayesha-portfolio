/**
 * ScrollCrystal — a lightweight R3F gem that drifts diagonally across the page
 * as the user scrolls. Responds subtly to mouse movement. Hidden on mobile.
 */
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Check WebGL once ─────────────────────────────────────────── */
function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch { return false; }
}

/* ── The actual gem geometry ─────────────────────────────────── */
function Gem({
  scrollProgress,
  mouseX,
  mouseY,
}: {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Continuous slow spin
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.x += delta * 0.18;

    // Scroll-driven extra tilt
    const targetRotZ = scrollProgress * Math.PI * 1.2;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotZ,
      delta * 1.5
    );

    // Mouse parallax on the group
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY * 0.3,
      delta * 4
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX * 0.3,
      delta * 4
    );
  });

  return (
    <group ref={groupRef}>
      {/* Rim light */}
      <pointLight position={[-3, 3, 3]} intensity={2.5} color="#e0a0c8" />
      <pointLight position={[3, -2, -2]} intensity={1.5} color="#9b6fbb" />
      <ambientLight intensity={0.3} />

      <mesh ref={meshRef}>
        {/* Icosahedron = premium multi-faceted gem shape */}
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#d4a0c0"
          metalness={0.05}
          roughness={0.0}
          transmission={0.88}       // glass transparency
          thickness={1.2}
          ior={1.65}                // refractive index (diamond-like)
          reflectivity={1}
          iridescence={0.6}
          iridescenceIOR={1.4}
          envMapIntensity={3}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle wireframe overlay for tech edge */}
      <mesh>
        <icosahedronGeometry args={[1.02, 0]} />
        <meshBasicMaterial
          color="#e8c0d8"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

/* ── Wrapper — fixed-position canvas overlay ─────────────────── */
export function ScrollCrystal() {
  const [webgl]          = useState(() => typeof window !== 'undefined' && isWebGLAvailable());
  const [scroll, setScroll]   = useState(0);
  const [mouse, setMouse]     = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hide on small screens to save GPU
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScroll(isNaN(progress) ? 0 : progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  if (!webgl || isMobile) return null;

  // Drift from top-right → bottom-left as scroll goes 0 → 1
  // We use CSS transforms on the container so R3F doesn't re-render on every scroll tick
  const pxRight = 48 - scroll * 60;          // right: 48px → -12px
  const pxTop   = 100 + scroll * (window.innerHeight * 0.6); // top: 100px → ~60vh

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[5] w-32 h-32 hidden md:block"
      style={{
        right: `${pxRight}px`,
        top:   `${pxTop}px`,
        opacity: 0.65,
        transition: 'opacity 0.5s',
        // Fade out near very top (before scrolling) and very bottom
        ...(scroll < 0.02 || scroll > 0.95 ? { opacity: 0 } : {}),
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <Gem
          scrollProgress={scroll}
          mouseX={mouse.x}
          mouseY={mouse.y}
        />
      </Canvas>
    </div>
  );
}
