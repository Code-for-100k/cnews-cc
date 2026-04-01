"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Clock, Coins, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

interface CurrencyConfig {
  label: string;
  symbol: string;
  rate: number; // Rate relative to 1 CC
  decimals: number;
  flag?: string;
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    label: "US Dollar",
    symbol: "$",
    rate: 0.42,
    decimals: 2,
    flag: "🇺🇸",
  },
  EUR: {
    label: "Euro",
    symbol: "\u20AC",
    rate: 0.39,
    decimals: 2,
    flag: "🇪🇺",
  },
  GBP: {
    label: "British Pound",
    symbol: "\u00A3",
    rate: 0.33,
    decimals: 2,
    flag: "🇬🇧",
  },
  BTC: {
    label: "Bitcoin",
    symbol: "\u20BF",
    rate: 0.0000063,
    decimals: 8,
  },
  ETH: {
    label: "Ethereum",
    symbol: "\u039E",
    rate: 0.00023,
    decimals: 6,
  },
};

const POPULAR_AMOUNTS = [1, 10, 100, 1000, 10000];

function formatNumber(value: number, decimals: number): string {
  if (value === 0) return "0";
  if (Math.abs(value) < 0.000001) return value.toExponential(2);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function Converter() {
  const [amount, setAmount] = useState<string>("100");
  const [currency, setCurrency] = useState<string>("USD");
  const [direction, setDirection] = useState<"ccToFiat" | "fiatToCC">(
    "ccToFiat"
  );

  const currencyConfig = CURRENCIES[currency];

  const result = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    if (direction === "ccToFiat") {
      return numAmount * currencyConfig.rate;
    }
    return currencyConfig.rate > 0 ? numAmount / currencyConfig.rate : 0;
  }, [amount, currency, direction, currencyConfig]);

  const handleSwap = useCallback(() => {
    setDirection((prev) => (prev === "ccToFiat" ? "fiatToCC" : "ccToFiat"));
    setAmount(result.toString());
  }, [result]);

  const fromLabel = direction === "ccToFiat" ? "CC" : currency;
  const toLabel = direction === "ccToFiat" ? currency : "CC";
  const fromSymbol =
    direction === "ccToFiat" ? "CC" : currencyConfig.symbol;
  const toSymbol =
    direction === "ccToFiat" ? currencyConfig.symbol : "CC";
  const resultDecimals =
    direction === "ccToFiat" ? currencyConfig.decimals : 4;

  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-8">
      {/* Main Converter */}
      <Card className="border-[#00D4AA]/20 bg-zinc-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <Coins className="size-5 text-[#00D4AA]" />
            Convert Canton Coin (CC)
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Convert between CC and major currencies at the latest rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            {/* From Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                From ({fromLabel})
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min={0}
                  step="any"
                  className="h-14 bg-zinc-900 border-zinc-800 text-white text-xl pr-14 focus-visible:border-[#00D4AA] focus-visible:ring-[#00D4AA]/30"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#00D4AA]">
                  {fromSymbol}
                </span>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:pb-1">
              <button
                onClick={handleSwap}
                className="size-10 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:border-[#00D4AA] hover:text-[#00D4AA] transition-colors cursor-pointer"
                aria-label="Swap conversion direction"
              >
                <ArrowUpDown className="size-4" />
              </button>
            </div>

            {/* Result Output */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                To ({toLabel})
              </label>
              <div className="relative">
                <div className="h-14 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 flex items-center">
                  <span className="text-xl font-semibold text-white tabular-nums truncate">
                    {formatNumber(result, resultDecimals)}
                  </span>
                  <span className="ml-auto text-sm font-semibold text-[#00D4AA] shrink-0">
                    {toSymbol}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Currency Select */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">
                Currency
              </label>
              <Select value={currency} onValueChange={(v) => { if (v !== null) setCurrency(v); }}>
                <SelectTrigger className="h-10 w-48 bg-zinc-900 border-zinc-800 text-white focus-visible:border-[#00D4AA] focus-visible:ring-[#00D4AA]/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {Object.entries(CURRENCIES).map(([key, cfg]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="text-white focus:bg-zinc-800 focus:text-white"
                    >
                      <span className="flex items-center gap-2">
                        {cfg.flag && <span>{cfg.flag}</span>}
                        {key}{" "}
                        <span className="text-zinc-500">-- {cfg.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-auto">
              <Clock className="size-3.5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Exchange Rate Display */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div>
                <span className="text-zinc-500">1 CC = </span>
                <span className="text-white font-medium tabular-nums">
                  {currencyConfig.symbol}
                  {formatNumber(currencyConfig.rate, currencyConfig.decimals)}
                </span>
                <span className="text-zinc-500"> {currency}</span>
              </div>
              <div>
                <span className="text-zinc-500">
                  1 {currency} ={" "}
                </span>
                <span className="text-white font-medium tabular-nums">
                  {formatNumber(1 / currencyConfig.rate, 4)}
                </span>
                <span className="text-zinc-500"> CC</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Conversions */}
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="size-5 text-[#00D4AA]" />
            Popular CC Conversions
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Quick reference for common Canton Coin conversion amounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {POPULAR_AMOUNTS.map((ccAmount) => (
              <button
                key={ccAmount}
                onClick={() => {
                  setAmount(ccAmount.toString());
                  setDirection("ccToFiat");
                }}
                className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-left hover:border-[#00D4AA]/40 hover:bg-[#00D4AA]/5 transition-all cursor-pointer"
              >
                <p className="text-xs text-zinc-500 group-hover:text-[#00D4AA] transition-colors">
                  {ccAmount.toLocaleString()} CC
                </p>
                <p className="text-lg font-semibold text-white mt-1 tabular-nums">
                  {currencyConfig.symbol}
                  {formatNumber(
                    ccAmount * currencyConfig.rate,
                    currencyConfig.decimals
                  )}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">{currency}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Currency Rates */}
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="size-5 text-[#00D4AA]" />
            CC Exchange Rates
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Current Canton Coin rates across all supported currencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(CURRENCIES).map(([key, cfg]) => {
              const ccAmount = parseFloat(amount) || 100;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {cfg.flag ? (
                      <span className="text-xl">{cfg.flag}</span>
                    ) : (
                      <span className="size-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-300">
                        {cfg.symbol}
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">{key}</p>
                      <p className="text-xs text-zinc-500">{cfg.label}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white tabular-nums">
                      {cfg.symbol}
                      {formatNumber(ccAmount * cfg.rate, cfg.decimals)}
                    </p>
                    <p className="text-xs text-zinc-500">
                      per {ccAmount.toLocaleString()} CC
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Educational Content */}
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle className="text-white">
            About Canton Coin (CC) Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-400 leading-relaxed">
          <p>
            Canton Coin (CC) is the native utility token of the Canton Network,
            a privacy-enabled blockchain designed for institutional-grade
            financial applications. The CC token is used to pay transaction
            fees, participate in governance, and stake with validators to help
            secure the network.
          </p>

          <h3 className="text-base font-semibold text-white mt-6">
            What Drives CC Price
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="text-zinc-200">Network adoption</span> --
              growing usage from institutional participants increases demand
            </li>
            <li>
              <span className="text-zinc-200">Transaction volume</span> -- more
              transactions require more CC for fees
            </li>
            <li>
              <span className="text-zinc-200">Staking demand</span> -- tokens
              locked in staking reduce circulating supply
            </li>
            <li>
              <span className="text-zinc-200">Ecosystem growth</span> -- new
              applications and validators drive utility value
            </li>
          </ul>

          <h3 className="text-base font-semibold text-white mt-6">
            CC vs Traditional Crypto
          </h3>
          <p>
            Unlike many cryptocurrencies, Canton Coin is designed for regulated
            financial use cases. The Canton Network supports privacy-preserving
            transactions, making it suitable for institutional trading, lending,
            and settlement. This positions CC uniquely in the market as a token
            bridging traditional finance and decentralized technology.
          </p>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 mt-4">
            <p className="text-xs text-zinc-500">
              <strong className="text-zinc-300">Note:</strong> Exchange rates
              shown are for illustrative purposes and may not reflect real-time
              market prices. Always verify current rates on a licensed exchange
              before making any trading decisions. This tool does not constitute
              financial advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
