// Mock data for all content pages — will be replaced with API/Sanity data later

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: { name: string; avatar: string }
  date: string
  image: string
  readTime: string
}

export const BLOG_CATEGORIES = [
  "All",
  "News",
  "Analysis",
  "DeFi",
  "Technology",
  "Regulation",
  "Opinion",
] as const

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "canton-network-mainnet-launch",
    title: "Canton Network Mainnet Launch: What You Need to Know",
    excerpt:
      "The Canton Network has officially launched its mainnet, bringing institutional-grade DeFi to the Daml ecosystem. Here is everything you need to know about the launch and what it means for the future of decentralized finance.",
    content: `<h2 id="overview">Overview</h2><p>The Canton Network mainnet launch marks a pivotal moment in institutional blockchain adoption. Built on the Daml smart contract language, Canton provides a privacy-first, interoperable infrastructure for financial institutions.</p><h2 id="key-features">Key Features</h2><p>Canton introduces several groundbreaking features including sub-second finality, native privacy through sub-transaction privacy, and seamless interoperability between participants.</p><h2 id="what-this-means">What This Means for DeFi</h2><p>With major financial institutions already onboard, Canton is positioned to bridge the gap between traditional finance and decentralized protocols. The network supports tokenized assets, lending protocols, and decentralized exchanges.</p><h2 id="looking-ahead">Looking Ahead</h2><p>The roadmap includes enhanced cross-chain bridges, additional DeFi primitives, and expanded validator participation. The CC token will play a central role in governance and network security.</p>`,
    category: "News",
    author: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
    date: "2026-03-28",
    image: "/blog/canton-mainnet.jpg",
    readTime: "5 min",
  },
  {
    slug: "cc-token-staking-guide",
    title: "Complete Guide to CC Token Staking and Rewards",
    excerpt:
      "Learn how to stake your CC tokens, understand validator selection, and maximize your staking rewards on the Canton Network.",
    content: `<h2 id="getting-started">Getting Started with Staking</h2><p>Staking CC tokens is one of the most effective ways to earn passive income while securing the Canton Network. This guide walks you through the entire process from wallet setup to reward collection.</p><h2 id="choosing-validator">Choosing a Validator</h2><p>Selecting the right validator is crucial. Consider factors like uptime, commission rates, total delegated stake, and community reputation.</p><h2 id="reward-mechanics">Reward Mechanics</h2><p>Staking rewards on Canton are distributed per epoch. The base APY varies between 4-8% depending on network participation rates and validator performance.</p><h2 id="risks">Understanding the Risks</h2><p>While staking is generally safe, there are risks including slashing for validator misbehavior, lock-up periods, and opportunity cost. Always diversify your staking across multiple validators.</p>`,
    category: "DeFi",
    author: { name: "Marcus Rivera", avatar: "/avatars/marcus.jpg" },
    date: "2026-03-25",
    image: "/blog/staking-guide.jpg",
    readTime: "8 min",
  },
  {
    slug: "institutional-defi-canton",
    title: "How Institutional DeFi is Reshaping Finance on Canton",
    excerpt:
      "Major banks and asset managers are building on Canton. We analyze the institutional DeFi landscape and its implications for the broader crypto market.",
    content: `<h2 id="institutional-adoption">The Institutional Wave</h2><p>2026 has seen unprecedented institutional adoption of DeFi protocols on Canton Network. From tokenized treasuries to on-chain repo markets, traditional finance is embracing decentralized infrastructure.</p><h2 id="key-players">Key Players</h2><p>Several major financial institutions have deployed applications on Canton, leveraging its privacy features and regulatory compliance capabilities.</p><h2 id="market-impact">Market Impact</h2><p>The influx of institutional capital has driven significant growth in TVL and trading volumes across Canton-based protocols.</p>`,
    category: "Analysis",
    author: { name: "Elena Kovac", avatar: "/avatars/elena.jpg" },
    date: "2026-03-22",
    image: "/blog/institutional-defi.jpg",
    readTime: "6 min",
  },
  {
    slug: "daml-smart-contracts-explained",
    title: "Daml Smart Contracts Explained: A Developer Primer",
    excerpt:
      "Daml is the smart contract language powering Canton. Learn how it differs from Solidity and why institutions prefer it.",
    content: `<h2 id="what-is-daml">What is Daml?</h2><p>Daml is a purpose-built smart contract language designed for multi-party applications. Unlike Solidity, Daml focuses on privacy, composability, and formal verification.</p><h2 id="key-differences">Key Differences from Solidity</h2><p>Daml uses a fundamentally different execution model based on the UTXO pattern with authorization rules, providing native privacy and preventing common smart contract vulnerabilities.</p><h2 id="getting-started">Getting Started</h2><p>Setting up a Daml development environment is straightforward with the Daml SDK. This section covers installation, project scaffolding, and deploying your first contract to Canton.</p>`,
    category: "Technology",
    author: { name: "James Park", avatar: "/avatars/james.jpg" },
    date: "2026-03-18",
    image: "/blog/daml-explained.jpg",
    readTime: "10 min",
  },
  {
    slug: "canton-governance-proposals",
    title: "Canton Governance: CIP Process and Active Proposals",
    excerpt:
      "A deep dive into the Canton Improvement Proposal process and the most impactful proposals currently under discussion.",
    content: `<h2 id="cip-process">The CIP Process</h2><p>Canton Improvement Proposals (CIPs) are the primary mechanism for protocol upgrades and governance decisions. Understanding the CIP lifecycle is essential for active participation in Canton governance.</p><h2 id="active-proposals">Active Proposals</h2><p>Several significant CIPs are currently in discussion, ranging from fee structure changes to new DeFi primitives.</p><h2 id="how-to-participate">How to Participate</h2><p>CC token holders can participate in governance by delegating to validators, voting on proposals, and submitting their own CIPs.</p>`,
    category: "News",
    author: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
    date: "2026-03-15",
    image: "/blog/governance.jpg",
    readTime: "7 min",
  },
  {
    slug: "regulation-update-q1-2026",
    title: "Crypto Regulation Update: Q1 2026 in Review",
    excerpt:
      "Key regulatory developments from Q1 2026 that impact Canton Network and the broader institutional DeFi ecosystem.",
    content: `<h2 id="overview">Regulatory Landscape</h2><p>Q1 2026 brought several important regulatory developments for the crypto industry, particularly in the institutional DeFi space that Canton serves.</p><h2 id="us-developments">US Developments</h2><p>The SEC has continued to provide clarity on tokenized securities, with new guidance that benefits Canton-based tokenization platforms.</p><h2 id="eu-mica">EU MiCA Implementation</h2><p>The Markets in Crypto-Assets regulation entered its full implementation phase, creating a clear framework for institutional crypto participation in Europe.</p>`,
    category: "Regulation",
    author: { name: "Elena Kovac", avatar: "/avatars/elena.jpg" },
    date: "2026-03-10",
    image: "/blog/regulation.jpg",
    readTime: "6 min",
  },
]

