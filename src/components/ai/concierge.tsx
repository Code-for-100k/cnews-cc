"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  TrendingUp,
  Code,
  Building2,
  Shield,
  Search,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Types ---------- */

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

type UserProfile =
  | "trader"
  | "developer"
  | "institutional"
  | "validator"
  | "researcher"
  | null;

const PROFILES = [
  {
    id: "trader" as const,
    label: "Trader / Investor",
    icon: TrendingUp,
    color: "text-positive",
    desc: "CC prices, market data, staking rewards",
  },
  {
    id: "developer" as const,
    label: "Developer",
    icon: Code,
    color: "text-cyan-400",
    desc: "Daml docs, CIPs, SDK guides, APIs",
  },
  {
    id: "institutional" as const,
    label: "Institutional",
    icon: Building2,
    color: "text-violet-400",
    desc: "RWA tokenization, compliance, partners",
  },
  {
    id: "validator" as const,
    label: "Validator / Node Op",
    icon: Shield,
    color: "text-amber-400",
    desc: "Node setup, rewards, uptime metrics",
  },
  {
    id: "researcher" as const,
    label: "Researcher / Analyst",
    icon: Search,
    color: "text-rose-400",
    desc: "On-chain analytics, reports, governance",
  },
];

/* ---------- Mock AI responses ---------- */

function getAIResponse(input: string, profile: UserProfile): string {
  const lower = input.toLowerCase();

  if (lower.includes("price") || lower.includes("cc")) {
    return "CC is currently trading at $1.47 (+3.82% 24h). Market cap sits at $2.41B. You can track live prices on our [Tokens page](/tokens/cc) or use the [CC Converter](/tools/converter) for real-time conversions.";
  }
  if (lower.includes("stake") || lower.includes("reward") || lower.includes("validator")) {
    return "Canton validators earn CC rewards from transaction fees — Super Validators get 20%, App Validators 62%. Check our [Reward Calculator](/tools/cc-reward-calculator) to estimate your returns, or browse the [Validator Leaderboard](/validators) for uptime and performance data.";
  }
  if (lower.includes("cbtc") || lower.includes("bitcoin")) {
    return "CBTC is Canton's wrapped Bitcoin — a 1:1 BTC asset built by BitSafe using DecParty technology. It's the primary collateral asset on Canton. See the full breakdown on our [CBTC Token page](/tokens/cbtc).";
  }
  if (lower.includes("daml") || lower.includes("develop") || lower.includes("build")) {
    return "Daml is Canton's smart contract language — purpose-built for privacy-preserving financial applications. Start with our [What is Daml?](/learn/what-is-daml) guide, or explore [CIP proposals](/glossary/cip) for the latest protocol changes.";
  }
  if (lower.includes("cip") || lower.includes("governance")) {
    return "Canton uses CIPs (Canton Improvement Proposals) for governance. Key ones include CIP-56 (token standard), CIP-100 (dev fund), and CIP-104 (app rewards). Browse all CIPs in our [Glossary](/glossary/cip).";
  }
  if (lower.includes("ecosystem") || lower.includes("project") || lower.includes("app")) {
    return "The Canton ecosystem has 35+ projects spanning wallets, DEXes, lending, and infrastructure. Explore them all on our [Ecosystem Directory](/ecosystem) — filter by category, status, or search by name.";
  }

  // Profile-specific defaults
  if (profile === "trader") {
    return "I can help with CC market data, price analysis, staking strategies, and token comparisons. Try asking about CC price, staking rewards, or any Canton token. You can also check the [Tokens page](/tokens) for live data.";
  }
  if (profile === "developer") {
    return "I can help with Daml development, CIP proposals, SDK documentation, and Canton architecture. Try asking about Daml, building on Canton, or specific CIPs. Check the [Learn hub](/learn) for tutorials.";
  }
  if (profile === "institutional") {
    return "I can help with RWA tokenization on Canton, institutional partners, compliance frameworks, and enterprise use cases. Key partners include DTCC, Goldman Sachs, and JPMorgan — explore them in the [Ecosystem](/ecosystem).";
  }
  if (profile === "validator") {
    return "I can help with validator setup, reward calculations, uptime optimization, and network health. Check the [Validator Leaderboard](/validators) or use the [Reward Calculator](/tools/cc-reward-calculator).";
  }

  return "I'm your Canton Network intelligence assistant. I can help with CC prices, staking rewards, ecosystem projects, Daml development, CIP governance, and more. What would you like to know?";
}

