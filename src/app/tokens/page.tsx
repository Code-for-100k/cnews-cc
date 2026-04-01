"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { TOKENS, formatPrice, formatNumber } from "@/lib/data/mock"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react"

type SortKey = "name" | "price" | "change24h" | "marketCap" | "volume24h"
type SortDir = "asc" | "desc"

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 80
  const height = 24
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default function TokensPage() {
  const [sortKey, setSortKey] = useState<SortKey>("marketCap")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const sorted = useMemo(() => {
    return [...TOKENS].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })
  }, [sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  function SortableHead({
    label,
    column,
    className,
  }: {
    label: string
    column: SortKey
    className?: string
  }) {
    return (
      <TableHead
        className={`cursor-pointer select-none ${className ?? ""}`}
        onClick={() => handleSort(column)}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <ArrowUpDown className="size-3 text-muted-foreground" />
        </span>
      </TableHead>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Tokens</h1>
          <p className="mt-2 text-muted-foreground">
            Real-time prices and market data for Canton Network tokens.
          </p>
        </div>

        <Separator className="mb-8" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <SortableHead label="Name" column="name" />
              <SortableHead label="Price" column="price" className="text-right" />
              <SortableHead label="24h %" column="change24h" className="text-right" />
              <SortableHead label="Market Cap" column="marketCap" className="text-right hidden sm:table-cell" />
              <SortableHead label="Volume (24h)" column="volume24h" className="text-right hidden md:table-cell" />
              <TableHead className="text-right hidden lg:table-cell">
                7d Chart
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((token, i) => {
              const isPositive = token.change24h >= 0
              return (
                <TableRow key={token.slug}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell>
                    <Link
                      href={`/tokens/${token.slug}`}
                      className="flex items-center gap-3 font-medium hover:text-primary transition-colors"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {token.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <span className="block">{token.name}</span>
                        <span className="block text-xs text-muted-foreground font-mono uppercase">
                          {token.symbol}
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {formatPrice(token.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-sm ${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="size-3" />
                      ) : (
                        <TrendingDown className="size-3" />
                      )}
                      {isPositive ? "+" : ""}
                      {token.change24h.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums hidden sm:table-cell">
                    {formatNumber(token.marketCap)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums hidden md:table-cell">
                    {formatNumber(token.volume24h)}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    <div className="flex justify-end">
                      <MiniSparkline
                        data={token.sparkline}
                        positive={isPositive}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
