"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

const MOCK_PRICE = {
  price: 1.47,
  change24h: 3.82,
};

export function PriceTicker() {
  const isPositive = MOCK_PRICE.change24h >= 0;

  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1 text-xs font-medium tabular-nums">
      <span className="text-muted-foreground">CC</span>
      <span className="font-semibold text-foreground">
        ${MOCK_PRICE.price.toFixed(2)}
      </span>
      <span
        className={`flex items-center gap-0.5 ${
          isPositive ? "text-positive" : "text-negative"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="size-3" />
        ) : (
          <TrendingDown className="size-3" />
        )}
        {isPositive ? "+" : ""}
        {MOCK_PRICE.change24h.toFixed(2)}%
      </span>
    </div>
  );
}