// ─── Tokens ──────────────────────────────────────────────────────────────────

export interface Token {
  slug: string
  name: string
  symbol: string
  logo: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  totalSupply: number
  ath: number
  athDate: string
  atl: number
  atlDate: string
  description: string
  website: string
  sparkline: number[]
  exchanges: string[]
}

export const TOKENS: Token[] = [
  {
    slug: "cc",
    name: "Canton Coin",
    symbol: "CC",
    logo: "/tokens/cc.svg",
    price: 12.47,
    change24h: 3.24,
    marketCap: 4_980_000_000,
    volume24h: 312_000_000,
    circulatingSupply: 399_358_000,
    totalSupply: 1_000_000_000,
    ath: 18.92,
    athDate: "2026-02-14",
    atl: 0.42,
    atlDate: "2024-06-01",
    description:
      "Canton Coin (CC) is the native utility and governance token of the Canton Network. It is used for transaction fees, staking, validator rewards, and on-chain governance through the CIP process.",
    website: "https://canton.network",
    sparkline: [11.2, 11.5, 11.8, 12.1, 11.9, 12.3, 12.0, 12.4, 12.2, 12.5, 12.3, 12.47],
    exchanges: ["Temple Exchange", "Binance", "Coinbase", "Kraken"],
  },
  {
    slug: "cbtc",
    name: "Canton BTC",
    symbol: "cBTC",
    logo: "/tokens/cbtc.svg",
    price: 68_421.5,
    change24h: -1.12,
    marketCap: 1_368_430_000,
    volume24h: 89_000_000,
    circulatingSupply: 20_000,
    totalSupply: 20_000,
    ath: 73_250.0,
    athDate: "2026-01-20",
    atl: 41_200.0,
    atlDate: "2024-09-15",
    description:
      "Canton BTC (cBTC) is a wrapped Bitcoin token on the Canton Network. Each cBTC is backed 1:1 by BTC held in institutional-grade custody, enabling Bitcoin holders to participate in Canton DeFi.",
    website: "https://canton.network/cbtc",
    sparkline: [69100, 68900, 68500, 68200, 68800, 68400, 68100, 68600, 68300, 68500, 68200, 68421],
    exchanges: ["Temple Exchange", "Binance"],
  },
  {
    slug: "usdcx",
    name: "USDC on Canton",
    symbol: "USDCx",
    logo: "/tokens/usdcx.svg",
    price: 1.0,
    change24h: 0.01,
    marketCap: 2_150_000_000,
    volume24h: 540_000_000,
    circulatingSupply: 2_150_000_000,
    totalSupply: 2_150_000_000,
    ath: 1.002,
    athDate: "2026-01-05",
    atl: 0.998,
    atlDate: "2025-11-12",
    description:
      "USDCx is the Canton Network representation of USDC, the regulated stablecoin issued by Circle. It serves as the primary stablecoin for DeFi activity on Canton.",
    website: "https://circle.com",
    sparkline: [1.0, 1.0, 1.0, 1.001, 1.0, 0.999, 1.0, 1.0, 1.001, 1.0, 1.0, 1.0],
    exchanges: ["Temple Exchange", "Coinbase", "Kraken"],
  },
  {
    slug: "daml",
    name: "Daml Token",
    symbol: "DAML",
    logo: "/tokens/daml.svg",
    price: 2.84,
    change24h: 5.67,
    marketCap: 568_000_000,
    volume24h: 42_000_000,
    circulatingSupply: 200_000_000,
    totalSupply: 500_000_000,
    ath: 4.21,
    athDate: "2026-02-28",
    atl: 0.18,
    atlDate: "2024-08-20",
    description:
      "The Daml Token powers the developer ecosystem around the Daml smart contract language. It is used for developer grants, protocol fees on development tooling, and ecosystem governance.",
    website: "https://daml.com",
    sparkline: [2.5, 2.6, 2.55, 2.7, 2.65, 2.8, 2.75, 2.82, 2.78, 2.85, 2.8, 2.84],
    exchanges: ["Temple Exchange", "Binance", "Coinbase"],
  },
  {
    slug: "loop",
    name: "Loop Finance",
    symbol: "LOOP",
    logo: "/tokens/loop.svg",
    price: 0.87,
    change24h: -2.31,
    marketCap: 174_000_000,
    volume24h: 18_500_000,
    circulatingSupply: 200_000_000,
    totalSupply: 400_000_000,
    ath: 1.45,
    athDate: "2026-01-18",
    atl: 0.05,
    atlDate: "2025-03-10",
    description:
      "Loop Finance is the governance token for the Loop DeFi protocol suite on Canton, including the Loop DEX and Loop Lend platforms.",
    website: "https://loop.finance",
    sparkline: [0.92, 0.9, 0.88, 0.91, 0.89, 0.87, 0.9, 0.88, 0.86, 0.89, 0.87, 0.87],
    exchanges: ["Temple Exchange", "Binance"],
  },
]

