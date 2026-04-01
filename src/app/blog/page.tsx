import type { Metadata } from "next"
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/data/mock"
import { PostCard } from "@/components/blog/post-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Blog | Canton Network News & Analysis | cnews.cc",
  description:
    "Latest news, analysis, and insights about Canton Network, CC token, DeFi protocols, and the institutional blockchain ecosystem.",
  openGraph: {
    title: "Blog | Canton Network News & Analysis | cnews.cc",
    description:
      "Latest news, analysis, and insights about Canton Network, CC token, DeFi protocols, and the institutional blockchain ecosystem.",
    type: "website",
  },
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-muted-foreground">
            News, analysis, and insights from the Canton Network ecosystem.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Category Filter Tabs */}
        <Tabs defaultValue="All">
          <TabsList variant="line" className="mb-8 flex-wrap">
            {BLOG_CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {BLOG_CATEGORIES.map((category) => {
            const posts =
              category === "All"
                ? BLOG_POSTS
                : BLOG_POSTS.filter((p) => p.category === category)

            return (
              <TabsContent key={category} value={category}>
                {posts.length === 0 ? (
                  <p className="py-12 text-center text-muted-foreground">
                    No posts in this category yet.
                  </p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>

        {/* Pagination placeholder */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">
            1
          </span>
          <span className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            2
          </span>
          <span className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            3
          </span>
        </div>
      </div>
    </div>
  )
}
