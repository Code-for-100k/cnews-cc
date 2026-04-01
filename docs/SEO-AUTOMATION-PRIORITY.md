# SEO Strategy: Automation-First Rerank
## Criteria: Minimum human intervention + fastest possible results

### TIER 1: ZERO HUMAN EFFORT (build once, runs forever)

| Tactic | Setup Time | Pages Generated | Human Effort After Setup |
|--------|-----------|-----------------|------------------------|
| Converter page engine | 2 days dev | 600+ pages | Zero — data from API |
| Validator profile pages | 1 day dev | 979 pages (from API) | Zero — auto-updates from CC View API |
| CIP explainer pages | 1 day dev | 110+ pages (from GitHub API) | Zero — auto-syncs from canton-foundation/cips repo |
| Ecosystem entity pages | 1 day dev | 250+ pages (from JSON/API) | Zero — seed once, auto-expand |
| Glossary pages | 0.5 day dev | 57 pages (from seed data) | Zero — already seeded |
| IndexNow auto-submission | 0.5 day dev | N/A | Zero — fires on every publish |
| Dynamic sitemaps | Done | N/A | Zero — already built |
| Schema markup | Done | N/A | Zero — already on every page |
| Embeddable CC price widget | 1 day dev | N/A | Zero — generates backlinks passively |

**Total: ~7 days dev → 2,000+ pages, zero ongoing human effort**

### TIER 2: AI-AUTOMATED (cron job, no human needed)

| Tactic | Setup Time | Output | Human Effort |
|--------|-----------|--------|-------------|
| Daily market brief (AI-generated) | 1 day dev | 365 pages/year | Zero — Claude API on cron |
| Weekly ecosystem roundup (AI-generated) | 0.5 day dev | 52 pages/year | Zero — AI summarizes Canton news |
| AI-generated comparison pages | 1 day dev | 50+ pages | Zero — template + Claude API |
| Token price analysis pages (AI) | 0.5 day dev | 12/month | Zero — AI analyzes price data |
| CIP summary auto-generation | 0.5 day dev | On new CIP | Zero — GitHub webhook triggers AI |
| Auto-publish to Medium/Substack | 1 day dev | 4/week | Zero — republish cnews.cc content |

**Total: ~5 days dev → 500+ pages/year auto-generated, zero human effort**

### TIER 3: LIGHT HUMAN TOUCH (minutes per week)

| Tactic | Human Time | Impact |
|--------|-----------|--------|
| Review AI-generated pillar pages before publish | 30 min/week | E-E-A-T compliance |
| Share parasite articles on Twitter/X | 10 min/day | Social signals |
| Respond to HARO/Connectively queries | 30 min/week | High-DA backlinks |

### TIER 4: SKIP ENTIRELY (too much human effort)

- ~~Guest post pitching~~ — requires relationship building, back-and-forth
- ~~Press releases~~ — $1,500 each, requires writing, approval cycles
- ~~Wikipedia editing~~ — months of credibility building
- ~~YouTube~~ — video production is human-intensive
- ~~Academic outreach~~ — slow, requires personal relationships
- ~~Daily news coverage by humans~~ — replaced by AI daily brief
- ~~Manual validator outreach~~ — replaced by auto-generating their profile pages and letting them find us

### THE FULLY AUTOMATED PIPELINE

```
GitHub CIPs repo → webhook → AI generates explainer → auto-publish → IndexNow → indexed
CC View API → cron (daily) → AI generates market brief → auto-publish → IndexNow → indexed
CoinGecko API → cron (hourly) → update converter pages → ISR revalidation → fresh data
Canton ecosystem data → cron (weekly) → AI generates roundup → auto-publish → indexed
New page published → auto-republish excerpt to Medium/Substack → parasite backlinks
```

### REVISED TIMELINE (Automation-First)

**Days 1-3**: Deploy site with all programmatic page engines (converter, validator, CIP, ecosystem, glossary). Result: 2,000+ pages live.

**Days 4-7**: Set up AI content crons (daily brief, weekly roundup, comparison generator). Set up auto-republish to Medium/Substack. Launch embeddable widget. Result: content machine running hands-free.

**Days 8-14**: AI generates 15 pillar pages (What is Canton, How to Buy, Staking Guide, etc.). Human reviews for 30 min total. Publish. Result: core topical authority established.

**Days 15-30**: Machine runs. AI publishes daily. Programmatic pages get indexed. Converter pages start ranking. Zero-competition keywords hit #1. Result: 50+ keywords ranking.

**Days 30-90**: Machine continues. Refresh cycle auto-updates top performers. Widget backlinks accumulate. Parasite content compounds. Result: 100+ keywords ranking, 1,200+ pages, DA 20-30.

### TOTAL HUMAN TIME IN 90 DAYS: ~15 hours
(Setup dev work not counted — that's one-time engineering)

Everything else is machines talking to machines.