// ─── Validators ──────────────────────────────────────────────────────────────

export interface Validator {
  slug: string
  name: string
  logo: string
  uptime: number
  totalStake: number
  commission: number
  delegators: number
  status: "active" | "inactive" | "jailed"
  rewards24h: number
  description: string
  website: string
  rewardHistory: number[]
}

export const VALIDATORS: Validator[] = [
  {
    slug: "digital-asset",
    name: "Digital Asset",
    logo: "/validators/da.svg",
    uptime: 99.98,
    totalStake: 42_500_000,
    commission: 5,
    delegators: 8_240,
    status: "active",
    rewards24h: 12_450,
    description:
      "Digital Asset is the creator of the Daml smart contract language and a founding participant of the Canton Network. Their validator node is one of the most reliable on the network.",
    website: "https://digitalasset.com",
    rewardHistory: [11200, 11800, 12100, 11900, 12300, 12450],
  },
  {
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    logo: "/validators/gs.svg",
    uptime: 99.95,
    totalStake: 38_200_000,
    commission: 8,
    delegators: 5_120,
    status: "active",
    rewards24h: 10_890,
    description:
      "Goldman Sachs operates a validator node as part of its digital assets strategy, supporting institutional DeFi on Canton Network.",
    website: "https://goldmansachs.com",
    rewardHistory: [10200, 10500, 10800, 10600, 10900, 10890],
  },
  {
    slug: "broadridge",
    name: "Broadridge",
    logo: "/validators/broadridge.svg",
    uptime: 99.92,
    totalStake: 31_800_000,
    commission: 6,
    delegators: 4_890,
    status: "active",
    rewards24h: 9_540,
    description:
      "Broadridge Financial Solutions operates critical fintech infrastructure and validates transactions on Canton Network as part of its DLT platform services.",
    website: "https://broadridge.com",
    rewardHistory: [8900, 9100, 9300, 9200, 9400, 9540],
  },
  {
    slug: "deloitte",
    name: "Deloitte",
    logo: "/validators/deloitte.svg",
    uptime: 99.88,
    totalStake: 28_500_000,
    commission: 7,
    delegators: 3_670,
    status: "active",
    rewards24h: 8_120,
    description:
      "Deloitte participates in Canton Network validation as part of its blockchain advisory and infrastructure practice.",
    website: "https://deloitte.com",
    rewardHistory: [7800, 7900, 8000, 7950, 8100, 8120],
  },
  {
    slug: "cboe-digital",
    name: "Cboe Digital",
    logo: "/validators/cboe.svg",
    uptime: 99.96,
    totalStake: 25_100_000,
    commission: 5,
    delegators: 3_210,
    status: "active",
    rewards24h: 7_530,
    description:
      "Cboe Digital extends its exchange infrastructure to Canton Network, operating a high-availability validator for institutional participants.",
    website: "https://cboedigital.com",
    rewardHistory: [7000, 7200, 7300, 7100, 7400, 7530],
  },
  {
    slug: "community-node-alpha",
    name: "Community Node Alpha",
    logo: "/validators/community.svg",
    uptime: 99.45,
    totalStake: 8_200_000,
    commission: 3,
    delegators: 12_450,
    status: "active",
    rewards24h: 2_460,
    description:
      "A community-operated validator run by early Canton Network supporters. Known for low commission rates and active community engagement.",
    website: "https://cantoncommunitynodes.org",
    rewardHistory: [2200, 2300, 2350, 2400, 2380, 2460],
  },
  {
    slug: "staked-canton",
    name: "Staked Canton",
    logo: "/validators/staked.svg",
    uptime: 98.2,
    totalStake: 2_100_000,
    commission: 10,
    delegators: 890,
    status: "inactive",
    rewards24h: 0,
    description:
      "Staked Canton is currently offline for maintenance upgrades. Expected to return to active validation within 48 hours.",
    website: "https://stakedcanton.io",
    rewardHistory: [620, 580, 610, 0, 0, 0],
  },
]

