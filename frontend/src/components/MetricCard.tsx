import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: string;
  icon?: LucideIcon;
  accent?: "primary" | "secondary" | "success" | "destructive" | "accent";
  className?: string;
}

const accentMap = {
  primary: "text-primary border-primary/30",
  secondary: "text-secondary border-secondary/30",
  success: "text-success border-success/30",
  destructive: "text-destructive border-destructive/30",
  accent: "text-accent border-accent/30",
};

export const MetricCard = ({ label, value, delta, icon: Icon, accent = "primary", className }: MetricCardProps) => {
  return (
    <div className={cn("glass relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow", className)}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className={cn("mt-2 font-display text-3xl font-bold neon-text", accentMap[accent])}>{value}</div>
          {delta && <div className="mt-1 text-xs text-muted-foreground">{delta}</div>}
        </div>
        {Icon && (
          <div className={cn("rounded-xl border p-2.5", accentMap[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};
