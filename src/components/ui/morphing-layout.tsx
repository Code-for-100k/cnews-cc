"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

export type LayoutMode = "dashboard" | "feed" | "compact";

interface MorphingLayoutContextValue {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;
}

const MorphingLayoutContext = createContext<MorphingLayoutContextValue>({
  mode: "dashboard",
  setMode: () => {},
});

export function useMorphingLayout() {
  return useContext(MorphingLayoutContext);
}

interface MorphingLayoutProviderProps {
  children: ReactNode;
  defaultMode?: LayoutMode;
}

export function MorphingLayoutProvider({
  children,
  defaultMode = "dashboard",
}: MorphingLayoutProviderProps) {
  const [mode, setModeState] = useState<LayoutMode>(defaultMode);
  const setMode = useCallback((m: LayoutMode) => setModeState(m), []);

  return (
    <MorphingLayoutContext.Provider value={{ mode, setMode }}>
      <LayoutGroup>{children}</LayoutGroup>
    </MorphingLayoutContext.Provider>
  );
}

/* Grid wrapper that changes layout based on mode */
const gridStyles: Record<LayoutMode, string> = {
  dashboard: "grid grid-cols-1 gap-8 lg:grid-cols-3",
  feed: "grid grid-cols-1 gap-6 max-w-3xl mx-auto",
  compact: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
};

interface MorphingGridProps {
  children: ReactNode;
  className?: string;
}

export function MorphingGrid({ children, className }: MorphingGridProps) {
  const { mode } = useMorphingLayout();

  return (
    <motion.div
      layout
      className={cn(gridStyles[mode], className)}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Individual morphing item */
interface MorphingItemProps {
  children: ReactNode;
  layoutId: string;
  className?: string;
}

export function MorphingItem({
  children,
  layoutId,
  className,
}: MorphingItemProps) {
  return (
    <motion.div
      layout
      layoutId={layoutId}
      className={className}
      transition={{
        layout: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}

/* Mode toggle UI */
const modeLabels: Record<LayoutMode, string> = {
  dashboard: "Dashboard",
  feed: "Feed",
  compact: "Compact",
};

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { mode, setMode } = useMorphingLayout();
  const modes: LayoutMode[] = ["dashboard", "feed", "compact"];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-border/40 bg-card/50 p-1 backdrop-blur-sm",
        className
      )}
    >
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={cn(
            "relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            m === mode
              ? "text-canton-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {m === mode && (
            <motion.span
              layoutId="mode-indicator"
              className="absolute inset-0 rounded-md bg-canton"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{modeLabels[m]}</span>
        </button>
      ))}
    </div>
  );
}
