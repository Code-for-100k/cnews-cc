import { Card, CardContent } from "@/components/ui/card"
import { formatNumber, formatSupply, formatPrice } from "@/lib/data/mock"
import type { Token } from "@/lib/data/mock"

interface TokenStatsProps {
  token: Token
}

interface StatBoxProps {
  label: string
  value: string
}

function StatBox({ label, value }: StatBoxProps) {
  return (
    <Card size="sm">
      <CardContent className="pt-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  )
}

export function TokenStats({ token }: TokenStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <StatBox label="Market Cap" value={formatNumber(token.marketCap)} />
      <StatBox label="24h Volume" value={formatNumber(token.volume24h)} />
      <StatBox
        label="Circulating Supply"
        value={`${formatSupply(token.circulatingSupply)} ${token.symbol}`}
      />
      <StatBox
        label="Total Supply"
        value={`${formatSupply(token.totalSupply)} ${token.symbol}`}
      />
      <StatBox
        label="All-Time High"
        value={`${formatPrice(token.ath)} (${new Date(token.athDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})`}
      />
      <StatBox
        label="All-Time Low"
        value={`${formatPrice(token.atl)} (${new Date(token.atlDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})`}
      />
    </div>
  )
}
