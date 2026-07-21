import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/use-interactions';
import { motion, useSpring, useTransform } from 'framer-motion';

export function CustomCursor() {
  const { mousePosition, isHovering } = useMousePosition();
  const { x, y } = mousePosition;
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);
  
  // Update springs when mouse moves
  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
  }, [x, y, cursorX, cursorY]);

  // Trail particles
  const [particles, setParticles] = React.useState<{id: number, x: number, y: number}[]>([]);
  const particleIdRef = useRef(0);
  const lastPosRef = useRef({x: 0, y: 0});

  useEffect(() => {
    const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
    if (dist > 20) { // Add particle every 20px of movement
      const id = particleIdRef.current++;
      setParticles(prev => [...prev.slice(-4), { id, x, y }]);
      lastPosRef.current = { x, y };
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, 500);
    }
  }, [x, y]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100] hidden md:block">
        {/* Trail particles */}
        {particles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full bg-cyan-400 blur-[1px]"
            style={{
              left: p.x - 2,
              top: p.y - 2,
              width: 4,
              height: 4,
            }}
          />
        ))}

        {/* Small Dot */}
        <motion.div 
          className="absolute rounded-full bg-white z-[101]"
          style={{
            left: x - 3,
            top: y - 3,
            width: 6,
            height: 6,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />

        {/* Outer Ring */}
        <motion.div 
          className="absolute rounded-full border border-primary z-[100]"
          style={{
            left: cursorX,
            top: cursorY,
            x: "-50%",
            y: "-50%",
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
            borderColor: isHovering ? 'rgba(6, 182, 212, 0.5)' : 'rgba(124, 58, 237, 0.5)',
            boxShadow: isHovering ? '0 0 15px rgba(6, 182, 212, 0.3)' : '0 0 10px rgba(124, 58, 237, 0.2)',
          }}
        />
      </div>
    </>
  );
}
