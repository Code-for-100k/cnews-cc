"use client";

import { Bot, CheckCircle, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { ContentVerification } from "@/lib/api/types";

const statusConfig = {
  "ai-generated": {
    label: "AI Generated",
    icon: Bot,
    className:
      "border-border/50 bg-muted/60 text-muted-foreground hover:bg-muted",
  },
  "human-verified": {
    label: "Human Verified",
    icon: CheckCircle,
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
  },
  "editors-pick": {
    label: "Editor's Pick",
    icon: Trophy,
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
  },
} as const;

interface VerificationBadgeProps {
  verification: ContentVerification;
  size?: "sm" | "default";
}

export function VerificationBadge({
  verification,
  size = "default",
}: VerificationBadgeProps) {
  const config = statusConfig[verification.status];
  const Icon = config.icon;

  const formattedDate = verification.verifiedAt
    ? new Date(verification.verifiedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const generatedDate = new Date(
    verification.aiGeneratedAt
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
          }
        >
          <Badge
            variant="outline"
            className={`${config.className} ${
              size === "sm" ? "h-4 gap-0.5 px-1.5 text-[10px]" : ""
            } cursor-default`}
          >
            <Icon
              className={size === "sm" ? "size-2.5" : "size-3"}
              data-icon="inline-start"
            />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-xs space-y-1.5 rounded-lg bg-card/95 px-3 py-2.5 text-card-foreground shadow-xl backdrop-blur-sm"
        >
          <p className="text-xs font-medium">{config.label}</p>
          {verification.aiModel && (
            <p className="text-[11px] text-muted-foreground">
              Model: {verification.aiModel}
            </p>
          )}
          <p className="text-[11px] text-muted-foreground">
            Generated: {generatedDate}
          </p>
          {verification.verifiedBy && (
            <p className="text-[11px] text-muted-foreground">
              Verified by: {verification.verifiedBy}
            </p>
          )}
          {formattedDate && (
            <p className="text-[11px] text-muted-foreground">
              Verified: {formattedDate}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground">
              Confidence:
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-border/50">
              <div
                className="h-full rounded-full bg-canton transition-all"
                style={{ width: `${verification.confidenceScore}%` }}
              />
            </div>
            <span className="text-[11px] font-medium tabular-nums text-canton">
              {verification.confidenceScore}%
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
