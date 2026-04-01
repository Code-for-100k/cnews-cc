// ---------------------------------------------------------------------------
// CoinGecko API client — price and market data
// Free tier: 10-30 req/min. We lean on Next.js ISR caching to stay within.
// ---------------------------------------------------------------------------

import type { ApiResponse, PriceData, PriceHistory } from './types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const DEFAULT_HEADERS: HeadersInit = {
  Accept: 'application/json',
};

// If a Pro API key is configured, attach it.
function authHeaders(): HeadersInit {
  const key = process.env.COINGECKO_API_KEY;
  if (key) {
    return { ...DEFAULT_HEADERS, 'x-cg-pro-api-key': key };
  }
  return DEFAULT_HEADERS;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function request<T>(path: string, revalidate = 120): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: authHeaders(),
      next: { revalidate },
    });

    if (!res.ok) {
      return {
        data: null as unknown as T,
        error: `CoinGecko API error: ${res.status} ${res.statusText}`,
        status: res.status,
      };
    }

    const data: T = await res.json();
    return { data, error: null, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown fetch error';
    return { data: null as unknown as T, error: message, status: 0 };
  }
}

// ---------------------------------------------------------------------------
// Raw CoinGecko response shapes (internal)
// ---------------------------------------------------------------------------

interface CoinGeckoMarket {
  id: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  last_updated: string;
}

interface CoinGeckoChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

// ---------------------------------------------------------------------------
// Public API functions
// ---------------------------------------------------------------------------

/**
 * Fetch current price, 24 h change, and market cap for a given CoinGecko coin ID.
 * Common IDs: "canton-coin", "bitcoin", "ethereum", "usd-coin"
 */
export async function fetchCoinPrice(coinId: string): Promise<ApiResponse<PriceData>> {
  const res = await request<CoinGeckoMarket[]>(
    `/coins/markets?vs_currency=usd&ids=${encodeURIComponent(coinId)}&sparkline=false`,
  );

  if (res.error || !res.data?.[0]) {
    return {
      data: null as unknown as PriceData,
      error: res.error ?? `No data found for coin: ${coinId}`,
      status: res.status,
    };
  }

  const coin = res.data[0];

  const priceData: PriceData = {
    price: coin.current_price,
    priceChange24h: coin.price_change_24h,
    priceChangePercent24h: coin.price_change_percentage_24h,
    marketCap: coin.market_cap,
    volume24h: coin.total_volume,
    circulatingSupply: coin.circulating_supply,
    totalSupply: coin.total_supply,
    lastUpdated: coin.last_updated,
  };

  return { data: priceData, error: null, status: res.status };
}

/**
 * Fetch historical price data for chart rendering.
 * @param coinId  CoinGecko coin identifier
 * @param days    Number of trailing days (1, 7, 14, 30, 90, 180, 365, max)
 */
export async function fetchPriceHistory(
  coinId: string,
  days: number | 'max' = 30,
): Promise<ApiResponse<PriceHistory>> {
  const res = await request<CoinGeckoChart>(
    `/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=usd&days=${days}`,
    days === 1 ? 300 : 600, // shorter revalidation for 1-day view
  );

  if (res.error || !res.data) {
    return {
      data: null as unknown as PriceHistory,
      error: res.error ?? 'Failed to fetch price history',
      status: res.status,
    };
  }

  const history: PriceHistory = {
    prices: res.data.prices as [number, number][],
    marketCaps: res.data.market_caps as [number, number][],
    totalVolumes: res.data.total_volumes as [number, number][],
  };

  return { data: history, error: null, status: res.status };
}

/**
 * Fetch prices for multiple coins at once.
 */
export async function fetchMultipleCoinPrices(
  coinIds: string[],
): Promise<ApiResponse<PriceData[]>> {
  const ids = coinIds.map(encodeURIComponent).join(',');
  const res = await request<CoinGeckoMarket[]>(
    `/coins/markets?vs_currency=usd&ids=${ids}&sparkline=false`,
  );

  if (res.error || !res.data) {
    return { data: [], error: res.error, status: res.status };
  }

  const prices: PriceData[] = res.data.map((coin) => ({
    price: coin.current_price,
    priceChange24h: coin.price_change_24h,
    priceChangePercent24h: coin.price_change_percentage_24h,
    marketCap: coin.market_cap,
    volume24h: coin.total_volume,
    circulatingSupply: coin.circulating_supply,
    totalSupply: coin.total_supply,
    lastUpdated: coin.last_updated,
  }));

  return { data: prices, error: null, status: res.status };
}
