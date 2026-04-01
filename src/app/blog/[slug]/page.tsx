import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BLOG_POSTS } from "@/lib/data/mock"
import { PostContent } from "@/components/blog/post-content"
import { PostCard } from "@/components/blog/post-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: "Post Not Found | cnews.cc" }

  return {
    title: `${post.title} | cnews.cc`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  }
}

/** Extract heading IDs from the HTML content for the table of contents */
function extractHeadings(html: string) {
  const matches = [...html.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)]
  return matches.map((m) => ({ id: m[1], text: m[2] }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3)

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "cnews.cc",
      url: "https://cnews.cc",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cnews.cc/blog/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_240px]">
          {/* Main content */}
          <article>
            <div className="mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                {post.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{post.author.name}</span>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Featured image placeholder */}
            <div className="mb-8 aspect-video w-full rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground text-xs">
              {post.image}
            </div>

            <PostContent html={post.content} />
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

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <>
            <Separator className="my-12" />
            <section>
              <h2 className="mb-6 text-xl font-semibold">Related Posts</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
