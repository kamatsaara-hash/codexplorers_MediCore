import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const BrandLogo = ({ className, showText = true, size = "md" }: BrandLogoProps) => {
  const dim = size === "sm" ? 28 : size === "lg" ? 44 : 36;
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className="animate-pulse-glow rounded-xl">
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#bg)" stroke="hsl(var(--primary))" strokeOpacity="0.5" />
          <path d="M14 24h6l3-8 4 16 3-8h6" stroke="hsl(var(--primary))" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="48" y2="48">
              <stop stopColor="hsl(var(--background))" />
              <stop offset="1" stopColor="hsl(var(--secondary) / 0.4)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <div className="leading-tight">
          <div className="font-display text-lg font-bold tracking-tight gradient-text">MediCore</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">AI Health OS</div>
        </div>
      )}
    </div>
  );
};
