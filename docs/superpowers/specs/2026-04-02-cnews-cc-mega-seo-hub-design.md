# cnews.cc — Canton Network Mega SEO Hub

## Overview

An independent Canton Network ecosystem media property and data hub. Combines real-time on-chain data, programmatic SEO pages, interactive tools, and editorial content to become the #1 ranked independent Canton resource.

**Domain:** cnews.cc (unregistered — needs registration)
**Tech Stack:** Next.js 15 (App Router) + Sanity CMS + Tailwind CSS + shadcn/ui
**Hosting:** Railway (Next.js app) + Sanity Cloud (CMS)
**Repo:** GitHub (Code-for-100k org)

## Architecture

```
cnews.cc (domain)
├── / → Framer landing page (future — skip for MVP)
├── /blog/* → Sanity-powered editorial content
├── /tokens/* → Programmatic token pages (API-powered)
├── /validators/* → Programmatic validator pages (API-powered)
├── /tools/* → Interactive calculators and utilities
├── /learn/* → Educational content hub
├── /glossary/* → SEO glossary (one page per term)
├── /compare/* → Canton vs [Chain] comparison pages
├── /ecosystem/* → Project directory pages
└── /api/* → Internal API routes for data fetching
```

For MVP, the Next.js app serves everything (no Framer split yet). Framer integration can be added later via reverse proxy when a landing page is designed.

## Data Sources

| Source | Data | Usage |
|--------|------|-------|
| CC View API | Transfers, rewards, prices, supply, validators, apps | Token pages, validator pages, dashboards |
| Cantonscan | Block data, transactions, explorer | Transaction data, block stats |
| CoinGecko/CMC API | CC price, market cap, volume, historical | Price widgets, converter pages |
| Sanity CMS | Blog posts, glossary terms, learn articles, comparison content | Editorial content |
| Static JSON | Ecosystem project directory, initial glossary seed | Programmatic pages |

## Page Types & SEO Strategy

### 1. Blog (Sanity CMS)
- News articles, analysis, guides
- Categories: News, Analysis, Guides, Tutorials, Opinion
- Tags for cross-linking
- Author pages
- RSS feed
- Schema: NewsArticle, BreadcrumbList

### 2. Token Pages (Programmatic)
- `/tokens/cc` — Canton Coin (price, chart, stats, description, exchanges)
- `/tokens/cbtc` — CBTC page
- `/tokens/usdcx` — USDCx page
- Template: Live price header → Chart → Key stats → Description → Markets → Related news
- Schema: FinancialProduct, FAQPage

### 3. Validator Pages (Programmatic)
- `/validators` — Leaderboard with sortable table
- `/validators/[name]` — Individual validator: uptime, rewards, commission, delegators
- 979+ pages auto-generated from API data
- Schema: ItemList (leaderboard), Organization (individual)

### 4. Interactive Tools
- `/tools/cc-reward-calculator` — Input CC amount, validator type → projected rewards
- `/tools/converter` — CC to USD/EUR/GBP/BTC converter with live rates
- `/tools/bandwidth-estimator` — Estimate transaction costs on Canton
- `/tools/rwa-roi-calculator` — RWA tokenization ROI vs traditional settlement
- Schema: WebApplication, FAQPage

### 5. Learn Hub
- `/learn` — Landing page with learning paths
- `/learn/what-is-canton-network` — Beginner guide
- `/learn/what-is-daml` — Daml explainer
- `/learn/canton-vs-ethereum` — Comparison
- Managed in Sanity CMS with structured content
- Schema: Article, FAQPage, HowTo

### 6. Glossary (Programmatic from Sanity)
- `/glossary` — Index page (A-Z)
- `/glossary/[term]` — Individual term pages
- 100+ terms: Canton Coin, Daml, Synchronizer, Validator, DecParty, CBTC, etc.
- Schema: DefinedTerm, BreadcrumbList

### 7. Ecosystem Directory
- `/ecosystem` — Filterable project directory
- `/ecosystem/[project-slug]` — Individual project pages
- Categories: Wallets, DEXes, Lending, Infrastructure, Stablecoins, etc.
- 147+ pages from ecosystem data
- Schema: SoftwareApplication, ItemList

### 8. Comparison Pages
- `/compare/canton-vs-ethereum`
- `/compare/canton-vs-solana`
- `/compare/canton-vs-hyperledger`
- Managed in Sanity with structured comparison schema
- Schema: Article, FAQPage

## Technical SEO Infrastructure

