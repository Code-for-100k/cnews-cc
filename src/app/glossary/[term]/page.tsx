import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GLOSSARY_TERMS } from "@/lib/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen } from "lucide-react"

type Props = {
  params: Promise<{ term: string }>
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ term: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term: termSlug } = await params
  const term = GLOSSARY_TERMS.find((t) => t.slug === termSlug)
  if (!term) return { title: "Term Not Found | cnews.cc" }

  return {
    title: `${term.term} - Definition | Canton Network Glossary | cnews.cc`,
    description: term.definition,
    openGraph: {
      title: `${term.term} - Definition | cnews.cc`,
      description: term.definition,
      type: "website",
    },
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: termSlug } = await params
  const term = GLOSSARY_TERMS.find((t) => t.slug === termSlug)
  if (!term) notFound()

  const relatedTermObjects = GLOSSARY_TERMS.filter((t) =>
    term.relatedTerms.includes(t.slug)
  )

  // JSON-LD DefinedTerm schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Canton Network Glossary",
      url: "https://cnews.cc/glossary",
    },
    url: `https://cnews.cc/glossary/${term.slug}`,
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/glossary"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Glossary
        </Link>

        <div className="mt-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{term.term}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Definition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {term.definition}
              </p>
            </CardContent>
          </Card>

          {/* Related Terms */}
          {relatedTermObjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {relatedTermObjects.map((rt) => (
                    <Link key={rt.slug} href={`/glossary/${rt.slug}`}>
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {rt.term}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Learn More */}
          {term.relatedLearnSlug && (
            <>
              <Separator />
              <Link
                href={`/learn/${term.relatedLearnSlug}`}
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
              >
                <BookOpen className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Learn more</p>
                  <p className="text-xs text-muted-foreground">
                    Read a detailed guide about this topic
                  </p>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
