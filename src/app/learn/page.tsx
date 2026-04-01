import type { Metadata } from "next"
import Link from "next/link"
import { LEARN_ARTICLES } from "@/lib/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, GraduationCap, Code, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Learn | Canton Network Education Hub | cnews.cc",
  description:
    "Learn about Canton Network, Daml smart contracts, CC token staking, and institutional DeFi. Guides for beginners, developers, and institutions.",
  openGraph: {
    title: "Learn | Canton Network Education Hub | cnews.cc",
    description:
      "Learn about Canton Network, Daml smart contracts, CC token staking, and institutional DeFi.",
    type: "website",
  },
}

const pathIcons: Record<string, React.ReactNode> = {
  Beginner: <GraduationCap className="size-5" />,
  Developer: <Code className="size-5" />,
  Institutional: <Building2 className="size-5" />,
}

const pathDescriptions: Record<string, string> = {
  Beginner:
    "Start here if you are new to Canton Network. Learn the fundamentals of the ecosystem, tokens, and staking.",
  Developer:
    "Technical guides for building on Canton. From Daml smart contracts to running validator nodes.",
  Institutional:
    "Resources for financial institutions looking to participate in Canton Network and institutional DeFi.",
}

export default function LearnPage() {
  const featured = LEARN_ARTICLES.filter((a) => a.featured)
  const categories = ["Beginner", "Developer", "Institutional"] as const

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
          <p className="mt-2 text-muted-foreground">
            Your guide to understanding Canton Network, from basics to advanced
            topics.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold">Featured</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="group block"
              >
                <Card className="h-full transition-colors hover:bg-muted/30">
                  <div className="aspect-video w-full bg-muted/50 flex items-center justify-center text-muted-foreground text-xs">
                    {article.image}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold">Learning Paths</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((cat) => {
              const count = LEARN_ARTICLES.filter(
                (a) => a.category === cat
              ).length
              return (
                <Card
                  key={cat}
                  className="transition-colors hover:bg-muted/30"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        {pathIcons[cat]}
                      </div>
                      <div>
                        <CardTitle>{cat}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {count} article{count !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {pathDescriptions[cat]}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* All Articles */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">All Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEARN_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="group block"
              >
                <Card
                  size="sm"
                  className="h-full transition-colors hover:bg-muted/30"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
