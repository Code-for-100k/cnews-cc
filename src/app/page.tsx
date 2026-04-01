"use client";

import Link from "next/link";
import {
  DollarSign,
  BarChart3,
  Activity,
  Shield,
  Zap,
  Calculator,
  ArrowRightLeft,
  Newspaper,
  Clock,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  ChevronRight,
  Layers,
  Wallet,
  Globe,
  Code,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatsCard } from "@/components/charts/stats-card";
import { VerifiedFeed } from "@/components/homepage/verified-feed";
import { AiActivityFeed } from "@/components/homepage/ai-activity-feed";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ShimmerText } from "@/components/ui/shimmer-text";
import {
  MorphingLayoutProvider,
  MorphingGrid,
  MorphingItem,
  ModeToggle,
  useMorphingLayout,
} from "@/components/ui/morphing-layout";

/* ---------- Stagger container + item variants ---------- */
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ---------- Mock data ---------- */

const networkStats = [
  { icon: DollarSign, label: "CC Price", value: "$1.47", change: 3.82 },
  { icon: BarChart3, label: "Market Cap", value: "$2.41B", change: 2.14 },
  { icon: Activity, label: "24h Volume", value: "$184M", change: -1.28 },
  { icon: Shield, label: "Active Validators", value: "47", suffix: "nodes" },
  { icon: Zap, label: "Network TPS", value: "1,240", suffix: "tx/s" },
];

const latestNews = [
  {
    title: "Canton Network Surpasses 1M Daily Transactions",
    excerpt:
      "The Canton Network reached a new milestone this week as daily transaction volume exceeded one million for the first time.",
    date: "2026-04-01",
    category: "Network",
    slug: "canton-1m-transactions",
  },
  {
    title: "CC Staking Rewards Updated for Q2 2026",
    excerpt:
      "The Canton Foundation announced updated staking reward parameters for the second quarter, with increased yields for long-term stakers.",
    date: "2026-03-30",
    category: "Staking",
    slug: "cc-staking-q2-2026",
  },
  {
    title: "New DeFi Protocol Launches on Canton",
    excerpt:
      "A new decentralized lending protocol has launched on Canton, bringing institutional-grade DeFi capabilities to the network.",
    date: "2026-03-28",
    category: "DeFi",
    slug: "new-defi-protocol-canton",
  },
];

const topTokens = [
  {
    name: "Canton Coin",
    symbol: "CC",
    price: "$1.47",
    change: 3.82,
    mcap: "$2.41B",
  },
  {
    name: "Canton BTC",
    symbol: "CBTC",
    price: "$84,231.00",
    change: 1.24,
    mcap: "$1.87B",
  },
  {
    name: "USD Coin X",
    symbol: "USDCx",
    price: "$1.00",
    change: 0.01,
    mcap: "$912M",
  },
];

const topValidators = [
  { name: "Digital Asset", stake: "12.4M CC", uptime: "99.99%", rank: 1 },
  { name: "Splice Labs", stake: "10.8M CC", uptime: "99.98%", rank: 2 },
  { name: "Canton Foundation", stake: "9.2M CC", uptime: "99.97%", rank: 3 },
  { name: "Deloitte Node", stake: "8.1M CC", uptime: "99.95%", rank: 4 },
  { name: "Goldman Sachs", stake: "7.6M CC", uptime: "99.94%", rank: 5 },
];

const featuredTools = [
  {
    title: "CC Calculator",
    description: "Calculate staking rewards and token conversions instantly.",
    icon: Calculator,
    href: "/tools/calculator",
  },
  {
    title: "Token Converter",
    description: "Convert between CC, CBTC, USDCx and other Canton tokens.",
    icon: ArrowRightLeft,
    href: "/tools/converter",
  },
];

const ecosystemCategories = [
  { label: "DeFi", icon: Layers, count: 12 },
  { label: "Wallets", icon: Wallet, count: 8 },
  { label: "Infrastructure", icon: Globe, count: 15 },
  { label: "Developer Tools", icon: Code, count: 22 },
];

/* ---------- Sub-components ---------- */

function StaggeredTokenTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <Card>
        <CardContent className="space-y-0 divide-y divide-border/50">
          {topTokens.map((token) => (
            <motion.div key={token.symbol} variants={slideInLeft}>
              <Link
                href={`/tokens/${token.symbol.toLowerCase()}`}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium">{token.symbol}</p>
                  <p className="text-xs text-muted-foreground">{token.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium tabular-nums">
                    {token.price}
                  </p>
                  <p
                    className={`flex items-center justify-end gap-0.5 text-xs tabular-nums ${
                      token.change >= 0 ? "text-positive" : "text-negative"
                    }`}
                  >
                    {token.change >= 0 ? (
                      <TrendingUp className="size-3" />
                    ) : (
                      <TrendingDown className="size-3" />
                    )}
                    {token.change >= 0 ? "+" : ""}
                    {token.change.toFixed(2)}%
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StaggeredValidatorList() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <Card>
        <CardContent className="space-y-0 divide-y divide-border/50">
          {topValidators.map((v) => (
            <motion.div key={v.name} variants={slideInRight}>
              <Link
                href={`/validators/${v.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-6 items-center justify-center rounded-md bg-canton-muted text-xs font-bold text-canton">
                    {v.rank}
                  </span>
                  <p className="text-sm font-medium">{v.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs tabular-nums text-muted-foreground">
                    {v.stake}
                  </p>
                  <p className="text-xs text-positive">{v.uptime}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ---------- Main content that uses MorphingLayout context ---------- */

function HomeContent() {
  const { mode } = useMorphingLayout();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 24 }}
        animate={heroInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-canton/5 via-background to-cyan-500/5 px-6 pb-10 pt-8 text-center sm:px-12 sm:pb-14 sm:pt-12"
      >
        {/* Decorative grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,212,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,170,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Decorative glow orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-canton/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 right-1/4 h-32 w-64 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 border-canton/20 bg-canton/10 text-canton"
            >
              Live Canton Network Data
            </Badge>
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            <span className="bg-gradient-to-r from-white via-white to-canton bg-clip-text text-transparent">
              The Canton Network
            </span>
            <br />
            <ShimmerText
              as="span"
              className="bg-gradient-to-r from-canton via-emerald-400 to-cyan-400 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Intelligence Hub
            </ShimmerText>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Real-time analytics, validator metrics, token data, and DeFi
            insights for the Canton ecosystem — all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <Link
              href="/tokens"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-canton px-5 text-sm font-medium text-canton-foreground transition-all hover:bg-canton/90 hover:shadow-lg hover:shadow-canton/20"
            >
              Explore Tokens <ChevronRight className="size-4" />
            </Link>
            <Link
              href="/tools/cc-reward-calculator"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/60 bg-card/50 px-5 text-sm font-medium text-foreground transition-all hover:border-canton/40 hover:bg-card"
            >
              Calculate Rewards
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats bar */}
      <AnimatedSection direction="up" delay={0.1}>
        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {networkStats.map((stat) => (
            <StatsCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              suffix={stat.suffix}
            />
          ))}
        </section>
      </AnimatedSection>

      {/* AI Content Verification System */}
      <AnimatedSection direction="up" delay={0.15}>
        <section className="mt-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <VerifiedFeed />
            <aside className="space-y-4">
              <AiActivityFeed />
            </aside>
          </div>
        </section>
      </AnimatedSection>

      <Separator className="my-10 bg-border/30" />

      {/* View mode toggle */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          View Mode
        </h2>
        <ModeToggle />
      </div>

      {/* Morphing content grid */}
      <MorphingGrid>
        {/* Latest News */}
        <MorphingItem
          layoutId="news-section"
          className={mode === "dashboard" ? "lg:col-span-2" : ""}
        >
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Newspaper className="size-5 text-canton" />
                Latest News
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-canton"
              >
                View all
                <ChevronRight className="size-4" />
              </Link>
            </div>
            <AnimatedSection direction="up" delay={0.1}>
              <div
                className={
                  mode === "compact"
                    ? "space-y-2"
                    : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {latestNews.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="card-hover group h-full transition-colors hover:border-canton/30 hover:bg-card/80">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              {post.date}
                            </span>
                          </div>
                          <CardTitle className="line-clamp-2 text-sm leading-snug">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        {mode !== "compact" && (
                          <CardContent>
                            <p className="line-clamp-3 text-xs text-muted-foreground">
                              {post.excerpt}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </section>
        </MorphingItem>

        {/* Sidebar: Top Tokens + Validators */}
        <MorphingItem layoutId="sidebar-section">
          <aside className="space-y-8">
            {/* Top Tokens */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="size-5 text-canton" />
                  Top Tokens
                </h2>
                <Link
                  href="/tokens"
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-canton"
                >
                  All
                  <ChevronRight className="size-4" />
                </Link>
              </div>
              <StaggeredTokenTable />
            </div>

            {/* Validator Leaderboard */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Shield className="size-5 text-canton" />
                  Validators
                </h2>
                <Link
                  href="/validators"
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-canton"
                >
                  All
                  <ChevronRight className="size-4" />
                </Link>
              </div>
              <StaggeredValidatorList />
            </div>
          </aside>
        </MorphingItem>
      </MorphingGrid>

      <Separator className="my-8 bg-border/50" />

      {/* Featured Tools */}
      <AnimatedSection direction="up" delay={0.1}>
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Zap className="size-5 text-canton" />
            Featured Tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredTools.map((tool, i) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <Link href={tool.href}>
                  <Card className="card-hover group h-full transition-colors hover:border-canton/30">
                    <CardContent className="flex items-start gap-4">
                      <div className="rounded-lg bg-canton-muted p-2.5">
                        <tool.icon className="size-5 text-canton" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{tool.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>
                      <ExternalLink className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <Separator className="my-8 bg-border/50" />

      {/* Canton Ecosystem */}
      <AnimatedSection direction="up" delay={0.1}>
        <section className="pb-4">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Globe className="size-5 text-canton" />
            Canton Ecosystem
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ecosystemCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <Link
                  href={`/ecosystem?category=${cat.label.toLowerCase()}`}
                >
                  <Card className="group text-center transition-colors hover:border-canton/30 hover:shadow-lg hover:shadow-canton/5">
                    <CardContent className="flex flex-col items-center gap-2 py-2">
                      <div className="rounded-lg bg-canton-muted p-3 transition-colors group-hover:bg-canton/20">
                        <cat.icon className="size-5 text-canton" />
                      </div>
                      <p className="text-sm font-medium">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {cat.count} projects
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}

/* ---------- Page wrapper with MorphingLayoutProvider ---------- */

export default function HomePage() {
  return (
    <MorphingLayoutProvider>
      <HomeContent />
    </MorphingLayoutProvider>
  );
}