// ─── Glossary ────────────────────────────────────────────────────────────────

export interface GlossaryTerm {
  term: string
  slug: string
  definition: string
  relatedTerms: string[]
  relatedLearnSlug?: string
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Canton Network",
    slug: "canton-network",
    definition:
      "A privacy-enabled interoperable blockchain network designed for institutional use. Canton uses the Daml smart contract language and provides sub-transaction privacy, meaning participants only see the parts of a transaction relevant to them.",
    relatedTerms: ["daml", "sub-transaction-privacy", "cc-token"],
    relatedLearnSlug: "what-is-canton",
  },
  {
    term: "CC Token",
    slug: "cc-token",
    definition:
      "The native utility and governance token of the Canton Network. CC is used for transaction fees, staking with validators, earning rewards, and voting on Canton Improvement Proposals (CIPs).",
    relatedTerms: ["canton-network", "staking", "cip"],
  },
  {
    term: "CIP",
    slug: "cip",
    definition:
      "Canton Improvement Proposal. The formal process through which changes and upgrades to the Canton Network protocol are proposed, discussed, and implemented. CIP follows a structured lifecycle from draft to acceptance.",
    relatedTerms: ["canton-network", "governance", "cc-token"],
  },
  {
    term: "Daml",
    slug: "daml",
    definition:
      "A purpose-built smart contract language for multi-party applications. Daml provides strong guarantees around privacy, authorization, and composability, making it ideal for financial applications.",
    relatedTerms: ["canton-network", "smart-contract"],
    relatedLearnSlug: "what-is-daml",
  },
  {
    term: "Delegator",
    slug: "delegator",
    definition:
      "A CC token holder who stakes their tokens with a validator node to help secure the network and earn rewards. Delegators share in the validator rewards proportional to their stake.",
    relatedTerms: ["validator", "staking", "cc-token"],
  },
  {
    term: "Epoch",
    slug: "epoch",
    definition:
      "A defined period of time in the Canton Network during which a specific set of validators produce blocks. Staking rewards are calculated and distributed at the end of each epoch.",
    relatedTerms: ["validator", "staking"],
  },
  {
    term: "Finality",
    slug: "finality",
    definition:
      "The guarantee that a transaction, once confirmed, cannot be reversed or altered. Canton achieves sub-second finality, meaning transactions are considered final almost immediately after confirmation.",
    relatedTerms: ["canton-network", "transaction"],
  },
  {
    term: "Governance",
    slug: "governance",
    definition:
      "The system of rules and processes by which the Canton Network is managed and upgraded. CC token holders participate in governance through the CIP process and validator delegation.",
    relatedTerms: ["cip", "cc-token", "validator"],
  },
  {
    term: "Interoperability",
    slug: "interoperability",
    definition:
      "The ability of different blockchain networks and applications to communicate and share data seamlessly. Canton achieves interoperability through its unique synchronization protocol.",
    relatedTerms: ["canton-network", "synchronization-domain"],
  },
  {
    term: "Liquidity Pool",
    slug: "liquidity-pool",
    definition:
      "A collection of tokens locked in a smart contract that provides liquidity for decentralized trading. On Canton, liquidity pools power DEXes like Temple Exchange and Loop DEX.",
    relatedTerms: ["defi", "dex", "amm"],
  },
  {
    term: "Slashing",
    slug: "slashing",
    definition:
      "A penalty mechanism where a validator loses a portion of their staked tokens for malicious behavior or prolonged downtime. This incentivizes validators to maintain high uptime and honest operation.",
    relatedTerms: ["validator", "staking", "delegator"],
  },
  {
    term: "Smart Contract",
    slug: "smart-contract",
    definition:
      "Self-executing code stored on the blockchain that automatically enforces the terms of an agreement. On Canton, smart contracts are written in Daml and can model complex multi-party workflows.",
    relatedTerms: ["daml", "canton-network"],
  },
  {
    term: "Staking",
    slug: "staking",
    definition:
      "The process of locking CC tokens with a validator to help secure the Canton Network. In return, stakers receive a share of the network rewards proportional to their contribution.",
    relatedTerms: ["validator", "delegator", "cc-token", "epoch"],
    relatedLearnSlug: "staking-guide",
  },
  {
    term: "Sub-Transaction Privacy",
    slug: "sub-transaction-privacy",
    definition:
      "A privacy model unique to Canton where each participant in a transaction only sees the parts relevant to them. This enables confidential multi-party workflows without exposing unnecessary data.",
    relatedTerms: ["canton-network", "privacy"],
  },
  {
    term: "Synchronization Domain",
    slug: "synchronization-domain",
    definition:
      "The infrastructure layer in Canton that coordinates transaction ordering and validation across participants. Multiple synchronization domains can interoperate to form the broader Canton Network.",
    relatedTerms: ["canton-network", "interoperability"],
  },
  {
    term: "Validator",
    slug: "validator",
    definition:
      "A node operator that validates transactions and produces blocks on the Canton Network. Validators stake CC tokens and earn rewards for maintaining network security and uptime.",
    relatedTerms: ["staking", "delegator", "epoch", "slashing"],
    relatedLearnSlug: "validator-guide",
  },
]

