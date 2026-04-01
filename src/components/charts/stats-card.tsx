"use client";

import { useRef } from "react";
import { type LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/count-up";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: number;
  suffix?: string;
}

/** Parse a display value like "$1.47", "1,240", "$2.41B", "$184M" into countable parts */
function parseValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} {
  const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value, decimals: 0 };
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, "");
  const number = parseFloat(numStr);
  const suffix = match[3];
  const decimalPart = numStr.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  return { prefix, number, suffix, decimals };
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  change,
  suffix,
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const parsed = parseValue(value);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-canton/30 hover:bg-card/80 hover:shadow-lg hover:shadow-canton/5"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-canton/0 to-canton/0 transition-all duration-300 group-hover:from-canton/3 group-hover:to-transparent" />

      {/* Shimmer overlay on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[shimmer-overlay_1.5s_ease-in-out]">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="text-xl font-bold tracking-tight lg:text-2xl">
            <CountUp
              target={parsed.number}
              prefix={parsed.prefix}
              suffix={parsed.suffix}
              decimals={parsed.decimals}
              duration={1.5}
            />
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
              <span className="ml-1 font-normal text-muted-foreground">
                24h
              </span>
            </p>
          )}
        </div>
        <div className="rounded-xl bg-canton/10 p-2.5 ring-1 ring-canton/20 transition-all duration-300 group-hover:bg-canton/15 group-hover:ring-canton/30 group-hover:rotate-[5deg]">
          <Icon className="size-4 text-canton" />
        </div>
      </div>
    </motion.div>
  );
}
