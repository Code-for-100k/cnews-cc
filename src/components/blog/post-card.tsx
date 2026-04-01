import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/data/mock"

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full transition-colors hover:bg-muted/30">
        <div className="aspect-video w-full bg-muted/50 flex items-center justify-center text-muted-foreground text-xs">
          {/* Placeholder for post image — will use next/image with Sanity */}
          <span className="text-muted-foreground/50">{post.image}</span>
        </div>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          </div>
          <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
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
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
