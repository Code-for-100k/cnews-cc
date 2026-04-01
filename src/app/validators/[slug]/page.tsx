import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { VALIDATORS, formatNumber } from "@/lib/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return VALIDATORS.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const validator = VALIDATORS.find((v) => v.slug === slug)
  if (!validator) return { title: "Validator Not Found | cnews.cc" }

  return {
    title: `${validator.name} Validator | Canton Network | cnews.cc`,
    description: validator.description,
    openGraph: {
      title: `${validator.name} Validator | Canton Network | cnews.cc`,
      description: validator.description,
      type: "website",
    },
  }
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-500",
  inactive: "bg-yellow-500/10 text-yellow-500",
  jailed: "bg-red-500/10 text-red-500",
}

export default async function ValidatorPage({ params }: Props) {
  const { slug } = await params
  const validator = VALIDATORS.find((v) => v.slug === slug)
  if (!validator) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: validator.name,
    description: validator.description,
    url: validator.website,
  }

  const stats = [
    { label: "Total Stake", value: formatNumber(validator.totalStake) },
    { label: "Uptime", value: `${validator.uptime.toFixed(2)}%` },
    { label: "Commission", value: `${validator.commission}%` },
    { label: "Delegators", value: validator.delegators.toLocaleString() },
    {
      label: "24h Rewards",
      value: validator.rewards24h > 0 ? formatNumber(validator.rewards24h) : "-",
    },
    {
      label: "Status",
      value: validator.status,
      badge: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link
          href="/validators"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Validators
        </Link>

        <div className="mt-6 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-bold">
              {validator.name.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                {validator.name}
              </h1>
              <span
                className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${statusColors[validator.status]}`}
              >
                {validator.status}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <Card key={s.label} size="sm">
                <CardContent className="pt-1">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  {s.badge ? (
                    <span
                      className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${statusColors[s.value]}`}
                    >
                      {s.value}
                    </span>
                  ) : (
                    <p className="mt-1 text-sm font-semibold tabular-nums">
                      {s.value}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reward History Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
                Reward history chart will be rendered here with Recharts
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About {validator.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {validator.description}
              </p>
              <a
                href={validator.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Visit website
                <ExternalLink className="size-3" />
              </a>
            </CardContent>
          </Card>

          {/* Delegator Info */}
          <Card>
            <CardHeader>
              <CardTitle>Delegation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Delegators</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {validator.delegators.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Commission Rate</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {validator.commission}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Delegate your CC tokens to this validator to earn staking
                rewards. Commission is taken from rewards before distribution
                to delegators.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
