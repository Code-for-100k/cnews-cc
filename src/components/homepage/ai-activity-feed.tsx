"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, CheckCircle, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationStatus } from "@/lib/api/types";

/* ---------- Mock activity data ---------- */

interface ActivityItem {
  id: string;
  type: VerificationStatus;
  title: string;
  timestamp: string;
}

const activityItems: ActivityItem[] = [
  {
    id: "a1",
    type: "ai-generated",
    title: "Canton Q2 Validator Report",
    timestamp: "2m ago",
  },
  {
    id: "a2",
    type: "human-verified",
    title: "CBTC Staking Guide",
    timestamp: "5m ago",
  },
  {
    id: "a3",
    type: "editors-pick",
    title: "Canton vs Ethereum Deep Dive",
    timestamp: "12m ago",
  },
  {
    id: "a4",
    type: "ai-generated",
    title: "USDCx Liquidity Pool Analysis",
    timestamp: "18m ago",
  },
  {
    id: "a5",
    type: "human-verified",
    title: "CC Tokenomics Breakdown",
    timestamp: "24m ago",
  },
  {
    id: "a6",
    type: "ai-generated",
    title: "Canton Bridge Security Audit Summary",
    timestamp: "31m ago",
  },
  {
    id: "a7",
    type: "editors-pick",
    title: "Canton Privacy Model Explained",
    timestamp: "38m ago",
  },
  {
    id: "a8",
    type: "ai-generated",
    title: "DeFi Lending Risk Assessment Q2",
    timestamp: "45m ago",
  },
  {
    id: "a9",
    type: "human-verified",
    title: "Validator Uptime Benchmarks",
    timestamp: "52m ago",
  },
  {
    id: "a10",
    type: "ai-generated",
    title: "Canton Governance CIP-42 Analysis",
    timestamp: "1h ago",
  },
  {
    id: "a11",
    type: "human-verified",
    title: "Cross-Chain Asset Bridging Guide",
    timestamp: "1h ago",
  },
  {
    id: "a12",
    type: "ai-generated",
    title: "Weekly Network Health Dashboard",
    timestamp: "2h ago",
  },
  {
    id: "a13",
    type: "editors-pick",
    title: "Institutional DeFi on Canton",
    timestamp: "2h ago",
  },
  {
    id: "a14",
    type: "ai-generated",
    title: "Smart Contract Upgrade Patterns",
    timestamp: "3h ago",
  },
  {
    id: "a15",
    type: "human-verified",
    title: "Canton Developer Onboarding Checklist",
    timestamp: "3h ago",
  },
];

const typeConfig = {
  "ai-generated": {
    icon: Bot,
    label: "AI generated",
    color: "text-muted-foreground",
    dotColor: "bg-muted-foreground/50",
  },
  "human-verified": {
    icon: CheckCircle,
    label: "Human verified",
    color: "text-emerald-400",
    dotColor: "bg-emerald-400",
  },
  "editors-pick": {
    icon: Trophy,
    label: "Editor picked",
    color: "text-amber-400",
    dotColor: "bg-amber-400",
  },
} as const;

/* ---------- Component ---------- */

export function AiActivityFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = 0;
    const speed = 0.5; // pixels per frame (~30px/s at 60fps)

    function scroll(time: number) {
      if (!isPaused && container) {
        const delta = lastTime ? (time - lastTime) * speed * 0.06 : 0;
        container.scrollTop += delta;

        // Loop back to top when near bottom
        if (
          container.scrollTop >=
          container.scrollHeight - container.clientHeight - 1
        ) {
          container.scrollTop = 0;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(scroll);
    }

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Double the items for seamless looping
  const displayItems = [...activityItems, ...activityItems];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/30 bg-card/30 backdrop-blur-md">
      {/* Glassmorphism header */}
      <div className="flex items-center gap-2 border-b border-border/20 bg-card/50 px-4 py-2.5 backdrop-blur-sm">
        <Sparkles className="size-4 text-canton" />
        <span className="text-xs font-medium text-foreground/80">
          Live AI Activity
        </span>
        <span className="relative ml-auto flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-canton opacity-50" />
          <span className="relative inline-flex size-2 rounded-full bg-canton" />
        </span>
      </div>

      {/* Scrolling feed */}
      <div
        ref={scrollRef}
        className="h-64 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="divide-y divide-border/10">
          {displayItems.map((item, index) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(index * 0.03, 0.5) }}
                className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-card/40"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md",
                    item.type === "ai-generated" && "bg-muted/50",
                    item.type === "human-verified" && "bg-emerald-500/10",
                    item.type === "editors-pick" && "bg-amber-500/10"
                  )}
                >
                  <Icon className={cn("size-3.5", config.color)} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs">
                    <span className={cn("font-medium", config.color)}>
                      {config.label}:
                    </span>{" "}
                    <span className="text-foreground/70">
                      &lsquo;{item.title}&rsquo;
                    </span>
                  </p>
                </div>
                <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/60">
                  {item.timestamp}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card/80 to-transparent" />
    </div>
  );
}
