import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  level: "low" | "medium" | "high";
  className?: string;
}

export const SeverityBadge = ({ level, className }: SeverityBadgeProps) => {
  const styles = {
    low: "bg-success/15 text-success border-success/40",
    medium: "bg-warning/15 text-warning border-warning/40",
    high: "bg-destructive/15 text-destructive border-destructive/40",
  } as const;
  const label = { low: "Low", medium: "Moderate", high: "Critical" }[level];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", styles[level], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", {
        "bg-success": level === "low",
        "bg-warning": level === "medium",
        "bg-destructive": level === "high",
      })} />
      {label}
    </span>
  );
};

interface AvailabilityBadgeProps {
  available: boolean;
  count?: number;
  max?: number;
}

export const AvailabilityBadge = ({ available, count, max }: AvailabilityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        available ? "bg-success/15 text-success border-success/40" : "bg-destructive/15 text-destructive border-destructive/40"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", available ? "bg-success animate-pulse" : "bg-destructive")} />
      {available ? "Available" : "Fully Booked"}
      {typeof count === "number" && typeof max === "number" && (
        <span className="opacity-70">· {count}/{max}</span>
      )}
    </span>
  );
};
