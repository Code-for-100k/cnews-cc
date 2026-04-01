import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ECOSYSTEM_PROJECTS } from "@/lib/data/mock"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ECOSYSTEM_PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = ECOSYSTEM_PROJECTS.find((p) => p.slug === slug)
  if (!project) return { title: "Project Not Found | cnews.cc" }

  return {
    title: `${project.name} | Canton Network Ecosystem | cnews.cc`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Canton Network Ecosystem | cnews.cc`,
      description: project.description,
      type: "website",
    },
  }
}

const statusLabels: Record<string, { label: string; color: string }> = {
  live: { label: "Live", color: "bg-green-500/10 text-green-500" },
  beta: { label: "Beta", color: "bg-yellow-500/10 text-yellow-500" },
  "coming-soon": { label: "Coming Soon", color: "bg-muted text-muted-foreground" },
}

export default async function EcosystemProjectPage({ params }: Props) {
  const { slug } = await params
  const project = ECOSYSTEM_PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  const status = statusLabels[project.status]
  const relatedProjects = ECOSYSTEM_PROJECTS.filter(
    (p) => p.slug !== project.slug && p.category === project.category
  ).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: project.website,
    applicationCategory: project.category,
    operatingSystem: "Web",
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/ecosystem"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Ecosystem
        </Link>

        <div className="mt-6 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-bold">
              {project.name.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                {project.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">{project.category}</Badge>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Visit website
                <ExternalLink className="size-3" />
              </a>
            </CardContent>
          </Card>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="mb-4 text-lg font-semibold">
                  Related {project.category} Projects
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/ecosystem/${rp.slug}`}
                      className="group block"
                    >
                      <Card
                        size="sm"
                        className="transition-colors hover:bg-muted/30"
                      >
                        <CardContent className="pt-3">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {rp.name}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {rp.description}
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
    </div>
  )
}
