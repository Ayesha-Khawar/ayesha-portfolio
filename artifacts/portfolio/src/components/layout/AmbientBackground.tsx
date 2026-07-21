/**
 * AmbientBackground — always-on animated background that breathes life into the site.
 * Uses CSS animations only (no WebGL), so it works in every environment.
 */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* Morphing blob 1 — deep plum, top-left */}
      <div
        className="absolute rounded-full opacity-[0.18]"
        style={{
          width: '70vw',
          height: '70vw',
          top: '-20vw',
          left: '-20vw',
          background: 'radial-gradient(circle, hsl(320 60% 35%) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blobFloat1 18s ease-in-out infinite',
        }}
      />

      {/* Morphing blob 2 — dusty rose, bottom-right */}
      <div
        className="absolute rounded-full opacity-[0.14]"
        style={{
          width: '60vw',
          height: '60vw',
          bottom: '-15vw',
          right: '-15vw',
          background: 'radial-gradient(circle, hsl(345 50% 45%) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blobFloat2 22s ease-in-out infinite',
        }}
      />

      {/* Morphing blob 3 — lavender, center */}
      <div
        className="absolute rounded-full opacity-[0.10]"
        style={{
          width: '50vw',
          height: '50vw',
          top: '30vh',
          left: '25vw',
          background: 'radial-gradient(circle, hsl(275 45% 45%) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'blobFloat3 26s ease-in-out infinite',
        }}
      />

      {/* Subtle grid — very faint */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(320 48% 42% / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(320 48% 42% / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'gridPulse 8s ease-in-out infinite',
        }}
      />

      {/* Floating micro-particles */}
      {[
        { size: 3, x: '15%', y: '20%', delay: '0s',  dur: '7s',  color: 'hsl(320 48% 65%)' },
        { size: 2, x: '80%', y: '15%', delay: '1.5s', dur: '9s',  color: 'hsl(345 35% 65%)' },
        { size: 4, x: '65%', y: '70%', delay: '3s',  dur: '11s', color: 'hsl(275 30% 70%)' },
        { size: 2, x: '40%', y: '85%', delay: '0.8s', dur: '8s',  color: 'hsl(38 58% 60%)' },
        { size: 3, x: '90%', y: '50%', delay: '2.2s', dur: '12s', color: 'hsl(320 48% 65%)' },
        { size: 2, x: '10%', y: '65%', delay: '4s',  dur: '10s', color: 'hsl(345 35% 65%)' },
        { size: 3, x: '55%', y: '35%', delay: '1s',  dur: '6s',  color: 'hsl(275 30% 70%)' },
        { size: 2, x: '30%', y: '50%', delay: '3.5s', dur: '14s', color: 'hsl(38 58% 60%)' },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size + 'px',
            height: p.size + 'px',
            left: p.x,
            top: p.y,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            animationName: 'particleFloat',
            animationDuration: p.dur,
            animationDelay: p.delay,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Soft vignette so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,3,10,0.6) 100%)',
        }}
      />
    </div>
  );
}
