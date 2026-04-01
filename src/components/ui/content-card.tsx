"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/ui/verification-badge";
import type { ContentVerification, VerificationStatus } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  verification: ContentVerification;
  onVerificationChange?: (newVerification: ContentVerification) => void;
  showVerifyButton?: boolean;
}

const borderStyles: Record<VerificationStatus, string> = {
  "ai-generated": "border-border/40",
  "human-verified":
    "border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.1)]",
  "editors-pick":
    "border-transparent bg-clip-padding shadow-[0_0_20px_-3px_rgba(245,158,11,0.15)]",
};

export function ContentCard({
  title,
  excerpt,
  category,
  date,
  slug,
  verification,
  onVerificationChange,
  showVerifyButton = true,
}: ContentCardProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = useCallback(() => {
    setIsVerifying(true);

    // Simulate verification — cycle through statuses
    const nextStatus: Record<VerificationStatus, VerificationStatus> = {
      "ai-generated": "human-verified",
      "human-verified": "editors-pick",
      "editors-pick": "ai-generated",
    };

    const newStatus = nextStatus[verification.status];
    const updated: ContentVerification = {
      ...verification,
      status: newStatus,
      verifiedBy: newStatus !== "ai-generated" ? "You (prototype)" : undefined,
      verifiedAt:
        newStatus !== "ai-generated" ? new Date().toISOString() : undefined,
    };

    // Store in localStorage for prototype persistence
    try {
      const stored = JSON.parse(
        localStorage.getItem("cnews-verifications") || "{}"
      );
      stored[slug] = updated;
      localStorage.setItem("cnews-verifications", JSON.stringify(stored));
    } catch {
      // localStorage unavailable, no-op
    }

    setTimeout(() => {
      onVerificationChange?.(updated);
      setIsVerifying(false);
    }, 300);
  }, [verification, slug, onVerificationChange]);

  const isEditorsPick = verification.status === "editors-pick";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={cn(
          "relative rounded-xl",
          isEditorsPick &&
            "bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-canton/10 p-px"
        )}
      >
        <Card
          className={cn(
            "relative h-full overflow-hidden transition-all duration-300 hover:bg-card/80",
            borderStyles[verification.status],
            isEditorsPick && "rounded-[11px] border-0"
          )}
        >
          {/* Verification badge */}
          <div className="absolute right-3 top-3 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={verification.status}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <VerificationBadge verification={verification} size="sm" />
              </motion.div>
            </AnimatePresence>
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {date}
              </span>
            </div>
            <CardTitle className="line-clamp-2 pr-24 text-sm leading-snug">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {excerpt}
            </p>

            {/* Confidence bar */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">
                AI Confidence
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-border/40">
                <motion.div
                  className="h-full rounded-full bg-canton/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${verification.confidenceScore}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
                {verification.confidenceScore}%
              </span>
            </div>

            {/* Verify button */}
            {showVerifyButton && (
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className={cn(
                  "inline-flex h-7 w-full items-center justify-center gap-1.5 rounded-md border text-xs font-medium transition-all",
                  "border-border/50 bg-card/50 text-muted-foreground hover:border-canton/40 hover:text-canton",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <CheckCircle className="size-3" />
                {isVerifying
                  ? "Verifying..."
                  : verification.status === "ai-generated"
                    ? "Verify Content"
                    : verification.status === "human-verified"
                      ? "Mark as Editor's Pick"
                      : "Reset to AI Generated"}
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
