import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TOKENS, BLOG_POSTS, formatPrice } from "@/lib/data/mock"
import { TokenHeader } from "@/components/tokens/token-header"
import { TokenStats } from "@/components/tokens/token-stats"
import { PostCard } from "@/components/blog/post-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return TOKENS.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const token = TOKENS.find((t) => t.slug === slug)
  if (!token) return { title: "Token Not Found | cnews.cc" }

  return {
    title: `${token.name} (${token.symbol}) Price, Chart & Market Cap | cnews.cc`,
    description: token.description,
    openGraph: {
      title: `${token.name} (${token.symbol}) Price, Chart & Market Cap | cnews.cc`,
      description: token.description,
      type: "website",
    },
  }
}

export default async function TokenPage({ params }: Props) {
  const { slug } = await params
  const token = TOKENS.find((t) => t.slug === slug)
  if (!token) notFound()

  // Related news — pick any 3 blog posts (in production this would be token-specific)
  const relatedNews = BLOG_POSTS.slice(0, 3)

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${token.name} (${token.symbol}) Price`,
    description: token.description,
    url: `https://cnews.cc/tokens/${token.slug}`,
    mainEntity: {
      "@type": "FinancialProduct",
      name: token.name,
      alternateName: token.symbol,
      description: token.description,
      url: token.website,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link
          href="/tokens"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Tokens
        </Link>

        <div className="mt-6 space-y-8">
          {/* Header */}
          <TokenHeader token={token} />

          {/* Stats Grid */}
          <TokenStats token={token} />

          {/* Price Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>{token.name} Price Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
                Price chart will be rendered here with Recharts
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About {token.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {token.description}
              </p>
              <a
                href={token.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Visit website
                <ExternalLink className="size-3" />
              </a>
            </CardContent>
          </Card>

          {/* Exchange Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Available on</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {token.exchanges.map((exchange) => (
                  <Badge key={exchange} variant="secondary">
                    {exchange}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="mb-6 text-xl font-semibold">Related News</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedNews.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
