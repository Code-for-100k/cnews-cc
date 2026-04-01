// ---------------------------------------------------------------------------
// Shared TypeScript interfaces for cnews.cc
// ---------------------------------------------------------------------------

// ---- Price & Market Data ----

export interface PriceData {
  price: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  lastUpdated: string;
}

export interface PriceHistory {
  prices: [timestamp: number, price: number][];
  marketCaps: [timestamp: number, cap: number][];
  totalVolumes: [timestamp: number, volume: number][];
}

// ---- Token ----

export interface Token {
  id: string;
  symbol: string;
  name: string;
  contractAddress: string | null;
  decimals: number;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  logoUrl: string | null;
  isNative: boolean;
}

// ---- Validator ----

export interface Validator {
  id: string;
  name: string;
  address: string;
  stake: number;
  commission: number;
  uptime: number;
  delegators: number;
  totalRewards: number;
  status: 'active' | 'inactive' | 'jailed';
  isSuperValidator: boolean;
  website: string | null;
  logoUrl: string | null;
}

export interface ValidatorReward {
  validatorId: string;
  epoch: number;
  rewardAmount: number;
  rewardToken: string;
  delegatorShare: number;
  timestamp: string;
}

// ---- Network Stats ----

export interface NetworkStats {
  tps: number;
  peakTps: number;
  totalTransactions: number;
  transactions24h: number;
  activeAddresses24h: number;
  totalAddresses: number;
  totalValidators: number;
  totalStaked: number;
  stakingApr: number;
  blockHeight: number;
  avgBlockTime: number;
  lastUpdated: string;
}

export interface TransactionStats {
  date: string;
  count: number;
  volume: number;
  fees: number;
  uniqueAddresses: number;
}

// ---- CMS Content ----

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown; // Portable Text
  mainImage: SanityImage | null;
  author: Author;
  categories: Category[];
  publishedAt: string;
  readingTime: number;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface Author {
  _id: string;
  name: string;
  slug: string;
  bio: string | null;
  image: SanityImage | null;
  twitter: string | null;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface GlossaryTerm {
  _id: string;
  term: string;
  slug: string;
  definition: string;
  longDefinition: unknown | null; // Portable Text
  relatedTerms: { slug: string; term: string }[];
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface LearnArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown; // Portable Text
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  mainImage: SanityImage | null;
  author: Author;
  readingTime: number;
  order: number;
  publishedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface EcosystemProject {
  _id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: unknown | null; // Portable Text
  category: string;
  website: string;
  logo: SanityImage | null;
  status: 'live' | 'beta' | 'development' | 'announced';
  twitter: string | null;
  github: string | null;
  launchDate: string | null;
  tags: string[];
}

// ---- API Response Wrappers ----

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
