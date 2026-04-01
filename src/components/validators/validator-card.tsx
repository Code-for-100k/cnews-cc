import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/lib/data/mock"
import type { Validator } from "@/lib/data/mock"

interface ValidatorCardProps {
  validator: Validator
}

const statusColors: Record<Validator["status"], string> = {
  active: "bg-green-500/10 text-green-500",
  inactive: "bg-yellow-500/10 text-yellow-500",
  jailed: "bg-red-500/10 text-red-500",
}

export function ValidatorCard({ validator }: ValidatorCardProps) {
  return (
    <Link href={`/validators/${validator.slug}`} className="group block">
      <Card className="h-full transition-colors hover:bg-muted/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                {validator.name.slice(0, 2)}
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                {validator.name}
              </CardTitle>
            </div>
            <span
              className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${statusColors[validator.status]}`}
            >
              {validator.status}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Uptime</p>
              <p className="font-medium tabular-nums">{validator.uptime.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Commission</p>
              <p className="font-medium tabular-nums">{validator.commission}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Stake</p>
              <p className="font-medium tabular-nums">{formatNumber(validator.totalStake)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Delegators</p>
              <p className="font-medium tabular-nums">{validator.delegators.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