/* ---------- Component ---------- */

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Show greeting on first open
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content:
            "Hey! I'm the cnews.cc AI — your Canton Network assistant. I can help you find data, explain concepts, or navigate the ecosystem. Who are you?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, hasGreeted]);

  const selectProfile = (p: UserProfile) => {
    setProfile(p);
    const profileInfo = PROFILES.find((x) => x.id === p);
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: profileInfo?.label || "",
        timestamp: new Date(),
      },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        trader:
          "Nice — I'll prioritize market data, prices, and staking opportunities for you. CC is at $1.47 today (+3.82%). What do you want to know?",
        developer:
          "Great — I'll focus on Daml docs, CIPs, and developer tooling. Canton uses the Daml smart contract language with unique privacy features. What are you building?",
        institutional:
          "Got it — I'll highlight institutional use cases, RWA tokenization, and compliance info. Canton has partnerships with DTCC, Goldman Sachs, and JPMorgan. What's your focus?",
        validator:
          "Perfect — I'll surface validator metrics, reward calculations, and network health. There are currently 47 active validators on Canton. What do you need?",
        researcher:
          "Excellent — I'll emphasize on-chain analytics, governance data, and deep research. Canton processes 1,240 TPS with $2.41B market cap. Where should we dig in?",
      };
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: responses[p || ""] || "How can I help?",
          timestamp: new Date(),
        },
      ]);
    }, 800);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getAIResponse(userMsg.content, profile);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-canton text-canton-foreground shadow-lg shadow-canton/25 transition-shadow hover:shadow-xl hover:shadow-canton/30"
          >
            <Sparkles className="size-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex h-[540px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl shadow-black/40 backdrop-blur-xl sm:h-[600px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-canton/15 ring-1 ring-canton/30">
                  <Sparkles className="size-4 text-canton" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Canton AI</p>
                  <p className="text-[10px] text-muted-foreground">
                    Always online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-canton text-canton-foreground"
                        : "bg-card/80 border border-border/40 text-foreground"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: msg.content.replace(
                        /\[([^\]]+)\]\(([^)]+)\)/g,
                        '<a href="$2" class="underline underline-offset-2 font-medium hover:text-canton transition-colors">$1</a>'
                      ),
                    }}
                  />
                </motion.div>
              ))}

              {/* Profile picker */}
              {messages.length === 1 && !profile && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  {PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => selectProfile(p.id)}
                      className="flex w-full items-center gap-3 rounded-xl border border-border/40 bg-card/50 px-3 py-2.5 text-left transition-all hover:border-canton/30 hover:bg-card/80"
                    >
                      <div
                        className={cn(
                          "rounded-lg bg-card p-1.5 ring-1 ring-border/40",
                          p.color
                        )}
                      >
                        <p.icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {p.desc}
                        </p>
                      </div>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-1.5 rounded-2xl border border-border/40 bg-card/80 px-4 py-3">
                    <span className="size-2 animate-bounce rounded-full bg-canton/60 [animation-delay:0ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-canton/60 [animation-delay:150ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-canton/60 [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {profile && messages.length <= 3 && (
              <div className="flex gap-1.5 overflow-x-auto px-4 pb-2 scrollbar-none">
                {[
                  "CC price",
                  "Staking rewards",
                  "Ecosystem",
                  "CIP updates",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => sendMessage(), 50);
                    }}
                    className="shrink-0 rounded-full border border-border/40 bg-card/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-canton/30 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border/40 px-3 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Canton..."
                  className="flex-1 rounded-xl border border-border/40 bg-card/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-canton/40 focus:outline-none focus:ring-1 focus:ring-canton/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-canton text-canton-foreground transition-all disabled:opacity-30 hover:bg-canton/90"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
