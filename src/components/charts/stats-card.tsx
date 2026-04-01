import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: number;
  suffix?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  change,
  suffix,
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-canton/30 hover:bg-card/80 hover:shadow-lg hover:shadow-canton/5">
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-canton/0 to-canton/0 transition-all duration-300 group-hover:from-canton/3 group-hover:to-transparent" />
      <div className="relative flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
          <p className="text-xl font-bold tracking-tight lg:text-2xl">
            {value}
            {suffix && (
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {suffix}
              </span>
            )}
          </p>
          {change !== undefined && (
            <p
              className={cn(
                "text-xs font-semibold tabular-nums",
                isPositive ? "text-positive" : "text-negative"
              )}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
              <span className="ml-1 font-normal text-muted-foreground">24h</span>
            </p>
          )}
        </div>
        <div className="rounded-xl bg-canton/10 p-2.5 ring-1 ring-canton/20 transition-all duration-300 group-hover:bg-canton/15 group-hover:ring-canton/30">
          <Icon className="size-4 text-canton" />
        </div>
      </div>
    </div>
  );
}
