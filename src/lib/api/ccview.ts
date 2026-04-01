// ---------------------------------------------------------------------------
// CC View API client — Canton Network on-chain data
// Base URL is a placeholder; swap with real endpoint when available.
// ---------------------------------------------------------------------------

import type {
  ApiResponse,
  NetworkStats,
  PriceData,
  Token,
  Validator,
  ValidatorReward,
  TransactionStats,
} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_CCVIEW_API_URL ?? 'https://api.ccview.io/v1';

const DEFAULT_HEADERS: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { ...DEFAULT_HEADERS, ...init?.headers },
      next: { revalidate: 60 }, // ISR – revalidate every 60 s
    });

    if (!res.ok) {
      return {
        data: null as unknown as T,
        error: `CC View API error: ${res.status} ${res.statusText}`,
        status: res.status,
      };
    }

    const data: T = await res.json();
    return { data, error: null, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown fetch error';
    return {
      data: null as unknown as T,
      error: message,
      status: 0,
    };
  }
}

// ---------------------------------------------------------------------------
// Public API functions
// ---------------------------------------------------------------------------

/**
 * Fetch current Canton Coin (CC) price, market cap, and 24 h volume.
 */
export async function fetchCantonPrice(): Promise<ApiResponse<PriceData>> {
  return request<PriceData>('/price/canton-coin');
}

/**
 * Fetch the full list of validators with uptime, rewards, and commission.
 */
export async function fetchValidators(): Promise<ApiResponse<Validator[]>> {
  return request<Validator[]>('/validators');
}

/**
 * Fetch a single validator by ID.
 */
export async function fetchValidatorById(id: string): Promise<ApiResponse<Validator>> {
  return request<Validator>(`/validators/${encodeURIComponent(id)}`);
}

/**
 * Fetch reward history for a given validator.
 */
export async function fetchValidatorRewards(
  validatorId: string,
  limit = 50,
): Promise<ApiResponse<ValidatorReward[]>> {
  return request<ValidatorReward[]>(
    `/validators/${encodeURIComponent(validatorId)}/rewards?limit=${limit}`,
  );
}

/**
 * Fetch all tokens on Canton (CC, CBTC, USDCx, USYC, etc.).
 */
export async function fetchTokens(): Promise<ApiResponse<Token[]>> {
  return request<Token[]>('/tokens');
}

/**
 * Fetch a single token by symbol or ID.
 */
export async function fetchTokenBySymbol(symbol: string): Promise<ApiResponse<Token>> {
  return request<Token>(`/tokens/${encodeURIComponent(symbol)}`);
}

/**
 * Fetch aggregate network statistics — TPS, tx count, active addresses.
 */
export async function fetchNetworkStats(): Promise<ApiResponse<NetworkStats>> {
  return request<NetworkStats>('/network/stats');
}

/**
 * Fetch daily transaction statistics for charting.
 */
export async function fetchTransactionHistory(
  days = 30,
): Promise<ApiResponse<TransactionStats[]>> {
  return request<TransactionStats[]>(`/network/transactions?days=${days}`);
}