### Sitemaps
- `/sitemap.xml` — Index sitemap
- `/sitemap-blog.xml` — Blog posts
- `/sitemap-tokens.xml` — Token pages
- `/sitemap-validators.xml` — Validator pages
- `/sitemap-glossary.xml` — Glossary pages
- `/sitemap-ecosystem.xml` — Ecosystem pages
- `/sitemap-tools.xml` — Tool pages
- `/sitemap-learn.xml` — Learn pages

### Meta & Schema
- Dynamic OG images for every page (using Next.js ImageResponse)
- JSON-LD structured data on every page
- Canonical URLs
- robots.txt with sitemap reference

### Performance
- ISR (Incremental Static Regeneration) for data pages — revalidate every 5 min
- Static generation for glossary, learn, comparison pages
- Edge caching via Railway
- Image optimization via Next.js Image component
- Core Web Vitals target: all green

## UI/UX Design Principles

- Dark theme primary (crypto-native audience expects it)
- Clean data presentation (DeFi Llama inspired, not cluttered like CMC)
- Mobile-first responsive
- Fast — no client-side data fetching where SSR/ISR suffices
- Persistent header with CC price ticker
- Sidebar navigation for data sections
- shadcn/ui components for consistency

## MVP Scope (What We Build Now)

### Phase 1 — Ship It
1. Next.js app with App Router, Tailwind, shadcn/ui
2. Sanity Studio with blog, glossary, learn, comparison schemas
3. Homepage with Canton stats dashboard
4. Blog with categories, tags, authors, RSS
5. Token pages (CC, CBTC, USDCx) with live data from CC View
6. Validator leaderboard + individual pages
7. CC Reward Calculator tool
8. CC Converter tool
9. Glossary (seeded with 50+ terms)
10. Ecosystem directory (seeded from canton.wiki/ecosystem data)
11. Learn hub (5 foundational articles)
12. Full SEO infrastructure (sitemaps, schema, OG images, robots.txt)
13. Deploy to Railway, push to GitHub

### Phase 2 — After Launch
- Framer landing page integration via reverse proxy
- Newsletter signup (Beehiiv or Resend)
- More interactive tools (bandwidth estimator, RWA calculator)
- Comparison pages (Canton vs X)
- Community features
- API for embeddable widgets
- AI-powered content suggestions

## Folder Structure

```
cnews-cc/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (homepage / dashboard)
│   │   ├── blog/
│   │   │   ├── page.tsx (blog index)
│   │   │   └── [slug]/page.tsx
│   │   ├── tokens/
│   │   │   ├── page.tsx (token list)
│   │   │   └── [slug]/page.tsx
│   │   ├── validators/
│   │   │   ├── page.tsx (leaderboard)
│   │   │   └── [slug]/page.tsx
│   │   ├── tools/
│   │   │   ├── page.tsx (tools index)
│   │   │   ├── cc-reward-calculator/page.tsx
│   │   │   └── converter/page.tsx
│   │   ├── learn/
│   │   │   ├── page.tsx (learn hub)
│   │   │   └── [slug]/page.tsx
│   │   ├── glossary/
│   │   │   ├── page.tsx (A-Z index)
│   │   │   └── [term]/page.tsx
│   │   ├── ecosystem/
│   │   │   ├── page.tsx (directory)
│   │   │   └── [slug]/page.tsx
│   │   ├── api/
│   │   │   ├── revalidate/route.ts
│   │   │   └── og/route.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/ (shadcn)
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── price-ticker.tsx
│   │   ├── charts/
│   │   │   ├── price-chart.tsx
│   │   │   └── stats-card.tsx
│   │   ├── blog/
│   │   │   ├── post-card.tsx
│   │   │   └── post-content.tsx
│   │   ├── tokens/
│   │   │   ├── token-header.tsx
│   │   │   └── token-stats.tsx
│   │   ├── validators/
│   │   │   ├── validator-table.tsx
│   │   │   └── validator-card.tsx
│   │   ├── tools/
│   │   │   ├── reward-calculator.tsx
│   │   │   └── converter.tsx
│   │   └── seo/
│   │       ├── json-ld.tsx
│   │       └── og-image.tsx
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── schemas/
│   │   ├── api/
│   │   │   ├── ccview.ts
│   │   │   ├── coingecko.ts
│   │   │   └── types.ts
│   │   └── utils.ts
│   └── data/
│       ├── ecosystem.json
│       └── glossary-seed.json
├── sanity/
│   ├── schemas/
│   │   ├── post.ts
│   │   ├── author.ts
│   │   ├── category.ts
│   │   ├── glossaryTerm.ts
│   │   ├── learnArticle.ts
│   │   ├── comparisonPage.ts
│   │   └── ecosystemProject.ts
│   └── sanity.config.ts
├── public/
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```
