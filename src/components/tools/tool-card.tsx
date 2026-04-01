import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export function ToolCard({
  icon: Icon,
  title,
  description,
  href,
  badge,
}: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full border-zinc-800 bg-zinc-950 transition-all duration-200 hover:border-[#00D4AA]/40 hover:bg-[#00D4AA]/5 group-focus-visible:border-[#00D4AA] group-focus-visible:ring-2 group-focus-visible:ring-[#00D4AA]/30">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="size-10 rounded-lg bg-[#00D4AA]/10 flex items-center justify-center">
              <Icon className="size-5 text-[#00D4AA]" />
            </div>
            {badge && (
              <Badge
                variant="outline"
                className="border-[#00D4AA]/30 text-[#00D4AA] text-xs"
              >
                {badge}
              </Badge>
            )}
          </div>
          <CardTitle className="text-white mt-3 group-hover:text-[#00D4AA] transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-zinc-400 line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00D4AA] opacity-0 group-hover:opacity-100 transition-opacity">
            Try it
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
