"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContentCard } from "@/components/ui/content-card";
import type { ContentVerification, VerificationStatus } from "@/lib/api/types";

/* ---------- Mock data ---------- */

interface FeedItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  verification: ContentVerification;
}

const initialFeedItems: FeedItem[] = [
  {
    id: "1",
    title: "Canton vs Ethereum: A Deep Dive into Privacy-First L1s",
    excerpt:
      "An exhaustive comparison of Canton's privacy-preserving architecture against Ethereum's public ledger model, covering throughput, finality, and enterprise adoption.",
    category: "Analysis",
    date: "2026-04-01",
    slug: "canton-vs-ethereum-deep-dive",
    verification: {
      status: "editors-pick",
      verifiedBy: "Sarah Chen",
      verifiedAt: "2026-04-01T14:30:00Z",
      aiModel: "Claude 4 Opus",
      aiGeneratedAt: "2026-04-01T10:00:00Z",
      confidenceScore: 96,
    },
  },
  {
    id: "2",
    title: "CBTC Staking Guide: Maximizing Your Validator Rewards",
    excerpt:
      "Step-by-step guide to staking CBTC on Canton, including optimal delegation strategies and reward calculations for Q2 2026.",
    category: "Guide",
    date: "2026-03-31",
    slug: "cbtc-staking-guide",
    verification: {
      status: "human-verified",
      verifiedBy: "James Park",
      verifiedAt: "2026-03-31T18:00:00Z",
      aiModel: "Claude 4 Opus",
      aiGeneratedAt: "2026-03-31T09:15:00Z",
      confidenceScore: 92,
    },
  },
  {
    id: "3",
    title: "Canton Q2 2026 Validator Performance Report",
    excerpt:
      "Comprehensive analysis of validator uptime, reward distribution, and network health metrics for the Canton Network in Q2 2026.",
    category: "Report",
    date: "2026-03-30",
    slug: "canton-q2-validator-report",
    verification: {
      status: "human-verified",
      verifiedBy: "Maria Lopez",
      verifiedAt: "2026-03-30T16:45:00Z",
      aiModel: "Claude 4 Sonnet",
      aiGeneratedAt: "2026-03-30T08:30:00Z",
      confidenceScore: 89,
    },
  },
  {
    id: "4",
    title: "Understanding Canton's Sub-Transaction Privacy Model",
    excerpt:
      "How Canton achieves transaction-level privacy without zero-knowledge proofs, and why enterprises prefer this approach.",
    category: "Education",
    date: "2026-03-29",
    slug: "canton-privacy-model",
    verification: {
      status: "editors-pick",
      verifiedBy: "Sarah Chen",
      verifiedAt: "2026-03-29T20:00:00Z",
      aiModel: "Claude 4 Opus",
      aiGeneratedAt: "2026-03-29T11:00:00Z",
      confidenceScore: 94,
    },
  },
  {
    id: "5",
    title: "DeFi Lending Protocols on Canton: Risk Assessment",
    excerpt:
      "Analysis of smart contract risk, liquidity depth, and collateral quality across Canton's emerging DeFi lending ecosystem.",
    category: "DeFi",
    date: "2026-03-28",
    slug: "defi-lending-risk-assessment",
    verification: {
      status: "ai-generated",
      aiModel: "Claude 4 Sonnet",
      aiGeneratedAt: "2026-03-28T14:00:00Z",
      confidenceScore: 78,
    },
  },
  {
    id: "6",
    title: "CC Tokenomics Breakdown: Supply, Demand, and Burn Mechanics",
    excerpt:
      "A data-driven look at Canton Coin's token economics, including emission schedules, burn mechanisms, and long-term supply projections.",
    category: "Research",
    date: "2026-03-27",
    slug: "cc-tokenomics-breakdown",
    verification: {
      status: "human-verified",
      verifiedBy: "Alex Kim",
      verifiedAt: "2026-03-28T10:00:00Z",
      aiModel: "Claude 4 Opus",
      aiGeneratedAt: "2026-03-27T09:00:00Z",
      confidenceScore: 91,
    },
  },
  {
    id: "7",
    title: "How to Bridge Assets to Canton: Complete Walkthrough",
    excerpt:
      "End-to-end guide for bridging ETH, BTC, and stablecoins to the Canton Network using official bridge infrastructure.",
    category: "Guide",
    date: "2026-03-26",
    slug: "bridge-assets-canton",
    verification: {
      status: "ai-generated",
      aiModel: "Claude 4 Haiku",
      aiGeneratedAt: "2026-03-26T12:00:00Z",
      confidenceScore: 72,
    },
  },
  {
    id: "8",
    title: "Canton Governance: CIP Process and Voting Mechanics",
    excerpt:
      "Deep dive into Canton's on-chain governance framework, the CIP improvement proposal process, and how token holders participate.",
    category: "Governance",
    date: "2026-03-25",
    slug: "canton-governance-cips",
    verification: {
      status: "ai-generated",
      aiModel: "Claude 4 Sonnet",
      aiGeneratedAt: "2026-03-25T15:30:00Z",
      confidenceScore: 81,
    },
  },
];

/* ---------- Sorting ---------- */

const statusPriority: Record<VerificationStatus, number> = {
  "editors-pick": 0,
  "human-verified": 1,
  "ai-generated": 2,
};

function sortItems(items: FeedItem[]): FeedItem[] {
  return [...items].sort(
    (a, b) =>
      statusPriority[a.verification.status] -
      statusPriority[b.verification.status]
  );
}

type FilterTab = "all" | "verified" | "editors-pick";

function filterItems(items: FeedItem[], tab: FilterTab): FeedItem[] {
  const sorted = sortItems(items);
  switch (tab) {
    case "verified":
      return sorted.filter(
        (item) => item.verification.status !== "ai-generated"
      );
    case "editors-pick":
      return sorted.filter(
        (item) => item.verification.status === "editors-pick"
      );
    default:
      return sorted;
  }
}

/* ---------- Component ---------- */

export function VerifiedFeed() {
  const [items, setItems] = useState<FeedItem[]>(initialFeedItems);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const handleVerificationChange = useCallback(
    (id: string, newVerification: ContentVerification) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, verification: newVerification } : item
        )
      );
    },
    []
  );

  const filteredItems = filterItems(items, activeTab);

  const verifiedCount = items.filter(
    (i) => i.verification.status !== "ai-generated"
  ).length;
  const editorsPickCount = items.filter(
    (i) => i.verification.status === "editors-pick"
  ).length;

  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ShieldCheck className="size-5 text-canton" />
          Verified Content
        </h2>

        <Tabs
          defaultValue={0}
          onValueChange={(val) => {
            const tabMap: FilterTab[] = ["all", "verified", "editors-pick"];
            setActiveTab(tabMap[val as number] ?? "all");
          }}
        >
          <TabsList variant="line" className="h-8">
            <TabsTrigger value={0} className="text-xs">
              All ({items.length})
            </TabsTrigger>
            <TabsTrigger value={1} className="text-xs">
              Verified ({verifiedCount})
            </TabsTrigger>
            <TabsTrigger value={2} className="text-xs">
              Editor&apos;s Picks ({editorsPickCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        layout
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.06,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <ContentCard
              title={item.title}
              excerpt={item.excerpt}
              category={item.category}
              date={item.date}
              slug={item.slug}
              verification={item.verification}
              onVerificationChange={(v) =>
                handleVerificationChange(item.id, v)
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShieldCheck className="mb-3 size-10 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            No content matches this filter yet.
          </p>
        </div>
      )}
    </section>
  );
}
