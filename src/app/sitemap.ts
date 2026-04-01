import type { MetadataRoute } from "next";

const BASE_URL = "https://cnews.cc";

// Static pages
const staticPages = [
  { path: "/", changeFrequency: "hourly" as const, priority: 1.0 },
  { path: "/tokens", changeFrequency: "hourly" as const, priority: 0.9 },
  { path: "/validators", changeFrequency: "hourly" as const, priority: 0.9 },
  { path: "/ecosystem", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/blog", changeFrequency: "daily" as const, priority: 0.8 },
  { path: "/learn", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/glossary", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/tools/calculator", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/tools/converter", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/tools/gas", changeFrequency: "daily" as const, priority: 0.6 },
  { path: "/tools/staking", changeFrequency: "daily" as const, priority: 0.6 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.4 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
];

// Mock token slugs (will come from CMS / API later)
const tokenSlugs = ["cc", "cbtc", "usdcx", "weth", "dai"];

// Mock validator slugs
const validatorSlugs = [
  "digital-asset",
  "splice-labs",
  "canton-foundation",
  "deloitte",
  "goldman-sachs",
];

// Mock blog post slugs (will come from Sanity later)
const blogSlugs = [
  "canton-network-launch",
  "cc-token-economics",
  "validator-guide",
  "defi-on-canton",
  "weekly-roundup-01",
];

// Mock glossary term slugs
const glossarySlugs = [
  "canton-coin",
  "daml",
  "participant-node",
  "sequencer",
  "synchronization-domain",
  "global-synchronizer",
  "canton-network",
  "super-validator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const tokenEntries: MetadataRoute.Sitemap = tokenSlugs.map((slug) => ({
    url: `${BASE_URL}/tokens/${slug}`,
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const validatorEntries: MetadataRoute.Sitemap = validatorSlugs.map(
    (slug) => ({
      url: `${BASE_URL}/validators/${slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })
  );

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const glossaryEntries: MetadataRoute.Sitemap = glossarySlugs.map((slug) => ({
    url: `${BASE_URL}/glossary/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...tokenEntries,
    ...validatorEntries,
    ...blogEntries,
    ...glossaryEntries,
  ];
}