// ─── Ecosystem ───────────────────────────────────────────────────────────────

export interface EcosystemProject {
  slug: string
  name: string
  category: string
  description: string
  logo: string
  website: string
  status: "live" | "beta" | "coming-soon"
}

export const ECOSYSTEM_CATEGORIES = [
  "All",
  "Wallets",
  "DEXes",
  "Lending",
  "Infrastructure",
  "Stablecoins",
  "Data",
] as const

export const ECOSYSTEM_PROJECTS: EcosystemProject[] = [
  {
    slug: "loop-wallet",
    name: "Loop Wallet",
    category: "Wallets",
    description:
      "The leading non-custodial wallet for Canton Network. Supports CC, cBTC, USDCx and all Canton tokens with built-in staking and DeFi integration.",
    logo: "/ecosystem/loop-wallet.svg",
    website: "https://loop.finance/wallet",
    status: "live",
  },
  {
    slug: "zoro-wallet",
    name: "Zoro Wallet",
    category: "Wallets",
    description:
      "Institutional-grade wallet solution for Canton Network with multi-sig support, policy controls, and compliance reporting.",
    logo: "/ecosystem/zoro.svg",
    website: "https://zoro.finance",
    status: "live",
  },
  {
    slug: "temple-exchange",
    name: "Temple Exchange",
    category: "DEXes",
    description:
      "The primary decentralized exchange on Canton Network. Offers spot trading, limit orders, and institutional-grade liquidity pools for CC, cBTC, and USDCx pairs.",
    logo: "/ecosystem/temple.svg",
    website: "https://temple.exchange",
    status: "live",
  },
  {
    slug: "loop-dex",
    name: "Loop DEX",
    category: "DEXes",
    description:
      "Automated market maker DEX built on Canton with concentrated liquidity, yield farming, and low-fee trading for retail users.",
    logo: "/ecosystem/loop-dex.svg",
    website: "https://loop.finance/dex",
    status: "live",
  },
  {
    slug: "canton-lend",
    name: "Canton Lend",
    category: "Lending",
    description:
      "Decentralized lending protocol on Canton Network. Supports over-collateralized borrowing of CC, cBTC, and USDCx with variable and fixed interest rates.",
    logo: "/ecosystem/canton-lend.svg",
    website: "https://cantonlend.finance",
    status: "live",
  },
  {
    slug: "vala-lending",
    name: "Vala Lending",
    category: "Lending",
    description:
      "Institutional lending protocol offering under-collateralized loans to verified borrowers with on-chain credit scoring and real-time risk management.",
    logo: "/ecosystem/vala.svg",
    website: "https://vala.finance",
    status: "beta",
  },
  {
    slug: "splice-network",
    name: "Splice Network",
    category: "Infrastructure",
    description:
      "The interoperability and settlement layer for Canton Network. Splice provides the synchronization protocol that enables cross-domain transactions.",
    logo: "/ecosystem/splice.svg",
    website: "https://splice.network",
    status: "live",
  },
  {
    slug: "cc-view",
    name: "CC View",
    category: "Data",
    description:
      "The primary block explorer and analytics platform for Canton Network. Track transactions, validators, tokens, and network statistics in real-time.",
    logo: "/ecosystem/ccview.svg",
    website: "https://ccview.io",
    status: "live",
  },
  {
    slug: "noves",
    name: "Noves",
    category: "Data",
    description:
      "Transaction classification and labeling engine for Canton Network. Provides human-readable transaction descriptions and portfolio tracking APIs.",
    logo: "/ecosystem/noves.svg",
    website: "https://noves.fi",
    status: "live",
  },
  {
    slug: "usdc-canton",
    name: "USDC on Canton",
    category: "Stablecoins",
    description:
      "Circle's USDC stablecoin natively available on Canton Network as USDCx. Fully backed by US dollar reserves with regular attestations.",
    logo: "/ecosystem/usdc.svg",
    website: "https://circle.com",
    status: "live",
  },
  {
    slug: "console-wallet",
    name: "Console Wallet",
    category: "Wallets",
    description:
      "Developer-focused command-line wallet for Canton Network. Built for power users with scripting support and programmatic access to all Canton features.",
    logo: "/ecosystem/console.svg",
    website: "https://docs.canton.network/console",
    status: "beta",
  },
  {
    slug: "canton-bridge",
    name: "Canton Bridge",
    category: "Infrastructure",
    description:
      "Cross-chain bridge connecting Canton Network to Ethereum, Solana, and other major blockchains. Enables seamless asset transfers between ecosystems.",
    logo: "/ecosystem/bridge.svg",
    website: "https://canton.network/bridge",
    status: "coming-soon",
  },
]

