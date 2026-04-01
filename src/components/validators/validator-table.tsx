"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { formatNumber } from "@/lib/data/mock"
import type { Validator } from "@/lib/data/mock"

interface ValidatorTableProps {
  validators: Validator[]
}

type SortKey =
  | "name"
  | "uptime"
  | "totalStake"
  | "commission"
  | "delegators"
  | "rewards24h"
type SortDir = "asc" | "desc"

const statusColors: Record<Validator["status"], string> = {
  active: "bg-green-500/10 text-green-500",
  inactive: "bg-yellow-500/10 text-yellow-500",
  jailed: "bg-red-500/10 text-red-500",
}

export function ValidatorTable({ validators }: ValidatorTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("totalStake")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const sorted = useMemo(() => {
    return [...validators].sort((a, b) => {
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
  }, [validators, sortKey, sortDir])

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">#</TableHead>
          <SortableHead label="Validator" column="name" />
          <SortableHead label="Uptime" column="uptime" className="text-right" />
          <SortableHead
            label="Total Stake"
            column="totalStake"
            className="text-right hidden sm:table-cell"
          />
          <SortableHead
            label="Commission"
            column="commission"
            className="text-right hidden md:table-cell"
          />
          <SortableHead
            label="Delegators"
            column="delegators"
            className="text-right hidden md:table-cell"
          />
          <SortableHead
            label="Rewards (24h)"
            column="rewards24h"
            className="text-right hidden lg:table-cell"
          />
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((v, i) => (
          <TableRow key={v.slug}>
            <TableCell className="text-muted-foreground">{i + 1}</TableCell>
            <TableCell>
              <Link
                href={`/validators/${v.slug}`}
                className="flex items-center gap-3 font-medium hover:text-primary transition-colors"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                  {v.name.slice(0, 2)}
                </div>
                {v.name}
              </Link>
            </TableCell>
            <TableCell className="text-right font-mono tabular-nums">
              {v.uptime.toFixed(2)}%
            </TableCell>
            <TableCell className="text-right font-mono tabular-nums hidden sm:table-cell">
              {formatNumber(v.totalStake)}
            </TableCell>
            <TableCell className="text-right font-mono tabular-nums hidden md:table-cell">
              {v.commission}%
            </TableCell>
            <TableCell className="text-right font-mono tabular-nums hidden md:table-cell">
              {v.delegators.toLocaleString()}
            </TableCell>
            <TableCell className="text-right font-mono tabular-nums hidden lg:table-cell">
              {v.rewards24h > 0 ? formatNumber(v.rewards24h) : "-"}
            </TableCell>
            <TableCell className="text-right">
              <span
                className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${statusColors[v.status]}`}
              >
                {v.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
