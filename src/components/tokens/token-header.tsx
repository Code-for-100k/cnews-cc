import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatPrice } from "@/lib/data/mock"
import type { Token } from "@/lib/data/mock"

interface TokenHeaderProps {
  token: Token
}

export function TokenHeader({ token }: TokenHeaderProps) {
  const isPositive = token.change24h >= 0

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      {/* Logo placeholder */}
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-bold">
        {token.symbol.slice(0, 2)}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            {token.name}
          </h1>
          <Badge variant="outline" className="text-xs font-mono uppercase">
            {token.symbol}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold tabular-nums lg:text-4xl">
            {formatPrice(token.price)}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-sm font-medium ${
              isPositive
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="size-3.5" />
            ) : (
              <TrendingDown className="size-3.5" />
            )}
            {isPositive ? "+" : ""}
            {token.change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}
