"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ECOSYSTEM_PROJECTS,
  ECOSYSTEM_CATEGORIES,
} from "@/lib/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Search, ExternalLink } from "lucide-react"

const statusLabels: Record<string, { label: string; color: string }> = {
  live: { label: "Live", color: "bg-green-500/10 text-green-500" },
  beta: { label: "Beta", color: "bg-yellow-500/10 text-yellow-500" },
  "coming-soon": { label: "Coming Soon", color: "bg-muted text-muted-foreground" },
}

export default function EcosystemPage() {
  const [search, setSearch] = useState("")

  const filterBySearch = (projects: typeof ECOSYSTEM_PROJECTS) => {
    if (!search.trim()) return projects
    const q = search.toLowerCase()
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Ecosystem</h1>
          <p className="mt-2 text-muted-foreground">
            Explore the projects, protocols, and tools building on Canton
            Network.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Separator className="mb-8" />

        <Tabs defaultValue="All">
          <TabsList variant="line" className="mb-8 flex-wrap">
            {ECOSYSTEM_CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {ECOSYSTEM_CATEGORIES.map((cat) => {
            const projects = filterBySearch(
              cat === "All"
                ? ECOSYSTEM_PROJECTS
                : ECOSYSTEM_PROJECTS.filter((p) => p.category === cat)
            )

            return (
              <TabsContent key={cat} value={cat}>
                {projects.length === 0 ? (
                  <p className="py-12 text-center text-muted-foreground">
                    No projects found.
                  </p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => {
                      const status = statusLabels[project.status]
                      return (
                        <Link
                          key={project.slug}
                          href={`/ecosystem/${project.slug}`}
                          className="group block"
                        >
                          <Card className="h-full transition-colors hover:bg-muted/30">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold">
                                    {project.name.slice(0, 2)}
                                  </div>
                                  <div>
                                    <CardTitle className="group-hover:text-primary transition-colors">
                                      {project.name}
                                    </CardTitle>
                                    <Badge
                                      variant="outline"
                                      className="mt-1 text-xs"
                                    >
                                      {project.category}
                                    </Badge>
                                  </div>
                                </div>
                                <span
                                  className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${status.color}`}
                                >
                                  {status.label}
                                </span>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {project.description}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