// ─── Learn ───────────────────────────────────────────────────────────────────

export interface LearnArticle {
  slug: string
  title: string
  excerpt: string
  content: string
  category: "Beginner" | "Developer" | "Institutional"
  readTime: string
  image: string
  featured: boolean
}

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "what-is-canton",
    title: "What is the Canton Network?",
    excerpt:
      "A beginner-friendly introduction to the Canton Network, its architecture, and why it matters for institutional finance.",
    content: `<h2 id="introduction">Introduction</h2><p>The Canton Network is a blockchain platform designed from the ground up for institutional use cases. Unlike general-purpose blockchains, Canton provides native privacy, regulatory compliance features, and the ability to handle complex multi-party workflows.</p><h2 id="how-it-works">How Canton Works</h2><p>Canton uses a unique architecture built around synchronization domains and the Daml smart contract language. This combination provides sub-second finality, sub-transaction privacy, and seamless interoperability between participants.</p><h2 id="key-concepts">Key Concepts</h2><p>Understanding Canton requires familiarity with several key concepts: synchronization domains for transaction coordination, Daml for smart contract logic, and the CC token for network economics and governance.</p><h2 id="why-it-matters">Why Canton Matters</h2><p>Canton bridges the gap between traditional finance and blockchain technology, enabling institutions to participate in DeFi while maintaining regulatory compliance and data privacy.</p>`,
    category: "Beginner",
    readTime: "5 min",
    image: "/learn/what-is-canton.jpg",
    featured: true,
  },
  {
    slug: "what-is-daml",
    title: "Understanding Daml: The Smart Contract Language",
    excerpt:
      "Learn about Daml, the purpose-built smart contract language that powers Canton Network applications.",
    content: `<h2 id="overview">Overview</h2><p>Daml is a smart contract language designed specifically for multi-party applications. It was created by Digital Asset and is the foundation of all applications on the Canton Network.</p><h2 id="key-features">Key Features</h2><p>Daml provides type safety, privacy by design, and composable contract templates that model real-world business processes. Unlike Solidity, Daml prevents common vulnerabilities by design.</p><h2 id="examples">Simple Examples</h2><p>A basic Daml contract defines templates with signatories, observers, and choices. This section walks through a simple token transfer contract.</p>`,
    category: "Developer",
    readTime: "8 min",
    image: "/learn/daml.jpg",
    featured: true,
  },
  {
    slug: "staking-guide",
    title: "Complete Staking Guide for Canton Network",
    excerpt:
      "Step-by-step guide to staking CC tokens, choosing validators, and maximizing your rewards.",
    content: `<h2 id="prerequisites">Prerequisites</h2><p>Before you begin staking, ensure you have a compatible wallet (Loop Wallet or Zoro Wallet recommended) with CC tokens and a basic understanding of validator selection.</p><h2 id="step-by-step">Step-by-Step Staking</h2><p>This guide walks you through connecting your wallet, selecting a validator, delegating your CC tokens, and monitoring your rewards.</p><h2 id="maximizing-rewards">Maximizing Your Rewards</h2><p>Learn strategies for optimizing your staking returns through validator diversification, compounding, and timing your delegation.</p>`,
    category: "Beginner",
    readTime: "6 min",
    image: "/learn/staking.jpg",
    featured: false,
  },
  {
    slug: "validator-guide",
    title: "Running a Canton Network Validator",
    excerpt:
      "Technical guide to setting up and operating a validator node on Canton Network.",
    content: `<h2 id="requirements">System Requirements</h2><p>Running a Canton validator requires dedicated hardware or cloud infrastructure. This section covers minimum and recommended specifications.</p><h2 id="setup">Node Setup</h2><p>Follow this step-by-step guide to install, configure, and register your validator node on the Canton Network.</p><h2 id="operations">Ongoing Operations</h2><p>Maintaining a validator requires monitoring uptime, managing keys, updating software, and engaging with the community.</p>`,
    category: "Developer",
    readTime: "12 min",
    image: "/learn/validator.jpg",
    featured: false,
  },
  {
    slug: "institutional-onboarding",
    title: "Institutional Onboarding to Canton Network",
    excerpt:
      "How financial institutions can join the Canton Network, from compliance requirements to technical integration.",
    content: `<h2 id="overview">Overview</h2><p>Canton Network provides a clear onboarding path for financial institutions. This guide covers the compliance, legal, and technical steps needed to participate.</p><h2 id="compliance">Compliance Requirements</h2><p>Institutional participants must meet KYC/AML requirements and may need to satisfy additional regulatory obligations depending on their jurisdiction and activities.</p><h2 id="integration">Technical Integration</h2><p>Canton offers SDKs, APIs, and developer support for integrating with existing institutional infrastructure.</p>`,
    category: "Institutional",
    readTime: "10 min",
    image: "/learn/institutional.jpg",
    featured: true,
  },
  {
    slug: "defi-on-canton",
    title: "DeFi on Canton: A Complete Overview",
    excerpt:
      "Explore the DeFi ecosystem on Canton Network including DEXes, lending protocols, and yield opportunities.",
    content: `<h2 id="landscape">The Canton DeFi Landscape</h2><p>Canton Network hosts a growing DeFi ecosystem that combines institutional-grade infrastructure with decentralized finance primitives.</p><h2 id="protocols">Key Protocols</h2><p>From Temple Exchange for spot trading to Canton Lend for borrowing, this section covers the major DeFi protocols available on Canton.</p><h2 id="opportunities">Yield Opportunities</h2><p>Explore staking, liquidity provision, and lending as sources of yield on Canton Network.</p>`,
    category: "Beginner",
    readTime: "7 min",
    image: "/learn/defi.jpg",
    featured: false,
  },
]

