"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { GLOSSARY_TERMS } from "@/lib/data/mock"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search } from "lucide-react"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export default function GlossaryPage() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return GLOSSARY_TERMS
    const q = search.toLowerCase()
    return GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
    )
  }, [search])

  // Group by first letter
  const grouped = useMemo(() => {
    const map: Record<string, typeof filtered> = {}
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase()
      if (!map[letter]) map[letter] = []
      map[letter].push(term)
    }
    return map
  }, [filtered])

  const activeLetters = new Set(Object.keys(grouped))

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
          <p className="mt-2 text-muted-foreground">
            Key terms and concepts for the Canton Network ecosystem.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Letter navigation */}
        <div className="mb-8 flex flex-wrap gap-1">
          {ALPHABET.map((letter) => {
            const active = activeLetters.has(letter)
            return (
              <a
                key={letter}
                href={active ? `#letter-${letter}` : undefined}
                className={`flex size-8 items-center justify-center rounded text-sm font-medium transition-colors ${
                  active
                    ? "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                    : "text-muted-foreground/40 cursor-default"
                }`}
              >
                {letter}
              </a>
            )
          })}
        </div>

        <Separator className="mb-8" />

        {/* Term list grouped by letter */}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No terms found matching your search.
          </p>
        ) : (
          <div className="space-y-10">
            {ALPHABET.filter((l) => grouped[l]).map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="mb-4 text-xl font-bold text-primary">
                  {letter}
                </h2>
                <div className="space-y-4">
                  {grouped[letter].map((term) => (
                    <div key={term.slug} className="group">
                      <Link
                        href={`/glossary/${term.slug}`}
                        className="text-base font-semibold hover:text-primary transition-colors"
                      >
                        {term.term}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
