import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LEARN_ARTICLES } from "@/lib/data/mock"
import { PostContent } from "@/components/blog/post-content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return LEARN_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = LEARN_ARTICLES.find((a) => a.slug === slug)
  if (!article) return { title: "Article Not Found | cnews.cc" }

  return {
    title: `${article.title} | Learn | cnews.cc`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Learn | cnews.cc`,
      description: article.excerpt,
      type: "article",
    },
  }
}

function extractHeadings(html: string) {
  const matches = [...html.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)]
  return matches.map((m) => ({ id: m[1], text: m[2] }))
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params
  const articleIndex = LEARN_ARTICLES.findIndex((a) => a.slug === slug)
  if (articleIndex === -1) notFound()

  const article = LEARN_ARTICLES[articleIndex]
  const headings = extractHeadings(article.content)
  const prevArticle = articleIndex > 0 ? LEARN_ARTICLES[articleIndex - 1] : null
  const nextArticle =
    articleIndex < LEARN_ARTICLES.length - 1
      ? LEARN_ARTICLES[articleIndex + 1]
      : null

  const relatedArticles = LEARN_ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  ).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    publisher: {
      "@type": "Organization",
      name: "cnews.cc",
      url: "https://cnews.cc",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cnews.cc/learn/${article.slug}`,
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
          href="/learn"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Learn
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_240px]">
          {/* Main content */}
          <article>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {article.readTime}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                {article.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {article.excerpt}
              </p>
            </div>

            {/* Featured image placeholder */}
            <div className="mb-8 aspect-video w-full rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground text-xs">
              {article.image}
            </div>

            <PostContent html={article.content} />

            {/* Prev/Next Navigation */}
            <Separator className="my-8" />
            <div className="grid gap-4 sm:grid-cols-2">
              {prevArticle ? (
                <Link
                  href={`/learn/${prevArticle.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
                >
                  <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="text-sm font-medium truncate">
                      {prevArticle.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextArticle && (
                <Link
                  href={`/learn/${nextArticle.slug}`}
                  className="flex items-center justify-end gap-2 rounded-lg border border-border p-4 transition-colors hover:bg-muted/30 text-right"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Next</p>
                    <p className="text-sm font-medium truncate">
                      {nextArticle.title}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              )}
            </div>
          </article>

          {/* Sidebar — Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="mb-3 text-sm font-semibold">On this page</h4>
              <nav className="flex flex-col gap-2">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <>
            <Separator className="my-12" />
            <section>
              <h2 className="mb-6 text-xl font-semibold">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/learn/${a.slug}`}
                    className="group block"
                  >
                    <Card
                      size="sm"
                      className="h-full transition-colors hover:bg-muted/30"
                    >
                      <CardContent className="pt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {a.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {a.readTime}
                          </span>
                        </div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {a.title}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