// ─── Tools ───────────────────────────────────────────────────────────────────

export interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  status: "live" | "coming-soon"
}

export const TOOLS: Tool[] = [
  {
    slug: "reward-calculator",
    name: "CC Reward Calculator",
    description:
      "Estimate your staking rewards based on the amount of CC tokens staked, validator selection, and current network parameters.",
    icon: "calculator",
    status: "live",
  },
  {
    slug: "converter",
    name: "Token Converter",
    description:
      "Convert between CC, cBTC, USDCx, and other Canton tokens using real-time exchange rates.",
    icon: "arrow-left-right",
    status: "live",
  },
  {
    slug: "gas-tracker",
    name: "Gas Fee Tracker",
    description:
      "Monitor real-time Canton Network transaction fees and get recommendations for optimal transaction timing.",
    icon: "fuel",
    status: "coming-soon",
  },
  {
    slug: "portfolio-tracker",
    name: "Portfolio Tracker",
    description:
      "Track your Canton Network portfolio across wallets, staking positions, and DeFi protocols in one dashboard.",
    icon: "pie-chart",
    status: "coming-soon",
  },
  {
    slug: "validator-compare",
    name: "Validator Comparison",
    description:
      "Compare validators side by side on uptime, commission, rewards, and community reputation to make informed delegation decisions.",
    icon: "git-compare",
    status: "coming-soon",
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

export function formatSupply(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`
  return num.toLocaleString()
}

export function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (price >= 1) return `$${price.toFixed(2)}`
  return `$${price.toFixed(4)}`
}
