"use client";

import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function ShimmerText({
  children,
  className,
  as: Tag = "span",
}: ShimmerTextProps) {
  return (
    <Tag
      className={cn(
        "relative inline-block bg-clip-text text-transparent",
        "bg-gradient-to-r from-white via-canton to-white",
        "bg-[length:200%_100%]",
        "animate-shimmer",
        className
      )}
    >
      {children}
    </Tag>
  );
}
