"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/ui/animated-section";

const footerLinks = {
  Explore: [
    { label: "Dashboard", href: "/" },
    { label: "Tokens", href: "/tokens" },
    { label: "Validators", href: "/validators" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Blog", href: "/blog" },
  ],
  Tools: [
    { label: "CC Calculator", href: "/tools/calculator" },
    { label: "Token Converter", href: "/tools/converter" },
    { label: "Gas Tracker", href: "/tools/gas" },
    { label: "Staking Rewards", href: "/tools/staking" },
  ],
  Resources: [
    { label: "Learn", href: "/learn" },
    { label: "Glossary", href: "/glossary" },
    { label: "API Docs", href: "/docs/api" },
    { label: "Canton Docs", href: "https://docs.canton.network" },
  ],
  About: [
    { label: "About cnews.cc", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      {/* Animated gradient border line at top */}
      <div className="animate-gradient-border h-px w-full" />

      <AnimatedSection direction="up" duration={0.7}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-foreground">
                  {category}
                </h3>
                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-canton"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-8 bg-border/50" />

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-canton">cnews</span>
              <span className="text-lg font-bold text-muted-foreground">.cc</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Powered by Canton Network data
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} cnews.cc. All rights reserved.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}
