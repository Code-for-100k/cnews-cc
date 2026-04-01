import type { Metadata } from "next"
import Link from "next/link"
import { TOOLS } from "@/lib/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Calculator,
  ArrowLeftRight,
  Fuel,
  PieChart,
  GitCompare,
  Wrench,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Tools | Canton Network Utilities | cnews.cc",
  description:
    "Free tools for Canton Network: CC Reward Calculator, Token Converter, Gas Tracker, Portfolio Tracker, and more.",
  openGraph: {
    title: "Tools | Canton Network Utilities | cnews.cc",
    description:
      "Free tools for Canton Network: CC Reward Calculator, Token Converter, and more.",
    type: "website",
  },
}

const iconMap: Record<string, React.ReactNode> = {
  calculator: <Calculator className="size-6" />,
  "arrow-left-right": <ArrowLeftRight className="size-6" />,
  fuel: <Fuel className="size-6" />,
  "pie-chart": <PieChart className="size-6" />,
  "git-compare": <GitCompare className="size-6" />,
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
          <p className="mt-2 text-muted-foreground">
            Free utilities and calculators for the Canton Network ecosystem.
          </p>
        </div>

        <Separator className="mb-8" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => {
            const isLive = tool.status === "live"

            const cardContent = (
              <Card
                className={`h-full transition-colors ${
                  isLive
                    ? "hover:bg-muted/30 cursor-pointer"
                    : "opacity-60"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                      {iconMap[tool.icon] ?? <Wrench className="size-6" />}
                    </div>
                    {!isLive && (
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <CardTitle className="mt-3">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            )

            if (isLive) {
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group block"
                >
                  {cardContent}
                </Link>
              )
            }

            return (
              <div key={tool.slug}>
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
