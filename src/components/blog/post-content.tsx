"use client"

interface PostContentProps {
  /** HTML string — will be replaced with PortableText renderer when Sanity is connected */
  html: string
}

export function PostContent({ html }: PostContentProps) {
  return (
    <div
      className="prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
