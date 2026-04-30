// Animated futuristic background: HUD grid + drifting nodes + scanline.
export const AmbientBackground = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 hud-grid opacity-40" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px] animate-float" />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-secondary/15 blur-[140px] animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
      <Particles />
    </div>
  );
};

const Particles = () => {
  const dots = Array.from({ length: 28 });
  return (
    <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="d">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((_, i) => {
        const cx = (i * 53) % 100;
        const cy = (i * 89) % 100;
        const r = (i % 4) + 1;
        return (
          <circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r={r}
            fill="url(#d)"
            style={{ animation: `float ${4 + (i % 5)}s ease-in-out ${i * 0.2}s infinite` }}
          />
        );
      })}
    </svg>
  );
};
