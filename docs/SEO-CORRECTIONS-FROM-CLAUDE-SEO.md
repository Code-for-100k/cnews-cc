# SEO Strategy Corrections
## Source: AgriciDaniel/claude-seo (101 files, Feb 2026 updated)

### SCHEMA CHANGES (Critical — invalidates parts of all 5 agent plans)
- **FAQPage schema: RESTRICTED** to government/healthcare sites only (Aug 2023). Remove from all page types.
- **HowTo schema: DEPRECATED** — rich results removed Sept 2023. Remove from tutorials.
- **Dataset schema: DEPRECATED** — retired late 2025.
- **Valid schemas for cnews.cc:** Organization, Article, BlogPosting, NewsArticle, BreadcrumbList, WebSite, WebPage, SoftwareApplication, WebApplication, Person, ProfilePage, DefinedTerm (for glossary), Event (for governance proposals), VideoObject

### E-E-A-T (Dec 2025 Core Update — changes content strategy)
- E-E-A-T now applies to ALL competitive queries, not just YMYL
- Anonymous/generic AI content saw 71% traffic drops
- Every article MUST have real author attribution with credentials
- First-hand experience signals required: original data, screenshots, case studies
- Author bios need: relevant credentials, sameAs links, Person schema

### IMPLICATIONS FOR AI CONTENT VELOCITY:
- Can't just AI-generate 120 articles and publish anonymously
- Each article needs: named author, credentials, original data integration (on-chain stats make this unique), human editorial layer
- The "human verified" badge system we're building actually serves E-E-A-T perfectly

### GEO/AEO OPTIMIZATION (AI Search)
- Brand mentions > backlinks for AI citations (3x stronger, Ahrefs Dec 2025)
- Strongest correlation: YouTube mentions (~0.737)
- Optimal passage length for AI citation: 134-167 words
- Self-contained answer blocks with specific facts/stats
- Only 11% of domains cited by both ChatGPT and Google AI Overviews for same query
- Need platform-specific optimization for each AI search engine

### PROGRAMMATIC SEO SAFEGUARDS
- Each page must have >40% unique content or = thin content penalty risk
- No "mad-libs" patterns (swapping city/product names in identical text)
- Template pages need conditional logic showing/hiding sections based on data
- Supplementary content (related items, contextual tips) required per page
- Quality gate: 100+ pages without content review = WARNING, 500+ = HARD STOP

### WHAT THIS MEANS FOR cnews.cc:
1. Converter pages (600 planned) need unique content per page, not just swapped numbers
2. Blog content needs real author attribution, not "AI Generated"
3. Glossary pages are fine with DefinedTerm schema (still active)
4. Focus on YouTube presence and Reddit for GEO/brand mentions over link building
5. The verification system (AI → Human Verified → Editor's Pick) is actually an E-E-A-T signal
